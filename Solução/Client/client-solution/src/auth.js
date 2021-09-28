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
  var userName = atob(localStorage.getItem('Data'));
  const response = await fetch(`http://localhost:3000/User?Email=${userName}`);
  const data = await response.json();
  const user = data[0];
  if (!obterSenha) {
    delete user.Senha;
  }
  return user
}

const Authentique = async (login, password) => {
  const response = await fetch(`http://localhost:3000/User?Email=${login}&Senha=${btoa(password)}`);
  const json = await response.json();

  if (json.length > 0) {
    localStorage.setItem("Auth", true);
    localStorage.setItem("Data", btoa(login))
    return true;
  }
  else {
    return false;
  }
}

export { isAutheticated, Authentique, logout, getUserAuthenticated };