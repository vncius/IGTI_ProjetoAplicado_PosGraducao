using PetFeliz.Domain.DTO;
using PetFeliz.Domain.Model.Localization;
using PetFeliz.Domain.Model.User;
using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.IO;
using System.Text.Json.Serialization;

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
            Sexo = dto.Sexo;
            Idade = dto.Idade;
            IsAdotado = dto.IsAdotado;
            NameImagem = dto.NameImagem;
            PublicationCanceled = dto.PublicationCanceled;
        }

        [JsonIgnore]
        [NotMapped]
        public UserModel User { get; set; }
        public long UserId { get; set; }
        public string Nome { get; set; }
        public string Descricao { get; set; }

        [JsonIgnore]
        [NotMapped]
        public CityModel Cidade { get; set; }
        public long CidadeId { get; set; }

        [JsonIgnore]
        [NotMapped]
        public CountryModel Estado { get; set; }
        public long EstadoId { get; set; }
        public string Sexo { get; set; }
        public int Idade { get; set; }
        public bool IsAdotado { get; set; }
        public string NameImagem { get; set; }

        [NotMapped]
        public string ImagemBase64 { get; set; }
        [NotMapped]
        public string ImagemExtension { get; set; }

        public bool PublicationCanceled { get; set; }

        public bool SaveImage()
        {
            ClearBase64String();

            if (string.IsNullOrEmpty(ImagemExtension) || string.IsNullOrEmpty(ImagemExtension))
            {
                throw new Exception("Dados de imagem não enviados na publicação");
            }

            var pathSolution = AppDomain.CurrentDomain.BaseDirectory.ToString();
            pathSolution = pathSolution.Remove(pathSolution.IndexOf("PetFeliz.Api") + 12);

            if (Directory.Exists(pathSolution))
            {
                var image = Convert.FromBase64String(ImagemBase64);

                if (!String.IsNullOrEmpty(NameImagem))
                {
                    File.Delete(Path.Combine(pathSolution, NameImagem));
                    File.WriteAllBytes(Path.Combine(pathSolution, "StaticFiles", NameImagem), image);
                    return true;
                }

                NameImagem = $"{Guid.NewGuid()}.{ImagemExtension}";
                File.WriteAllBytes(Path.Combine(pathSolution, "StaticFiles", NameImagem), image);
                return true;
            }
            else
            {
                throw new Exception("Falha ao obter local de gravação das imagens");
            }
        }

        private void ClearBase64String()
        {
            var array = ImagemBase64.Split(',');

            if (array.Length > 1 && ImagemBase64.Contains(","))
            {
                ImagemBase64 = array[1];
            }
        }
    }
}