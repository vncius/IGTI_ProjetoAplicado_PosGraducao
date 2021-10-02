using Microsoft.EntityFrameworkCore;
using PetFeliz.Domain.Model;
using PetFeliz.Interfaces.Repository.Publicacao;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PetFeliz.Services.Repository.Publicacao
{
    public class PublicacaoRepository : BaseRepository<PublicationModel>, IPublicacaoRepository
    {
        public PublicacaoRepository(ContextDB contextDB) : base(contextDB)
        {
        }

        public async override Task<PublicationModel> GetById(long id)
        {
            return await _contextDB.Publicacoes.FindAsync(id);
        }

        public async override Task<IList<PublicationModel>> GetList()
        {
            return await _contextDB.Publicacoes.ToListAsync();
        }

        public async Task<IList<PublicationModel>> GetByUserId(long id)
        {
            return await _contextDB.Publicacoes.Where(x => x.idUser == id).ToListAsync();
        }
    }
}