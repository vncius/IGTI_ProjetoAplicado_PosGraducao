using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using PetFeliz.Interfaces.Repository.Localization;
using PetFeliz.Interfaces.Repository.Publicacao;
using PetFeliz.Interfaces.Repository.User;
using PetFeliz.Interfaces.Service.Localization;
using PetFeliz.Interfaces.Service.Publicacao;
using PetFeliz.Interfaces.Service.User;
using PetFeliz.Services;
using PetFeliz.Services.Repository.Localization;
using PetFeliz.Services.Repository.Publicacao;
using PetFeliz.Services.Repository.User;
using PetFeliz.Services.Service.Localization;
using PetFeliz.Services.Service.Publicacao;

namespace PetFeliz.Infrastructure
{
    public static class DependencyInjectionConfig
    {
        public static void ConfigureDependences(this IServiceCollection services, IConfiguration configuration)
        {
            services.ConfigureDatabase(configuration);
            services.ConfigureServicesInjection();
            services.ConfigureRepositoriesInjection();
            services.ConfigureExceptions();
        }

        private static void ConfigureDatabase(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<ContextDB>(opt =>
                            opt.UseSqlServer(configuration.GetConnectionString("DefaultConnection"),
                            optionsBuilder => optionsBuilder.MigrationsAssembly("PetFeliz.Services"))
                        );
        }

        private static void ConfigureServicesInjection(this IServiceCollection services)
        {
            services.AddScoped<IPublicacaoService, PublicacaoService>();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<ICountryService, CountryService>();
        }

        private static void ConfigureRepositoriesInjection(this IServiceCollection services)
        {
            services.AddScoped<IPublicacaoRepository, PublicacaoRepository>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<ICountryRepository, CountryRepository>();
            services.AddScoped<ICityRepository, CityRepository>();
        }

        private static void ConfigureExceptions(this IServiceCollection services)
        {
        }
    }
}