using CourseHttpApp.Models;
using CourseHttpApp.Models.Common;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CourseHttpApp.Controllers.Authorization;

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
    public async Task<IResult> Post()
    {
        var form = HttpContext.Request.Form;
        var login = form["login"];
        var password = form["password"];
        var hash = Crypt.GetHashPassword(password);
        await using var db = new ApplicationContext();
        var user = await db.users.FirstOrDefaultAsync(item => item.Login == login && item.Password == hash);
        if (user == null)
            return Results.NotFound("User not found");
            
        var token = Token.CreateToken(login);
        var user_info = db.users_info.First(x => x.User_id == user.Id);
        
        return Results.Json(new
        {
            access_token = token,
            user_name = user_info.First_name
        });
    }
}