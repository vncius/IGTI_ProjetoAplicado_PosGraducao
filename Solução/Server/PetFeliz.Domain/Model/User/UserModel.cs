using PetFeliz.Domain.Model.Localization;
using PetFeliz.Domain.Model.Publication;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace PetFeliz.Domain.Model.User
{
    [Table("Users")]
    public class UserModel : BaseModel
    {
        public string Nome { get; set; }
        public string Email { get; set; }

        [JsonIgnore]
        [NotMapped] public CityModel Cidade { get; set; }

        public long CidadeId { get; set; }

        [JsonIgnore]
        [NotMapped] 
        public CountryModel Estado { get; set; }

        public long EstadoId { get; set; }
        public string CPF { get; set; }
        public string Telefone { get; set; }
        public string Password { get; set; }

        [JsonIgnore]
        [NotMapped]
        public virtual ICollection<PublicationModel> Publicacoes { get; set; }
    }
}