import React, { useState, useEffect } from 'react';
import InputPadrao from '../Formulario/InputPadrao';
import Spinner from '../Reutilizaveis/Spinner';
import { getUserAuthenticated } from '../../auth';

export default function MinhaConta() {
  const [localidades, setLocalidades] = useState([]);
  const [cidadesDoEstadoSelecionado, setCidadesDoEstadoSelecionado] = useState([]);
  const [txtEstadoSelecionado, SetEstadoSelecionado] = useState('');
  const [txtCidadeSelecionada, SetCidadeSelecionada] = useState('');
  const [txtNome, setNome] = useState('');
  const [txtEmail, setEmail] = useState('');
  const [txtSenha, setSenha] = useState('');
  const [txtSenhaConfirm, setSenhaConfirm] = useState('');
  const [txtCpf, setCpf] = useState('');
  const [txtTelefone, setTelefone] = useState('');
  const [dadosUsuario, setDadosUsuario] = useState(null);

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
      setNome(json.Nome);
      setEmail(json.Email);
      setSenha(json.Senha);
      setSenhaConfirm(json.Senha);
      setCpf(json.Cpf);
      setTelefone(json.Telefone);
      SetCidadeSelecionada(json.Cidade);
      SetEstadoSelecionado(json.Estado);
      const retorno = locals.find(x => x.Estado === json.Estado);
      setCidadesDoEstadoSelecionado(retorno.Cidades);
    }

    const response = await fetch('http://localhost:3000/Localidades/');
    const locals = await response.json();
    setLocalidades(locals);
    await getDataUser();
  }

  const alterarCadastro = (event) => {
    alert('Not found implementation')
    event.preventDefault();
  }

  const handleEstado = (event) => {
    const result = localidades.find(x => x.Estado === event.target.value);
    setCidadesDoEstadoSelecionado(result ? result.Cidades : []);
    SetEstadoSelecionado(event.target.value)
  }

  const handleCidade = (event) => {
    SetCidadeSelecionada(event.target.value);
  }

  const changeNome = (text) => { setNome(text); }
  const changeEmail = (text) => { setEmail(text); }
  const changeSenha = (text) => { setSenha(text); }
  const changeSenhaConfirm = (text) => { setSenhaConfirm(text); }
  const changeCpf = (text) => { setCpf(text); }
  const changeTelefone = (text) => { setTelefone(text); }

  if (dadosUsuario == null) {
    return (<Spinner></Spinner>);
  }
  return (
    <div className='content-formulario'>
      <div className='div-formulario'>
        <form onSubmit={alterarCadastro}>
          <div id='body'>
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
            <button type="submit" className="btn btn-secondary">Salvar</button>
          </div>
        </form>
      </div>
    </div>
  )
};
