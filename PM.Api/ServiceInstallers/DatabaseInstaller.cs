using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using PM.Api.ServiceInstallers.Base;
using PM.Database.DataContext;

namespace PM.Api.ServiceInstallers
{
    /// <summary>
    /// Installs <see cref="ProductManagerDbContext"/> into Dependency Container
    /// </summary>
    public class DatabaseInstaller : IServiceInstaller
    {
        public void InstallServices(IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<ProductManagerDbContext>(options =>
            {
                options.UseSqlServer(configuration.GetConnectionString("DefaultConnection")).EnableSensitiveDataLogging();
            });
        }
    }
}
