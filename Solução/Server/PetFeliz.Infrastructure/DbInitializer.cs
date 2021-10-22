using Newtonsoft.Json;
using PetFeliz.Domain.Model;
using PetFeliz.Domain.Model.Localization;
using PetFeliz.Domain.Model.Publication;
using PetFeliz.Domain.Model.User;
using PetFeliz.Services;
using System.Collections.Generic;
using System.Linq;

namespace PetFeliz.Infrastructure
{
    public static class DBInitializer
    {
        public static void Initialize(ContextDB context)
        {
            if (!context.Country.Any())
            {
                string text = System.IO.File.ReadAllText(@"Localidades.txt");

                var json = JsonConvert.DeserializeObject<List<dynamic>>(text);

                var countries = new List<CountryModel>();

                foreach (var item in json)
                {
                    var country = new CountryModel() { Name = item.Estado };
                    country.Cities = new List<CityModel>();

                    var obj = JsonConvert.SerializeObject(item.Cidades);
                    var cities = JsonConvert.DeserializeObject<List<string>>(obj);

                    foreach (var city in cities)
                    {
                        country.Cities.Add(new CityModel()
                        {
                            Name = city
                        });
                    }

                    countries.Add(country);
                }

                countries.ForEach(s => context.Country.Add(s));
                context.SaveChanges();
            }

            if (!context.User.Any())
            {
                var city = context.City.Where(x => x.Name == "Goiânia").FirstOrDefault();

                context.User.Add(new UserModel()
                {
                    Email = "v.vieira.go@gmail.com",
                    CPF = "702.220.659-88",
                    Nome = "Vinicius Vieira Abreu",
                    Cidade = city,
                    Password = "admin",
                    Telefone = "62 98161-7801"                   
                });

                context.SaveChanges();
            }
        }
    }
}