namespace CourseHttpApp.Models.Common;

public static class Email
{
    public static void SendEmail(string email, string url)
    {
        HttpClient client = new();
        client.DefaultRequestHeaders.Add("User-Agent", "HttpCourse");
        var config = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build();
        var apiKey = config.GetValue<string>("ApiKeySunderEmail");
        var builder = new UriBuilder("https://api.unisender.com/ru/api/sendEmail");
        var body = $"<h1>Был выполнен запрос на изменение вашего пароля</h1><h3>Для изменения перейдите по ссылке: <a href={url}>{url}</a></h3><p>Если это были не вы, срочно поменяйте пароль!</p>";
        builder.Query =
            $"format=json&api_key={apiKey}&email={email}&sender_name=Http+Course&sender_email=httpcourse.2022@gmail.com&subject=Восстановление+пароля&body={body}&list_id=1";
        var result = client.GetAsync(builder.ToString());
    }
}