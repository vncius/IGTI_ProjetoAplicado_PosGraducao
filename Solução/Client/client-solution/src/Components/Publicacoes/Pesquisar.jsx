import React, { useEffect, useState } from 'react';
import InputPadrao from '../Formulario/InputPadrao';


export default function Pesquisar({ find }) {
  const [states, setStates] = useState([])
  const [txtFind, setFind] = useState('');
  const [stateSeach, setStateSeach] = useState(false);
  const [noneSearch, setNoneSearch] = useState('none');

  useEffect(() => {
    var timeout = setTimeout(async () => {
      var response = await fetch('http://localhost:3000/Localidades/');
      var json = await response.json();
      setStates(json.map(x => x.Estado));
    }, 1000);

    return () => { clearTimeout(timeout) }
  }, [])

  const Finder = (event) => {
    event.preventDefault();
    const { selectSexo, selectTypeFilter, selectState, desc } = event.target.elements;
    const search = stateSeach ? selectState.value : desc.value;
    find(parseInt(selectSexo.value), parseInt(selectTypeFilter.value), search);
  }

  const ChangeParameter = (texto) => {
    setFind(texto);
  }

  const handleTypeSearch = (event) => {
    if (event.target.value === '0') setStateSeach(true);
    else setStateSeach(false);
    if (event.target.value === '-1') setNoneSearch('none');
    else setNoneSearch('');
  }

  return (
    <div className="containerPesquisar">
      <form className="formPesquisa" onSubmit={Finder}>
        <div className="row w-100 d-flex justify-content-center">
          <div className="col-6 col-md-2 col-xl-2">
            <div className="form-group">

              <label htmlFor="selectSexo">Sexo</label>
              <select className="form-control" id="selectSexo" defaultValue='0'>
                <option value='0'>Todos</option>
                <option value='1'>Macho</option>
                <option value='2'>Fêmea</option>
              </select>
            </div>
          </div>
          <div className="col-6 col-md-2 col-xl-2">
            <div className="form-group">

              <label htmlFor="selectTypeFilter">Filtros</label>
              <select className="form-control" id="selectTypeFilter" defaultValue='-1' onChange={handleTypeSearch}>
                <option value='-1'>Nenhum</option>
                <option value='0'>Estado</option>
                <option value='1'>Cidade</option>
                <option value='2'>Setor</option>
              </select>
            </div>
          </div>
          {
            !stateSeach ? (
              <div className="col-7 col-md-5" style={{ paddingRight: 0 }} style={{ display: noneSearch }}>
                <InputPadrao label='Descrição' value={txtFind} change={ChangeParameter} type='text' id='desc' />
              </div>
            ) : (
              <div className="col-7 col-md-5" style={{ paddingRight: 0 }}>
                <div className="form-group">
                  <label htmlFor="selectState">Estados</label>
                  <select className="form-control" id="selectState" defaultValue='TO'>
                    {
                      states.map((x, index) => {
                        return (<option key={index} value={x}>{x}</option>);
                      })
                    }
                  </select>
                </div>
              </div>
            )
          }
          <div className="col-5 col-md-3 col-lg-2 w-100 btn-pesquisar">
            <button type="submit" className="btn btn-secondary">Pesquisar</button>
          </div>
        </div>
      </form>
    </div>
  )
}
