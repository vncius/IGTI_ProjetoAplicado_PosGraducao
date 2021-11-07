import { getUserWithCredentials } from './Services/ServicosPetFeliz'

const logout = () => {
  localStorage.clear();
}

const isAutheticated = () => {
  if (typeof (Storage) !== "undefined") {
    if (localStorage.Auth) {
      if (localStorage.getItem('Auth') === 'true') {
        return true;
      }
    }
  } else {
    alert("Desculpe! Seu navegador não tem suporte para web storage!");
  }

  return false;
};

const getUserAuthenticated = async (obterSenha = false) => {
  var user = JSON.parse(localStorage.getItem('User'));
  return user;
}

const Authentique = async (login, password) => {
  const result = await getUserWithCredentials(login, password);

  if (result != null && result.token !== null && result.token !== undefined && result.token !== '') {
    localStorage.setItem("Auth", true);
    localStorage.setItem("Data", btoa(login))
    localStorage.setItem("User", JSON.stringify(result.user))
    return true;
  }
  else {
    return false;
  }
}

export { isAutheticated, Authentique, logout, getUserAuthenticated };