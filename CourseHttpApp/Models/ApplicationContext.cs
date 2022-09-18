using Microsoft.EntityFrameworkCore;

namespace CourseHttpApp.Models;

public class ApplicationContext : DbContext
{
    private string _connectionString;
    
    public DbSet<User> Users { get; set; }

    public ApplicationContext(string connectionString)
    {
        _connectionString = connectionString;
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseMySQL(_connectionString);
    }
}