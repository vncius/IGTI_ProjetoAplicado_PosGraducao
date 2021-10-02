using Microsoft.EntityFrameworkCore;
using PetFeliz.Domain.Model;

namespace PetFeliz.Services
{
    public class ContextDB : DbContext
    {
        public ContextDB(DbContextOptions<ContextDB> options) : base(options)
        {
        }

        public DbSet<PublicationModel> Publicacoes { get; set; }
        public DbSet<UserModel> User { get; set; }
    }
}