﻿using Microsoft.EntityFrameworkCore;
using PetFeliz.Domain;
using PetFeliz.Interfaces.Repository;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PetFeliz.Services.Repository
{
    public abstract class BaseRepository<TDto> : IBaseRepository<TDto> where TDto : BaseModel
    {
        protected readonly DbSet<TDto> _contextDB;

        public BaseRepository(ContextDB contextDB)
        {
            _contextDB = contextDB.Set<TDto>();
        }

        public async Task<TDto> GetById(long id)
        {
            return await _contextDB.FindAsync(id);
        }

        public async Task<IList<TDto>> GetList()
        {
            return await _contextDB.AsNoTracking().ToListAsync();
        }

        public async virtual Task<TDto> Save(TDto model)
        {
            var modelConverted = model as TDto;

            if (modelConverted != null && modelConverted.Id > 0)
            {
                var item = await GetById(modelConverted.Id) as TDto;
                if (item != null)
                {
                    await DeleteById(item.Id);
                }
            }

            await _contextDB.AddAsync(model);
            return model;
        }

        public async virtual Task<TDto> DeleteById(long id)
        {
            var item = await GetById(id);

            if (item == null || item == null)
            {
                return null;
            }

            _contextDB.Remove(item);
            return item;
        }
    }
}