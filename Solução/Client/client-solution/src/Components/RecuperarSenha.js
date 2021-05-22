import React, { useState } from 'react';
import '../Content/recuperar-senha.css';
import InputPadrao from './Formulario/InputPadrao';
import { Button } from 'react-materialize';
import { Link } from 'react-router-dom';

export default function RecuperarSenha() {
  const [txtCPF, setCPF] = useState('');
  const [txtSenha, setSenha] = useState('');
  const [txtSenhaConfirm, setSenhaConfirm] = useState('');
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
            <Button type='submit' node='button' waves='light'>Enviar código</Button>
            <Link to='/'><Button node='button' waves='light'>Voltar</Button></Link>
          </div>
        </form>
      </div>
    </div>
  )
}