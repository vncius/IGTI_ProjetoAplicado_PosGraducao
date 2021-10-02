using Microsoft.EntityFrameworkCore;
using PetFeliz.Domain.Model;
using PetFeliz.Interfaces.Repository.User;
using System.Collections.Generic;
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
    }
}