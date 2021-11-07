const EmailEhValido = (text, status) => {
  status = false;
  return "Inválido"
}

const RemoveAcentos = (text) => {
  text = text.toLowerCase();
  text = text.replace(new RegExp('[ÁÀÂÃ]', 'gi'), 'a');
  text = text.replace(new RegExp('[ÉÈÊ]', 'gi'), 'e');
  text = text.replace(new RegExp('[ÍÌÎ]', 'gi'), 'i');
  text = text.replace(new RegExp('[ÓÒÔÕ]', 'gi'), 'o');
  text = text.replace(new RegExp('[ÚÙÛ]', 'gi'), 'u');
  text = text.replace(new RegExp('[Ç]', 'gi'), 'c');
  return text;
}

const GetDadosCidadeWithList = (statesAll, idCidade, idEstado) => {
  const estado = statesAll.find(x => x.id === idEstado);
  const city = estado.cities.find(x => x.id === idCidade);

  return {
    stateId: estado.id,
    stateName: estado.name,
    cityId: city.id,
    cityName: city.name
  };
}

const ConvertFileToBase64 = (file) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = error => reject(error);
});

export { EmailEhValido, RemoveAcentos, GetDadosCidadeWithList, ConvertFileToBase64 }