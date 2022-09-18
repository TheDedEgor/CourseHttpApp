using System.Net;
using CourseHttpApp.Models;
using CourseHttpApp.Models.Common;
using Microsoft.AspNetCore.Mvc;

namespace CourseHttpApp.Controllers;

[ApiController]
[Route("api/[controller]")]
public class RegController : ControllerBase
{
    private readonly IConfiguration _configuration;
    
    public RegController(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    [HttpPost]
    public HttpResponseMessage Post(string login, string password)
    {
        using (var db = new ApplicationContext(_configuration.GetConnectionString("SyncDb")))
        {
            var hash = Crypt.GetHashPassword(password);
            var result = db.Users.FirstOrDefault(item => item.login == login && item.password == hash);
            if (result != null)
            {
                return new HttpResponseMessage(HttpStatusCode.Conflict);
            }

            db.Users.Add(new User()
            {
                id = 0,
                login = login,
                password = hash
            });
            db.SaveChanges();
        }
        return new HttpResponseMessage(HttpStatusCode.Created);
    }
}