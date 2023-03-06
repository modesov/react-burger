export const API_BASE_URL = 'https://norma.nomoreparties.space/api/';

export const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const authorizationRequest = async (data, type) => {
  return await fetch(`${API_BASE_URL}auth/${type}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data)
  })
    .then(checkResponse)
    .then(data => data)
    .catch(error => error);
} 

export const getUserRequest = async () => {
  const accessToken = await getAccessToken();

  return await fetch(`${API_BASE_URL}auth/user`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: accessToken
    }
  })
    .then(checkResponse)
    .then(data => data)
    .catch(error => error);
}

export const updateUserRequest = async (data) => {
  const accessToken = await getAccessToken();

  return await fetch(`${API_BASE_URL}auth/user`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: accessToken
    },
    body: JSON.stringify(data)
  })
    .then(checkResponse)
    .then(data => data)
    .catch(error => error);
}

export const logoutRequest = async () => {
  const refreshToken = localStorage.getItem('refreshToken');

  return await fetch(`${API_BASE_URL}auth/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({ token: refreshToken })
  })
    .then(checkResponse)
    .then(data => data)
    .catch(error => error);
} 

export const getTokenRequest = async () => {
  const refreshToken = localStorage.getItem('refreshToken');

  return await fetch(`${API_BASE_URL}auth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({ token: refreshToken })
  })
    .then(checkResponse)
    .then(data => data)
    .catch(error => error);
}

export const getAccessToken = async () => {
  const dataToken = await getTokenRequest();

  localStorage.setItem('refreshToken', dataToken.refreshToken);
  localStorage.setItem('accessToken', dataToken.accessToken);

  return localStorage.getItem('accessToken');
}
