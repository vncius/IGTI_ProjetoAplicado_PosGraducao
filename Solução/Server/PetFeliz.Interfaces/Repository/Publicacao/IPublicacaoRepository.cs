using PetFeliz.Domain.Model.Publication;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PetFeliz.Interfaces.Repository.Publicacao
{
    public interface IPublicacaoRepository : IBaseRepository<PublicationModel>
    {
        Task<IList<PublicationModel>> GetByUserId(long id);
    }
}