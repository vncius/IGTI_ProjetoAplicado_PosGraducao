using Microsoft.AspNetCore.Mvc;
using PetFeliz.Domain.Model;
using PetFeliz.Interfaces.Service.User;
using System.Net;
using System.Threading.Tasks;

namespace PetFeliz.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : BaseController<UserModel>
    {
        private readonly IUserService _userService;

        public UserController(IUserService service)
        {
            _userService = service;
        }

        [HttpGet]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.NoContent)]
        [ProducesResponseType((int)HttpStatusCode.InternalServerError)]
        public async Task<IActionResult> GetPublicacoes()
        {
            return Ok(await _userService.GetList());
        }

        [HttpGet("{id}")]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.NoContent)]
        [ProducesResponseType((int)HttpStatusCode.InternalServerError)]
        public async Task<IActionResult> GetPublicacao(long id)
        {
            return Ok(await _userService.GetById(id));
        }

        [HttpPut]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.NoContent)]
        [ProducesResponseType((int)HttpStatusCode.InternalServerError)]
        public async Task<IActionResult> PutPublicacao([FromBody] UserModel publicacao)
        {
            return Ok(await _userService.Save(publicacao));
        }

        [HttpPost]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.NoContent)]
        [ProducesResponseType((int)HttpStatusCode.InternalServerError)]
        public async Task<ActionResult<UserModel>> PostPublicacao([FromBody] UserModel publicacao)
        {
            var result = await _userService.Save(publicacao);

            return CreatedAtAction(nameof(GetPublicacao), new { id = publicacao.Id }, result);
        }

        [HttpDelete]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.NoContent)]
        [ProducesResponseType((int)HttpStatusCode.InternalServerError)]
        public async Task<IActionResult> DeletePublicacao([FromQuery] long id)
        {
            return Ok(await _userService.Delete(id));
        }
    }
}