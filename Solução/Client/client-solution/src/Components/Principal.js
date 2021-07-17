import React, { useState } from 'react'
import Publicacoes from './Publicacoes/Publicacoes';
import Configuracoes from './Configuracoes';
//import FadeIn from 'react-fade-in';

export default function Principal() {
  const [containerAtual, setContainerAtual] = useState('publicacoes');

  const atualizaContainer = (event) => {
    setContainerAtual(event.target.attributes.select.value);
  }

  const obtenhaContainer = () => {
    if (containerAtual === menu.publicacoes.desc) return menu.publicacoes.comp;
    if (containerAtual === menu.configuracoes.desc) return menu.configuracoes.comp;
    if (containerAtual === menu.minhasPublicacoes.desc) return menu.minhasPublicacoes.comp;
  }

  return (
    <div className='DivPrincipal'>
      <nav className="navbar navbar-expand-lg fixed-top navbar-dark bg-dark" style={{ paddingBottom: 0 }}>
        <i className="material-icons" style={{ paddingBottom: '18px', marginRight: '5px' }}>pets</i>
        <p className="navbar-brand">Adota PET</p>

        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <p className="nav-link" select={menu.publicacoes.desc} onClick={atualizaContainer}>Publicações<span className="sr-only">(current)</span></p>
            </li>
            <li className="nav-item">
              <p className="nav-link" select={menu.publicacoes.desc} onClick={atualizaContainer}>Minhas Publicações</p>
            </li>
            <li className="nav-item dropdown">
              <p className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Configurações</p>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <p className="dropdown-item">Minha Conta</p>
                <p className="dropdown-item" select="sair" href="/logout">Sair</p>
                {/* <p className="dropdown-item">Another action</p>
                <div className="dropdown-divider"></div>
                <p className="dropdown-item">Something else here</p> */}
              </div>
            </li>
            {/* <li className="nav-item">
              <p className="nav-link disabled">Disabled</p>
            </li> */}
          </ul>
          {/* <form className="form-inline my-2 my-lg-0">
            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
          </form> */}
        </div>
      </nav>



      {/* <Navbar alignLinks="right"
        brand={
          <div>
            <i className="material-icons">pets</i>
            <span>Adota PET</span>
          </div>
        }
        id="mobile-nav"
        menuIcon={<Icon>menu</Icon>}
        options={optionsComponent}>
        <NavItem select={menu.publicacoes.desc} onClick={atualizaContainer}>Publicações</NavItem>
        <NavItem select={menu.minhasPublicacoes.desc} onClick={atualizaContainer}>Minhas publicações</NavItem>
        <NavItem select={menu.configuracoes.desc} onClick={atualizaContainer}>Configurações</NavItem>
        <NavItem select="sair" href="/logout">Sair</NavItem>
      </Navbar> */}
      <div className="container-principal">
        {obtenhaContainer()}
      </div>
    </div >
  );
}

const menu = {
  publicacoes: {
    desc: 'publicações',
    comp: <Publicacoes ehTodasPublicacoes={false} />
  },
  minhasPublicacoes: {
    desc: 'minhas-publicações',
    comp: <Publicacoes ehTodasPublicacoes={true} />
  },
  configuracoes: {
    desc: 'configuração',
    comp: <Configuracoes />
  }
};

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