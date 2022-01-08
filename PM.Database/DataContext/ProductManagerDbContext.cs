using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using PM.Database.Configurations;
using PM.Database.Models;
using System.Threading.Tasks;

namespace PM.Database.DataContext
{
    public class ProductManagerDbContext : DbContext
    {
        public ProductManagerDbContext(DbContextOptions options) : base(options)
        { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new FormAnswerConfiguration());
        }

        public DbSet<Category> Categories { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<ExceptionLog> ExceptionLogs { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Module> Modules { get; set; }
        public DbSet<FormDesign> FormDesigns { get; set; }
        public DbSet<FormAnswer> FormAnswers { get; set; }
        public DbSet<Event> Events { get; set; }

        public async Task<int> NextValueForSequence(string sequence)
        {
            SqlParameter result = new SqlParameter("@result", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };

            await Database.ExecuteSqlRawAsync($"SELECT @result = (NEXT VALUE FOR [{ sequence }])", result);

            return (int)result.Value;
        }
    }
}
