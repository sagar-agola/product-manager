using PM.Business.Contracts;
using PM.Business.Core.DataTransferModels;
using PM.Business.Core.DataTransferModels.Product;
using PM.Database.DataContext;
using System.Linq;
using System.Threading.Tasks;
using PM.Business.Helpers;
using Microsoft.EntityFrameworkCore;
using PM.Database.Models;
using PM.Business.Core.Consts;
using System;

namespace PM.Business.Repositories
{
    public class ProductRepository : IProductRepository
    {
        private readonly ProductManagerDbContext _context;

        public ProductRepository(ProductManagerDbContext context)
        {
            _context = context;
        }

        #region Get All

        public async Task<ExecutionResult<PaginatedResponse<ProductDetail>>> GetAll(GetAllProductsRequestModel model)
        {
            IQueryable<ProductDetail> query = from category in _context.Categories
                                              from product in _context.Products.Where(p => p.CategoryId == category.Id)
                                              where
                                                   product.DeletedAt.HasValue == false &&
                                                   category.DeletedAt.HasValue == false &&
                                                   (string.IsNullOrEmpty(model.Title) || product.Title.Contains(model.Title))
                                              select new ProductDetail
                                              {
                                                  Id = product.Id,
                                                  Title = product.Title,
                                                  Slug = product.Slug,
                                                  SubTitle = product.SubTitle,
                                                  Description = product.Description,
                                                  RetailPrice = product.RetailPrice,
                                                  SalePrice = product.SalePrice,
                                                  ImageUrl = product.ImageUrl,
                                                  Quentity = product.Quentity,
                                                  IsActive = product.IsActive,
                                                  CreatedAt = product.CreatedAt,
                                                  Category = category.Title
                                              };

            PaginatedResponse<ProductDetail> response = new PaginatedResponse<ProductDetail>
            {
                PageNumber = model.PageNumber,
                PageSize = model.PageSize,
                Data = await query
                    .AsNoTracking()
                    .OrderBy(model.SortField, model.IsAsc)
                    .Skip((model.PageNumber - 1) * model.PageSize)
                    .Take(model.PageSize)
                    .ToListAsync(),
                TotalRecords = await query.CountAsync()
            };

            return new ExecutionResult<PaginatedResponse<ProductDetail>>(response);
        }

        #endregion

        #region Get

        public async Task<ExecutionResult<ProductDetail>> Get(int id)
        {
            ProductDetail productDetail = await (from category in _context.Categories
                                                 from product in _context.Products.Where(p => p.CategoryId == category.Id)
                                                 where
                                                       product.Id == id &&
                                                       product.DeletedAt.HasValue == false &&
                                                       category.DeletedAt.HasValue == false
                                                 select new ProductDetail
                                                 {
                                                     Id = product.Id,
                                                     Title = product.Title,
                                                     Slug = product.Slug,
                                                     SubTitle = product.SubTitle,
                                                     Description = product.Description,
                                                     RetailPrice = product.RetailPrice,
                                                     SalePrice = product.SalePrice,
                                                     ImageUrl = product.ImageUrl,
                                                     Quentity = product.Quentity,
                                                     IsActive = product.IsActive,
                                                     CreatedAt = product.CreatedAt,
                                                     Category = category.Title
                                                 }).FirstOrDefaultAsync();

            if (productDetail == null)
            {
                return new ExecutionResult<ProductDetail>(new ErrorInfo(string.Format(MessageHelper.NotFound, "Product")));
            }

            return new ExecutionResult<ProductDetail>(productDetail);
        }

        #endregion

        #region Save

        public async Task<ExecutionResult> Save(SaveProductRequestModel model)
        {
            if (model.Id == 0)
            {
                bool isDuplicate = await _context.Products.AnyAsync(p => p.Title == model.Title && p.DeletedAt.HasValue == false);
                if (isDuplicate)
                {
                    return new ExecutionResult(
                        new ErrorInfo(
                            string.Format(
                                MessageHelper.ResourceAlreadyExists,
                                "Product",
                                $"with \"{ model.Title }\" title")
                            )
                        );
                }

                Product product = new Product
                {
                    Title = model.Title,
                    Slug = model.Title.CreateSlug(),
                    SubTitle = model.SubTitle,
                    Description = model.Description,
                    ImageUrl = await FileHelpers.UploadImage(model.Image),
                    Quentity = model.Quentity,
                    RetailPrice = model.RetailPrice,
                    SalePrice = model.SalePrice,
                    CategoryId = model.CategoryId,
                    CreatedAt = DateTime.UtcNow,
                    IsActive = true
                };

                _context.Products.Add(product);
            }
            else
            {
                bool isDuplicate = await _context.Products.AnyAsync(p => p.Id != model.Id && p.Title == model.Title && p.DeletedAt.HasValue == false);
                if (isDuplicate)
                {
                    return new ExecutionResult(
                        new ErrorInfo(
                            string.Format(
                                MessageHelper.ResourceAlreadyExists,
                                "Product",
                                $"with \"{ model.Title }\" title")
                            )
                        );
                }

                Product product = await _context.Products.FirstOrDefaultAsync(p => p.Id == model.Id && p.DeletedAt.HasValue == false);

                if (product == null)
                {
                    return new ExecutionResult(new ErrorInfo(string.Format(MessageHelper.NotFound, "Product")));
                }

                product.Title = model.Title;
                product.Slug = model.Title.CreateSlug();
                product.SubTitle = model.SubTitle;
                product.Description = model.Description;
                product.Quentity = model.Quentity;
                product.RetailPrice = model.RetailPrice;
                product.SalePrice = model.SalePrice;
                product.CategoryId = model.CategoryId;
                product.UpdatedAt = DateTime.UtcNow;

                if (model.Image != null)
                {
                    FileHelpers.Delete(product.ImageUrl);

                    product.ImageUrl = await FileHelpers.UploadImage(model.Image);
                }
            }

            await _context.SaveChangesAsync();

            return new ExecutionResult(
                new InfoMessage(
                    string.Format(
                        MessageHelper.SuccessMessage,
                        "Product",
                        model.Id == 0 ? "created" : "detail updated")
                    )
                );
        }

        #endregion

        #region Delete

        public async Task<ExecutionResult> Delete(int id)
        {
            Product product = await _context.Products.FirstOrDefaultAsync(p => p.Id == id && p.DeletedAt.HasValue);

            if (product == null)
            {
                return new ExecutionResult(new ErrorInfo(string.Format(MessageHelper.NotFound, "Product")));
            }

            product.DeletedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return new ExecutionResult(new InfoMessage(string.Format(MessageHelper.SuccessMessage, "Product", "deleted")));
        }

        #endregion
    }
}
