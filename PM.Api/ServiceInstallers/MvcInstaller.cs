using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using PM.Api.Filters;
using PM.Api.ServiceInstallers.Base;
using PM.Business.Core.AppSettings;
using PM.Business.Core.DataTransferModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace PM.Api.ServiceInstallers
{
    public class MvcInstaller : IServiceInstaller
    {
        public void InstallServices(IServiceCollection services, IConfiguration configuration)
        {
            services.AddTransient<IHttpContextAccessor, HttpContextAccessor>();
            services.Configure<AppSettings>(configuration.GetSection("AppSettings"));

            #region Swagger

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo
                {
                    Version = "v1",
                    Title = "Product Manager Api",
                    Description = "Web Api for Product Manager",
                });

                c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    Description =
                         "JWT Authorization header using the Bearer scheme. Example: \"Authorization: Bearer {token}\"",
                    Name = "Authorization",
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.ApiKey
                });

                c.AddSecurityRequirement(new OpenApiSecurityRequirement()
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                 Id = "Bearer"
                            },
                            Scheme = "oauth2",
                            Name = "Bearer",
                            In = ParameterLocation.Header
                        },
                        new List<string>()
                    }
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

                options.AddPolicy("ProductionCorsPolicy", builder => builder
                    .WithOrigins("http://productmanager.com")
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials());
            });

            #endregion

            #region Security

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = configuration.GetSection("AppSettings:JwtIssuer").Value,
                    ValidAudience = configuration.GetSection("AppSettings:JwtAudience").Value,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration.GetSection("AppSettings:Token").Value)),
                    ClockSkew = TimeSpan.Zero
                };
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
