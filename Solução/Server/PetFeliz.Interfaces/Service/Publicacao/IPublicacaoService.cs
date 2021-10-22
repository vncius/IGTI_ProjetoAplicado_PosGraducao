using PetFeliz.Domain.DTO;
using PetFeliz.Domain.Model;
using PetFeliz.Domain.Model.Publication;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PetFeliz.Interfaces.Service.Publicacao
{
    public interface IPublicacaoService : IBaseService<PublicationModel>
    {
        Task<IList<DTOPublication>> GetByIdUser(long id);
    }
}