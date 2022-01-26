using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using PM.Database.DataContext;

namespace PM.Api
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var host = BuildWebHost(args);

            using IServiceScope scope = host.Services.GetService<IServiceScopeFactory>().CreateScope();
            using ProductManagerDbContext dbContext = scope.ServiceProvider.GetRequiredService<ProductManagerDbContext>();
            try
            {
                dbContext.Database.Migrate();
            }
            catch
            { }

            host.Run();
        }

        public static IWebHost BuildWebHost(string[] args)
        {
            return WebHost.CreateDefaultBuilder(args)
                .UseUrls("http://*:80")
                .UseStartup<Startup>()
                .Build();
        }
    }
}
