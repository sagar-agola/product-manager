using Microsoft.EntityFrameworkCore;
using PM.Business.Contracts;
using PM.Business.Core.DataTransferModels;
using PM.Business.Core.DataTransferModels.FormAnswer;
using PM.Database.DataContext;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using System.Linq;
using PM.Business.Helpers.Contracts;
using PM.Business.Core.Consts;
using PM.Database.Models;
using Newtonsoft.Json.Linq;

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
                                           module.Prefix
                                       }).FirstOrDefaultAsync();

            if (moduleDetails == null)
            {
                return new ExecutionResult(new ErrorInfo(string.Format(MessageHelper.NotFound, "Form Design")));
            }

            #endregion

            #region Save Form Answer

            FormAnswer answer = new FormAnswer
            {
                FormDesignId = model.FormDesignId,
                AnswerData = JObject.Parse(model.AnswerDataString),
                CreatedAt = DateTime.UtcNow,
                IsActive = true
            };

            _context.FormAnswers.Add(answer);

            #endregion

            #region Save Event

            if (model.EventId.HasValue == false)
            {
                Event eventObj = new Event
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

                _context.Events.Add(eventObj);
            }

            #endregion

            await _context.SaveChangesAsync();

            return new ExecutionResult(new InfoMessage(string.Format(MessageHelper.SuccessMessage, "Form Answer", "saved")));
        }

        #endregion
    }
}
