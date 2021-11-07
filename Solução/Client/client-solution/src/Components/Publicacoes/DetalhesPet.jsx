import React, { useState } from 'react';
import Carrousel from '../Reutilizaveis/Carrousel';
import InputPadrao from '../Formulario/InputPadrao';
import InputTextArea from '../Formulario/InputTextArea';
import { GetDadosCidadeWithList } from '../../Utilidades/Util'
import { cancelarPublicação } from '../../Services/ServicosPetFeliz'
import MinhasPublicacoes from './MinhasPublicacoes';

export default function DetalhesPet({ statesAll, publicacao, user, showModal, ehEdicao = false }) {
  const [excluido, setExcluido] = useState(false);

  if (!publicacao || !user) {
    return <></>;
  }

  const { id,
    nome,
    idade,
    descricao,
    cidadeId,
    estadoId,
    nameImagem,
    sexo } = publicacao;

  let URLCompartilhar = window.location.origin;
  URLCompartilhar += `/public/${id}`;


  const handleShowModal = () => {
    showModal(false, <MinhasPublicacoes showModal={showModal} />);
  }

  const handleCancelar = async () => {
    if (await cancelarPublicação(id)) {
      setExcluido(true);
    }
  }

  const { cityName, stateName } = GetDadosCidadeWithList(statesAll, cidadeId, estadoId);

  const sexoPadrao = sexo === "Macho" ? '-1' : '-2';

  const ref = React.createRef();
  const handleClick = (el) => {
    ref.current.click();
  }

  const handleCompartilhar = () => {
    var copyText = document.getElementById('linkCopy');
    var btn = document.getElementById('btnCopiar');
    copyText.select();
    document.execCommand("copy");
    btn.classList.remove('btn-primary');
    btn.classList.add('btn-success');
    btn.focus();
  }

  return (
    <div id="ModalDetalhes" onLoad={handleClick}>
      <div className="modal fade modal-detalhes-pet" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            {
              excluido ?
                <>
                  <span style={{ color: 'black', fontWeight: 'bold', textAlign: 'center' }}>Publicação cancelada com sucesso.</span>
                  <br />
                  <button type="submit" className="btn btn-secondary" data-dismiss="modal" aria-label="Close" onClick={handleShowModal}>Ok</button>
                </>
                :
                <>
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLongTitle">Detalhes</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <div className="row">
                      <div className="col-12 col-lg-6">
                        <Carrousel listDir={[nameImagem]} />
                      </div>
                      <div className="col-12 col-lg-6">
                        <div className="row" id="dadosPet">
                          <hr />
                          <div className="col-12">
                            <InputPadrao label="Nome" value={nome} disable={true}></InputPadrao>
                          </div>
                          <div className="col-6" style={{ paddingBottom: '15px' }}>
                            <label htmlFor="selectCidade">Sexo</label>
                            <select className="form-control" id="selectCidade" defaultValue={sexoPadrao} disabled={true}>
                              <option value='-1'>Macho</option>
                              <option value='-2'>Fêmea</option>
                            </select>
                          </div>
                          <div className="col-6">
                            <InputPadrao label="Estado" value={stateName} disable={true}></InputPadrao>
                          </div>
                          <div className="col-8">
                            <InputPadrao label="Cidade" value={cityName} disable={true}></InputPadrao>
                          </div>
                          <div className="col-4">
                            <InputPadrao label='Idade' value={idade} disable={true} type='number' />
                          </div>
                          <div className="col-12">
                            <InputTextArea label='Descricao do pet' value={descricao} disable={true} type='text-aria' />
                          </div>
                          <div className="col-12" style={{ textAlign: 'center' }}>
                            <div className='row'>
                              <div className="col-4">
                                <span style={{ fontWeight: 'bolder', fontSize: '17px' }}>Doador</span>
                              </div>
                              <div className="col-8">
                                <span>{user.nome}</span>
                              </div>
                            </div>
                          </div>
                          <div className="col-12" style={{ textAlign: 'center' }}>
                            <div className='row'>
                              <div className="col-4">
                                <span style={{ fontWeight: 'bolder', fontSize: '17px' }}>Contato:</span>
                              </div>
                              <div className="col-8">
                                <span>{user.telefone}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <input id='linkCopy' type="text" className="form-control" value={URLCompartilhar} readOnly />
                    <button id='btnCopiar' type="button" className="btn btn-primary" onClick={handleCompartilhar}>Copiar link</button>
                    {
                      ehEdicao ? <>
                        <button type="button" className="btn btn-danger" onClick={handleCancelar}>Cancelar publicação</button>
                      </> : <></>
                    }
                  </div>
                </>
            }
          </div>
        </div>
      </div>
      <p type="button" className="btn btn-secondary" data-toggle="modal" data-target=".modal-detalhes-pet" style={{ display: 'none' }} ref={ref}>Detalhes</p>
    </div >

  )
}
