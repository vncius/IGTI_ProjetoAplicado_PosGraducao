using Microsoft.AspNetCore.Mvc;
using PetFeliz.Domain.Model.User;
using PetFeliz.Infrastructure;
using PetFeliz.Interfaces.Service.Localization;
using PetFeliz.Interfaces.Service.User;
using System;
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
        public async Task<IActionResult> GetUsers()
        {
            return Ok(await _userService.GetList<UserModel>());
        }

        [HttpGet("{id}")]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.NoContent)]
        [ProducesResponseType((int)HttpStatusCode.InternalServerError)]
        public async Task<IActionResult> GetUser(long id)
        {
            var result = await _userService.GetById<UserModel>(id);
            result.Password = string.Empty;
            return Ok(result);
        }

        [HttpGet("email/{email}")]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.NoContent)]
        [ProducesResponseType((int)HttpStatusCode.InternalServerError)]
        public async Task<IActionResult> GetUser(string email)
        {
            var user = await _userService.GetUserEmail(email);
            user.Password = string.Empty;
            return Ok(user);
        }

        [HttpPut]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        [ProducesResponseType((int)HttpStatusCode.InternalServerError)]
        public async Task<IActionResult> PutUser([FromBody] UserModel user)
        {
            if (user?.Id <= 0) throw new Exception("Campo ID é obrigatório e não foi informado.");

            if (user != null)
            {
                user.Password = user.Password.Encripty();
            }

            return Ok(await _userService.Save<UserModel>(user));
        }

        [HttpPost]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.NoContent)]
        [ProducesResponseType((int)HttpStatusCode.InternalServerError)]
        public async Task<ActionResult<UserModel>> PostUser([FromBody] UserModel user)
        {
            if (user != null) 
            {
                user.Password = user.Password.Encripty();
            }

            var result = await _userService.Save<UserModel>(user);

            return CreatedAtAction(nameof(GetUser), new { id = user.Id }, result);
        }

        [HttpDelete("{id}")]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        [ProducesResponseType((int)HttpStatusCode.InternalServerError)]
        public async Task<IActionResult> DeleteUser(long id)
        {
            return Ok(await _userService.Delete<UserModel>(id));
        }
    }
}