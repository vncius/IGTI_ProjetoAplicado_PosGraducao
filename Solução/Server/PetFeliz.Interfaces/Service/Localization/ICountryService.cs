using PetFeliz.Domain.Model.Localization;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PetFeliz.Interfaces.Service.Localization
{
    public interface ICountryService : IBaseService<CountryModel>
    {
        Task<IList<CountryModel>> GetCountriesWithCities();
        Task<CountryModel> GetCountryWithCityById(long id);
    }
}