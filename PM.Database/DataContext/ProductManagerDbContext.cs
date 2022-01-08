using Microsoft.EntityFrameworkCore;
using PM.Database.Configurations;
using PM.Database.Models;

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
    }
}
