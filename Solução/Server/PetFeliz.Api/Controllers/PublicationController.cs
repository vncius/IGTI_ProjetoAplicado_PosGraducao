using Microsoft.AspNetCore.Mvc;
using PetFeliz.Domain.DTO;
using PetFeliz.Domain.Model.Publication;
using PetFeliz.Domain.Model.User;
using PetFeliz.Interfaces.Service.Publicacao;
using PetFeliz.Interfaces.Service.User;
using System;
using System.Net;
using System.Threading.Tasks;

namespace PetFeliz.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PublicationController : BaseController<PublicationModel>
    {
        private readonly IPublicacaoService _publicacaoService;
        private readonly IUserService _userService;

        public PublicationController(IPublicacaoService service, IUserService serviceUser)
        {
            _publicacaoService = service;
            _userService = serviceUser;
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

        [HttpPut("Cancelar/{id}")]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.NoContent)]
        [ProducesResponseType((int)HttpStatusCode.InternalServerError)]
        public async Task<IActionResult> PutPublicacao(long id)
        {
            var publicacao = await _publicacaoService.GetById<PublicationModel>(id);
            publicacao.PublicationCanceled = true;
            return Ok(await _publicacaoService.Save<DTOPublication>(publicacao));
        }

        [HttpPost]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        [ProducesResponseType((int)HttpStatusCode.InternalServerError)]
        public async Task<IActionResult> PostPublicacao([FromBody] PublicationModel publicacao)
        {
            publicacao.SaveImage();

            var user = await _userService.GetById<UserModel>(publicacao.UserId);

            if (user != null)
            {
                publicacao.CidadeId = user.CidadeId;
                publicacao.EstadoId = user.EstadoId;
                var result = await _publicacaoService.Save<DTOPublication>(publicacao);
                return CreatedAtAction(nameof(PostPublicacao), new { id = publicacao.Id }, result);
            }

            throw new Exception("Falha ao criar publicação");
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