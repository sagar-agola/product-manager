using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace PM.Api.ServiceInstallers.Base
{
    public interface IServiceInstaller
    {
        void InstallServices(IServiceCollection services, IConfiguration configuration);
    }
}
