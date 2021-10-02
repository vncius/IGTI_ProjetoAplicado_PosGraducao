namespace PetFeliz.Domain.Model
{
    public class PublicationModel : BaseObject
    {
        public long idUser { get; set; }
        public string Nome { get; set; }
        public string Descricao { get; set; }
        public string Estado { get; set; }
        public string Cidade { get; set; }
        public string Setor { get; set; }
        public string ImgUrl { get; set; }
        public string Sexo { get; set; }
        public int Idade { get; set; }
    }
}