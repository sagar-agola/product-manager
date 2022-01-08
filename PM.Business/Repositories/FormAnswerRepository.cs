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

        public FormAnswerRepository(ProductManagerDbContext context, IAuthService authService)
        {
            _context = context;
            _authService = authService;
        }

        #region Save

        public async Task<ExecutionResult> Save(FormAnswerDetail model)
        {
            bool isFormDesignExists = await (from module in _context.Modules
                                             from formDesign in _context.FormDesigns.Where(fd => fd.ModuleId == module.Id)
                                             where
                                                module.UserId == _authService.UserId &&
                                                formDesign.Id == model.FormDesignId &&
                                                module.DeletedAt.HasValue == false &&
                                                formDesign.DeletedAt.HasValue == false
                                             select formDesign.Id).AnyAsync();

            if (isFormDesignExists == false)
            {
                return new ExecutionResult(new ErrorInfo(string.Format(MessageHelper.NotFound, "Form Design")));
            }

            if (model.Id == 0)
            {
                FormAnswer answer = new FormAnswer
                {
                    FormDesignId = model.FormDesignId,
                    AnswerData = JObject.Parse(model.AnswerDataString),
                    CreatedAt = DateTime.UtcNow,
                    IsActive = true
                };

                _context.FormAnswers.Add(answer);
            }
            else
            {
                FormAnswer answer = await _context.FormAnswers.FirstOrDefaultAsync(a => a.Id == model.Id);
                if (answer == null)
                {
                    return new ExecutionResult(new ErrorInfo(string.Format(MessageHelper.NotFound, "Form Answer")));
                }

                answer.AnswerData = JObject.Parse(model.AnswerDataString);
                answer.UpdatedAt = DateTime.UtcNow;
            }

            await _context.SaveChangesAsync();

            return new ExecutionResult(new InfoMessage(string.Format(MessageHelper.SuccessMessage, "Form Answer", "saved")));
        }

        #endregion
    }
}
