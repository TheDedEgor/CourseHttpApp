using System.Security.Cryptography;
using System.Text;

namespace CourseHttpApp.Models.Common;

public static class Crypt
{
    public static string GetHashPassword(string password)
    {
        using var crypt = SHA256.Create();
        var hash = crypt.ComputeHash(Encoding.UTF8.GetBytes(password));
        var hashString = new StringBuilder();
        foreach (var x in hash)
        {
            hashString.Append(x.ToString("X2"));
        }

        return hashString.ToString();
    }
    
    public static string GetChangeKey(string login)
    {
        Random rnd = new();
        login += rnd.Next();
        using var crypt = SHA256.Create();
        var hash = crypt.ComputeHash(Encoding.UTF8.GetBytes(login));
        var hashString = new StringBuilder();
        foreach (var x in hash)
        {
            hashString.Append(x.ToString("X2"));
        }

        return hashString.ToString();
    }
}