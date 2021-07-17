import React, { useState, useEffect } from 'react'
import Pesquisar from './Pesquisar';
import Publicacao from './Publicacao';
import '../../Content/publicacoes.css';

//import FadeIn from 'react-fade-in';

export default function Publicacoes({ ehTodasPublicacoes }) {
  const [publicacoes, setPublicacoes] = useState([]);

  useEffect(() => {
    (async () => {
      var response = await fetch('http://localhost:3000/Publicacoes/');
      var json = await response.json();
      setPublicacoes(json)
    })();
  }, [])

  const Finder = (texto) => {

  }

  return (
    <div className="containerPublicacoes">
      <Pesquisar find={Finder} />
      <div className='row publicacoes'>
        {publicacoes.map((x) => {
          return (
            <Publicacao key={x.id} dados={x} />
          );
        })}</div>
    </div>


  );
};