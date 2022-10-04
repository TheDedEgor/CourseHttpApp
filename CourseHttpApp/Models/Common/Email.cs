namespace CourseHttpApp.Models.Common;

public static class Email
{
    public static void SendEmail(string email, string url)
    {
        HttpClient client = new();
        client.DefaultRequestHeaders.Add("User-Agent", "HttpCourse");
        var builder = new UriBuilder("https://api.unisender.com/ru/api/sendEmail");
        var body = $"<h1>Был выполнен запрос на изменение вашего пароля</h1><h3>Для изменения перейдите по ссылке: <a href={url}>{url}</a></h3><p>Если это были не вы, срочно поменяйте пароль!</p>";
        builder.Query =
            $"format=json&api_key=6irwuofxekoyrmyzfbpe48p9te7wjitgt97hzgaa&email={email}&sender_name=Http+Course&sender_email=httpcourse.2022@gmail.com&subject=Восстановление+пароля&body={body}&list_id=1";
        var result = client.GetAsync(builder.ToString());
    }
}