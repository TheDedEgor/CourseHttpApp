using CourseHttpApp.Models;
using CourseHttpApp.Models.Common;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CourseHttpApp.Controllers.Course;

[ApiController]
[Route("api/[controller]")]
public class UpdateTaskController : ControllerBase
{
    private readonly ILogger _logger;

    public UpdateTaskController(ILogger<UpdateTaskController> logger)
    {
        _logger = logger;
    }

    [HttpPost]
    [Authorize]
    public IResult Post()
    {
        var token = HttpContext.Request.Headers.Authorization.ToString().Split(" ")[1];
        var login = Token.GetLogin(token);
        using (var db = new ApplicationContext())
        {
            
        }
        return Results.Ok();
    }
}