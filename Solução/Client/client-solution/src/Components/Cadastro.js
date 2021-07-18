import React, { useState } from 'react';
import '../Content/cadastro.css';
import InputPadrao from './Formulario/InputPadrao';
import { Link } from 'react-router-dom';
import FadeIn from 'react-fade-in';

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
    <FadeIn>
      <div id='content-cadastro'>
        <div id='div-cadastro'>
          <form onSubmit={cadastrar}>
            <div id='header'>
              <h4>Cadastro de usuário</h4>
            </div>
            <div id='body'>
              <div className="row">
                <div className="col">
                  <InputPadrao label='E-mail' value={txtEmail} change={changeEmail} type='email' />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <InputPadrao label='Repita o e-mail' value={txtEmailConfirm} change={changeEmailConfirm} />
                </div>
              </div>
              <div className='row'>
                <div className="col-12 col-sm-6">
                  <InputPadrao label='Senha' value={txtSenha} change={changeSenha} type='password' />
                </div>
                <div className="col-12 col-sm-6">
                  <InputPadrao label='Repita a senha' value={txtSenhaConfirm} change={changeSenhaConfirm} type='password' />
                </div>
              </div>
              <div className='row'>
                <div className="col-12 col-sm-6">
                  <InputPadrao label='Nome' value={txtNome} change={changeNome} />
                </div>
                <div className="col-12 col-sm-6">
                  <InputPadrao label='CPF' value={txtCpf} change={changeCpf} />
                </div>
              </div>
              <div className='row'>
                <div className="col-12 col-sm-6">
                  <InputPadrao label='CEP' value={txtCep} change={changeCep} />
                </div>
                <div className="col-12 col-sm-6">
                  <InputPadrao label='Telefone' value={txtTelefone} change={changeTelefone} />
                </div>
              </div>
            </div>
            <div id='footer'>
              <button type="submit" className="btn btn-secondary">Cadastrar</button>
              <Link to='/login'><button type="submit" className="btn btn-secondary">Voltar</button></Link>
            </div>
          </form>
        </div>
      </div>
    </FadeIn>

  )
}
