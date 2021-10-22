using PetFeliz.Domain.Model.User;
using System.Threading.Tasks;

namespace PetFeliz.Interfaces.Service.User
{
    public interface IUserService : IBaseService<UserModel>
    {
        Task<bool> GetByUserSenha(string email, string password);
    }
}