import React, { Fragment, useEffect, useState } from 'react';

import './cadastro.css'
import InputPadrao from '../Formulario/InputPadrao';
import FadeIn from 'react-fade-in';
import { saveUser, getLocalidades } from '../../Services/ServicosPetFeliz';
import { Link } from 'react-router-dom';

export default function Cadastro() {
  const [citiesStateSelected, setCitiesStateSelected] = useState([]);
  const [localidades, setLocalidades] = useState([]);
  const [idEstadoSelecionado, SetEstadoSelecionado] = useState(1);
  const [idCidadeSelecionada, SetCidadeSelecionada] = useState(1);
  const [txtNome, setNome] = useState('');
  const [txtEmail, setEmail] = useState('');
  const [txtEmailConfirm, setEmailConfirm] = useState('');
  const [txtSenha, setSenha] = useState('');
  const [txtSenhaConfirm, setSenhaConfirm] = useState('');
  const [txtCpf, setCpf] = useState('');
  const [txtTelefone, setTelefone] = useState('');
  const [validacao, setValidacao] = useState('');
  const [userCriado, setUserCriado] = useState(false);

  useEffect(() => {
    const load = async () => {
      let json = await getLocalidades();
      if (json !== null) {
        json.sort((a, b) => { return a.name < b.name ? -1 : 1 });
        const estadoSelecionado = json[0];
        const cidadeSelecionada = estadoSelecionado.cities[0]

        setLocalidades(json);
        SetCidadeSelecionada(cidadeSelecionada ? cidadeSelecionada.id : "Não encontrado");
        SetEstadoSelecionado(estadoSelecionado ? estadoSelecionado.id : "Não encontrado");
        setCitiesStateSelected(estadoSelecionado.cities.length > 0 ? estadoSelecionado.cities : []);
      } else {
        alert("Não foi possível buscar os dados de cidades e estados.");
      }
    }

    load();
  }, [])

  const getUserUI = () => {
    return {
      "Nome": txtNome,
      "Email": txtEmail,
      "EstadoId": idEstadoSelecionado,
      "CidadeId": idCidadeSelecionada,
      "Cpf": txtCpf,
      "Telefone": txtTelefone,
      "Password": txtSenha
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
    const idSelecionado = parseInt(event.target.value);
    const result = localidades.find(x => x.id === idSelecionado);
    if (result !== null) {
      const listaOrdenada = result.cities.sort(x => x.name);
      setCitiesStateSelected(listaOrdenada);
      SetEstadoSelecionado(idSelecionado)
    } else {
      setCitiesStateSelected([]);
      alert("Cidades não encontrada para o estado selecionado.");
    }
  }

  const handleCidade = (event) => {
    SetCidadeSelecionada(parseInt(event.target.value));
  }

  const handleCadastrar = async (event) => {
    setValidacao('');
    event.preventDefault();
    const user = getUserUI();
    if (await saveUser(user)) {
      setUserCriado(true);
    } else {
      setValidacao('Não foi possível criar usuário no momento, tente novamente!');
    }
  }

  const hasValidacao = validacao !== '';

  return (
    <FadeIn>
      <div id='content-cadastro'>
        <div id='div-cadastro'>
          <form onSubmit={handleCadastrar}>
            <div id='header'>
              <h4>Cadastro de usuário</h4>
            </div>
            <div id='body' className="text-left">
              {
                hasValidacao ? <span style={{ color: 'red' }}>{validacao}</span> : <></>
              }
              {
                !userCriado ? (
                  <>
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
                        <select className="form-control" id="selectEstado" defaultValue='-1' onChange={handleEstado}>
                          <option value='-1'>Selecione</option>
                          {
                            localidades.map((x, i) => {
                              return (<option key={x.id} value={x.id} selecte={x.id === idEstadoSelecionado}>{x.name}</option>)
                            })
                          }
                        </select>
                      </div>
                      <div className="col-12 col-sm-6">
                        <label htmlFor="selectCidade">Cidade</label>
                        <select className="form-control" id="selectCidade" defaultValue='-1' onChange={handleCidade}>
                          <option value='-1'>Selecione</option>

                          {
                            citiesStateSelected.map((x, i) => {
                              return (<option key={x.id} value={x.id} selected={x.id === idCidadeSelecionada}>{x.name}</option>)
                            })
                          }
                        </select>
                      </div>
                    </div>
                  </>
                ) : <></>
              }

            </div>
            <div id='footer'>
              {
                userCriado ? (
                  <>
                    <span style={{ color: 'white', fontWeight: 'bold' }}>Usuário criado com sucesso, clique abaixo para se autenticar!</span>
                    <br />
                    <Link to='/login'><button type="button" className="btn btn-secondary">Logar</button></Link>
                  </>
                ) : (
                  <>
                    <button type="submit" className="btn btn-secondary">Cadastrar</button>
                    <Link to='/login'><button type="submit" className="btn btn-secondary">Voltar</button></Link>
                  </>
                )
              }
            </div>
          </form>
        </div>
      </div>
    </FadeIn>

  )
}
