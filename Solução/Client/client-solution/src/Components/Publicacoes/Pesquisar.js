import React, { useState } from 'react';
import InputPadrao from '../Formulario/InputPadrao';


export default function Pesquisar({ find }) {
  const [txtFind, setFind] = useState('');

  const Finder = (event) => {
    event.preventDefault();
    find();
  }

  const ChangeParameter = (texto) => {
    setFind(texto);
  }

  return (
    <div className="containerPesquisar">
      <form className="formPesquisa" onSubmit={Finder}>
        <div className="row ">
          <div className="col-7" style={{ paddingRight: 0 }}><InputPadrao label='' value={txtFind} change={ChangeParameter} type='email' /></div>
          <div className="col-5"><button type="submit" className="btn btn-secondary">Pesquisar</button></div>
        </div>
      </form>
    </div>
  )
}
