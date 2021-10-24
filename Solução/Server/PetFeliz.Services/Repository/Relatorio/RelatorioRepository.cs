using Microsoft.EntityFrameworkCore;
using PetFeliz.Domain.DTO;
using PetFeliz.Interfaces.Repository.Relatorio;
using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace PetFeliz.Services.Repository.Relatorio
{
    public class RelatorioRepository : IRelatorioRepository
    {
        protected readonly ContextDB _contextDB;

        public RelatorioRepository(ContextDB contextDB)
        {
            _contextDB = contextDB;
        }

        public async Task<List<DTORelatorioCountry>> GetRelatorioAdocaoPorEstado()
        {
            return await Task.Run(() =>
            {
                List<DTORelatorioCountry> lista = new List<DTORelatorioCountry>();

                var sql = $@"SELECT
	                        COUNT(*) AS QUANTIDADE,
	                        CO.Name AS NAME_COUNTRY
                        FROM DBO.PUBLICACOES P
	                        INNER JOIN DBO.CITIES C ON P.CidadeId = C.Id
	                        INNER JOIN DBO.COUNTRIES CO ON C.CountryId = CO.Id
                        WHERE isAdotado = 0
                        GROUP BY CO.Name";

                using (var command = _contextDB.Database.GetDbConnection().CreateCommand())
                {
                    command.CommandText = sql;
                    _contextDB.Database.OpenConnection();
                    using (var result = command.ExecuteReader())
                    {
                        if (result.HasRows)
                        {
                            while (result.Read())
                            {
                                lista.Add(new DTORelatorioCountry()
                                {                                  
                                    Quantidade = result.GetInt32(0),
                                    Estado = result.GetString(1)
                                });
                            }
                        }
                    }
                }

                return lista;
            });
        }
    }
}