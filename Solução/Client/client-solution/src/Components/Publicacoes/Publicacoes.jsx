import React, { useState, useEffect } from 'react'
import EfeitoFade from '../Reutilizaveis/EfeitoFade';
import Spinner from '../Reutilizaveis/Spinner';
import DetalhesPet from './DetalhesPet';
import Pesquisar from './Pesquisar';
import Publicacao from './Publicacao';
import './publicacoes.css';
import { RemoveAcentos, GetDadosCidadeWithList } from '../../Utilidades/Util'
import { getPublicacoes, getLocalidades, getUserById } from '../../Services/ServicosPetFeliz'

export default function Publicacoes({ props }) {
  const [publicacoesFiltered, setPublicacoesFiltered] = useState([]);
  const [publicacoes, setPublicacoes] = useState([]);
  const [publicSelected, setPublicSelected] = useState(null);
  const [userPublicSelected, setUserPublicSelected] = useState(null);
  const [states, setStates] = useState(null);
  const [publicLink, setPublicLink] = useState(null);
  const [showDetalhes, setShowDetalhes] = useState(false);

  useEffect(() => {
    if (publicLink) {
      publicacaoSelecionada(publicLink);
      setShowDetalhes(true);
    }
  }, [publicLink]);

  useEffect(() => {
    var timeout = setTimeout(async () => {
      var json = await getPublicacoes();
      var states = await getLocalidades();
      json = json.filter(x => !x.publicationCanceled)
      setStates(states);
      setPublicacoes(json);
      setPublicacoesFiltered(json);
      setShowDetalhes(false);

      if (props && props.match && props.match.params && props.match.params.search && props.match.params.search !== '') {
        try {
          setPublicLink(parseInt(props.match.params.search));
        } catch (error) { }
      }
    }, 1000);

    return () => { clearTimeout(timeout) }
  }, [])

  const Finder = (Sexo, tipoFiltro, descricao) => {
    let publicFiltered = [...publicacoes];

    publicFiltered = publicFiltered.filter(value => {
      let retorno = true;
      const { estadoId, cidadeId, sexo } = value;
      const descNormalized = RemoveAcentos(descricao);
      const dados = GetDadosCidadeWithList(states, cidadeId, estadoId);

      if (Sexo === 1 && sexo !== 'Macho') retorno = false;
      if (Sexo === 2 && sexo !== 'Femêa') retorno = false;
      if (descNormalized !== '' && descNormalized !== null) {
        if (tipoFiltro === 0 && !RemoveAcentos(dados.stateName).includes(descNormalized)) retorno = false;
        if (tipoFiltro === 1 && !RemoveAcentos(dados.cityName).includes(descNormalized)) retorno = false;
      }

      return retorno;
    });
    setPublicacoesFiltered(publicFiltered);
  }

  const publicacaoSelecionada = async (id) => {
    const pet = publicacoes.find(x => x.id === id);
    if (pet) {
      const user = await getUserById(pet.userId);
      setUserPublicSelected(user);
      setPublicSelected(pet);
      setShowDetalhes(true);
    }
  }

  if (publicacoes.length <= 0) {
    return (<Spinner></Spinner>);
  }

  return (
    <div className="containerPublicacoes">
      <Pesquisar find={Finder} states={states} />
      <EfeitoFade>
        <div className='row publicacoes'>

          {publicacoesFiltered.map((x) => {
            return (
              <Publicacao key={x.id} dados={x} selected={publicacaoSelecionada} statesAll={states} />
            );
          })}

        </div>
      </EfeitoFade>
      {
        showDetalhes ? <DetalhesPet publicacao={publicSelected} user={userPublicSelected} statesAll={states} /> : <></>
      }
    </div>
  );
};

