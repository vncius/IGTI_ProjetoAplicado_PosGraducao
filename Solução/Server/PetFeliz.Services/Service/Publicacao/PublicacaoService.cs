using PetFeliz.Domain.DTO;
using PetFeliz.Domain.Model.Publication;
using PetFeliz.Interfaces.Repository.Publicacao;
using PetFeliz.Interfaces.Service.Publicacao;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PetFeliz.Services.Service.Publicacao
{
    public class PublicacaoService : BaseService<PublicationModel>, IPublicacaoService
    {
        private readonly IPublicacaoRepository _repository;

        public PublicacaoService(IPublicacaoRepository repository) : base(repository)
        {
            _repository = repository;
        }

        public async Task<IList<DTOPublication>> GetByIdUser(long id)
        {
            var result = await _repository.GetByUserId(id);
            ValidReturnGet(result);
            var dto = await GetDTO(result);
            return ConvertTo<IList<DTOPublication>>(dto);
        }

        public async override Task<object> GetDTO(PublicationModel model)
        {
            return await Task.Run(() =>
            {
                return new DTOPublication(model);
            });
        }

        public async override Task<IList<object>> GetDTO(IList<PublicationModel> model)
        {
            IList<object> lista = new List<object>();
            return await Task.Run(() =>
            {
                foreach (var item in model)
                {
                    lista.Add(new DTOPublication(item));
                }

                return lista;
            });
        }
    }
}