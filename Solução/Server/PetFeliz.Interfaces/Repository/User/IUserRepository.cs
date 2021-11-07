using PetFeliz.Domain.Model.User;
using System.Threading.Tasks;

namespace PetFeliz.Interfaces.Repository.User
{
    public interface IUserRepository : IBaseRepository<UserModel>
    {
        Task<bool> GetByUserSenha(string email, string password);
        Task<UserModel> GetUserEmail(string email);
    }
}