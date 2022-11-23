namespace CourseHttpApp.Middlewares;

public class RequestLoggingMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger _logger;

    public RequestLoggingMiddleware(RequestDelegate next, ILoggerFactory loggerFactory)
    {
        _next = next;
        _logger = loggerFactory.CreateLogger<RequestLoggingMiddleware>();
    }

    public async Task Invoke(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch(Exception exp)
        {
            _logger.LogError(
                "Date - {date}\n      Request {method} {url} => {statusCode}\n      Exception:{e}",
                DateTime.Now,
                context.Request?.Method,
                context.Request?.Path.Value,
                context.Response?.StatusCode,
                exp);
        }
    }
}