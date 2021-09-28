import React, { useState, useEffect } from 'react'
import EfeitoFade from '../Reutilizaveis/EfeitoFade';
import Spinner from '../Reutilizaveis/Spinner';
import DetalhesPet from './DetalhesPet';
import Pesquisar from './Pesquisar';
import Publicacao from './Publicacao';
import './publicacoes.css';
import { RemoveAcentos } from '../../Utilidades/Util'

export default function Publicacoes() {
  const [publicacoesFiltered, setPublicacoesFiltered] = useState([]);
  const [publicacoes, setPublicacoes] = useState([]);
  const [publicSelected, setPublicSelected] = useState(null);

  useEffect(() => {
    var timeout = setTimeout(async () => {
      var response = await fetch('http://localhost:3000/Publicacoes/');
      var json = await response.json();

      setPublicacoes(json);
      setPublicacoesFiltered(json);
    }, 1000);

    return () => { clearTimeout(timeout) }
  }, [])

  const Finder = (Sexo, tipoFiltro, descricao) => {
    let publicFiltered = [...publicacoes];

    publicFiltered = publicFiltered.filter(value => {
      let retorno = true;
      const { Estado, Cidade, Setor } = value;
      const descNormalized = RemoveAcentos(descricao);

      if (Sexo === 1 && value.Sexo !== 'Macho') retorno = false;
      if (Sexo === 2 && value.Sexo !== 'Femêa') retorno = false;
      if (descNormalized !== '' && descNormalized !== null) {
        if (tipoFiltro == 0 && !RemoveAcentos(Estado).includes(descNormalized)) retorno = false;
        if (tipoFiltro == 1 && !RemoveAcentos(Cidade).includes(descNormalized)) retorno = false;
        if (tipoFiltro == 2 && !RemoveAcentos(Setor).includes(descNormalized)) retorno = false;
      }

      return retorno;
    });
    setPublicacoesFiltered(publicFiltered);
  }

  const publicacaoSelecionada = (id) => {
    const pet = publicacoes.find(x => x.Id === id);
    setPublicSelected(pet);
  }

  if (publicacoes.length <= 0) {
    return (<Spinner></Spinner>);
  }

  return (
    <div className="containerPublicacoes">
      <Pesquisar find={Finder} />
      <EfeitoFade>
        <div className='row publicacoes'>

          {publicacoesFiltered.map((x) => {
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

