using Microsoft.AspNetCore.Mvc;
using PetFeliz.Domain.Model.Localization;
using PetFeliz.Interfaces.Service.Localization;
using System.Net;
using System.Threading.Tasks;

namespace PetFeliz.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CountryController : BaseController<CountryModel>
    {
        private readonly ICountryService _userService;

        public CountryController(ICountryService service)
        {
            _userService = service;
        }

        [HttpGet]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.NoContent)]
        [ProducesResponseType((int)HttpStatusCode.InternalServerError)]
        public async Task<IActionResult> GetCountriesWithCities()
        {
            return Ok(await _userService.GetCountriesWithCities());
        }

        [HttpGet("{id}")]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.NoContent)]
        [ProducesResponseType((int)HttpStatusCode.InternalServerError)]
        public async Task<IActionResult> GetCountryWithCities(long id)
        {
            return Ok(await _userService.GetCountryWithCityById(id));
        }
    }
}