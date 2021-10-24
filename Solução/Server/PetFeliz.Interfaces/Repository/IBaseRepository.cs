using System.Collections.Generic;
using System.Threading.Tasks;

namespace PetFeliz.Interfaces.Repository
{
    public interface IBaseRepository<TDto>
    {
        Task<TDto> GetById(long id);

        Task<IList<TDto>> GetList();

        Task<TDto> Save(TDto model);

        Task<TDto> DeleteById(long id);
    }
}