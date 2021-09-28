import React, { useState, useEffect } from 'react'
import EfeitoFade from '../Reutilizaveis/EfeitoFade';
import Spinner from '../Reutilizaveis/Spinner';
import DetalhesPet from './DetalhesPet';
import Pesquisar from './Pesquisar';
import Publicacao from './Publicacao';
import './publicacoes.css';

export default function MinhasPublicacoes({ ehTodasPublicacoes }) {
  const [publicacoes, setPublicacoes] = useState([]);
  const [publicSelected, setPublicSelected] = useState(null);

  useEffect(() => {
    var timeout = setTimeout(async () => {
      var response = await fetch('http://localhost:3000/Publicacoes/');
      var json = await response.json();
      setPublicacoes([json[0]])
    }, 1000);

    return () => { clearTimeout(timeout) }
  }, [])

  const Finder = (texto) => {

  }

  const publicacaoSelecionada = (id) => {
    const pet = publicacoes.find(x => x.Id === id);
    setPublicSelected(pet);
  }

  if (publicacoes.length <= 0) {
    return (<Spinner />);
  }

  return (
    <div className="containerPublicacoes" >
      <Pesquisar find={Finder} />
      <EfeitoFade>
        <div className='row publicacoes'>
          {publicacoes.map((x) => {
            return (
              <Publicacao key={x.id} dados={x} selected={publicacaoSelecionada} />
            );
          })}
        </div>
      </EfeitoFade>
      <DetalhesPet publicacao={publicSelected} />
    </div>
  );
};