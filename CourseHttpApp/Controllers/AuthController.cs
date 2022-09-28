using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using CourseHttpApp.Models;
using CourseHttpApp.Models.Common;
using Microsoft.AspNetCore.Mvc;

namespace CourseHttpApp.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly ILogger _logger;

    public AuthController(ILogger<AuthController> logger)
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
        using var db = new ApplicationContext();
        var user = db.Users.FirstOrDefault(item => item.login == login && item.password == hash);
        if (user == null)
            return Results.NotFound("User not found");
            
        var token = Token.CreateToken(login);
        
        return Results.Json(new
        {
            access_token = token
        });
    }
}