using PetFeliz.Domain.DTO;
using PetFeliz.Domain.Model.Localization;
using PetFeliz.Domain.Model.User;

namespace PetFeliz.Domain.Model.Publication
{
    public class PublicationModel : BaseModel
    {
        public PublicationModel() { }

        public PublicationModel(DTOPublication dto)
        {
            Id = dto.Id;
            UserId = dto.UserId;
            Nome = dto.Nome;
            Descricao = dto.Descricao;
            CidadeId = dto.CidadeId;
            Setor = dto.Setor;
            ImgUrl = dto.ImgPrincipal;
            Sexo = dto.Sexo;
            Idade = dto.Idade;
        }

        public UserModel User { get; set; }
        public long UserId { get; set; }
        public string Nome { get; set; }
        public string Descricao { get; set; }
        public CityModel Cidade { get; set; }
        public long CidadeId { get; set; }
        public string Setor { get; set; }
        public string ImgUrl { get; set; }
        public string Sexo { get; set; }
        public int Idade { get; set; }
    }
}