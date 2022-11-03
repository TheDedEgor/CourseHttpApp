using CourseHttpApp.Models;
using CourseHttpApp.Models.Common;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

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
    public IResult Get()
    {
        var token = HttpContext.Request.Headers.Authorization.ToString().Split(" ")[1];
        var login = Token.GetLogin(token);
        var result = new List<object>();
        using (var db = new ApplicationContext())
        {
            var user = db.users.FirstOrDefault(x => x.Login == login);
            if (user == null)
                return Results.NotFound();
            var user_id = user.Id;
            foreach (var item in db.training.ToList())
            {
                var task = db.training_tasks_users.FirstOrDefault(x => x.User_id == user_id && x.Task_id == item.Id);
                result.Add(new
                {
                    id=item.Id,
                    description=item.Description,
                    is_done = task != null ? task.Is_done : false
                });
            }
        }

        return Results.Json(result);
    }
}