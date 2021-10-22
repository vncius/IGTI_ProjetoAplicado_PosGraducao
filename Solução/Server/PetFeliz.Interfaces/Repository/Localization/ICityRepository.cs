using PetFeliz.Domain.Model.Localization;
using PetFeliz.Domain.Model.Publication;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PetFeliz.Interfaces.Repository.Localization
{
    public interface ICityRepository : IBaseRepository<CityModel>
    {
        Task<IList<CityModel>> GetListByIdCountry(long id);
    }
}