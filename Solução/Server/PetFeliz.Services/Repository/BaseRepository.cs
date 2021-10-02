using PetFeliz.Domain;
using PetFeliz.Interfaces.Repository;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PetFeliz.Services.Repository
{
    public abstract class BaseRepository<TDto> : IBaseRepository<TDto> where TDto : BaseObject
    {
        protected readonly ContextDB _contextDB;

        public BaseRepository(ContextDB contextDB)
        {
            _contextDB = contextDB;
        }

        public abstract Task<TDto> GetById(long id);

        public abstract Task<IList<TDto>> GetList();

        public async virtual Task<T> Save<T>(T model)
        {
            var modelConverted = model as TDto;

            if (modelConverted != null && modelConverted.Id > 0)
            {
                var item = GetById(modelConverted.Id) as TDto;
                if (item != null)
                {
                    await DeleteById(item.Id);
                }
            }

            await _contextDB.AddAsync(model);
            await _contextDB.SaveChangesAsync();
            return model;
        }

        public async virtual Task<TDto> DeleteById(long id)
        {
            var item = GetById(id);
            if (item == null)
            {
                return null;
            }

            _contextDB.Remove(item);
            await _contextDB.SaveChangesAsync();
            return item as TDto;
        }
    }
}