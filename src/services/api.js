export const API_BASE_URL = 'https://norma.nomoreparties.space/api/';

export const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};
