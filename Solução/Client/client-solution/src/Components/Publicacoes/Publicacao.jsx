import React from 'react';
import { GetDadosCidadeWithList } from '../../Utilidades/Util'

export default function Publicacao({ dados, selected, statesAll }) {
  const { id,
    nome,
    cidadeId,
    estadoId,
    nameImagem,
    sexo,
    publicationCanceled } = dados;

  var { cityName, stateName } = GetDadosCidadeWithList(statesAll, cidadeId, estadoId);

  const CarregarInformacoes = () => {
    selected(id);
  }

  let styleCanceled = publicationCanceled ? { borderColor: 'red' } : {}

  return (
    <div className='col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3' style={styleCanceled}>
      <div className="card" style={{ width: '100%' }}>
        <img className="card-img-top img-thumbnail" src={nameImagem} alt="publicação" />
        <div className="card-body">
          <h5 className="card-title text-truncate">{nome} - {sexo}</h5>
          <p className="card-text text-truncate" style={{ color: 'darkgray' }}>{stateName} - {cityName}</p>
          {
            publicationCanceled ?
              <span style={{ color: 'red' }}>Publicação cancelada</span>
              :
              <p type="button" onClick={CarregarInformacoes} className="btn btn-secondary" data-toggle="modal" data-target=".modal-detalhes-pet" style={{ width: '100%' }}>Detalhes</p>
          }
        </div>
      </div>
    </div>
  )
}