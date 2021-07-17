const isAutheticated = () => {
  if (typeof (Storage) !== "undefined") {
    if (localStorage.token) {
      if (localStorage.getItem('token') === '123456') {
        return true;
      }
    }

    // Code for localStorage/sessionStorage.
  } else {
    alert("Desculpe! Seu navegador não tem suporte para web storage!");
  }

  return false;
};

const Authentique = (login, password) => {
  localStorage.setItem('token', '123456')
  return true;
}

export { isAutheticated, Authentique };