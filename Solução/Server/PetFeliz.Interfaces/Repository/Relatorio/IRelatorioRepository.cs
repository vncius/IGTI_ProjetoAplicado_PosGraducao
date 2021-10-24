using PetFeliz.Domain.DTO;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PetFeliz.Interfaces.Repository.Relatorio
{
    public interface IRelatorioRepository
    {
        Task<List<DTORelatorioCountry>> GetRelatorioAdocaoPorEstado();
    }
}