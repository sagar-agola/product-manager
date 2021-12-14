using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;

namespace PM.Api.ServiceInstallers.Base
{
    public static class InstallerExtensions
    {
        public static void InstallServices(this IServiceCollection services, IConfiguration configuration)
        {
            // get list of all non absstract classes which implements IServiceInstaller interface
            List<IServiceInstaller> installers = typeof(Startup).Assembly.ExportedTypes
                .Where(x => typeof(IServiceInstaller).IsAssignableFrom(x) && !x.IsInterface && !x.IsAbstract)
                .Select(Activator.CreateInstance)
                .Cast<IServiceInstaller>()
                .ToList();

            // loop throught all installers and call install service method from them which in tern install services to IServiceCollection
            installers.ForEach(installer => installer.InstallServices(services, configuration));
        }
    }
}
