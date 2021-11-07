using Microsoft.AspNetCore.Mvc;
using PetFeliz.Domain.Model.User;
using PetFeliz.Infrastructure;
using PetFeliz.Interfaces.Service.User;
using System;
using System.Net;
using System.Threading.Tasks;

namespace PetFeliz.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : BaseController<UserModel>
    {
        private readonly IUserService _userService;

        public AuthController(IUserService service)
        {
            _userService = service;
        }

        [HttpPost("login")]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.NoContent)]
        [ProducesResponseType((int)HttpStatusCode.InternalServerError)]
        public async Task<ActionResult<UserModel>> PostUser([FromBody] UserModel user)
        {
            if (user != null)
            {
                user.Password = user.Password.Encripty();
            }

            if (await _userService.GetByUserSenha(user?.Email, user?.Password))
            {
                var data = await _userService.GetUserEmail(user?.Email);
                data.Password = string.Empty;
                return Ok(new { token = Guid.NewGuid(), user = data });
            }

            return Unauthorized();
        }
    }
}