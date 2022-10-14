using CourseHttpApp.Models.Tables;
using Microsoft.EntityFrameworkCore;

namespace CourseHttpApp.Models;

public class ApplicationContext : DbContext
{
    public DbSet<User> Users { get; set; }
    public DbSet<User_info> Users_info { get; set; }
    public DbSet<Theory> Theory { get; set; }
    public DbSet<Theme> Themes { get; set; }
    public DbSet<Practice> Practice { get; set; }
    public DbSet<Response_option> Response_options { get; set; }
    
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        var config = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build();
        var connectionString = config.GetConnectionString("SyncDb");
        optionsBuilder.UseMySQL(connectionString);
    }
}