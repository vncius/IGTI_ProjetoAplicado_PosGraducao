import React, { useState } from 'react';
import InputPadrao from '../Formulario/InputPadrao';
import InputTextArea from '../Formulario/InputTextArea';
import InputFile from '../Formulario/InputFile';

export default function NovaPublicacao() {
  const [txtNome, setNome] = useState('');
  const [idadeAnimal, setIdadeAnimal] = useState(0);
  const [descricaoAnimal, setDescricaoAnimal] = useState('');
  const [imagens, setImagens] = useState([]);

  const cadastrar = (event) => {
    alert('Not found implementation')
    event.preventDefault();
  }

  const changeNome = (text) => { setNome(text); }
  const changeIdade = (text) => { setIdadeAnimal(text); }
  const changeDescricao = (text) => { setDescricaoAnimal(text); }
  const changeImagens = (files) => {
    setImagens([files[0]]);
  }

  const arquivosArray = [].slice.call(imagens)

  return (
    <div className='content-formulario'>
      <div className='div-formulario'>
        <form onSubmit={cadastrar}>
          <div id='body'>
            <div className="row">
              <div className="col">
                <InputPadrao label='Nome do animal' value={txtNome} change={changeNome} type='email' />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <InputPadrao label='Idade aproximada do animal' value={idadeAnimal} change={changeIdade} type='number' />
              </div>
            </div>
            <div className="row">
              <div className="col text-left" style={{ paddingBottom: '15px' }}>
                <label htmlFor="selectCidade">Sexo</label>
                <select className="form-control" id="selectCidade">
                  <option>Macho</option>
                  <option>Fêmea</option>
                </select>
              </div>
            </div>
            <div className='row'>
              <div className="col">
                <InputTextArea label='DescricaoAnimal' value={descricaoAnimal} change={changeDescricao} type='text-aria' />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <InputFile label='Selecione as imagens' value={imagens} change={changeImagens} />
              </div>
            </div>
            <div className='row '>
              {
                arquivosArray.map((arquivo, index) => {
                  return (
                    <div key={index} className="col text-truncate" style={{ width: '300px' }}>
                      {arquivo.name}
                    </div>
                  );
                })
              }
            </div>
          </div>
          <div id='footer'>
            <button type="submit" className="btn btn-secondary">Publicar</button>
          </div>
        </form>
      </div>
    </div>
  )
}
