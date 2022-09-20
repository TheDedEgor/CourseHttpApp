using Microsoft.EntityFrameworkCore;

namespace CourseHttpApp.Models;

public class ApplicationContext : DbContext
{
    public DbSet<User> Users { get; set; }
    
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        var config = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build();
        var connectionString = config.GetConnectionString("SyncDb");
        optionsBuilder.UseMySQL(connectionString);
    }
}