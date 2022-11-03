using CourseHttpApp.Models;
using CourseHttpApp.Models.Common;
using CourseHttpApp.Models.Json;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CourseHttpApp.Controllers.Course;

[ApiController]
[Route("api/[controller]")]
public class UpdateProgressController : ControllerBase
{
    private readonly ILogger _logger;

    public UpdateProgressController(ILogger<UpdateProgressController> logger)
    {
        _logger = logger;
    }

    [HttpPost]
    [Authorize]
    public IResult Post(ProgressCourse progressCourse)
    {
        var token = HttpContext.Request.Headers.Authorization.ToString().Split(" ")[1];
        var login = Token.GetLogin(token);
        using (var db = new ApplicationContext())
        {
            var user = db.users.FirstOrDefault(x => x.Login == login);
            if (user == null)
                return Results.NotFound();
            var user_info = db.users_info.First(x => x.User_id == user.Id);
            user_info.Progress_theme_id = progressCourse.Progress_theme_id;
            user_info.Progress_type_id = progressCourse.Progress_type_id;
            user_info.Progress_task_id = progressCourse.Progress_task_id;
            db.SaveChanges();
        }
        return Results.Ok();
    }
}