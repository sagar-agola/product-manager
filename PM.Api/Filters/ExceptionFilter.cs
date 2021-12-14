using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Filters;
using PM.Api.ServiceInstallers;
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
        public void OnException(ExceptionContext context)
        {
            Exception exception = context.Exception;

            // TODO - Log Exception

            HttpResponse response = context.HttpContext.Response;
            response.StatusCode = (int)HttpStatusCode.InternalServerError;
            response.Headers.Add("Exception", exception.Message);
            response.WriteAsync(exception.Message);
        }
    }
}
