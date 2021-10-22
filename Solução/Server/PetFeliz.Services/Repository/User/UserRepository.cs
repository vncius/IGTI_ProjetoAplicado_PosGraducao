using Microsoft.EntityFrameworkCore;
using PetFeliz.Domain.Model.User;
using PetFeliz.Interfaces.Repository.User;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PetFeliz.Services.Repository.User
{
    public class UserRepository : BaseRepository<UserModel>, IUserRepository
    {
        public UserRepository(ContextDB contextDB) : base(contextDB)
        {
        }

        public async override Task<UserModel> GetById(long id)
        {
            return await _contextDB.User.FindAsync(id);
        }

        public async override Task<IList<UserModel>> GetList()
        {
            return await _contextDB.User.ToListAsync();
        }

        public async Task<bool> GetByUserSenha(string email, string password)
        {
            return await _contextDB.User.Where(x => x.Email.Equals(email) && x.Password.Equals(password)).AnyAsync();
        }
    }
}