using Microsoft.AspNetCore.Mvc;
using PetFeliz.Domain.Model.User;
using PetFeliz.Infrastructure;
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
            return Ok(await _userService.GetById<UserModel>(id));
        }

        [HttpPut]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        [ProducesResponseType((int)HttpStatusCode.InternalServerError)]
        public async Task<IActionResult> PutUser([FromBody] UserModel user)
        {
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