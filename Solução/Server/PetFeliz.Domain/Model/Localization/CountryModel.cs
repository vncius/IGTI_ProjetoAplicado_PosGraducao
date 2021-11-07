using PetFeliz.Domain.Model.Publication;
using PetFeliz.Domain.Model.User;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace PetFeliz.Domain.Model.Localization
{
    public class CountryModel : BaseModel
    {
        public string Name { get; set; }

        public virtual ICollection<CityModel> Cities { get; set; }

        [JsonIgnore]
        [NotMapped]
        public virtual ICollection<PublicationModel> Publications { get; set; }

        [JsonIgnore]
        [NotMapped]
        public virtual ICollection<UserModel> Users { get; set; }

    }
}