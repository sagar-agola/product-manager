using LinqKit;
using Microsoft.EntityFrameworkCore;
using PM.Business.Core.DataTransferModels.Kendo;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace PM.Business.Helpers
{
    public class GridDataTableHelpers
    {
        public async Task<KendoResponseModel<T>> FilterByDataTableRequest<T>(IQueryable<T> baseData, GetKendoDataRequestModel request) where T : class
        {
            if (request.Columns == null || request.Columns.Count == 0)
            {
                return new KendoResponseModel<T>
                {
                    Data = new List<T>(),
                    Total = 0
                };
            }

            #region General Search

            ExpressionStarter<T> searchPredicate = PredicateBuilder.New<T>(true);
            if (!string.IsNullOrWhiteSpace(request.SearchTerm))
            {
                foreach (KendoColumn column in request.Columns)
                {
                    if (column.Searchable)
                    {
                        Expression<Func<T, bool>> lambda = LinqHelpers.DataGridWhereField<T>(column, request.SearchTerm, 1, 2);
                        searchPredicate.Or(lambda);
                    }
                }
            }

            #endregion

            #region Column Search

            ExpressionStarter<T> columnPredicate = PredicateBuilder.New<T>(true);
            foreach (KendoColumn column in request.Columns)
            {
                if (column.Searchable && column.Search != null && column.Search.ToString().IsEmptyString() == false)
                {
                    Expression<Func<T, bool>> lambda = LinqHelpers.DataGridWhereField<T>(column, column.Search.ToString(), 1, 1);
                    columnPredicate.And(lambda);
                }
            }

            #endregion

            ExpressionStarter<T> finalPredicate = PredicateBuilder.New<T>(true);
            finalPredicate.And(searchPredicate);
            finalPredicate.And(columnPredicate);

            baseData = baseData.Where(finalPredicate);

            string sortField = request.Sort != null && request.Sort.Count > 0 ? request.Sort[0].Field.ToPascaleCase() : "Id";
            bool isAsc = request.Sort != null && request.Sort.Count > 0 && (request.Sort[0].Dir == "asc" || string.IsNullOrEmpty(request.Sort[0].Dir));

            return new KendoResponseModel<T>
            {
                Data = await baseData
                    .AsNoTracking()
                    .OrderBy(sortField, isAsc)
                    .Skip(request.Skip)
                    .Take(request.PageSize)
                    .ToListAsync(),
                Total = await baseData.CountAsync()
            };
        }
    }
}
