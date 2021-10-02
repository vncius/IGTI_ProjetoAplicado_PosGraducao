using System.Collections.Generic;
using System.Threading.Tasks;

namespace PetFeliz.Interfaces.Repository
{
    public interface IBaseRepository<TDto>
    {
        Task<TDto> GetById(long id);

        Task<IList<TDto>> GetList();

        Task<T> Save<T>(T model);

        Task<TDto> DeleteById(long id);
    }
}