using System.Collections.Generic;
using System.Threading.Tasks;

namespace PetFeliz.Interfaces.Service
{
    public interface IBaseService<T>
    {
        Task<IList<TDto>> GetList<TDto>();

        public Task<TDto> GetById<TDto>(long id);

        public Task<TDto> Save<TDto>(T user);

        public Task<TDto> Delete<TDto>(long id);
    }
}