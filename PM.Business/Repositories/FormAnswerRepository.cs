using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using PM.Business.Contracts;
using PM.Business.Core.Consts;
using PM.Business.Core.DataTransferModels;
using PM.Business.Core.DataTransferModels.FormAnswer;
using PM.Business.Helpers.Contracts;
using PM.Database.DataContext;
using PM.Database.Models;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace PM.Business.Repositories
{
    public class FormAnswerRepository : IFormAnswerRepository
    {
        private readonly ProductManagerDbContext _context;
        private readonly IAuthService _authService;
        private readonly IModuleRepository _moduleRepository;
        private readonly IEventRepository _eventRepository;

        public FormAnswerRepository(ProductManagerDbContext context,
                                    IAuthService authService,
                                    IModuleRepository moduleRepository,
                                    IEventRepository eventRepository)
        {
            _context = context;
            _authService = authService;
            _moduleRepository = moduleRepository;
            _eventRepository = eventRepository;
        }

        #region Create

        public async Task<ExecutionResult> Create(CreateFormAnswerRequestModel model)
        {
            #region Access Check

            var moduleDetails = await (from module in _context.Modules
                                       from formDesign in _context.FormDesigns.Where(fd => fd.ModuleId == module.Id)
                                       where
                                          module.UserId == _authService.UserId &&
                                          module.DeletedAt.HasValue == false &&
                                          formDesign.Id == model.FormDesignId &&
                                          formDesign.DeletedAt.HasValue == false
                                       select new
                                       {
                                           module.Id,
                                           module.Title,
                                           module.Prefix,
                                           formDesign.DesignData
                                       }).FirstOrDefaultAsync();

            if (moduleDetails == null)
            {
                return new ExecutionResult(new ErrorInfo(string.Format(MessageHelper.NotFound, "Form Design")));
            }

            #endregion

            FormAnswer answer = new FormAnswer
            {
                FormDesignId = model.FormDesignId,
                AnswerData = JObject.Parse(model.AnswerDataString),
                CreatedAt = DateTime.UtcNow,
                IsActive = true
            };

            JArray design = JsonConvert.DeserializeObject<JArray>(moduleDetails.DesignData);
            Event eventObj;

            // create event for First Form answer
            if (model.EventId.HasValue == false)
            {
                eventObj = new Event
                {
                    ModuleId = moduleDetails.Id,
                    UserId = _authService.UserId,
                    Description = answer.AnswerData.SelectToken("description")?.ToString(),
                    CreatedAt = DateTime.UtcNow,
                    IsActive = true
                };

                int nextNumber = await _context.NextValueForSequence(_moduleRepository.GetSequenceName(moduleDetails.Id));

                eventObj.UniqueId = $"{ moduleDetails.Prefix }-{ nextNumber }";
                eventObj.ReservedTitle = _eventRepository.GenerateReservedTitle(eventObj, moduleDetails.Title);

                _eventRepository.SetReservedFiels(eventObj, answer.AnswerData, design);

                answer.Event = eventObj;
            }
            else
            {
                eventObj = await _context.Events.FirstOrDefaultAsync(e => e.Id == model.EventId);

                _eventRepository.SetReservedFiels(eventObj, answer.AnswerData, design);

                answer.EventId = (int)model.EventId;
            }

            _context.FormAnswers.Add(answer);

            await _context.SaveChangesAsync();

            return new ExecutionResult(new InfoMessage(string.Format(MessageHelper.SuccessMessage, "Form Answer", "saved")));
        }

        #endregion

        #region Get View

        public async Task<ExecutionResult<FormViewDetailModel>> GetView(int formAnswerId)
        {
            var data = await (from module in _context.Modules
                              from eventObj in _context.Events.Where(e => e.ModuleId == module.Id)
                              from form in _context.FormDesigns.Where(f => f.ModuleId == module.Id)
                              from answer in _context.FormAnswers.Where(a => a.FormDesignId == form.Id)
                              where
                                 module.UserId == _authService.UserId &&
                                 eventObj.UserId == _authService.UserId &&
                                 answer.Id == formAnswerId &&
                                 module.DeletedAt.HasValue == false &&
                                 eventObj.DeletedAt.HasValue == false &&
                                 form.DeletedAt.HasValue == false &&
                                 answer.DeletedAt.HasValue == false
                              select new
                              {
                                  FormAnswerId = answer.Id,
                                  FormDesignId = form.Id,
                                  FormTitle = form.Title,
                                  AnswerData = answer.AnswerData,
                                  EventId = answer.EventId,
                                  DesignData = form.DesignData
                              }).FirstOrDefaultAsync();

            if (data == null)
            {
                return new ExecutionResult<FormViewDetailModel>(new ErrorInfo(string.Format(MessageHelper.NotFound, "Form")));
            }

            FormViewDetailModel response = new FormViewDetailModel
            {
                FormAnswerId = data.FormAnswerId,
                FormDesignId = data.FormDesignId,
                EventId = data.EventId,
                FormTitle = data.FormTitle,
                AnswerData = JsonConvert.SerializeObject(data.AnswerData),
                DesignData = data.DesignData
            };

            return new ExecutionResult<FormViewDetailModel>(response);
        }

        #endregion
    }
}
