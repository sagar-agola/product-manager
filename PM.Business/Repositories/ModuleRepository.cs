using Microsoft.EntityFrameworkCore;
using PM.Business.Contracts;
using PM.Business.Core.Consts;
using PM.Business.Core.DataTransferModels;
using PM.Business.Core.DataTransferModels.Module;
using PM.Business.Helpers.Contracts;
using PM.Database.DataContext;
using PM.Database.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PM.Business.Repositories
{
    public class ModuleRepository : IModuleRepository
    {
        private readonly ProductManagerDbContext _context;
        private readonly IAuthService _authService;

        public ModuleRepository(ProductManagerDbContext context, IAuthService authService)
        {
            _context = context;
            _authService = authService;
        }

        #region Get All

        public async Task<ExecutionResult<List<ModuleDetail>>> GetAll(string searchTerm)
        {
            List<ModuleDetail> modules = await _context.Modules
                .Where(m => m.UserId == _authService.UserId && m.DeletedAt.HasValue == false && (string.IsNullOrEmpty(searchTerm) || m.Title.Contains(searchTerm)))
                .OrderByDescending(m => m.Id)
                .Select(m => new ModuleDetail
                {
                    Id = m.Id,
                    Title = m.Title,
                    Icon = m.Icon,
                    IsActive = m.IsActive,
                    CreatedAt = m.CreatedAt
                }).ToListAsync();

            return new ExecutionResult<List<ModuleDetail>>(modules);
        }

        #endregion

        #region Get

        public async Task<ExecutionResult<ModuleDetail>> Get(int id)
        {
            ModuleDetail module = await _context.Modules
                .Where(m => m.Id == id && m.UserId == _authService.UserId && m.DeletedAt.HasValue == false)
                .Select(m => new ModuleDetail
                {
                    Id = m.Id,
                    Title = m.Title,
                    Icon = m.Icon,
                    IsActive = m.IsActive,
                    CreatedAt = m.CreatedAt
                }).FirstOrDefaultAsync();

            if (module == null)
            {
                return new ExecutionResult<ModuleDetail>(new ErrorInfo(string.Format(MessageHelper.NotFound, "Module")));
            }

            return new ExecutionResult<ModuleDetail>(module);
        }

        #endregion

        #region Save

        public async Task<ExecutionResult> Save(ModuleDetail model)
        {
            if (model.Id == 0)
            {
                bool isDuplicate = await _context.Modules.AnyAsync(m => m.Title == model.Title && m.UserId == _authService.UserId && m.DeletedAt.HasValue == false);
                if (isDuplicate)
                {
                    return new ExecutionResult(
                        new ErrorInfo(
                            string.Format(
                                MessageHelper.ResourceAlreadyExists,
                                "Module",
                                $"with \"{ model.Title }\" title")
                            )
                        );
                }

                Module module = new Module
                {
                    Title = model.Title,
                    Icon = model.Icon,
                    UserId = _authService.UserId,
                    CreatedAt = DateTime.UtcNow,
                    IsActive = true
                };

                _context.Modules.Add(module);
            }
            else
            {
                bool isDuplicate = await _context.Modules.AnyAsync(m => m.Title == model.Title && m.Id != model.Id && m.UserId == _authService.UserId && m.DeletedAt.HasValue == false);
                if (isDuplicate)
                {
                    return new ExecutionResult(
                        new ErrorInfo(
                            string.Format(
                                MessageHelper.ResourceAlreadyExists,
                                "Module",
                                $"with \"{ model.Title }\" title")
                            )
                        );
                }

                Module module = await _context.Modules.FirstOrDefaultAsync(m => m.Id == model.Id && m.UserId == _authService.UserId && m.DeletedAt.HasValue == false);

                if (module == null)
                {
                    return new ExecutionResult(new ErrorInfo(string.Format(MessageHelper.NotFound, "Module")));
                }

                module.Title = model.Title;
                module.Icon = model.Icon;
                module.IsActive = model.IsActive;
                module.UpdatedAt = DateTime.UtcNow;
            }

            await _context.SaveChangesAsync();

            return new ExecutionResult(
                new InfoMessage(
                    string.Format(
                        MessageHelper.SuccessMessage,
                        "Module",
                        model.Id == 0 ? "created" : "detail updated")
                    )
                );
        }

        #endregion

        #region Delete

        public async Task<ExecutionResult> Delete(int id)
        {
            Module module = await _context.Modules.FirstOrDefaultAsync(m => m.Id == id && m.DeletedAt.HasValue == false);

            if (module == null)
            {
                return new ExecutionResult(new ErrorInfo(string.Format(MessageHelper.NotFound, "Module")));
            }

            module.DeletedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return new ExecutionResult(new InfoMessage(string.Format(MessageHelper.SuccessMessage, "Module", "deleted")));
        }

        #endregion
    }
}
