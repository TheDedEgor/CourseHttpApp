﻿using CourseHttpApp.Models;
using CourseHttpApp.Models.Common;
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
        using (var db = new ApplicationContext())
        {
            var form = HttpContext.Request.Form;
            var login = form["login"];
            var password = form["password"];
            var hash = Crypt.GetHashPassword(password);
            var result = db.Users.FirstOrDefault(item => item.login == login && item.password == hash);
            if (result != null)
            {
                return Results.Conflict();
            }

            db.Users.Add(new User()
            {
                id = 0,
                login = login,
                password = hash
            });
            db.SaveChanges();
        }

        return Results.Created("fg", "g");
    }
}