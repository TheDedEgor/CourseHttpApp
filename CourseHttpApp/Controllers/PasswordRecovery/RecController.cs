using CourseHttpApp.Models;
using CourseHttpApp.Models.Common;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
    public async Task<IResult> Post()
    {
        var form = HttpContext.Request.Form;
        var key = form["key"];
        var new_password = form["new_password"];
        await using (var db = new ApplicationContext())
        {
            var user = await db.users.FirstOrDefaultAsync(item => item.Change_key == key);
            if (user == null)
                return Results.NotFound("Key not found or invalid key");
            var hash = Crypt.GetHashPassword(new_password);
            user.Change_key = null;
            user.Password = hash;
            await db.SaveChangesAsync();
        }

        return Results.Ok();
    }
}