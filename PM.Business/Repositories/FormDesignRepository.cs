using PM.Business.Contracts;
using PM.Business.Core.DataTransferModels;
using PM.Business.Core.DataTransferModels.FormDesign;
using PM.Database.DataContext;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using System.Linq;
using PM.Business.Helpers.Contracts;
using Microsoft.EntityFrameworkCore;
using PM.Database.Models;
using PM.Business.Core.Consts;

namespace PM.Business.Repositories
{
    public class FormDesignRepository : IFormDesignRepository
    {
        private readonly ProductManagerDbContext _context;
        private readonly IAuthService _authService;

        public FormDesignRepository(ProductManagerDbContext context, IAuthService authService)
        {
            _context = context;
            _authService = authService;
        }

        #region Get All

        public async Task<ExecutionResult<List<FormDesignDetail>>> GetAll(int moduleId, string searchTerm)
        {
            List<FormDesignDetail> forms = await (from module in _context.Modules
                                                  from formDesign in _context.FormDesigns.Where(fd => fd.ModuleId == module.Id)
                                                  where
                                                    module.UserId == _authService.UserId &&
                                                    module.Id == moduleId &&
                                                    module.DeletedAt.HasValue == false &&
                                                    formDesign.DeletedAt.HasValue == false &&
                                                    (string.IsNullOrEmpty(searchTerm) || formDesign.Title.Contains(searchTerm))
                                                  orderby formDesign.Order
                                                  select new FormDesignDetail
                                                  {
                                                      Id = formDesign.Id,
                                                      Title = formDesign.Title,
                                                      DesignData = formDesign.DesignData,
                                                      ModuleId = formDesign.ModuleId,
                                                      Module = module.Title,
                                                      Order = formDesign.Order,
                                                      CreatedAt = formDesign.CreatedAt
                                                  }).ToListAsync();

            return new ExecutionResult<List<FormDesignDetail>>(forms);
        }

        #endregion

        #region Get

        public async Task<ExecutionResult<FormDesignDetail>> Get(int id)
        {
            FormDesignDetail formDesignDetail = await (from module in _context.Modules
                                                       from formDesign in _context.FormDesigns.Where(fd => fd.ModuleId == module.Id)
                                                       where
                                                         module.UserId == _authService.UserId &&
                                                         module.DeletedAt.HasValue == false &&
                                                         formDesign.DeletedAt.HasValue == false
                                                       select new FormDesignDetail
                                                       {
                                                           Id = formDesign.Id,
                                                           Title = formDesign.Title,
                                                           DesignData = formDesign.DesignData,
                                                           ModuleId = formDesign.ModuleId,
                                                           Module = module.Title,
                                                           Order = formDesign.Order,
                                                           CreatedAt = formDesign.CreatedAt
                                                       }).FirstOrDefaultAsync();

            return new ExecutionResult<FormDesignDetail>(formDesignDetail);
        }

        #endregion

        #region Save

        public async Task<ExecutionResult> Save(FormDesignDetail model)
        {
            bool hasAccess = await _context.Modules.AnyAsync(m => m.UserId == _authService.UserId && m.Id == model.ModuleId && !m.DeletedAt.HasValue);
            if (hasAccess == false)
            {
                return new ExecutionResult(new ErrorInfo(string.Format(MessageHelper.NotHavePermission, "module")));
            }

            if (model.Id == 0)
            {
                bool isDuplicate = await _context.FormDesigns.AnyAsync(fd => fd.Title == model.Title && fd.ModuleId == model.ModuleId && fd.DeletedAt.HasValue == false);
                if (isDuplicate)
                {
                    return new ExecutionResult(
                        new ErrorInfo(
                            string.Format(
                                MessageHelper.ResourceAlreadyExists,
                                "Form Design",
                                $"with \"{ model.Title }\" title")
                            )
                        );
                }

                int previousFormCount = await _context.FormDesigns.CountAsync(fd => fd.ModuleId == model.ModuleId && fd.DeletedAt.HasValue == false);

                FormDesign formDesign = new FormDesign
                {
                    Title = model.Title,
                    DesignData = model.DesignData,
                    ModuleId = model.ModuleId,
                    Order = previousFormCount + 1,
                    IsActive = true,
                    CreatedAt = DateTime.UtcNow
                };

                _context.FormDesigns.Add(formDesign);
            }
            else
            {
                bool isDuplicate = await _context.FormDesigns.AnyAsync(fd => fd.Id != model.Id && fd.Title == model.Title && fd.ModuleId == model.ModuleId && fd.DeletedAt.HasValue == false);
                if (isDuplicate)
                {
                    return new ExecutionResult(
                        new ErrorInfo(
                            string.Format(
                                MessageHelper.ResourceAlreadyExists,
                                "Form Design",
                                $"with \"{ model.Title }\" title")
                            )
                        );
                }

                FormDesign formDesign = await _context.FormDesigns.FirstOrDefaultAsync(fd => fd.Id == model.Id);

                formDesign.Title = model.Title;
                formDesign.UpdatedAt = DateTime.UtcNow;
            }

            await _context.SaveChangesAsync();

            return new ExecutionResult(
                new InfoMessage(
                    string.Format(
                        MessageHelper.SuccessMessage,
                        "Form Design",
                        model.Id == 0 ? "created" : "title updated")
                    )
                );
        }

        #endregion

        #region Delete

        public async Task<ExecutionResult> Delete(int id)
        {
            FormDesign formDesign = await (from module in _context.Modules
                                           from fd in _context.FormDesigns.Where(fd => fd.ModuleId == module.Id)
                                           where
                                                module.UserId == _authService.UserId &&
                                                module.DeletedAt.HasValue == false &&
                                                fd.Id == id &&
                                                fd.DeletedAt.HasValue == false
                                           select fd).FirstOrDefaultAsync();

            if (formDesign == null)
            {
                return new ExecutionResult(new ErrorInfo(string.Format(MessageHelper.NotFound, "Form Design")));
            }

            formDesign.DeletedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return new ExecutionResult(new InfoMessage(string.Format(MessageHelper.SuccessMessage, "Form Design", "deleted")));
        }

        #endregion
    }
}
