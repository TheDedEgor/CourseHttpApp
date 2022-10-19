using CourseHttpApp.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CourseHttpApp.Controllers;

[ApiController]
[Route("api/[controller]")]
public class InfoController : ControllerBase
{
    private readonly ILogger _logger;

    public InfoController(ILogger<InfoController> logger)
    {
        _logger = logger;
    }

    [HttpGet]
    [Authorize]
    public IResult Get()
    {
        var theme_id = int.Parse(HttpContext.Request.Query["theme_id"]);
        var type_id = int.Parse(HttpContext.Request.Query["type_id"]);
        using (var db = new ApplicationContext())
        {
            var result = new List<object>();
            if (type_id == 1)
            {
                foreach (var item in db.theory.Where(x => x.Theme_id == theme_id).ToList())
                {
                    result.Add(new
                    {
                        id = item.Id,
                        description = item.Description,
                        image_url = item.Image_url
                    });
                }
            }
            else
            {
                foreach (var item in db.practice.Where(x => x.Theme_id == theme_id).ToList())
                {
                    var response_options = new List<object>();
                    foreach (var response in db.response_options.Where(x =>
                                 x.Theme_id == theme_id && x.Practice_id == item.Id))
                    {
                        response_options.Add(new
                        {
                            id = response.Id,
                            title = response.Title
                        });
                    }

                    result.Add(new
                    {
                        id = item.Id,
                        description = item.Description,
                        response_options = response_options,
                        correct_id = item.Correct_id,
                        image_url = item.Image_url
                    });
                }
            }

            return Results.Json(result);
        }
    }
}