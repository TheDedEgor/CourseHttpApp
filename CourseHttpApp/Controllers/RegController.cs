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
        var hash = Crypt.GetHashPassword(password);
        using (var db = new ApplicationContext())
        {
            var user = db.users.FirstOrDefault(item => item.Login == login);
            if (user != null)
                return Results.Conflict();
            
            db.users.Add(new User()
            {
                Id = 0,
                Login = login,
                Password = hash
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