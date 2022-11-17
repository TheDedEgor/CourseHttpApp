using CourseHttpApp.Models;
using CourseHttpApp.Models.Common;
using CourseHttpApp.Models.Json;
using CourseHttpApp.Models.Tables;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CourseHttpApp.Controllers.Course;

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
    public async Task<IResult> Get()
    {
        await using (var db = new ApplicationContext())
        {
            var themes = new List<object>();
            var token = HttpContext.Request.Headers.Authorization.ToString().Split(' ')[1];
            var login = Token.GetLogin(token);
            var user = await db.users.FirstAsync(x => x.Login == login);
            var user_info = await db.users_info.FirstAsync(x => x.User_id == user.Id);
            foreach (var theme in await db.themes.ToListAsync())
            {
                var allTasks = await db.practice.CountAsync(x => x.Theme_id == theme.Id);
                var correctTasks =
                    await db.course_tasks_users.CountAsync(x =>
                        x.Theme_id == theme.Id && x.User_id == user.Id && x.Is_done);
                var result = (int)Math.Round((double)correctTasks / allTasks * 100);
                themes.Add(new
                {
                    id = theme.Id,
                    title = theme.Title,
                    correct_tasks = result
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

    [HttpPost]
    [Authorize]
    public async Task<IResult> Post(CourseTask task)
    {
        var token = HttpContext.Request.Headers.Authorization.ToString().Split(" ")[1];
        var login = Token.GetLogin(token);
        await using (var db = new ApplicationContext())
        {
            var user = await db.users.FirstOrDefaultAsync(x => x.Login == login);
            if (user == null)
                Results.NotFound();

            foreach (var item in task.Course_tasks)
            {
                var courseTask = await db.course_tasks_users.FirstOrDefaultAsync(x =>
                    x.User_id == user.Id && x.Task_id == item.Task_id);
                if (courseTask == null)
                    await db.course_tasks_users.AddAsync(new Course_tasks_users
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

            await db.SaveChangesAsync();
        }

        return Results.Ok();
    }
}