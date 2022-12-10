namespace CourseHttpApp.Models.Tables;

public class User_info
{
    public int Id { get; set; }
    public int User_id { get; set; }
    public string First_name { get; set; }
    public string? Last_name { get; set; }
    public int Progress_theme_id { get; set; } = 1;
    public int Progress_type_id { get; set; } = 1;
    public int Progress_task_id { get; set; } = 1;
}