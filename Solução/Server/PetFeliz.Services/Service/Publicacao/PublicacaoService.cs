using PetFeliz.Domain.Model;
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

        public async Task<IList<PublicationModel>> GetByIdUser(long id)
        {
            var result = await _repository.GetByUserId(id);
            return ValidReturnGet(result);
        }
    }
}