﻿using CourseHttpApp.Models;
using CourseHttpApp.Models.Common;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CourseHttpApp.Controllers.PasswordRecovery;

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
    public async Task<IResult> Post()
    {
        var form = HttpContext.Request.Form;
        var login = form["login"];
        var url = "";
        await using (var db = new ApplicationContext())
        {
            var user = await db.users.FirstOrDefaultAsync(item => item.Login == login);
            if (user == null)
                return Results.NotFound("Email not found");
            if (user.Send_time_key != null && user.Send_time_key.Value.Ticks - DateTime.Now.Ticks > 0)
                return Results.Conflict("Not the time");
            var change_key = Crypt.GetChangeKey(login);
            var config = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build();
            var urlNewPass = config.GetValue<string>("UrlNewPass");
            url = $"{urlNewPass}?key={change_key}";
            user.Change_key = change_key;
            user.Send_time_key = DateTime.Now.AddMinutes(10);
            await db.SaveChangesAsync();
        }

        Email.SendEmail(login, url);

        return Results.Ok();
    }
}