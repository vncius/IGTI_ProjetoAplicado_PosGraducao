import React, { useState } from 'react';
import { Button } from 'react-materialize';
import '../Content/cadastro.css';
import InputPadrao from './Formulario/InputPadrao';
import { Link } from 'react-router-dom';

export default function Cadastro() {
  const [txtNome, setNome] = useState('');
  const [txtEmail, setEmail] = useState('');
  const [txtEmailConfirm, setEmailConfirm] = useState('');
  const [txtSenha, setSenha] = useState('');
  const [txtSenhaConfirm, setSenhaConfirm] = useState('');
  const [txtCep, setCep] = useState('');
  const [txtCpf, setCpf] = useState('');
  const [txtTelefone, setTelefone] = useState('');

  const cadastrar = (event) => {
    alert('Not found implementation')
    event.preventDefault();
  }

  const changeNome = (text) => { setNome(text); }
  const changeEmail = (text) => { setEmail(text); }
  const changeEmailConfirm = (text) => { setEmailConfirm(text); }
  const changeSenha = (text) => { setSenha(text); }
  const changeSenhaConfirm = (text) => { setSenhaConfirm(text); }
  const changeCep = (text) => { setCep(text); }
  const changeCpf = (text) => { setCpf(text); }
  const changeTelefone = (text) => { setTelefone(text); }

  return (
    <div id='content-cadastro'>
      <div id='div-cadastro'>
        <form onSubmit={cadastrar}>
          <div id='header'>
            <h4>Cadastro de usuário</h4>
          </div>
          <div id='body'>
            <InputPadrao label='E-mail' value={txtEmail} change={changeEmail} type='email' />
            <InputPadrao label='Repita o e-mail' value={txtEmailConfirm} change={changeEmailConfirm} />
            <div className='direcao-row'>
              <InputPadrao label='Senha' value={txtSenha} change={changeSenha} type='password' />
              <InputPadrao label='Repita a senha' value={txtSenhaConfirm} change={changeSenhaConfirm} type='password' />
            </div>
            <div className='direcao-row'>
              <InputPadrao label='Nome' value={txtNome} change={changeNome} />
              <InputPadrao label='CPF' value={txtCpf} change={changeCpf} />
            </div>
            <div className='direcao-row'>
              <InputPadrao label='CEP' value={txtCep} change={changeCep} />
              <InputPadrao label='Telefone' value={txtTelefone} change={changeTelefone} />
            </div>
          </div>
          <div id='footer'>
            <Button type='submit' node='button' waves='light'>Cadastrar</Button>
            <Link to='/'><Button node='button' waves='light'>Voltar</Button></Link>
          </div>
        </form>
      </div>
    </div>
  )
}
