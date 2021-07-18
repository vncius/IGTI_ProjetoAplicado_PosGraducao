import '../../Content/novaPublicacao.css';
import React, { useState } from 'react';
import InputPadrao from '../Formulario/InputPadrao';
import InputTextArea from '../Formulario/InputTextArea';
import { Link } from 'react-router-dom';
import FadeIn from 'react-fade-in';
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
    setImagens(files);
  }

  return (
    <FadeIn>
      <div id='content-nova-publicacao'>
        <div id='div-nova-publicacao'>
          <form onSubmit={cadastrar}>
            <div id='header'>
              <h4>Publicar animal para adoção</h4>
            </div>
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
              <div className='row'>
                <div className="col">
                  <InputTextArea label='DescricaoAnimal' value={descricaoAnimal} change={changeDescricao} type='text-aria' />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <InputFile label='Selecione as imagens' value={imagens} change={changeImagens} type='password' />
                </div>
              </div>
              <div className='row'>
                <div className="col-4 text-truncate">
                  {imagens.length > 0 ? imagens[0].name : ''}
                </div>
                <div className="col-4 text-truncate">
                  {imagens.length > 0 ? imagens[1].name : ''}
                </div>
                <div className="col-4 text-truncate">
                  {imagens.length > 0 ? imagens[2].name : ''}
                </div>
              </div>
            </div>
            <div id='footer'>
              <button type="submit" className="btn btn-secondary">Publicar</button>
            </div>
          </form>
        </div>
      </div>
    </FadeIn>

  )
}
