import React, { useState, useEffect } from 'react'
import EfeitoFade from '../Reutilizaveis/EfeitoFade';
import Spinner from '../Reutilizaveis/Spinner';
import DetalhesPet from './DetalhesPet';
import Pesquisar from './Pesquisar';
import Publicacao from './Publicacao';
import { getPublicacoes, getLocalidades, getUserById } from '../../Services/ServicosPetFeliz'
import './publicacoes.css';
import { RemoveAcentos, GetDadosCidadeWithList } from '../../Utilidades/Util'
import { getUserAuthenticated } from '../../auth'

export default function MinhasPublicacoes({ showModal }) {
  const [publicacoesFiltered, setPublicacoesFiltered] = useState([]);
  const [publicacoes, setPublicacoes] = useState([]);
  const [publicSelected, setPublicSelected] = useState(null);
  const [userPublicSelected, setUserPublicSelected] = useState(null);
  const [states, setStates] = useState(null);
  const [requisicaoRealizada, setRequisicaoRealizada] = useState(false);

  useEffect(() => {
    var timeout = setTimeout(async () => {
      var userLogado = await getUserAuthenticated();
      var json = await getPublicacoes(userLogado.id);
      var states = await getLocalidades();
      setStates(states);
      setPublicacoes(json);
      setPublicacoesFiltered(json);
      setRequisicaoRealizada(true)
    }, 1000);

    return () => { clearTimeout(timeout) }
  }, [])

  const publicacaoSelecionada = async (id) => {
    const pet = publicacoes.find(x => x.id === id);
    const user = await getUserById(pet.userId);
    setPublicSelected(pet);
    setUserPublicSelected(user);
  }

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

  if (publicacoes.length <= 0 && !requisicaoRealizada) {
    return (<Spinner />);
  }

  return (
    <div className="containerPublicacoes" >
      <Pesquisar find={Finder} />
      <EfeitoFade>
        <div className='row publicacoes'>
          {
            publicacoes.length <= 0 ? (
              <div className='row w-100 text-center text-light'>
                <div className='col'>
                  <span style={{ backgroundColor: '#6c757d', borderRadius: '10%', padding: '5px 25px 5px 25px' }}>Nenhuma publicação realizada até o momento!</span>
                </div>
              </div>
            ) : <></>
          }
          {publicacoesFiltered.map((x) => {
            return (
              <Publicacao key={x.id} dados={x} selected={publicacaoSelecionada} statesAll={states} />
            );
          })}
        </div>
      </EfeitoFade>
      <DetalhesPet publicacao={publicSelected} ehEdicao={true} user={userPublicSelected} statesAll={states} showModal={showModal} />
    </div>
  );
};