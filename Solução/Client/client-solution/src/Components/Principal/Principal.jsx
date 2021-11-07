import React, { useState } from 'react'
import Publicacoes from '../Publicacoes/Publicacoes';
import NovaPublicacao from '../NovaPublicacao/NovaPublicacao';
import MinhasPublicacoes from '../Publicacoes/MinhasPublicacoes';
import './principal.css'
import MinhaConta from '../MinhaConta/MinhaConta';
import Modal from '../Modal/Modal';
import { logout } from '../../auth';
import VerifyRules from '../VerifyRules'


export default function Principal(props) {
  const [containerAtual, setContainerAtual] = useState(<Publicacoes props={props} />);
  const [modalAtual, setModalAtual] = useState('');
  const [titleModal, setTitleModal] = useState('');
  const [exibirModal, setExibirModal] = useState(false);

  const atualizaContainer = (event) => {
    switch (event.target.attributes.select.value) {
      case menu.publicacoes.desc:
        setContainerAtual(<Publicacoes props={props} />);
        break;
      case menu.minhaConta.desc:
        ConfigureModalDinamico(<MinhaConta showModal={handleShowModal} />, "Minha Conta");
        break;
      case menu.minhasPublicacoes.desc:
        setContainerAtual(<MinhasPublicacoes showModal={handleShowModal} />);
        break;
      case menu.novaPublicacao.desc:
        ConfigureModalDinamico(<NovaPublicacao showModal={handleShowModal} />, "Publicar animal para adoção");
        break;
      default:
        setContainerAtual(<></>);
        break;
    }
  }

  const handleShowModal = (value, componentRedirect) => {
    setModalAtual('');
    setTitleModal('');
    setExibirModal(value);
    setContainerAtual(!componentRedirect ? menu.publicacoes.comp : componentRedirect);
  }

  const ConfigureModalDinamico = (component, descricao) => {
    setContainerAtual(<></>);
    setModalAtual(component.comp ? component.comp : component);
    setTitleModal(descricao);
    setExibirModal(true);
  }

  return (
    <>
      <div className='DivPrincipal' style={{ height: '100vh' }}>
        <nav className="navbar navbar-expand-lg fixed-top navbar-dark bg-dark" style={{ paddingBottom: 0 }}>
          <i className="material-icons mouserPointer iconPrincipal" style={{ paddingBottom: '18px', marginRight: '5px' }}>pets</i>
          <p className="navbar-brand mouserPointer">PET Feliz</p>

          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">

              <VerifyRules needPermission={false}>
                <li className="nav-item">
                  <p className="nav-link" select={menu.publicacoes.desc} onClick={atualizaContainer}>Adotar</p>
                </li>
              </VerifyRules>
              <VerifyRules needPermission={true}>
                <li className="nav-item">
                  <p className="nav-link" select={menu.novaPublicacao.desc} onClick={atualizaContainer} data-toggle="modal" data-target="#exampleModalCenter">Nova Publicação</p>
                </li>
              </VerifyRules>

              <li className="nav-item dropdown">
                <p className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Minha conta</p>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">

                  <VerifyRules needPermission={true}>
                    <p className="dropdown-item" select={menu.minhasPublicacoes.desc} onClick={atualizaContainer}>Minhas Publicações</p>
                  </VerifyRules>
                  <VerifyRules needPermission={true}>
                    <p className="dropdown-item" select={menu.minhaConta.desc} onClick={atualizaContainer} data-toggle="modal" data-target="#exampleModalCenter">Configurações</p>
                  </VerifyRules>
                  <VerifyRules needPermission={true}>
                    <a className="dropdown-item" select="sair" onClick={logout} href="/logout">Sair</a>
                  </VerifyRules>
                  <VerifyRules needPermission={false} displayAuthenticated={false}>
                    <a className="dropdown-item" select="login" onClick={logout} href="/logout">Login</a>
                  </VerifyRules>
                </div>
              </li>
            </ul>
          </div>
        </nav>
        <div className="container-principal">
          {containerAtual}
          {
            exibirModal ? (
              <Modal title={titleModal}>{modalAtual}</Modal>
            ) : <></>
          }
        </div>
      </div >
      {/* <div id="footer">
        <div className="row">
          <div className="col text-center">
            <h5>Copyright 2021-2022 Pet Felix</h5>
          </div>
        </div>
      </div> */}
    </>
  );
}

const menu = {
  publicacoes: {
    desc: 'publicações',
    comp: <Publicacoes />
  },
  minhasPublicacoes: {
    desc: 'minhas-publicações',
    comp: <MinhasPublicacoes />
  },
  novaPublicacao: {
    desc: 'nova-publicacao',
    comp: <NovaPublicacao />
  },
  minhaConta: {
    desc: 'minha-conta',
    comp: <MinhaConta />
  }
};