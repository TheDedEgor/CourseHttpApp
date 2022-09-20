using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace CourseHttpApp.Models.Common;

public static class AuthOptions
{
    const string KEY = "!1_my_key_course_http_1!";   // ключ для шифрации
    public const string ISSUER = "CourseHttpServer"; // издатель токена
    public const string AUDIENCE = "ClientCourseHttp"; // потребитель токена
    public static SymmetricSecurityKey GetSymmetricSecurityKey() => new(Encoding.UTF8.GetBytes(KEY));
}
