using Newtonsoft.Json;
using PetFeliz.Interfaces.Repository;
using PetFeliz.Interfaces.Service;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;

namespace PetFeliz.Services.Service
{
    public abstract class BaseService<T> : IBaseService<T> 
    {
        private readonly IBaseRepository<T> _repository;

        public BaseService(IBaseRepository<T> repository)
        {
            _repository = repository;
        }

        public abstract Task<object> GetDTO(T model);
        public abstract Task<IList<object>> GetDTO(IList<T> model);

        public virtual async Task<IList<TDto>> GetList<TDto>()
        {
            var result = await _repository.GetList();
            ValidReturnGet(result);
            var dto = await GetDTO(result);
            return ConvertTo<List<TDto>>(dto);
        }

        public virtual async Task<TDto> GetById<TDto>(long id)
        {
            var result = await _repository.GetById(id);
            ValideReturnGet(result);
            var dto = await GetDTO(result);
            return ConvertTo<TDto>(dto);
        }

        public virtual async Task<TDto> Save<TDto>(T user)
        {
            var result = await _repository.Save(user);
            ValidReturnSave(result);
            var dto = await GetDTO(result);
            return ConvertTo<TDto>(dto);
        }

        public virtual async Task<TDto> Delete<TDto>(long id)
        {
            var result = await _repository.DeleteById(id);
            ValideRetornoDelete(result);
            var dto = await GetDTO(result);
            return ConvertTo<TDto>(dto);
        }
        #region PROTECTED METHODS

        protected void ValidReturnGet(IList<T> lista)
        {
            if (lista.Count == 0) throw new HttpException(HttpStatusCode.NoContent);
        }

        protected void ValideReturnGet(T valor)
        {
            if (valor == null) throw new HttpException(HttpStatusCode.NoContent);
        }

        protected void ValidReturnSave(T valor)
        {
            if (valor == null) throw new HttpException(HttpStatusCode.BadRequest, "It was not possible to include the requested amount");
        }

        protected void ValideRetornoDelete(T valor)
        {
            if (valor == null) throw new HttpException(HttpStatusCode.BadRequest, "Object not encountered");
        }

        protected TDto ConvertTo<TDto>(object dtoConverted)
        {
            //if (!(dtoConverted is TDto))
            //{
            //    var expected = typeof(TDto).Name;
            //    var entrance = dtoConverted.GetType().Name;
            //    throw new Exception($"Failed to convert model to DTO. Expected: {expected} - Entrance: {entrance}");
            //}

            if (dtoConverted == null)
            {
                return default;
            }

            var serialized = JsonConvert.SerializeObject(dtoConverted);

            return JsonConvert.DeserializeObject<TDto>(serialized);
        }
        #endregion PROTECTED METHODS
    }
}