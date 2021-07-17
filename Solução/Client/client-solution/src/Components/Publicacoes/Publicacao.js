import React, { Component } from 'react';

export default function Publicacao({ dados }) {
  const { Id,
    Nome,
    Descricao,
    Estado,
    Cidade,
    Setor,
    ImgPrincipal } = dados;

  const CarregarInformacoes = (event) => {

  }

  return (
    <div className='col-12 col-sm-6 col-md-4 col-lg-3'>
      <div className="card" style={{ width: '100%' }}>
        <img className="card-img-top img-thumbnail" src={ImgPrincipal} alt="publicação" />
        <div className="card-body">
          <h5 className="card-title">{Nome}</h5>
          <p className="card-text">{Descricao}</p>
          <p onClick={CarregarInformacoes} className="btn btn-primary">Ver mais</p>
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