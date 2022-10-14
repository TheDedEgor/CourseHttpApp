using CourseHttpApp.Models;
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
            foreach (var theme in db.themes.ToList())
            {
                var practice = new List<object>();
                var theory = new List<object>();
                foreach (var item in db.practice.Where(x => x.Theme_id == theme.Id).ToList())
                {
                    var response_options = new List<object>();
                    foreach (var res in db.response_options
                                 .Where(x => x.Theme_id == item.Id && x.Practice_id == item.Id).ToList()) 
                    {
                        response_options.Add(new
                        {
                            id = res.Id,
                            title = res.Title
                        });
                    }
                    practice.Add(new
                    {
                        id = item.Id,
                        description = item.Description,
                        image_url = item.Image_url,
                        response_options = response_options,
                        correct_id = item.Correct_id
                    });
                }
                foreach (var item in db.theory.Where(x => x.Theme_id == theme.Id).ToList())
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