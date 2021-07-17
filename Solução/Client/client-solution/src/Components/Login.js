import React, { useState } from 'react';
import '../Content/login.css'
import InputEmail from './Formulario/InputEmail'
import InputPassword from './Formulario/InputPassword'
import { Link, Redirect } from 'react-router-dom';
import { Authentique } from '../auth';
import FadeIn from 'react-fade-in';


export default function Login() {
  const [txtLogin, setLogin] = useState('');
  const [txtSenha, setSenha] = useState('');
  const [autenticacao, setAutenticacao] = useState(false);

  // useEffect(() => {
  //   console.log(txtLogin)
  // }, [txtLogin, txtSenha]);

  function changeLogin(params) {
    setLogin(params)
  }

  function changeSenha(params) {
    setSenha(params)
  }

  function Autenticar(event) {
    event.preventDefault();
    if (Authentique('txtLogin', txtSenha)) {
      setAutenticacao(true);
    } else {
      setAutenticacao(false);
      setSenha('');
    }
  }

  return (
    autenticacao ? <Redirect to="/" /> :
      <FadeIn>
        <div id='content-login'>
          <div id='div-login'>
            <form onSubmit={Autenticar}>
              <div id='header'>
                <i className="material-icons icon-pet">pets</i>
                <h4>Adota PET</h4>
              </div>
              <div id='body'>
                <InputEmail value={txtLogin} id='email' disable={false} change={changeLogin} />
                <InputPassword value={txtSenha} id='senha' disable={false} change={changeSenha} />
              </div>
              <div id='footer'>
                <button type="submit" className="btn btn-primary">Entrar</button>
                <Link to='/cadastro'><button type="button" className="btn btn-primary">Cadastrar</button></Link>
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
