using System;
using System.Security.Cryptography;
using System.Text;

namespace PetFeliz.Infrastructure
{
    public static class UtilExtensions
    {
        public static T ConvertTo<T>(this object model)
        {
            if (model == null)
            {
                return default;
            }

            return (T)Convert.ChangeType(model, typeof(T));
        }

        public static string Encripty(this string password)
        {
            MD5 md5Hasher = MD5.Create();
            byte[] valorCriptografado = md5Hasher.ComputeHash(Encoding.Default.GetBytes(password));
            StringBuilder strBuilder = new StringBuilder();

            foreach(var itemArray in valorCriptografado)
            { 
                strBuilder.Append(itemArray.ToString("x2"));
            }

            return strBuilder.ToString();
        }
    }
}