using Microsoft.EntityFrameworkCore;
using PetFeliz.Domain.Model.Localization;
using PetFeliz.Interfaces.Repository.Localization;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PetFeliz.Services.Repository.Localization
{
    public class CityRepository : BaseRepository<CityModel>, ICityRepository
    {
        public CityRepository(ContextDB contextDB) : base(contextDB)
        {
        }

        public async override Task<CityModel> GetById(long id)
        {
            return await _contextDB.City.FindAsync(id);
        }

        public async override Task<IList<CityModel>> GetList()
        {
            return await _contextDB.City.ToListAsync();
        }

        public async Task<IList<CityModel>> GetListByIdCountry(long id)
        {
            return await _contextDB.City.Where(x => x.Country.Id == id).ToListAsync();
        }
    }
}