using CourseHttpApp.Models;
using CourseHttpApp.Models.Common;
using CourseHttpApp.Models.Json;
using CourseHttpApp.Models.Tables;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CourseHttpApp.Controllers.Training;

[ApiController]
[Route("api/[controller]")]
public class UpdateTaskTrainingController : ControllerBase
{
    private readonly ILogger _logger;

    public UpdateTaskTrainingController(ILogger<UpdateTaskTrainingController> logger)
    {
        _logger = logger;
    }

    [HttpPost]
    [Authorize]
    public IResult Post(TrainingTask task)
    {
        var token = HttpContext.Request.Headers.Authorization.ToString().Split(" ")[1];
        var login = Token.GetLogin(token);
        using (var db = new ApplicationContext())
        {
            var user = db.users.FirstOrDefault(x => x.Login == login);
            if (user == null)
                Results.NotFound();

            var trainingTask =
                db.training_tasks_users.FirstOrDefault(x => x.User_id == user.Id && x.Task_id == task.Task_id);
            if (trainingTask == null)
                db.training_tasks_users.Add(new Training_tasks_users
                {
                    Id = 0,
                    User_id = user.Id,
                    Task_id = task.Task_id,
                    Is_done = task.Is_done
                });
            else
                trainingTask.Is_done = task.Is_done;
            db.SaveChanges();
        }

        return Results.Ok();
    }
}