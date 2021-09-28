import React from 'react';
import Carrousel from '../Reutilizaveis/Carrousel';
import InputPadrao from '../Formulario/InputPadrao';
import InputTextArea from '../Formulario/InputTextArea';
import InputFile from '../Formulario/InputFile';

export default function DetalhesPet({ publicacao, ehEdicao = false }) {
  if (publicacao !== null && publicacao !== undefined) {
    var { Nome, Descricao, Estado, Cidade, Sexo, Idade } = publicacao;
  }

  const ehMacho = Sexo === "Macho";

  return (
    <div id="ModalDetalhes">
      <div className="modal fade modal-detalhes-pet" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            {
              publicacao === null ? <></> :
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
                        <Carrousel listDir={[publicacao.ImgPrincipal]} />
                      </div>
                      <div className="col-12 col-lg-6">
                        <div className="row" id="dadosPet">
                          <hr />
                          <div className="col-12">
                            <InputPadrao label="Nome" value={Nome} disable={!ehEdicao}></InputPadrao>
                          </div>
                          <div className="col-6" style={{ paddingBottom: '15px' }}>
                            <label htmlFor="selectCidade">Sexo</label>
                            <select className="form-control" id="selectCidade" disabled={!ehEdicao}>
                              <option selected={ehMacho}>Macho</option>
                              <option selected={!ehMacho}>Fêmea</option>
                            </select>
                          </div>
                          <div className="col-6">
                            <InputPadrao label="Estado" value={Estado} disable={!ehEdicao}></InputPadrao>
                          </div>
                          <div className="col-8">
                            <InputPadrao label="Cidade" value={Cidade} disable={!ehEdicao}></InputPadrao>
                          </div>
                          <div className="col-4">
                            <InputPadrao label='Idade' value={Idade} disable={!ehEdicao} type='number' />
                          </div>
                          <div className="col-12">
                            <InputTextArea label='Descricao do pet' value={Descricao} disable={!ehEdicao} type='text-aria' />
                          </div>
                          {
                            ehEdicao ??
                            (
                              <div className="col-12">
                                {/* <InputFile label='Selecione as imagens' value={imagens} /> */}
                              </div>
                            )
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <div class="row">

                    </div>
                    {!ehEdicao ? <button type="button" className="btn btn-success">Adotar</button> : <></>}
                    <button type="button" className="btn btn-primary">Compartilhar</button>
                    {
                      ehEdicao ? <>
                        <button type="button" className="btn btn-warning">Alterar</button>
                        <button type="button" className="btn btn-danger">Cancelar publicação</button>
                      </> : <></>
                    }
                  </div>
                </>
            }
          </div>
        </div>
      </div>
    </div >

  )
}
