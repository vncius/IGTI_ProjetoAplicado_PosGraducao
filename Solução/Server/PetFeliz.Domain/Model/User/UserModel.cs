using PetFeliz.Domain.Model.Localization;
using PetFeliz.Domain.Model.Publication;
using System.Collections.Generic;

namespace PetFeliz.Domain.Model.User
{
    public class UserModel : BaseModel
    {
        public string Nome { get; set; }
        public string Email { get; set; }
        public CityModel Cidade { get; set; }
        public long CidadeId { get; set; }
        public string CPF { get; set; }
        public string Telefone { get; set; }
        public string Password { get; set; }
        public List<PublicationModel> Publicacoes { get; set; }
    }
}