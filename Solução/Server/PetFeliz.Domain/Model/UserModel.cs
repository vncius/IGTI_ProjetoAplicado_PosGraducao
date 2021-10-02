namespace PetFeliz.Domain.Model
{
    public class UserModel : BaseObject
    {
        public string Nome { get; set; }
        public string Email { get; set; }
        public string Estado { get; set; }
        public string Cidade { get; set; }
        public string CPF { get; set; }
        public string Telefone { get; set; }
        public string Password { get; set; }
    }
}