using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Filters;
using PM.Api.ServiceInstallers;
using PM.Database.DataContext;
using PM.Database.Models;
using System;
using System.Net;

namespace PM.Api.Filters
{
    /// <summary>
    /// global error handler returns generic error info with internal server error to user with error message
    /// Injected globally from <see cref="MvcInstaller"/>
    /// </summary>
    public class ExceptionFilter : IExceptionFilter
    {
        private readonly ProductManagerDbContext _context;

        public ExceptionFilter(ProductManagerDbContext context)
        {
            _context = context;
        }

        public void OnException(ExceptionContext context)
        {
            Exception exception = context.Exception;

            ExceptionLog log = new ExceptionLog
            {
                Message = exception.Message,
                StackTrace = exception.StackTrace,
                Source = exception.Source,
                CreatedAt = DateTime.UtcNow
            };

            _context.ExceptionLogs.Add(log);
            _context.SaveChanges();

            HttpResponse response = context.HttpContext.Response;
            response.StatusCode = (int)HttpStatusCode.InternalServerError;
            response.Headers.Add("Exception", exception.Message);
            response.WriteAsync(exception.Message);
        }
    }
}
