namespace CourseHttpApp.Models.Tables;

public class Theory
{
    public int Id { get; set; }
    public int Theme_id { get; set; }
    public string Description { get; set; }
    public string? Image_url { get; set; }
}