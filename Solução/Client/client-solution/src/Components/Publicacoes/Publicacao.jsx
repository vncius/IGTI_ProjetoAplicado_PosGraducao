import React, { Component } from 'react';

export default function Publicacao({ dados, selected }) {
  const { Id,
    Nome,
    Descricao,
    Estado,
    Cidade,
    Setor,
    ImgPrincipal,
    Sexo } = dados;

  const CarregarInformacoes = () => {
    console.log(dados);
    selected(Id);
  }

  return (
    <div className='col-12 col-sm-6 col-md-4 col-lg-3'>
      <div className="card" style={{ width: '100%' }}>
        <img className="card-img-top img-thumbnail" src={ImgPrincipal} alt="publicação" />
        <div className="card-body">
          <h5 className="card-title text-truncate">{Nome} - {Sexo}</h5>
          <p className="card-text text-truncate" style={{ color: 'darkgray' }}>{Estado} - {Cidade} - {Setor}</p>
          <p type="button" onClick={CarregarInformacoes} className="btn btn-secondary" data-toggle="modal" data-target=".modal-detalhes-pet" style={{ width: '100%' }}>Detalhes</p>
        </div>
      </div>
    </div>


    // <div classNameName="item" style={{ width: '250px' }}>
    //   <Card header={<CardTitle image={ImgPrincipal}>{Nome}</CardTitle>}>
    //     {Descricao}
    //   </Card>
    // </div>
  )
}