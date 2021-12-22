using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using PM.Api.ServiceInstallers.Base;
using PM.Business.Helpers;
using PM.Business.Helpers.Contracts;

namespace PM.Api.ServiceInstallers
{
    public class UtilsInstaller : IServiceInstaller
    {
        public void InstallServices(IServiceCollection services, IConfiguration configuration)
        {
            services.AddScoped<PasswordManager>();
            services.AddScoped<TokenManager>();

            services.AddScoped<IAuthService, AuthService>();
        }
    }
}
