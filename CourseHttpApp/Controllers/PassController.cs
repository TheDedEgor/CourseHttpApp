using CourseHttpApp.Models;
using CourseHttpApp.Models.Common;
using Microsoft.AspNetCore.Mvc;

namespace CourseHttpApp.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PassController : ControllerBase
{
    private readonly ILogger _logger;

    public PassController(ILogger<PassController> logger)
    {
        _logger = logger;
    }

    [HttpPost]
    public IResult Post()
    {
        var form = HttpContext.Request.Form;
        var login = form["login"];
        var url = "";
        using (var db = new ApplicationContext())
        {
            var user = db.users.FirstOrDefault(item => item.Login == login);
            if (user == null)
                return Results.NotFound("Email not found");
            var change_key = Crypt.GetChangeKey(login);
            url = $"https://localhost:44414/newPass?key={change_key}";
            user.Change_key = change_key;
            db.SaveChanges();
        }
        
        Email.SendEmail(login, url);

        return Results.Ok();
    }
}