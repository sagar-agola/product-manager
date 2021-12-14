using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;
using PM.Api.Filters;
using PM.Api.ServiceInstallers.Base;
using PM.Business.Core.DataTransferModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PM.Api.ServiceInstallers
{
    public class MvcInstaller : IServiceInstaller
    {
        public void InstallServices(IServiceCollection services, IConfiguration configuration)
        {
            services.AddTransient<IHttpContextAccessor, HttpContextAccessor>();

            #region Swagger

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo
                {
                    Version = "v1",
                    Title = "Product Manager Api",
                    Description = "Web Api for Product Manager",
                });
            });

            #endregion

            #region CORS

            services.AddCors(options =>
            {
                options.AddPolicy("DevelopmentCorsPolicy", builder => builder
                    .WithOrigins("http://localhost:4200")
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials());
            });

            #endregion

            services
                .AddControllers(options =>
                {
                    // add global exception filter
                    options.Filters.Add(typeof(ExceptionFilter));
                })
                .ConfigureApiBehaviorOptions(options =>
                {
                    options.InvalidModelStateResponseFactory = actionContext =>
                    {
                        ModelStateDictionary modelStateDictionry = actionContext.ModelState;
                        return new BadRequestObjectResult(FormatOutput(modelStateDictionry));
                    };
                });
        }

        /// <summary>
        /// Get errors list as <see cref="List{String}"/> from <see cref="ModelStateDictionary"/>
        /// </summary>
        private ExecutionResult FormatOutput(ModelStateDictionary modelStateDictionry)
        {
            ExecutionResult result = new ExecutionResult
            {
                Success = false
            };

            modelStateDictionry.Values.ToList().ForEach(modelState =>
            {
                foreach (ModelError error in modelState.Errors)
                {
                    result.Errors.Add(new ErrorInfo
                    {
                        ErrorMessage = error.ErrorMessage
                    });
                }
            });

            return result;
        }
    }
}
