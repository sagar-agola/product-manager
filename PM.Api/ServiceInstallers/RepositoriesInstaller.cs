using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using PM.Api.ServiceInstallers.Base;
using PM.Business.Contracts;
using PM.Business.Repositories;

namespace PM.Api.ServiceInstallers
{
    /// <summary>
    /// Installs domain repositories an their contracts into Dependency Container
    /// </summary>
    public class RepositoriesInstaller : IServiceInstaller
    {
        public void InstallServices(IServiceCollection services, IConfiguration configuration)
        {
            services.AddScoped<IProductRepository, ProductRepository>();
            services.AddScoped<ICategoryRepository, CategoryRepository>();
            services.AddScoped<IUserRepository, UserRepository>();
        }
    }
}
