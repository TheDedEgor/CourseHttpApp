using CourseHttpApp.Models;
using CourseHttpApp.Models.Common;
using CourseHttpApp.Models.Json;
using CourseHttpApp.Models.Tables;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CourseHttpApp.Controllers.Training;

[ApiController]
[Route("api/[controller]")]
public class TrainingController : ControllerBase
{
    private readonly ILogger _logger;

    public TrainingController(ILogger<TrainingController> logger)
    {
        _logger = logger;
    }

    [HttpGet]
    [Authorize]
    public async Task<IResult> Get()
    {
        var token = HttpContext.Request.Headers.Authorization.ToString().Split(" ")[1];
        var login = Token.GetLogin(token);
        var result = new List<object>();
        await using (var db = new ApplicationContext())
        {
            var user = await db.users.FirstOrDefaultAsync(x => x.Login == login);
            if (user == null)
                return Results.NotFound();
            var user_id = user.Id;
            foreach (var item in await db.training.ToListAsync())
            {
                var task = await db.training_tasks_users.FirstOrDefaultAsync(x =>
                    x.User_id == user_id && x.Task_id == item.Id);
                result.Add(new
                {
                    id = item.Id,
                    title = item.Title,
                    description = item.Description,
                    correct_hash = item.Correct_hash,
                    is_done = task == null ? 2 : task.Is_done == true ? 1 : 0
                });
            }
        }

        return Results.Json(result);
    }

    [HttpPost]
    [Authorize]
    public async Task<IResult> Post(TrainingTask task)
    {
        var token = HttpContext.Request.Headers.Authorization.ToString().Split(" ")[1];
        var login = Token.GetLogin(token);
        await using (var db = new ApplicationContext())
        {
            var user = await db.users.FirstOrDefaultAsync(x => x.Login == login);
            if (user == null)
                Results.NotFound();

            var trainingTask =
                await db.training_tasks_users.FirstOrDefaultAsync(
                    x => x.User_id == user.Id && x.Task_id == task.Task_id);
            if (trainingTask == null)
                await db.training_tasks_users.AddAsync(new Training_tasks_users
                {
                    Id = 0,
                    User_id = user.Id,
                    Task_id = task.Task_id,
                    Is_done = task.Is_done
                });
            else
                trainingTask.Is_done = task.Is_done;
            await db.SaveChangesAsync();
        }

        return Results.Ok();
    }
}