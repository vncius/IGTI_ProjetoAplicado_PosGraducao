using System.Collections.Generic;
using System.Threading.Tasks;

namespace PetFeliz.Interfaces.Service
{
    public interface IBaseService<T>
    {
        Task<IList<T>> GetList();

        Task<T> GetById(long id);

        Task<T> Save(T publicacao);

        Task<T> Delete(long id);
    }
}