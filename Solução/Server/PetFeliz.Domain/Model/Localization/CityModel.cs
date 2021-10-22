using System.Text.Json.Serialization;

namespace PetFeliz.Domain.Model.Localization
{
    public class CityModel : BaseModel
    {
        [JsonIgnore]
        public virtual CountryModel Country { get; set; }
        public string Name { get; set; }
    }
}