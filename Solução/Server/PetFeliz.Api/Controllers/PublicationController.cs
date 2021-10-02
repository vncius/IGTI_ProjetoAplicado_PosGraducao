using Microsoft.AspNetCore.Mvc;
using PetFeliz.Domain.Model;
using PetFeliz.Interfaces.Service.Publicacao;
using System.Net;
using System.Threading.Tasks;

namespace PetFeliz.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PublicationController : BaseController<PublicationModel>
    {
        private readonly IPublicacaoService _publicacaoService;

        public PublicationController(IPublicacaoService service)
        {
            _publicacaoService = service;
        }

        [HttpGet]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.NoContent)]
        [ProducesResponseType((int)HttpStatusCode.InternalServerError)]
        public async Task<IActionResult> GetPublicacoes()
        {
            return Ok(await _publicacaoService.GetList());
        }

        [HttpGet("{id}")]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.NoContent)]
        [ProducesResponseType((int)HttpStatusCode.InternalServerError)]
        public async Task<IActionResult> GetPublicacao(long id)
        {
            return Ok(await _publicacaoService.GetById(id));
        }

        [HttpGet("User/{id}")]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.NoContent)]
        [ProducesResponseType((int)HttpStatusCode.InternalServerError)]
        public async Task<IActionResult> GetPublicacoesUser(long id)
        {
            return Ok(await _publicacaoService.GetByIdUser(id));
        }

        [HttpPut]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.NoContent)]
        [ProducesResponseType((int)HttpStatusCode.InternalServerError)]
        public async Task<IActionResult> PutPublicacao([FromBody] PublicationModel publicacao)
        {
            return Ok(await _publicacaoService.Save(publicacao));
        }

        [HttpPost]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.NoContent)]
        [ProducesResponseType((int)HttpStatusCode.InternalServerError)]
        public async Task<ActionResult<PublicationModel>> PostPublicacao([FromBody] PublicationModel publicacao)
        {
            var result = await _publicacaoService.Save(publicacao);

            return CreatedAtAction(nameof(GetPublicacao), new { id = publicacao.Id }, result);
        }

        [HttpDelete]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.NoContent)]
        [ProducesResponseType((int)HttpStatusCode.InternalServerError)]
        public async Task<IActionResult> DeletePublicacao([FromQuery] long id)
        {
            return Ok(await _publicacaoService.Delete(id));
        }
    }
}