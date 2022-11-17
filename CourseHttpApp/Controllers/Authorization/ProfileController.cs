using CourseHttpApp.Models;
using CourseHttpApp.Models.Common;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CourseHttpApp.Controllers.Authorization;

[ApiController]
[Route("api/[controller]")]
public class ProfileController : ControllerBase
{
    private readonly ILogger _logger;

    public ProfileController(ILogger<ProfileController> logger)
    {
        _logger = logger;
    }

    [HttpGet]
    [Authorize]
    public async Task<IResult> Get()
    {
        var token = HttpContext.Request.Headers.Authorization.ToString().Split(" ")[1];
        var login = Token.GetLogin(token);
        await using (var db = new ApplicationContext())
        {
            var user = await db.users.FirstOrDefaultAsync(x => x.Login == login);
            if (user == null)
                return Results.NotFound();
            var user_info = await db.users_info.FirstAsync(x => x.User_id == user.Id);
            return Results.Json(new
            {
                email = login,
                first_name = user_info.First_name,
                last_name = user_info.Last_name
            });
        }
    }
}