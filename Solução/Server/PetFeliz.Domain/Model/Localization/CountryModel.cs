using System.Collections.Generic;

namespace PetFeliz.Domain.Model.Localization
{
    public class CountryModel : BaseModel
    {
        public string Name { get; set; }
        public virtual ICollection<CityModel> Cities { get; set; }
    }
}