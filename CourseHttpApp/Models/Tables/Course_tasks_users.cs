namespace CourseHttpApp.Models.Tables;

public class Course_tasks_users
{
    public int Id { get; set; }
    public int User_id { get; set; }
    public int Task_id { get; set; }
    public bool Is_done { get; set; }
}