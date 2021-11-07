using Newtonsoft.Json;
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
#if !DEBUG
            return;
#endif

            if (!context.Countries.Any())
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
                            Name = city,
                        });
                    }

                    countries.Add(country);
                }

                countries.ForEach(s =>
                {
                    context.Countries.Add(s);
                    foreach (var city in s.Cities)
                    {
                        context.Cities.Add(city);
                    }
                });
                context.SaveChanges();
            }

            if (!context.Users.Any())
            {
                var city = context.Cities.Where(x => x.Name == "Goiânia").FirstOrDefault();
                var country = context.Countries.Where(x => x.Cities.Contains(city)).FirstOrDefault();

                context.Users.Add(new UserModel()
                {
                    Email = "v.vieira.go@gmail.com",
                    CPF = "702.220.659-88",
                    Nome = "Vinicius Vieira Abreu",
                    CidadeId = city.Id,
                    EstadoId = country.Id,
                    Password = "21232f297a57a5a743894a0e4a801fc3",
                    Telefone = "62 98161-7801"
                });

                context.SaveChanges();
            }

            if (!context.Publicacoes.Any())
            {
                var user = context.Users.FirstOrDefault();

                var publicacao = new PublicationModel()
                {
                    UserId = user.Id,
                    Nome = "Spike",
                    Descricao = "Cachorro manso de raça",
                    CidadeId = user.CidadeId,
                    EstadoId = user.EstadoId,
                    Sexo = "Macho",
                    Idade = 3,
                    IsAdotado = false,
                    ImagemBase64 = @"/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBUWFRgWFRUZGRgYGhgZGhkaGBgYGhgaGBoaGRgYGBocIS4lHCErIRgYJjgmKy8xNTU1GiQ7QDs0Py40NTEBDAwMEA8QHhISHjQlJCs0NDQ2NDQ0NDQ0NDQ0NDQ0MTQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDE0NDQ0NP/AABEIALgBEgMBIgACEQEDEQH/xAAbAAACAgMBAAAAAAAAAAAAAAADBAUGAAECB//EADsQAAIBAgQEAwcDAwIGAwAAAAECAAMRBBIhMQVBUWEGcYETIjKRodHwQrHBFOHxUnIVIzNDYoIHFlP/xAAZAQADAQEBAAAAAAAAAAAAAAABAgMABAX/xAAmEQACAgMAAgICAQUAAAAAAAAAAQIRAxIhMUEiURMyBDNCYYGR/9oADAMBAAIRAxEAPwDz8zpHmGczzzBvaGaLQeea9pMkYIZirecKYzQpzPhgtKnGadOZTSOUkkZMxukkMqTpFtO4jDZyywFSGd4EozbAnyEaMWwNirxdxG/6Z2awRrnYWMcTw5iSLii1vKWjBgtkEyTnJJ1PDeJY2FF7+UN/9Nxh19kfUiNowK/ogqbWjC1JJP4Txi/9knyIMHhvDuLdiooOLblhlA9TvN+Nh+X0Ke2iuIxMmK3hXGA29kST8vUyB4jgKtMkOhFudjb0vCsdG6LO85DQesIlBiCwUkLuel46ggdCrUIjVDFESP1namBwG6Ta8Q6zipjb7SJzzATJONDkgKtzJXBvIFJKYGpNqAseGtHUMiaFYRsYiBxAGxEjK8PWxMi8RiImpjlm1j+GeRIfWOUHjqJiVzTcVzzJqMVB8NF3pydelE6lKKpCkSyzaJHHpTqjR1j7cMc0sPHqOHh6WGjlOjEcggEoQyU7Rhac0y2k2zA2gWeGeKAZmA3hirATPBsAKmrDTz/aXDg+ARdhqJGYGkKaKALE7ywcKoWFzzlIt7UjtjijGFvySVPDJcHKL9bRm0xAJvMBOgkck25TYN5zVa+0xDa01hrhtjytAs0OTeCaCTDEGXgcbhEdbMgYHqIa8wHlEUmO0irV/CeD1PsgCeYJuPK+0kOG8Lwwp+yWmuTpa9z1J5mZxkFCG3HkZFYDiNqljsYv5XGVMosMZRuJrxD4LR1JpKqHc9WPK56dhPNOI8LqUWIdCLcyNDPdRXsOn52kXxXCUq6lai5h1GhEu5o5/wATZ4iRO0Eu+M8G0yT7OoV7MA31EgeK+H6lAXJDDqoMXaMvBOWOUfKI1RGqJtFFaGV4KommPLiyJ1/WGR95meZsYaq4oxdKhMEzzKbWiNGHEMYR4kGhleFAsc9vMieaahsNkiyRWokL7a8GzznoQXNHWNUMNMWOUJrMHpUBaGFKd0rQxEWzWLOkWqxyq0j6hLGyi/YRUrYGwFVpPcC4IQvtqgULa63F2PfXaM8F4FYh6w21Cn+RJHieILDKDvpKr4o6sGFt7SFMAjVH7XvfsOUt1AWEiOEYdUQE8/rGcRjRfLt5x40lZ0zuUqXgl6bX5zTb2i1BxYG8JRqXYmUv0RrywzJOag1AhgRvANU949oWgJsx3tzivtrneKcRxSqd9/tFsPxIXIAzW0Nrb8/OSb6WjHlkyp6ToPF6NVWHu6HmDvDZr+cIrNYqlnQr17TzzFlqVSzfpPQi45EXnoqP1lZ8Y4QZQ4/j5wTjcbHwy1lX2MYbiF1Gu4nVStca+n+eUr+Ar+6O3KSHtNJFSZdwSOK9Sx3/AGP7iacq6lHGh52EXxGpnCvbb9/4iqTTsdwUo0ysca4E1IlkuyHmBt5yGDT0lKvUaHeVnxBwBrmpSUFdyFuCO9vtOmGTbjPOzfx3HsfBXc0wtB3tMDR2zns6m1mrQyJFsFmw86WpNOkARaa0JYfPMiuYzIDWMJiIdakhErx6jWmlE1kvRaSFESIoPJClVkWEkqbQjPEVriY2IgMFrPJHw9hSzZzsv1PSQJqXNpdsIgVEUbAfXmTGivZXBDaVv0ExVcyOD3cAw2Je/wA4ohJrKOQ+xMD67PUiqQPxZ4j/AKZLL8baKB+3YfLaVThfG3DK9WoCWJvTCN7oB098nU87W9ZdcfwFMSpDKLi4uenf85RLBeBqSMGuxIN9WJHYa7/2nXBR06ckttuMsXCsVnUWvqBJ1GA0kbgsItJbKNfKMi/lJqLQ7aY4KkRxtULr84RdIrj8PnUi/KaTdAilZSfEnG1Qm19L7X37ym4LitZw7mvlK3yUihIcAA3L3GW9xbfn63DH+GS+XU3Um/cjUdwLyPbwI52zEf8AiVGnTaVw6JW/IuXbwiT8LeLRWIV9Ki9TcnqvfTUfl70a19RKPgPAtNLOQVa4NwdRY31J1veWJ6jL7u4Gmb5Wv3ksuqfBoJtdJmi94r4hW9Br8rfaawZOW/OC46//ACH/ANt/UaxVK4jJVJFLwdbK9j1k+i31ErddLMrDn+fxJ3DYi3rrOdHW0K1ns3baCNXWCxj3ft+fecjUc9bd4GOiQ9r7twdY3gK195Gfph8MPcHXnCvQkkqZD+LuGJ/1aYAv8QHXraVICT/G+J5zkU6A69+Uh0TnOhSpHj5tXJ6m0WHQQRMNTitkjqAqrDzMl4LMI5DMj/sZk2wKK4qaxylBOusIjzol0zHaLx1HkWlSGTESMogJD2s6/qJGviIBq0yiGyS9vqJfMBUuia/p1nlrV5b/AA7xUMgQnXeNrSL/AMeaUqfssznnB4EBqiH/AHftb+ZupVuhM64OBnX/AGsf2iJHouXGTKqVcZf1D9v7RhcSqg2u5HNVLAeo39JE8a4ktNfeGg1I69v5+ULwzxJRekrrYBtOXW1tJ0QSS6c7TZ1juKZV/wC4P/IowHoLQHDMWX+CoGtyvYj0MHxbxZhkIRj7zbAWv35yK4gl0WpS+K65SNL3Ox6iO1Eyiy4q5trBPVN4hwbH+0QXBBKhrEHmNR3jtRdZzz4PHp2ii/nGWIX8+f7xVDYwdckkHygUqRpRtmYjFE6Cbw2GOhPOGoYY31A0joQW0mpt2wXXBUUspI+X2kfxs/8AKfyOklcQdQZD8Y1puOqnbeLLg0etFYxiWyX/ANIJ9bzpOvQfX8EJkzpTc63prfzA1/md0qenfX7yL8nXF8F2S7feEp043Toc/wAEDXuo26/eFIDkba1rb/m0j+KYz2aXvrawHnvOzibatKnj8aajk8hoPKUjE5c+XWNe2D3N4wF0gqQhRBJ9POsA4ndOpO2WLkaxo9FY6kapLI+iY/QMziZBvZzIfLNRaCUtn1ms0XzTRedmogyKk4av0gM0wiHVGDCsZhqwFpl5qRjsvG8FiijAg7RC82rQ6h8HqWBxgeiWB5X8uojPCMSM6DmUb6ZftKl4Yqt7Cpf4bqPv+0mcC5/qqSjkrX8yD/bSc0o06PThK8ezJLxNUZTbLmWoBuQFDAWsx5X8usqfBWagjLUUa1BZQb2GZR35y+eIaYNFl0IK8+TDVSPrPMMdVdd9hqLed+c6ox+JzvI76H4jwavUxC11TOpdNAQAFUAm99uep01liTiLORSQEW0PwkJbckgkf4lQoYuqx301trbQ7jprLT4frBnVQAMo/ja3M7XP3hcbSs0cri3XsuvB1yBVP6RYX17C55nvHcS/MQWHswsfdta1jfQj7xxcODpfv37zmyxbKwkhNK0cp2a35eBOFsY3Sw4tpIxT9lG0HSkbQ5p+7qYKmxBm69XTfWVVJEndgKxuN4ji6RZTbTQ9ptHubHYn8MPiiALSbeyKLjKhwY+49NvipuwHdWNx/IhM9iPWRdWv7HElv0to3qd43jzoCvpJSXs6sbvhLUXFjA4hARrsN/KRmDrnMAb6yUqVRlJ6C9vKGDNNV0pXiLE5WyKfO3TcCQ1ITWNrF3ZjzJnCPOrWo0eNlm5TbJBJ2DFkqQoqTnlF2ImEZosxuZt3mUBcxoqjMZw1OSuHpxbDU5J0EjNmCZJkYtMgMeXOsHaPV6VjFyk6lIwMTsTYSdBYWzGrTkrCATpRFswHJNFIyqTTiZSMWvwSgNKqW0VCp/e/rtC8FxYbHLZbn3gTvkAGtvLS+wBNrsTpV6XEqlOmyIxUPY2GhsP1X3v0+fSN4Ko1JVKmzkq7kdFayUhrbfl/qbX4ZlHrZZZfior0el8bsUA9O5PTQdLyj8QwgcW2Fsp3bfX6WMsvGMawpoTzAPqdTPN+NcWdmKKxAG5GnpLRdoDROjB3IKnMCxGh3HIn1BJktwRCGubnquUBje4Ntex08rSg4B6yHMrEC4JvqD5g7yycM4+AeWYn0+LNoet/zeNaDq109Pwg09062TmSLAfQx+jXIsGS+vS9vl8pVuG8bRzZrAnZhobX1G2hvJlazfEjBgeWqm3cfn2jOn4HiyUqVFYWAI33BG3mIvUxhRd728/tBUqpa+Y2t+38esS4hjVW6i2Yi4v06ntOZoumSGC8RUnOVXGYbg3BHoQIfH1rqrAne2nfnPIMXxGn7cNTa7Ag3B0YfqAPPn0NuRteej8OqF6euo0/BNJSSpgjTfCUqLpm0gsTUuNNx+azeMxAVFB0J2HWLU3vIvnCq+yt8aoBm1Frjf8AvF8JiCgyPtsCeXST+OognlaQuIpD3lPK49OR/OkwYyadoep4YXzKbg6/4kguHzqy73BBPnKs2NNGmh5XAI7cxLbw3Eq6KyD3WFx/MMY18hpz24eacf4caTnSy307yGzT0jxlw4vTLruutuo52nmxE6Yy2R5maGshmm8KHidMxlBBJEQ6xnDLrAIIzSGsmwolcMJJUVkTQeSdCrJ2MOZZk59pMm2MUHFLrFGWNYl9YBjOkD8g2EwCbacgTGN5Z0gmptIxjpxpBrbn8vvDNtAkQIU0nxZjy1Pe2w9TYescwVUF0zbZlZu9lS3rd3PrFG289fQbfz8hO8Lq6DU3ZNALkke7lA5k6R0MvJ6fS4Z/U+6SQF10tzvlkJxrg+GwqMUQO4IBsMwQn/WeUsuPxH9PR9imlVxeoVOtMEfDcfqtp21POQXBKiozUqtglcZQWOz8i3brGjcY0ego0tijYrO+unYDQRF6B/NDPRsV4RqnWmFcWv7jBsoJOp26H5Q2H8G06b5sTiKbZAr+xQaODfck31I2trHrgGrZX8PgKuHw+Hr1N8SzKiWu+TKSrNc+8CADa17MuvITHC+Lsy3Wx1PK9hzuLdOR16TP/kLjBqPQakt0RKiZQLMubISQNNLKPlKU7PoUYoDckgixsxBN+e31iOLZJ/Hz5PRG4yVW+i92Nt+QJMp2M8RmuzU1zqnOoGIa5NlBsoIW5Ayg7decB7Mt8IdyTr7twLnKG58zJnAotBNVDOcpY5C2YtfVTsbK2/PMY0MSXRJTfgjMNgCa6AXvcH6/EDsw0vcT2XhtlsnQXPny/mef+EcGXcOw9xLhSd7kkt6badpecM1szXuTr9pyZ5Lavovhj8bOuMVszqg/SL/PtN0TYazVPD5veO+/r1H2jQoC05X12dPEqIriLCxIax3kAmKZyANzcN5C4/mWXiOFQKWYbRTg/Dl1fL8Ww6CH2FVVkXxfAZsObEZ0Ctl5hGuL/PL8454Iqk4YX5OwHlp/N5niF8jKT8LXRuVw+mnlofSOeDsNloBTcMjsDpodbg/IzoX9Mg/3/wBEvjVUoefUTy7xFwV6D5hrTfVWA2v+k9DPVeJJcaDaRLKHplHXMuu/Q/sYsZas08ayRPJkEbpPHOKcJanUKoCynVSBe46G3OA/oag3Rx/6mW5JHnShKLpo6zgTtK0VcEaGaDw6oUmKNWSVCpK9QqSUwzyM4BTJjNMi+ebkaYbKTVfWcAwRNzCLO1owS0G07E0yxTGgZ2onKiGUTGNhINhGDAuIUYWbe0tHgnBtmfEAaUUsr9KtQhFy8iVUu3YhfWu4PB1K1RaVJczubAfuSeQA1J6CemY9FweGp4ZCNPfqOdLtuWN9rk6dAAOUqlSst/HhtNN+F0TxhVRa/K9hqTtueZJlb4pQqF0cgAalV1vy1Pft27wOK4wzOMhIUEEnm1vPYS0HCrWpo/MdO/Pp13+u0G/yS9HRPMpXRGcPxpT4ldjZrjOApA1Gl9NvqYXE8RVwF9miBe7NY7m40v8AltJt+CHYudSR6b38zOqPDkG9TWwB93qNL/I/m9t19nPbuxHE4FXF72YEErpZjbWwsdTrykTi8OoRLHQCxHMHU3Out7Hp0lwGEoAXLs17E2GgIOv7Sv4zg9ZqroinIWZlYgiynr5aadoNkErvtjfXXmL7Aj4bKfdsOkZ4VQqVXWkG63ttY3LEn6SWxPhl0Ni5y230tJfgWASkbICzG12I135dBJTzxiueRo4m5dJvDYQIiog0UAAWFz3Ntz1841hrm15I4OgctzqYAocxsJ58k31nbFrwcEEHS8Yo2Aux27zfsMoux7ys8c4ozn2SaD9RHToLQJUMvlwllqnE1Mo/6anU/wCojl5SaKKqkdBIrgq5KQuOW0jeOcSYIxDW9f26xovv+WCa/wCIgcdi2xGNRToiNmuNdF5/O09F4Jhcidbm+s838JYUkvWb9RKA/Vj+09M4VU9wDedDST1+jn7rsFxIvpa8j8RhdPOPve9yNITKIjjYylRW2w7IbiO0Sp8+YjtWlc2F5HYinlOZb94lOJROxfG8JoVPipqT1AAPzlQ434ZKe9SuRzXmPKXlK4tqALwr0wyxoza8CTxRkuo8iRCDqLGSGHaWfiXhcOxZHIJ5EXH9pFr4cxINggbuCP5juSZwywyT8AvaTIx/wTE//kfmPvMi0if45/TKEphVgIVTOmRgqmEgVadBojMdoIVROacOogbNRwwnDCFaBZpkYPwjiL4aulZNSh1XbMpFmX1BP0h+P8afF1C7jKuyoDcADmepkaxhaKxtnQdmlSBBJZPDHEshyMTY/LykV7MWnFO4YEGxHe0VvZUCEnF2eiOUy6qW8jO8HQRkDKgtfmLkG+sR4U7MAj/FlDDuDzlg4VhcqMLb6/SRqSlR31Fxshsezp8AAGugAA18pC1+NOgzMgL9dbfLqNde5lyxOFzSvcW4ZdNuV4HcXYYpPhWK/GHxLhTproBsdZfOB8PyopO/5eUvwzwsmvcjRT/ieo4OhYD1HzjJKUgt6oJUSy7RRUtaSL0yZ1Tw4tqPnNKDb4CM0kV/iTHKdCelusgcPwzIQX+Jjmb7S9f8KS+b/HykPxOja5kJxlFdOjHOPoTr4pUT02EoPHeIms4RBzyr3vtymcZ4w+ZkX4dQe/kYz4Q4c1R/atqAbLfmeZnRhx6R2kQyT2lrEtXCOHZESmuyj6nVj87y14KmEUCAwOFyjzkiq25QqL/ZglL+1HDnXzg2Yq1p2R73beFpUg1yedpvLAqSF2HvX+cTxKXJtJCsmW5P5zkdRqgknnFl9Dx+yMdTcg/xGMFW1sTN4lATprEgSDuBIeGXXUT1SncXEWB+cZ4Y4Zd7mDxtPKbiWauNkU6lQPNMg88ySK2eFKIVVmIsIona2eOcETFMIVnFoLMHpmGDRVGhA0DQQrNF3ads8DeZIDOljNCLCHpNMzDcJgaWeoi2vdgLQSG8nvBeHD4lSf0gt8v8wRNFXJF4rcNW9NgLMgsLdCNRJVUstoOp+0YbUQ+zsfgXyRTE4cEfOOk2kFx/i4pLoLsdh/JiTaoME74KcEpqtR/OW3DieXcA4m4q+/sx376z0vDVbiLB06Y2VX0kQ8IkBTaHBHeXXSAVhpK1x1CVYLuQdbXtLETeQvHLZGA07nWJlSaK4pU6PI8FwU1q7Lc5QfebXXtcz0/hXDkpqqqBYCQ3AsKqtcWtLhQTneKpORSS1C06O1+s2wI/O8Oi7fnnNOLntKtcIp9F0paEmPYalYDTeZRAOkPUqgaQxil0EpPwQXifFBEsACz2VR3OgPpqfSRPC8Kyga8tb/vC8Uqe0rqDqibHqx5+UmfYaaaWnLL5SZ1R+MUvshsSlvSRVQ3Ov8SYx6ncj5SErLfrJy8lYDvCq+V7X0lgxKZllSwhIcC/0lvwxumsph7aJ5lTTREX7Gbkh/SzI+hPc8BAmrzUyWPOOw00BNzIpjDNZpkyYxhabRZkyYyOws2syZMEYovLZ4FqAYgjqpmTJgw/ZHozp0mI2lpkyb2dXoHiXAW5lM4hRNZ9tzNTJDJ+xXERPE6C03RL2z3Uf+upP0ly4PjMyqCdbDXr3mTJpKqZn7J+lWEOrCbmToiQZlWuqi7Gw+UrXEuJJVuqEkDmLW/vNzJPLJ0VwxVgOG0LSzYbvsPqesyZExD5fIZn+0xW0N5kyWZJBab21kVxPiGRCQdToPM85kyCbdBxpOXRDhSi97XuQbncyy0wMsyZJYyuYhuJp05yCxFC3OZMk5eSkPApRYhgL21lu4afdmTIcP7GzfqNZJuZMnWcZ//Z",
                    ImagemExtension = "jpg"
                };

                context.Publicacoes.Add(publicacao); ;

                publicacao.SaveImage();

                context.SaveChanges();
            }
        }
    }
}