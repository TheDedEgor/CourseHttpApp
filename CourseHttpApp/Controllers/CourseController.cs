using CourseHttpApp.Models;
using CourseHttpApp.Models.Common;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CourseHttpApp.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CourseController : ControllerBase
{
    private readonly ILogger _logger;

    public CourseController(ILogger<CourseController> logger)
    {
        _logger = logger;
    }

    [HttpGet]
    [Authorize]
    public IResult Get()
    {
        using (var db = new ApplicationContext())
        {
            var themes = new List<object>();
            var token = HttpContext.Request.Headers.Authorization.ToString().Split(' ')[1];
            var login = Token.GetLogin(token);
            var user = db.users.First(x => x.Login == login);
            var user_info = db.users_info.First(x => x.User_id == user.Id);
            foreach (var theme in db.themes.ToList())
            {
                themes.Add(new
                {
                    id = theme.Id,
                    title = theme.Title
                });
            }

            return Results.Json(new
            {
                progress = new
                {
                    progress_theme_id = user_info.Progress_theme_id,
                    progress_type_id = user_info.Progress_type_id,
                    progress_task_id = user_info.Progress_task_id
                },
                themes = themes
            });
        }
    }
}