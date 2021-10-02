using PetFeliz.Domain.Model;
using PetFeliz.Interfaces.Repository.User;
using PetFeliz.Interfaces.Service.User;

namespace PetFeliz.Services.Service.Publicacao
{
    public class UserService : BaseService<UserModel>, IUserService
    {
        private readonly IUserRepository _repository;

        public UserService(IUserRepository repository) : base(repository)
        {
            _repository = repository;
        }
    }
}