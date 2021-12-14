using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;

namespace PM.Business.Helpers
{
    public static class LinqHelpers
    {
        /// <summary>
        /// Custom method to generate OrderBy clouse for <see cref="IQueryable{T}"/>
        /// Source
        ///     https://stackoverflow.com/a/31959568
        /// </summary>
        public static IOrderedQueryable<TSource> OrderBy<TSource>(this IQueryable<TSource> query, string propertyName, bool isAsc)
        {
            Type entityType = typeof(TSource);

            PropertyInfo propertyInfo = entityType.GetProperty(propertyName);
            ParameterExpression arg = Expression.Parameter(entityType, "x");
            MemberExpression property = Expression.Property(arg, propertyName);
            LambdaExpression selector = Expression.Lambda(property, new ParameterExpression[] { arg });

            string methodName = isAsc ? "OrderBy" : "OrderByDescending";

            Type enumarableType = typeof(Queryable);
            MethodInfo method = enumarableType.GetMethods()
                .Where(m => m.Name == methodName && m.IsGenericMethodDefinition)
                .Where(m =>
                {
                    List<ParameterInfo> parameters = m.GetParameters().ToList();
                    return parameters.Count == 2;
                }).Single();

            MethodInfo genericMethod = method.MakeGenericMethod(entityType, propertyInfo.PropertyType);

            IOrderedQueryable<TSource> orderedQuery = (IOrderedQueryable<TSource>)genericMethod.Invoke(genericMethod, new object[] { query, selector });

            return orderedQuery;
        }
    }
}
