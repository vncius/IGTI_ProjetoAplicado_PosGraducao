using PetFeliz.Domain.Model.Localization;
using PetFeliz.Interfaces.Repository.Localization;
using PetFeliz.Interfaces.Service.Localization;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PetFeliz.Services.Service.Localization
{
    public class CountryService : BaseService<CountryModel>, ICountryService
    {
        private readonly ICountryRepository _countryRepository;
        private readonly ICityRepository _cityRepository;

        public CountryService(ICountryRepository countryRepository, ICityRepository cityRepository) : base(countryRepository)
        {
            _countryRepository = countryRepository;
            _cityRepository = cityRepository;
        }

        public async Task<IList<CountryModel>> GetCountriesWithCities()
        {
            var countries = await _countryRepository.GetList();
            
            foreach(var country in countries)
            {
                country.Cities = await _cityRepository.GetListByIdCountry(country.Id);
            }

            return countries;
        }

        public async Task<CountryModel> GetCountryWithCityById(long id)
        {
            var country = await _countryRepository.GetById(id);
            country.Cities = await _cityRepository.GetListByIdCountry(country.Id);
            return country;
        }

        public override Task<object> GetDTO(CountryModel model)
        {
            return (Task<object>)(object)model;
        }

        public override Task<IList<object>> GetDTO(IList<CountryModel> model)
        {
            return (Task<IList<object>>)(object)model;
        }
    }
}