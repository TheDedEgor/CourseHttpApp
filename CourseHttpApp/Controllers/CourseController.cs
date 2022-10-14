using CourseHttpApp.Models;
using CourseHttpApp.Models.Common;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CourseHttpApp.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CourseController : ControllerBase
{
    private readonly ILogger _logger;

    public CourseController(ILogger<CourseController> logger)
    {
        _logger = logger;
    }

    [HttpGet]
    [Authorize]
    public IResult Get()
    {
        var result = new List<object>();
        using (var db = new ApplicationContext())
        {
            foreach (var theme in db.Themes.ToList())
            {
                var practice = new List<object>();
                var theory = new List<object>();
                foreach (var item in db.Practice.Where(x => x.Theme_id == theme.Id).ToList())
                {
                    practice.Add(new
                    {
                        id = item.Id,
                        description = item.Description,
                        image_url = item.Image_url,
                        response_options = item.Response_options,
                        correct = item.Correct
                    });
                }
                foreach (var item in db.Theory.Where(x => x.Theme_id == theme.Id).ToList())
                {
                    theory.Add(new
                    {
                        id = item.Id,
                        description = item.Description,
                        image_url = item.Image_url,
                    });
                }
                result.Add(new
                {
                    theme_id = theme.Id,
                    theme = theme.Title,
                    theory = theory,
                    practice = practice
                });
            }
        }
        return Results.Json(result);
    }
}