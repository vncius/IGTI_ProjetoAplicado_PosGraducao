using PetFeliz.Domain.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PetFeliz.Interfaces.Service.Publicacao
{
    public interface IPublicacaoService : IBaseService<PublicationModel>
    {
        Task<IList<PublicationModel>> GetByIdUser(long id);
    }
}