using CourseHttpApp.Models;
using CourseHttpApp.Models.Common;
using Microsoft.AspNetCore.Mvc;

namespace CourseHttpApp.Controllers.PasswordRecovery;

[ApiController]
[Route("api/[controller]")]
public class RecController : ControllerBase
{
    private readonly ILogger _logger;

    public RecController(ILogger<RecController> logger)
    {
        _logger = logger;
    }

    [HttpPost]
    public IResult Post()
    {
        var form = HttpContext.Request.Form;
        var key = form["key"];
        var new_password = form["new_password"];
        using (var db = new ApplicationContext())
        {
            var user = db.users.FirstOrDefault(item => item.Change_key == key);
            if (user == null)
                return Results.NotFound("Key not found or invalid key");
            var hash = Crypt.GetHashPassword(new_password);
            user.Change_key = null;
            user.Password = hash;
            db.SaveChanges();
        }
        
        return Results.Ok();
    }
}