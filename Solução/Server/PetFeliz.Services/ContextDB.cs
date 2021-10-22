using Microsoft.EntityFrameworkCore;
using PetFeliz.Domain.Model.Localization;
using PetFeliz.Domain.Model.Publication;
using PetFeliz.Domain.Model.User;

namespace PetFeliz.Services
{
    public class ContextDB : DbContext
    {
        public ContextDB(DbContextOptions<ContextDB> options) : base(options)
        {
            //Database.EnsureDeleted();
            Database.EnsureCreated();
        }

        public DbSet<PublicationModel> Publicacoes { get; set; }
        public DbSet<UserModel> User { get; set; }
        public DbSet<CityModel> City { get; set; }
        public DbSet<CountryModel> Country { get; set; }

        //protected override void OnModelCreating(ModelBuilder modelBuilder)
        //{


        //    modelBuilder.Entity<PublicationModel>()
        //        .HasOne<UserModel>(p => p.)
        //}
    }
}