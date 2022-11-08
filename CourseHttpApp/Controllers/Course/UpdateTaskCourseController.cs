using CourseHttpApp.Models;
using CourseHttpApp.Models.Common;
using CourseHttpApp.Models.Json;
using CourseHttpApp.Models.Tables;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CourseHttpApp.Controllers.Course;

[ApiController]
[Route("api/[controller]")]
public class UpdateTaskCourseController : ControllerBase
{
    private readonly ILogger _logger;

    public UpdateTaskCourseController(ILogger<UpdateTaskCourseController> logger)
    {
        _logger = logger;
    }

    [HttpPost]
    [Authorize]
    public IResult Post(CourseTask task)
    {
        var token = HttpContext.Request.Headers.Authorization.ToString().Split(" ")[1];
        var login = Token.GetLogin(token);
        using (var db = new ApplicationContext())
        {
            var user = db.users.FirstOrDefault(x => x.Login == login);
            if (user == null)
                Results.NotFound();

            foreach (var item in task.Course_tasks)
            {
                var courseTask =
                    db.course_tasks_users.FirstOrDefault(x => x.User_id == user.Id && x.Task_id == item.Task_id);
                if (courseTask == null)
                    db.course_tasks_users.Add(new Course_tasks_users
                    {
                        Id = 0,
                        User_id = user.Id,
                        Theme_id = task.Theme_id,
                        Task_id = item.Task_id,
                        Is_done = item.Is_done
                    });
                else
                    courseTask.Is_done = item.Is_done;
            }

            db.SaveChanges();
        }
        return Results.Ok();
    }
}