import React, { useState } from 'react';
import InputPadrao from '../Formulario/InputPadrao';
import InputTextArea from '../Formulario/InputTextArea';
import InputFile from '../Formulario/InputFile';
import { getUserAuthenticated } from '../../auth';
import { savePublicacao } from '../../Services/ServicosPetFeliz';
import { ConvertFileToBase64 } from '../../Utilidades/Util';

export default function NovaPublicacao({ showModal }) {
  const [txtNome, setNome] = useState('');
  const [idadeAnimal, setIdadeAnimal] = useState(0);
  const [descricaoAnimal, setDescricaoAnimal] = useState('');
  const [imagens, setImagens] = useState([]);
  const [publicado, setPublicado] = useState(false);
  const [sexo, setSexo] = useState("default");
  const [validacao, setValidacao] = useState('');

  const handleShowModal = () => {
    showModal(false);
  }

  const handleSexo = (event) => {
    setSexo(event.target.value);
  }

  const cadastrar = async (event) => {
    setValidacao('');
    event.preventDefault();
    let userLogado = await getUserAuthenticated();

    const hasImage = imagens.length > 0;
    const imagemBase64 = hasImage ? await ConvertFileToBase64(imagens[0]) : "";
    const extensionFile = hasImage ? imagens[0].name.split('.')[1] : "";

    let publicacao = {
      UserId: userLogado.id,
      Nome: txtNome,
      ImagemExtension: extensionFile,
      Sexo: sexo,
      Idade: idadeAnimal,
      Descricao: descricaoAnimal,
      ImagemBase64: imagemBase64
    }

    if (!await PublicacaoIsValid(publicacao)) return;

    if (await savePublicacao(publicacao)) {
      setPublicado(true);
    }
  }

  const PublicacaoIsValid = async (pub) => {
    if (pub.Nome === '') {
      setValidacao('Nome do pet é obrigatório');
      return false;
    }

    if (pub.Idade <= 0) {
      setValidacao('A idade miníma é de 1 ano, caso o PET tenha menos informe na descrição');
      return false;
    }

    if (pub.Descricao.length < 10) {
      setValidacao('Insira uma descrição válida de no minímo 20 caracteres');
      return false;
    }

    if (pub.Descricao.length > 199) {
      setValidacao('Limite de descrição inválido, o máximo é de 199 caracteres');
      return false;
    }

    if (pub.Sexo === 'default') {
      setValidacao('Selecione um sexo para o PET');
      return false;
    }

    if (imagens.length <= 0) {
      setValidacao('É obrigatório selecionar uma imagem');
      return false;
    }

    if (pub.ImagemExtension !== 'jpg' && pub.ImagemExtension !== 'jpeg' && pub.ImagemExtension !== 'png') {
      setValidacao('Só é aceito imagens com extensão (JPG, JPEG, PNG)');
      return false;
    }

    return true;
  }

  const changeNome = (text) => { setNome(text); }
  const changeIdade = (text) => { setIdadeAnimal(text); }
  const changeDescricao = (text) => { setDescricaoAnimal(text); }
  const changeImagens = (files) => {
    setImagens([files[0]]);
  }

  const hasValidacao = validacao !== '';
  const arquivosArray = [].slice.call(imagens)

  return (
    <div className='content-formulario'>
      <div className='div-formulario'>
        <form onSubmit={cadastrar}>
          {
            publicado ? <></> :
              <>
                <div id='body'>
                  {
                    hasValidacao ? <span style={{ color: 'red' }}>{validacao}</span> : <></>
                  }
                  <div className="row">
                    <div className="col">
                      <InputPadrao label='Nome do PET' value={txtNome} change={changeNome} type='text' />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <InputPadrao label='Idade aproximada' value={idadeAnimal} change={changeIdade} type='number' />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col text-left" style={{ paddingBottom: '15px' }}>
                      <label htmlFor="selectCidade">Sexo</label>
                      <select className="form-control" id="selectSexo" defaultValue={sexo} onChange={handleSexo}>
                        <option value="default" disabled>Selecione</option>
                        <option value="Macho">Macho</option>
                        <option value="Fêmea">Fêmea</option>
                      </select>
                    </div>
                  </div>
                  <div className='row'>
                    <div className="col">
                      <InputTextArea label='Sobre o PET' value={descricaoAnimal} change={changeDescricao} type='text-aria' />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <InputFile label='Selecione uma imagem' value={imagens} change={changeImagens} />
                    </div>
                  </div>
                  <div className='row '>
                    {
                      arquivosArray.map((arquivo, index) => {
                        return (
                          <div key={index} className="col text-truncate" style={{ width: '300px' }}>
                            {arquivo.name}
                          </div>
                        );
                      })
                    }
                  </div>
                </div>
              </>
          }
          <div id='footer'>
            {
              publicado ?
                <>
                  <span style={{ color: 'black', fontWeight: 'bold' }}>Publicação efetuada com sucesso.</span>
                  <br />
                  <button type="submit" className="btn btn-secondary" data-dismiss="modal" aria-label="Close" onClick={handleShowModal}>Ok</button>
                </>
                :
                <>
                  <button type="submit" className="btn btn-secondary">Publicar</button>
                </>
            }
          </div>
        </form>
      </div>
    </div>
  )
}
