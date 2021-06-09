import React, { useState } from 'react';
import '../Content/login.css'
import InputEmail from './Formulario/InputEmail'
import InputPassword from './Formulario/InputPassword'
import { Button } from 'react-materialize';
import { Link, Redirect } from 'react-router-dom';

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
    if (txtLogin === "admin@admin" && txtSenha === "admin") {
      setAutenticacao(true);
    } else {
      setAutenticacao(false);
      setSenha('');
    }
  }

  return (
    autenticacao ? <Redirect to="/principal" /> :
      <div id='content-login'>
        <div id='div-login'>
          <form onSubmit={Autenticar}>
            <div id='header'>
              <h4>Adota Pet</h4>
            </div>
            <div id='body'>
              <InputEmail value={txtLogin} id='email' disable={false} change={changeLogin} />
              <InputPassword value={txtSenha} id='senha' disable={false} change={changeSenha} />
            </div>
            <div id='footer'>
              <Button type='submit' node='button' waves='light'>Entrar</Button>
              <Link to='/cadastro'><Button node='button' waves='light'>Cadastrar</Button></Link>
              <div>
                <Link to='/recuperar-senha'>Recuperar senha</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
  )
}
