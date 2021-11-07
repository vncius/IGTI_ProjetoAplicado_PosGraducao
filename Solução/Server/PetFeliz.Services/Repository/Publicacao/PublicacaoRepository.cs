using Microsoft.EntityFrameworkCore;
using PetFeliz.Domain.Model.Publication;
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
        public async Task<IList<PublicationModel>> GetByUserId(long id)
        {
            return await _contextDB.Set<PublicationModel>().Where(x => x.User.Id == id).AsNoTracking().ToListAsync();
        }
    }
}