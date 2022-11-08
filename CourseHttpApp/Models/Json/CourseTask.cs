namespace CourseHttpApp.Models.Json;

public class CourseTask
{
    public int Theme_id { get; set; }
    public List<TrainingTask> Course_tasks { get; set; }
}