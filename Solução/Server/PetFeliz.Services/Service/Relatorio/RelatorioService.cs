using PetFeliz.Domain.DTO;
using PetFeliz.Interfaces.Repository.Relatorio;
using PetFeliz.Interfaces.Service.Relatorio;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PetFeliz.Services.Service.Relatorio
{
    public class RelatorioService : IRelatorioService
    {
        private readonly IRelatorioRepository _repository;

        public RelatorioService(IRelatorioRepository repository)
        {
            _repository = repository;
        }

        public async Task<List<DTORelatorioCountry>> GetRelatorioAdocaoPorEstado()
        {
            return await _repository.GetRelatorioAdocaoPorEstado();
        }
    }
}