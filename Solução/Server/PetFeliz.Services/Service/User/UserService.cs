using Newtonsoft.Json;
using PetFeliz.Domain.Model.User;
using PetFeliz.Interfaces.Repository.User;
using PetFeliz.Interfaces.Service.User;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PetFeliz.Services.Service.Publicacao
{
    public class UserService : BaseService<UserModel>, IUserService
    {
        private readonly IUserRepository _repository;

        public UserService(IUserRepository repository) : base(repository)
        {
            _repository = repository;
        }

        public async Task<bool> GetByUserSenha(string email, string password)
        {
            return await _repository.GetByUserSenha(email, password);
        }

        public async Task<UserModel> GetUserEmail(string email)
        {
            return await _repository.GetUserEmail(email);
        }

        public async override Task<object> GetDTO(UserModel model)
        {
            return await Task.Run(() => {
                var serialized = JsonConvert.SerializeObject(model);
                return JsonConvert.DeserializeObject<object>(serialized);
            });
        }

        public async override Task<IList<object>> GetDTO(IList<UserModel> model)
        {
            return await Task.Run(() => {
                var serialized = JsonConvert.SerializeObject(model);
                return JsonConvert.DeserializeObject<IList<object>>(serialized);
            }); 
        }
    }
}