using CourseHttpApp.Middlewares;
using CourseHttpApp.Models.Common;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllersWithViews();

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        
        ValidateIssuer = true, // указывает, будет ли валидироваться издатель при валидации токена
        ValidIssuer = AuthOptions.ISSUER, // строка, представляющая издателя
        ValidateAudience = true, // будет ли валидироваться потребитель токена
        ValidAudience = AuthOptions.AUDIENCE, // установка потребителя токена
        ValidateLifetime = true, // будет ли валидироваться время существования
        IssuerSigningKey = AuthOptions.GetSymmetricSecurityKey(), // установка ключа безопасности
        ValidateIssuerSigningKey = true // валидация ключа безопасности
    };
}); 
builder.Services.AddAuthorization(); 

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseAuthentication();
app.UseAuthorization();
app.UseMiddleware<RequestLoggingMiddleware>();


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");


app.Run();