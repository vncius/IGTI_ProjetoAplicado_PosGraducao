using Microsoft.EntityFrameworkCore;
using PetFeliz.Domain.Model.User;
using PetFeliz.Interfaces.Repository.User;
using System.Linq;
using System.Threading.Tasks;

namespace PetFeliz.Services.Repository.User
{
    public class UserRepository : BaseRepository<UserModel>, IUserRepository
    {
        public UserRepository(ContextDB contextDB) : base(contextDB)
        {
        }

        public async Task<bool> GetByUserSenha(string email, string password)
        {
            return await _contextDB.Set<UserModel>().Where(x => x.Email.Equals(email) && x.Password.Equals(password)).AnyAsync();
        }        
        
        public async Task<UserModel> GetUserEmail(string email)
        {
            return await _contextDB.Set<UserModel>().Where(x => x.Email.Equals(email)).FirstAsync();
        }
    }
}