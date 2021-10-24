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
    }
}