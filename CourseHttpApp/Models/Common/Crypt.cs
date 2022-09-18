using System.Security.Cryptography;
using System.Text;

namespace CourseHttpApp.Models.Common;

internal class Crypt
{
    internal static string GetHashPassword(string password)
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
}