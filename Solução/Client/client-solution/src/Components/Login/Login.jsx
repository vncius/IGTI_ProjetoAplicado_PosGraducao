import React, { useState } from 'react';
import './login.css';
import InputEmail from '../Formulario/InputEmail'
import InputPassword from '../Formulario/InputPassword'
import { Link, Redirect } from 'react-router-dom';
import { Authentique } from '../../auth';
import FadeIn from 'react-fade-in';


export default function Login() {
  const [txtLogin, setLogin] = useState('');
  const [txtSenha, setSenha] = useState('');
  const [autenticado, setAutenticado] = useState(false);
  const [validacao, setValidacao] = useState('');

  const changeLogin = (params) => {
    setLogin(params)
  }

  const changeSenha = (params) => {
    setSenha(params)
  }

  const Autenticar = async (event) => {
    event.preventDefault();

    if (valideForm()) {
      if (await Authentique(txtLogin, txtSenha)) {
        setAutenticado(true);
      } else {
        setValidacao('Usuário ou senha inválidos');
        setSenha('');
      }
    }
  }

  const valideForm = () => {
    if (txtLogin.length <= 0 || txtSenha.length <= 0) {
      setValidacao('Os campos login e senha são obrigatórios');
    }

    if (validacao !== '') { return false; }
    return true;
  }

  const hasValidacao = validacao !== '';
  const styleInput = hasValidacao ? { border: '1px solid red' } : {};

  if (autenticado) {
    return (<Redirect to="/Principal" />);
  }

  return (
    <FadeIn>
      <div id='content-login'>
        <div id='div-login'>
          <form onSubmit={Autenticar}>
            <div id='header'>
              <i className="material-icons icon-pet">pets</i>
              <h4>Adota PET</h4>
            </div>
            <div id='body'>
              <InputEmail value={txtLogin} id='email' disable={false} change={changeLogin} style={styleInput} />
              <InputPassword value={txtSenha} id='senha' disable={false} change={changeSenha} style={styleInput} />
              {
                hasValidacao ? <span style={{ color: 'red' }}>{validacao}</span> : <></>
              }
            </div>
            <div id='footer'>
              <button type="submit" className="btn btn-secondary">Entrar</button>
              <Link to='/cadastro'><button type="button" className="btn btn-secondary">Cadastrar</button></Link>
              <div>
                <Link to='/recuperar-senha'>Recuperar senha</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </FadeIn>
  )
}
