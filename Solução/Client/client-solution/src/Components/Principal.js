import React, { useState } from 'react'
import { Icon, Navbar, NavItem } from 'react-materialize';

export default function Principal() {
  const [containerAtual, setContainerAtual] = useState('Publicações');

  const atualizaContainer = (event) => {
    const eve = event;
  }

  return (
    <div>
      <Navbar alignLinks="right"
        brand={<a>Adota PET</a>}
        id="mobile-nav"
        menuIcon={<Icon>menu</Icon>}
        options={optionsComponent}>
        <span className="btn-menu" onClick={atualizaContainer}>Publicações</span>
        <span className="btn-menu" onClick={atualizaContainer}>Configurações</span>
        <span className="btn-menu" onClick={atualizaContainer}>Sair</span>
        <NavItem>ok</NavItem>
      </Navbar>
      <div className="container-principal">

      </div>
    </div>
  );
}

const optionsComponent = {
  draggable: true,
  edge: 'left',
  inDuration: 250,
  onCloseEnd: null,
  onCloseStart: null,
  onOpenEnd: null,
  onOpenStart: null,
  outDuration: 200,
  preventScrolling: true
}