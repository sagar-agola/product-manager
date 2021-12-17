using Microsoft.EntityFrameworkCore;
using PM.Business.Contracts;
using PM.Business.Core.Consts;
using PM.Business.Core.DataTransferModels;
using PM.Business.Core.DataTransferModels.Category;
using PM.Database.DataContext;
using PM.Database.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PM.Business.Repositories
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly ProductManagerDbContext _context;

        public CategoryRepository(ProductManagerDbContext context)
        {
            _context = context;
        }

        #region Get All

        public async Task<ExecutionResult<List<CategoryDetail>>> GetAll()
        {
            List<CategoryDetail> categories = await _context.Categories
                .Where(c => c.DeletedAt.HasValue == false)
                .Select(c => new CategoryDetail
                {
                    Id = c.Id,
                    Title = c.Title,
                    CreatedAt = c.CreatedAt
                }).ToListAsync();

            return new ExecutionResult<List<CategoryDetail>>(categories);
        }

        #endregion

        #region Save

        public async Task<ExecutionResult> Save(CategoryDetail model)
        {
            if (model.Id == 0)
            {
                bool isDuplicate = await _context.Categories.AnyAsync(c => c.Title == model.Title && c.DeletedAt.HasValue == false);
                if (isDuplicate)
                {
                    return new ExecutionResult(
                        new ErrorInfo(
                            string.Format(
                                MessageHelper.ResourceAlreadyExists,
                                "Category",
                                $"with \"{ model.Title }\" title")
                            )
                        );
                }

                Category category = new Category
                {
                    Title = model.Title,
                    IsActive = true,
                    CreatedAt = DateTime.UtcNow
                };

                _context.Categories.Add(category);
            }
            else
            {
                bool isDuplicate = await _context.Categories.AnyAsync(c => c.Id != model.Id && c.Title == model.Title && c.DeletedAt.HasValue == false);
                if (isDuplicate)
                {
                    return new ExecutionResult(
                        new ErrorInfo(
                            string.Format(
                                MessageHelper.ResourceAlreadyExists,
                                "Category",
                                $"with \"{ model.Title }\" title")
                            )
                        );
                }

                Category category = await _context.Categories.FirstOrDefaultAsync(c => c.Id == model.Id && c.DeletedAt.HasValue == false);

                if (category == null)
                {
                    return new ExecutionResult(new ErrorInfo(string.Format(MessageHelper.NotFound, "Category")));
                }

                category.Title = model.Title;
                category.UpdatedAt = DateTime.UtcNow;
            }

            await _context.SaveChangesAsync();

            return new ExecutionResult(
                new InfoMessage(
                    string.Format(
                        MessageHelper.SuccessMessage,
                        "Category",
                        model.Id == 0 ? "created" : "title updated")
                    )
                );
        }

        #endregion

        #region Delete

        public async Task<ExecutionResult> Delete(int id)
        {
            Category category = await _context.Categories.FirstOrDefaultAsync(c => c.Id == id && c.DeletedAt.HasValue == false);

            if (category == null)
            {
                return new ExecutionResult(new ErrorInfo(string.Format(MessageHelper.NotFound, "Category")));
            }

            category.DeletedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return new ExecutionResult(new InfoMessage(string.Format(MessageHelper.SuccessMessage, "Category", "deleted")));
        }

        #endregion
    }
}
