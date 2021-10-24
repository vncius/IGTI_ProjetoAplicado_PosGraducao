using Microsoft.AspNetCore.Mvc;
using PetFeliz.Domain.DTO;
using PetFeliz.Domain.Model.User;
using PetFeliz.Infrastructure;
using PetFeliz.Interfaces.Service.Relatorio;
using PetFeliz.Interfaces.Service.User;
using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;

namespace PetFeliz.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RelatorioController : BaseController<DTORelatorioCountry>
    {
        private readonly IRelatorioService _relatorioService;

        public RelatorioController(IRelatorioService service)
        {
            _relatorioService = service;
        }

        [HttpGet("Country")]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.NoContent)]
        [ProducesResponseType((int)HttpStatusCode.InternalServerError)]
        public async Task<ActionResult<List<DTORelatorioCountry>>> GetCountry()
        {
            return Ok(await _relatorioService.GetRelatorioAdocaoPorEstado());
        }
    }
}