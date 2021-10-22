using PetFeliz.Domain.Model.Localization;

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
    }
}