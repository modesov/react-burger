const BASE_URL = 'https://norma.nomoreparties.space/api/';

const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((error) => Promise.reject(error));
};

const checkSuccess = (res) => {
  return res && res.success ? res : Promise.reject(res);
}

const request = (endpoint, options) => {
  return fetch(`${BASE_URL}${endpoint}`, options)
    .then(checkResponse)
    .then(checkSuccess);
}

export const requestIngredients = () => request('ingredients');

export const requestOrderRegistration = (ingredientIds, accessToken) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: accessToken
    },
    body: JSON.stringify({ ingredients: ingredientIds })
  }

  return request('orders', options);
}

export const requestUpdateToken = (refreshToken) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({ token: refreshToken })
  }

  return request('auth/token', options);
}

export const requestAuthorization = (data, type) => {
  const url = `auth/${type}`;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data)
  }

  return request(url, options);
}

export const requestUser = (accessToken) => {
  const options = {
    headers: {
      Authorization: accessToken
    }
  }

  return request('auth/user', options);
}

export const requestUpdateUser = (data, accessToken) => {
  const options = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: accessToken
    },
    body: JSON.stringify(data)
  }

  return request('auth/user', options);
}

export const requestLogout = (refreshToken) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({ token: refreshToken })
  }

  return request('auth/logout', options);
}

export const requestForgotPassword = (email) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({ email: email })
  }

  return request('password-reset', options);
}

export const requestResetPassword = (fields) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(fields)
  }

  return request('password-reset/reset', options);
}
