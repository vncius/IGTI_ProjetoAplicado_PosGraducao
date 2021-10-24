using PetFeliz.Domain.DTO;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PetFeliz.Interfaces.Service.Relatorio
{
    public interface IRelatorioService
    {
        Task<List<DTORelatorioCountry>> GetRelatorioAdocaoPorEstado();
    }
}