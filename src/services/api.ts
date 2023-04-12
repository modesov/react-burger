import { AuthUserType, ResetPasswordType, UserLoginType, UserType } from "../utils/types";

const BASE_URL = 'https://norma.nomoreparties.space/api/';

const checkResponse = (res: Response) => {
  return res.ok ? res.json() : res.json().then((error) => Promise.reject(error));
};

interface OptionsType {
  method?: string;
  headers?: { [name: string]: string }
  body?: string
}

const checkSuccess = (res: any) => {
  return res && res.success ? res : Promise.reject(res);
}

const request = (endpoint: string, options?: OptionsType) => { 
  return fetch(`${BASE_URL}${endpoint}`, options)
    .then(checkResponse)
    .then(checkSuccess);
}

export const requestIngredients = () => request('ingredients');

export const requestOrderRegistration = (ingredientIds: string[], accessToken: string) => {
  const options: OptionsType = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: accessToken
    },
    body: JSON.stringify({ ingredients: ingredientIds })
  }

  return request('orders', options);
}

export const requestUpdateToken = (refreshToken: string) => {
  const options: OptionsType = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({ token: refreshToken })
  }

  return request('auth/token', options);
}

export const requestAuthorization = (data: UserLoginType | UserType, type: string) => {
  const url: string = `auth/${type}`;
  const options: OptionsType = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data)
  }

  return request(url, options);
}

export const requestUser = (accessToken: string) => {
  const options: OptionsType = {
    headers: {
      Authorization: accessToken
    }
  }

  return request('auth/user', options);
}

export const requestUpdateUser = (data: UserType, accessToken: string) => {
  const options: OptionsType = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: accessToken
    },
    body: JSON.stringify(data)
  }

  return request('auth/user', options);
}

export const requestLogout = (refreshToken: string) => {
  const options: OptionsType = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({ token: refreshToken })
  }

  return request('auth/logout', options);
}

export const requestForgotPassword = (email: string) => {
  const options: OptionsType = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({ email: email })
  }

  return request('password-reset', options);
}

export const requestResetPassword = (fields: ResetPasswordType) => {
  const options: OptionsType = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(fields)
  }

  return request('password-reset/reset', options);
}
