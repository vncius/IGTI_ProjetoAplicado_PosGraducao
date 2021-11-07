import React, { useState, useEffect } from 'react';
import InputPadrao from '../Formulario/InputPadrao';
import Spinner from '../Reutilizaveis/Spinner';
import { getUserAuthenticated, Authentique } from '../../auth';
import { getLocalidades, saveUser } from '../../Services/ServicosPetFeliz';


export default function MinhaConta({ showModal }) {
  const [citiesStateSelected, setCitiesStateSelected] = useState([]);
  const [localidades, setLocalidades] = useState([]);
  const [idEstadoSelecionado, SetEstadoSelecionado] = useState(1);
  const [idCidadeSelecionada, SetCidadeSelecionada] = useState(1);
  const [txtNome, setNome] = useState('');
  const [txtEmail, setEmail] = useState('');
  const [txtSenha, setSenha] = useState('');
  const [txtSenhaConfirm, setSenhaConfirm] = useState('');
  const [txtCpf, setCpf] = useState('');
  const [txtTelefone, setTelefone] = useState('');
  const [dadosUsuario, setDadosUsuario] = useState(null);
  const [validacao, setValidacao] = useState('');
  const [userAlterado, setUserAlterado] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(async () => {
      await getData();
    }, 1000);

    return () => { clearTimeout(timeout) }
  }, [])

  const getData = async () => {
    const getDataUser = async () => {
      const json = await getUserAuthenticated(true);
      setDadosUsuario(json);
      setNome(json.nome);
      setEmail(json.email);
      setSenha('****');
      setSenhaConfirm('****');
      setCpf(json.cpf);
      setTelefone(json.telefone);
      SetCidadeSelecionada(json.cidadeId);
      SetEstadoSelecionado(json.estadoId);

      const retorno = locals.find(x => x.id === json.estadoId);

      if (retorno) {
        setCitiesStateSelected(retorno.cities);
      }
    }

    var locals = await getLocalidades()
    if (locals) {
      setLocalidades(locals);
    }
    await getDataUser();
  }

  const alterarCadastro = async (event) => {
    event.preventDefault();
    setValidacao('');
    const user = getUserUI();

    if (user.Password === '****') {
      setValidacao('Informe uma senha válida');
      return;
    }

    if (await saveUser(user, true)) {
      if (await Authentique(user.Email, user.Password)) {
        setUserAlterado(true);
      }
    } else {
      setValidacao('Não foi possível alterar o usuário no momento, tente novamente!');
    }
  }

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

  const handleShowModal = () => {
    showModal(false);
  }

  const changeNome = (text) => { setNome(text); }
  const changeEmail = (text) => { setEmail(text); }
  const changeSenha = (text) => { setSenha(text); }
  const changeSenhaConfirm = (text) => { setSenhaConfirm(text); }
  const changeCpf = (text) => { setCpf(text); }
  const changeTelefone = (text) => { setTelefone(text); }

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

  if (dadosUsuario == null) {
    return (<Spinner></Spinner>);
  }

  const hasValidacao = validacao !== '';

  return (
    <div className='content-formulario'>
      <div className='div-formulario'>
        <form onSubmit={alterarCadastro}>
          <div id='body'>
            {
              hasValidacao ? <span style={{ color: 'red' }}>{validacao}</span> : <></>
            }
            {
              !userAlterado ?
                (
                  <>
                    <div className="row">
                      <div className="col">
                        <InputPadrao label='E-mail' value={txtEmail} change={changeEmail} type='email' disable={true} />
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
                        <InputPadrao label='CPF' value={txtCpf} change={changeCpf} disable={true} />
                      </div>
                    </div>
                    <div className='row'>
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
                              return (<option key={x.id} value={x.id} selected={x.id === idEstadoSelecionado}>{x.name}</option>)
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
                ) :
                (
                  <>
                  </>
                )
            }

          </div>
          <div id='footer'>
            {
              userAlterado ?
                (
                  <>
                    <span style={{ color: 'white', fontWeight: 'bold' }}>Usuário alterado com sucesso.</span>
                    <br />
                    <button type="submit" className="btn btn-secondary" data-dismiss="modal" aria-label="Close" onClick={handleShowModal}>Ok</button>
                  </>
                ) :
                (
                  <>
                    <button type="submit" className="btn btn-secondary">Salvar</button>
                  </>
                )
            }
          </div>
        </form>
      </div>
    </div>
  )
};
