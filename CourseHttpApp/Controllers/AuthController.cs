using System.Net;
using CourseHttpApp.Models;
using CourseHttpApp.Models.Common;
using Microsoft.AspNetCore.Mvc;

namespace CourseHttpApp.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IConfiguration _configuration;

    public AuthController(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    [HttpPost]
    public HttpResponseMessage Post(string login, string password)
    {
        var hash = Crypt.GetHashPassword(password);
        using var db = new ApplicationContext(_configuration.GetConnectionString("SyncDb"));
        var result = db.Users.FirstOrDefault(item => item.login == login && item.password == hash);
        if (result == null)
        {
            return new HttpResponseMessage(HttpStatusCode.NotFound);
        }

        return new HttpResponseMessage(HttpStatusCode.OK);
    }
}