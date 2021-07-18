import React, { useState } from 'react';
import '../Content/recuperar-senha.css';
import InputPadrao from './Formulario/InputPadrao';
import { Link } from 'react-router-dom';
import FadeIn from 'react-fade-in';

export default function RecuperarSenha() {
  const [txtCPF, setCPF] = useState('');
  // const [txtSenha, setSenha] = useState('');
  // const [txtSenhaConfirm, setSenhaConfirm] = useState('');
  const [isEnvioCodigo, setEnvioCodigo] = useState(true);


  const redefinirSenha = (event) => {
    alert('Not found implementation')
    event.preventDefault();
  }

  const enviarCodigo = (event) => {
    alert('Not found implementation')
    event.preventDefault();
  }
  const changeCpf = (text) => { setCPF(text); }

  const enable = isEnvioCodigo ? {} : { display: 'none' };

  return (
    <FadeIn>
      <div id='content-recuperar-senha'>
        <div id='div-recuperar-senha'>
          <form onSubmit={enviarCodigo} style={enable}>
            <div id='header'>
              <h4>Recuperar senha</h4>
            </div>
            <div id='body'>
              <InputPadrao label='CPF' value={txtCPF} change={changeCpf} />
            </div>
            <div id='footer'>
              <button type="submit" className="btn btn-secondary">Enviar código</button>
              <Link to='/login'><button type="button" className="btn btn-secondary">Voltar</button></Link>
            </div>
          </form>
        </div>
      </div>
    </FadeIn>
  )
}