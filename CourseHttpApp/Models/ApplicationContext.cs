using CourseHttpApp.Models.Tables;
using Microsoft.EntityFrameworkCore;

namespace CourseHttpApp.Models;

public class ApplicationContext : DbContext
{
    public DbSet<User> users { get; set; }
    public DbSet<User_info> users_info { get; set; }
    public DbSet<Theory> theory { get; set; }
    public DbSet<Theme> themes { get; set; }
    public DbSet<Practice> practice { get; set; }
    public DbSet<Response_option> response_options { get; set; }
    public DbSet<Training> training { get; set; }
    public DbSet<Course_tasks_users> course_tasks_users { get; set; }
    public DbSet<Training_tasks_users> training_tasks_users { get; set; }
    
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        var config = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build();
        var connectionString = config.GetConnectionString("SyncDb");
        optionsBuilder.UseMySQL(connectionString);
    }
}