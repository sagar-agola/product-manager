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

        public static Expression<Func<T, bool>> DataGridWhereField<T>(string field, string value)
        {
            ParameterExpression parameter = Expression.Parameter(typeof(T), "p");
            MemberExpression property = Expression.Property(parameter, field);
            Type fieldType = property.Type;
            Expression<Func<T, bool>> lambda;

            if (fieldType == typeof(string))
            {
                lambda = StringSearch<T>(property, parameter, value);
            }
            else if (fieldType == typeof(int))
            {
                lambda = IntSearch<T>(property, parameter, value);
            }
            else
            {
                // get false lambda
                lambda = GetStaticLambda<T>(parameter, 1, 2);
            }

            return lambda;
        }

        private static Expression<Func<T, bool>> StringSearch<T>(Expression property, ParameterExpression parameter, string value)
        {
            ConstantExpression argument = Expression.Constant(value.ToUpper(), typeof(string));
            Expression toUpperExpression = Expression.Call(property, "ToUpper", null, null);
            MethodInfo method = typeof(string).GetMethod("Contains", new[] { typeof(string) });
            MethodCallExpression whereClause = Expression.Call(toUpperExpression, method, argument);
            Expression<Func<T, bool>> lambda = Expression.Lambda<Func<T, bool>>(whereClause, parameter);

            return lambda;
        }

        private static Expression<Func<T, bool>> IntSearch<T>(Expression property, ParameterExpression parameter, string value)
        {
            bool isValidInt = int.TryParse(value, out int searchValue);

            if (isValidInt == false)
            {
                // get true lambda
                return GetStaticLambda<T>(parameter, 1, 1);
            }

            return Expression.Lambda<Func<T, bool>>(
                Expression.Equal(
                    property,
                    Expression.Constant(searchValue, typeof(int))
                ),
                parameter
            );
        }

        private static Expression<Func<T, bool>> GetStaticLambda<T>(ParameterExpression parameter, int value1, int value2)
        {
            return Expression.Lambda<Func<T, bool>>(
                Expression.Equal(
                    Expression.Constant(value1, typeof(int)),
                    Expression.Constant(value2, typeof(int))
                ),
                parameter
            );
        }
    }
}
