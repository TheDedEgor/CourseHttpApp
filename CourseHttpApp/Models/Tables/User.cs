namespace CourseHttpApp.Models.Tables;

public class User
{
    public int Id { get; set; }
    public string Login { get; set; }
    public string Password { get; set; }
    public string? Change_key { get; set; }
    public DateTime? Send_time_key { get; set; }
   
}