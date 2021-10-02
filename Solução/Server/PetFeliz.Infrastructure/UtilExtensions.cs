using System;

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
    }
}