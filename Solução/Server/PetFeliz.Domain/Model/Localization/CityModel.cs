using PetFeliz.Domain.Model.Publication;
using PetFeliz.Domain.Model.User;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace PetFeliz.Domain.Model.Localization
{
    public class CityModel : BaseModel
    {
        [JsonIgnore]
        public virtual CountryModel Country { get; set; }

        public string Name { get; set; }

        [JsonIgnore]
        [NotMapped]
        public List<PublicationModel> Publicacoes { get; set; }

        [JsonIgnore]
        [NotMapped]
        public List<UserModel> Users { get; set; }
    }
}