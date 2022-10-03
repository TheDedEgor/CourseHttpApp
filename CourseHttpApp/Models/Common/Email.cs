using System.Net;
using System.Net.Mail;

namespace CourseHttpApp.Models.Common;

public static class Email
{
    public static void SendEmail(string email, string url)
    {
        var from = new MailAddress("httpcourse@yandex.ru", "Http-курс");
        var to = new MailAddress(email);
        var message = new MailMessage(from, to);
        message.Subject = "Восстановление пароля";
        message.Body = $"На ваш адрес был выполнен запрос на изменение пароля!\n\nДля изменения перейдите по этой ссылке: {url}\n\nЕсли это были не вы срочно измените пароль!";
        var smtp = new SmtpClient("smtp.yandex.ru", 587);
        smtp.Credentials = new NetworkCredential("httpcourse@yandex.ru", "Zx24680!");
        smtp.EnableSsl = true;
        smtp.Send(message);
    }
}