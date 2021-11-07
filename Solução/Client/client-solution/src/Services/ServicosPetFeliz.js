import axios from "axios";
import { getUserAuthenticated } from '../auth';

const host = "http://localhost:5000/api";

const api = axios.create({
  baseURL: host,
});

const cancelarPublicação = async (id) => {
  try {
    var response = await api.put(`/Publication/Cancelar/${id}`);

    if (response && (response.status === 200)) {
      return true;
    }
    return false;
  }
  catch (error) {
    return false;
  }
}

const getPublicacoes = async (id = null) => {
  try {
    var response = await api.get("/Publication");
    var json = response.data.result;

    json.forEach(element => {
      element.nameImagem = `${host}/PetImages/${element.nameImagem}`
    });

    if (id) {
      return json.filter(x => x.userId === id)
    }
    return json;
  } catch (error) {
    return null;
  }
}

const getUserById = async (id) => {
  try {
    var response = await api.get(`/User/${id}`);
    var data = response.data.result;
    return data;
  } catch (error) {
    return null;
  }
}

const getUserWithName = async (userName) => {
  try {
    var response = await api.get(`/User/email/${userName}`);
    var data = response.data.result;
    return data[0];
  } catch (error) {
    return null;
  }
}

const getUserWithCredentials = async (login, password) => {
  try {
    const response = await api.post('/Auth/Login', {
      "Email": login,
      "Password": password
    });

    return response.data.result;
  } catch (error) {
    return null;
  }
}

const getLocalidades = async () => {
  try {
    var response = await api.get(`/Country`);
    return response.data.result;
  } catch (error) {
    return null;
  }
}

const saveUser = async (user, isUpdate = false) => {
  try {
    let response = undefined;

    if (!isUpdate) {
      response = await api.post('/User', user);
    } else {
      var userAuth = await getUserAuthenticated();
      if (userAuth) {
        user.Id = userAuth.id;
        response = await api.put('/User', user);
      }
    }

    if (response && (response.status === 201 || response.status === 200)) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
}

const savePublicacao = async (pub, isUpdate = false) => {
  try {
    let response = undefined;
    if (isUpdate) {
      response = await api.put('/Publication', pub);
    } else {
      response = await api.post('/Publication', pub);
    }
    if (response && (response.status === 201 || response.status === 200)) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
}

export {
  savePublicacao, saveUser, getLocalidades,
  getUserWithName, getUserWithCredentials,
  getPublicacoes, getUserById, cancelarPublicação
}