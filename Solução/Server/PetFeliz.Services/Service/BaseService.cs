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

        public async Task<IList<T>> GetList()
        {
            var result = await _repository.GetList();

            return ValidReturnGet(result);
        }

        public async Task<T> GetById(long id)
        {
            var result = await _repository.GetById(id);

            return ValideReturnGet(result);
        }

        public async Task<T> Save(T publicacao)
        {
            var result = await _repository.Save(publicacao);
            return ValidReturnSave(result);
        }

        public async Task<T> Delete(long id)
        {
            var result = await _repository.DeleteById(id);
            return ValideRetornoDelete(result);
        }

        #region PROTECTED METHODS

        protected IList<T> ValidReturnGet(IList<T> lista)
        {
            if (lista.Count == 0) throw new HttpException(HttpStatusCode.NoContent);
            return lista;
        }

        protected T ValideReturnGet(T valor)
        {
            return valor ?? throw new HttpException(HttpStatusCode.NoContent); ;
        }

        protected T ValidReturnSave(T valor)
        {
            return valor ?? throw new HttpException(HttpStatusCode.BadRequest);
        }

        protected T ValideRetornoDelete(T valor)
        {
            return valor ?? throw new HttpException(HttpStatusCode.BadRequest);
        }

        #endregion PROTECTED METHODS
    }
}