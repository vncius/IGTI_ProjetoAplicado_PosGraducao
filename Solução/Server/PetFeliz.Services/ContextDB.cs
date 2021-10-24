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
            Database.EnsureCreated();
        }

        public DbSet<PublicationModel> Publicacoes { get; set; }
        public DbSet<UserModel> Users { get; set; }
        public DbSet<CityModel> Cities { get; set; }
        public DbSet<CountryModel> Countries { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<PublicationModel>()
                .HasOne(pub => pub.User)
                .WithMany(user => user.Publicacoes)
                .HasForeignKey(pub => pub.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<PublicationModel>()
                .HasOne(pub => pub.Cidade)
                .WithMany(city => city.Publicacoes)
                .HasForeignKey(pub => pub.CidadeId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<UserModel>()
                .HasOne(usr => usr.Cidade)
                .WithMany(city => city.Users)
                .HasForeignKey(pub => pub.CidadeId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}