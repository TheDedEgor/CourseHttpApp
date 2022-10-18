using CourseHttpApp.Models;
using CourseHttpApp.Models.Common;
using CourseHttpApp.Models.Tables;
using Microsoft.AspNetCore.Mvc;

namespace CourseHttpApp.Controllers;

[ApiController]
[Route("api/[controller]")]
public class RegController : ControllerBase
{
    private readonly ILogger _logger;

    public RegController(ILogger<RegController> logger)
    {
        _logger = logger;
    }

    [HttpPost]
    public IResult Post()
    {
        var form = HttpContext.Request.Form;
        var login = form["login"];
        var password = form["password"];
        var first_name = form["first_name"];
        var last_name = form["last_name"];
        var hash = Crypt.GetHashPassword(password);
        using (var db = new ApplicationContext())
        {
            var user = db.users.FirstOrDefault(item => item.Login == login);
            if (user != null)
                return Results.Conflict();
            
            db.users.Add(new User
            {
                Id = 0,
                Login = login,
                Password = hash
            });
            db.SaveChanges();
            user = db.users.FirstOrDefault(item => item.Login == login);
            db.users_info.Add(new User_info
            {
                Id = 0,
                User_id = user.Id,
                First_name = first_name,
                Last_name = last_name
            });
            db.SaveChanges();
        }
        var token = Token.CreateToken(login);
        
        return Results.Json(new
        {
            access_token = token
        });
        
    }
}