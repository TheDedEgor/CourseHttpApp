using CourseHttpApp.Models;
using CourseHttpApp.Models.Common;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CourseHttpApp.Controllers.Authorization;

[ApiController]
[Route("api/[controller]")]
public class ProfileController : ControllerBase
{
    private readonly ILogger _logger;

    public ProfileController(ILogger<ProfileController> logger)
    {
        _logger = logger;
    }

    [HttpGet]
    [Authorize]
    public async Task<IResult> Get()
    {
        var token = HttpContext.Request.Headers.Authorization.ToString().Split(" ")[1];
        var login = Token.GetLogin(token);
        await using (var db = new ApplicationContext())
        {
            var user = await db.users.FirstOrDefaultAsync(x => x.Login == login);
            if (user == null)
                return Results.NotFound();
            var user_info = await db.users_info.FirstAsync(x => x.User_id == user.Id);

            //Stats all practice course
            var allCourseTasks = await db.practice.CountAsync();
            var correctCourseTasks = await db.course_tasks_users.CountAsync(x => x.User_id == user.Id && x.Is_done);
            var resultCourse = (int)Math.Round((double)correctCourseTasks / allCourseTasks * 100);

            //Stats training
            var allTrainingTasks = await db.training.CountAsync();
            var correctTrainingTasks = await db.training_tasks_users.CountAsync(x => x.User_id == user.Id && x.Is_done);
            var resultTraining = (int)Math.Round((double)correctTrainingTasks / allTrainingTasks * 100);

            //Global stats
            var allTasks = allCourseTasks + allTrainingTasks;
            var allCorrectTasks = correctCourseTasks + correctTrainingTasks;
            var allResult = (int)Math.Round((double)allCorrectTasks / allTasks * 100);

            //Stats on every theme
            var statsThemes = new List<object>();

            foreach (var theme in await db.themes.ToListAsync())
            {
                var tasks = await db.practice.CountAsync(x => x.Theme_id == theme.Id);
                var correctTasks =
                    await db.course_tasks_users.CountAsync(x =>
                        x.Theme_id == theme.Id && x.User_id == user.Id && x.Is_done);
                var result = (int)Math.Round((double)correctTasks / tasks * 100);

                statsThemes.Add(new
                {
                    title = theme.Title,
                    total_count = tasks,
                    correct_count = correctTasks,
                    value = result
                });
            }

            return Results.Json(new
            {
                email = login,
                first_name = user_info.First_name,
                last_name = user_info.Last_name,
                stats = new
                {
                    global = new
                    {
                        total_count = allTasks,
                        correct_count = allCorrectTasks,
                        value = allResult
                    },
                    course = new
                    {
                        total_count = allCourseTasks,
                        correct_count = correctCourseTasks,
                        value = resultCourse
                    },
                    training = new
                    {
                        total_count = allTrainingTasks,
                        correct_count = correctTrainingTasks,
                        value = resultTraining
                    },
                    themes = statsThemes
                }
            });
        }
    }

    [HttpPost]
    [Authorize]
    public async Task<IResult> Post()
    {
        var token = HttpContext.Request.Headers.Authorization.ToString().Split(" ")[1];
        var login = Token.GetLogin(token);
        var form = HttpContext.Request.Form;
        var first_name = form["first_name"].ToString().Trim();
        var last_name = form["last_name"].ToString().Trim();
        await using (var db = new ApplicationContext())
        {
            var user = await db.users.FirstOrDefaultAsync(item => item.Login == login);
            if (user == null)
                return Results.NotFound();
            var user_info = await db.users_info.FirstAsync(x => x.User_id == user.Id);
            user_info.First_name = first_name;
            user_info.Last_name = last_name;

            await db.SaveChangesAsync();

            return Results.Ok();
        }
    }
}