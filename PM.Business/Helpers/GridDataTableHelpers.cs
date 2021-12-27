using LinqKit;
using Microsoft.EntityFrameworkCore;
using PM.Business.Core.DataTransferModels.Kendo;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace PM.Business.Helpers
{
    public class GridDataTableHelpers
    {
        public async Task<KendoResponseModel<T>> FilterByDataTableRequest<T>(IQueryable<T> baseData, GetKendoDataRequestModel request) where T: class
        {
            if (request.Columns == null || request.Columns.Count == 0)
            {
                return new KendoResponseModel<T>
                {
                    Data = new List<T>(),
                    Total = 0
                };
            }

            ExpressionStarter<T> predicate = PredicateBuilder.New<T>(true);

            foreach (KendoColumn column in request.Columns)
            {
                if (column.Searchable && column.Search != null && column.Search.ToString().IsEmptyString() == false)
                {
                    Expression<Func<T, bool>> lambda = LinqHelpers.DataGridWhereField<T>(column.PropertyName, column.Search.ToString());
                    predicate.And(lambda);
                }
            }

            baseData = baseData.Where(predicate);

            string sortField = request.Sort != null && request.Sort.Count > 0 ? request.Sort[0].Field.ToPascaleCase() : "Id";
            bool isAsc = request.Sort != null && request.Sort.Count > 0 && request.Sort[0].Dir == "asc";

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
