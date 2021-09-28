import React, { useEffect, useState } from 'react';

import './cadastro.css'
import InputPadrao from '../Formulario/InputPadrao';
import { Link } from 'react-router-dom';
import FadeIn from 'react-fade-in';

export default function Cadastro() {
  const [localidades, setLocalidades] = useState([]);
  const [cidadesDoEstadoSelecionado, setCidadesDoEstadoSelecionado] = useState([]);
  const [txtEstadoSelecionado, SetEstadoSelecionado] = useState('');
  const [txtCidadeSelecionada, SetCidadeSelecionada] = useState('');
  const [txtNome, setNome] = useState('');
  const [txtEmail, setEmail] = useState('');
  const [txtEmailConfirm, setEmailConfirm] = useState('');
  const [txtSenha, setSenha] = useState('');
  const [txtSenhaConfirm, setSenhaConfirm] = useState('');
  const [txtCpf, setCpf] = useState('');
  const [txtTelefone, setTelefone] = useState('');

  useEffect(() => {
    const getLocalidades = async () => {
      var response = await fetch('http://localhost:3000/Localidades/');
      var json = await response.json();
      setLocalidades(json);
      setCidadesDoEstadoSelecionado(json[0].Cidades)
      SetCidadeSelecionada(json[0].Cidades[0])
      SetCidadeSelecionada(json[0].Cidades[0])
      SetEstadoSelecionado(json[0].Estado)
    }

    getLocalidades();
  }, [])

  const getUserUI = () => {
    return {
      "Nome": txtNome,
      "Email": txtEmail,
      "Estado": txtEstadoSelecionado,
      "Cidade": txtCidadeSelecionada,
      "Cpf": txtCpf,
      "Telefone": txtTelefone,
      "Senha": txtSenha
    }
  }
  const changeNome = (text) => { setNome(text); }
  const changeEmail = (text) => { setEmail(text); }
  const changeEmailConfirm = (text) => { setEmailConfirm(text); }
  const changeSenha = (text) => { setSenha(text); }
  const changeSenhaConfirm = (text) => { setSenhaConfirm(text); }
  const changeCpf = (text) => { setCpf(text); }
  const changeTelefone = (text) => { setTelefone(text); }

  const handleEstado = (event) => {
    const result = localidades.find(x => x.Estado === event.target.value);
    setCidadesDoEstadoSelecionado(result ? result.Cidades : []);
    SetEstadoSelecionado(event.target.value)
  }

  const handleCidade = (event) => {
    SetCidadeSelecionada(event.target.value);
  }

  const handleCadastrar = (event) => {
    event.preventDefault();
    const user = getUserUI();

    (async () => {

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      var raw = JSON.stringify(user);
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      fetch("http://localhost:3000/User", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    })();
  }

  return (
    <FadeIn>
      <div id='content-cadastro'>
        <div id='div-cadastro'>
          <form onSubmit={handleCadastrar}>
            <div id='header'>
              <h4>Cadastro de usuário</h4>
            </div>
            <div id='body' className="text-left">
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
                <div className="col">
                  <InputPadrao label='Nome' value={txtNome} change={changeNome} />
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
                  <InputPadrao label='CPF' value={txtCpf} change={changeCpf} />
                </div>
                <div className="col-12 col-sm-6">
                  <InputPadrao label='Telefone' value={txtTelefone} change={changeTelefone} />
                </div>
              </div>
              <div className='row'>
                <div className="col-12 col-sm-6">
                  <label htmlFor="selectEstado">Estado</label>
                  <select className="form-control" id="selectEstado" onChange={handleEstado}>
                    {
                      localidades.map((x, i) => {
                        return (<option key={i + 2}>{x.Estado}</option>)
                      })
                    }
                  </select>
                </div>
                <div className="col-12 col-sm-6">
                  <label htmlFor="selectCidade">Cidade</label>
                  <select className="form-control" id="selectCidade" onChange={handleCidade}>
                    {
                      cidadesDoEstadoSelecionado.map((x, i) => {
                        return (<option key={i + 2}>{x}</option>)
                      })
                    }
                  </select>
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
