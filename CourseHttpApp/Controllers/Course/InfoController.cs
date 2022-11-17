using CourseHttpApp.Models;
using CourseHttpApp.Models.Common;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CourseHttpApp.Controllers.Course;

[ApiController]
[Route("api/[controller]")]
public class InfoController : ControllerBase
{
    private readonly ILogger _logger;

    public InfoController(ILogger<InfoController> logger)
    {
        _logger = logger;
    }

    [HttpGet]
    [Authorize]
    public async Task<IResult> Get()
    {
        var theme_id = int.Parse(HttpContext.Request.Query["theme_id"]);
        var type_id = int.Parse(HttpContext.Request.Query["type_id"]);
        var token = HttpContext.Request.Headers.Authorization.ToString().Split(" ")[1];
        var login = Token.GetLogin(token);
        await using (var db = new ApplicationContext())
        {
            var result = new List<object>();
            var user = await db.users.FirstOrDefaultAsync(x => x.Login == login);
            if (user == null)
                return Results.NotFound();
            var user_id = user.Id;
            var user_info = await db.users_info.FirstAsync(x => x.User_id == user_id);
            user_info.Progress_theme_id = theme_id;
            user_info.Progress_type_id = type_id;
            if (type_id == 1)
            {
                foreach (var item in await db.theory.Where(x => x.Theme_id == theme_id).ToListAsync())
                {
                    result.Add(new
                    {
                        id = item.Id,
                        description = item.Description,
                        image_url = item.Image_url
                    });
                }
            }
            else
            {
                foreach (var item in await db.practice.Where(x => x.Theme_id == theme_id).ToListAsync())
                {
                    var response_options = new List<object>();
                    foreach (var response in db.response_options.Where(x =>
                                 x.Theme_id == theme_id && x.Practice_id == item.Id))
                    {
                        response_options.Add(new
                        {
                            id = response.Id,
                            title = response.Title
                        });
                    }

                    var task = await db.course_tasks_users.FirstOrDefaultAsync(x =>
                        x.User_id == user_id && x.Task_id == item.Id);

                    result.Add(new
                    {
                        id = item.Id,
                        description = item.Description,
                        response_options = response_options,
                        correct_id = item.Correct_id,
                        image_url = item.Image_url,
                        is_done = task == null ? 2 : task.Is_done == true ? 1 : 0
                    });
                }
            }

            await db.SaveChangesAsync();

            return Results.Json(result);
        }
    }
}