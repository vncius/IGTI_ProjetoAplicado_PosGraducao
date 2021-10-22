using Microsoft.EntityFrameworkCore;
using PetFeliz.Domain.Model.Localization;
using PetFeliz.Interfaces.Repository.Localization;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PetFeliz.Services.Repository.Localization
{
    public class CountryRepository : BaseRepository<CountryModel>, ICountryRepository
    {
        public CountryRepository(ContextDB contextDB) : base(contextDB)
        {
        }

        public async override Task<CountryModel> GetById(long id)
        {
            return await _contextDB.Country.FindAsync(id);
        }

        public async override Task<IList<CountryModel>> GetList()
        {
            return await _contextDB.Country.ToListAsync();
        }
    }
}