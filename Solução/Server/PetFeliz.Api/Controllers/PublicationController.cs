using Microsoft.AspNetCore.Mvc;
using PetFeliz.Domain.DTO;
using PetFeliz.Domain.Model.Publication;
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
            return Ok(await _publicacaoService.GetList<DTOPublication>());
        }

        [HttpGet("{id}")]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.NoContent)]
        [ProducesResponseType((int)HttpStatusCode.InternalServerError)]
        public async Task<IActionResult> GetPublicacao(long id)
        {
            return Ok(await _publicacaoService.GetById<DTOPublication>(id));
        }

        [HttpGet("User/{id}")]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.NoContent)]
        [ProducesResponseType((int)HttpStatusCode.InternalServerError)]
        public async Task<IActionResult> GetPublicacoesByUser(long id)
        {
            return Ok(await _publicacaoService.GetByIdUser(id));
        }

        [HttpPut]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.NoContent)]
        [ProducesResponseType((int)HttpStatusCode.InternalServerError)]
        public async Task<IActionResult> PutPublicacao([FromBody] PublicationModel publicacao)
        {
            publicacao.SaveImage();
            return Ok(await _publicacaoService.Save<DTOPublication>(publicacao));
        }

        [HttpPost]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        [ProducesResponseType((int)HttpStatusCode.InternalServerError)]
        public async Task<IActionResult> PostPublicacao([FromBody] PublicationModel publicacao)
        {
            publicacao.SaveImage();
            var result = await _publicacaoService.Save<DTOPublication>(publicacao);
            return CreatedAtAction(nameof(PostPublicacao), new { id = publicacao.Id }, result);
        }

        [HttpDelete("{id}")]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        [ProducesResponseType((int)HttpStatusCode.InternalServerError)]
        public async Task<IActionResult> DeletePublicacao(long id)
        {
            return Ok(await _publicacaoService.Delete<DTOPublication>(id));
        }
    }
}