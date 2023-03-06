import { API_BASE_URL, authorizationRequest, checkResponse, getAccessToken, getUserRequest, logoutRequest, updateUserRequest } from '../api';
import {
  AUTH_REQUEST,
  AUTH_SUCCESS,
  AUTH_ERROR,
  RESET_AUTH
} from '../constants';

export const authorization = (data, type = 'login') => async (dispatch) => {
  dispatch({
    type: AUTH_REQUEST
  });

  const dataAuth = await authorizationRequest(data, type);

  if (dataAuth.success) {
    localStorage.setItem('refreshToken', dataAuth.refreshToken);
    localStorage.setItem('accessToken', dataAuth.accessToken);

    dispatch({
      type: AUTH_SUCCESS,
      user: dataAuth.user
    });
  } else {
    dispatch({
      type: AUTH_ERROR,
    });
  }
}

export const getUser = () => async (dispatch) => {
  dispatch({
    type: AUTH_REQUEST
  });

  const dataUser = await getUserRequest();

  if (dataUser.success) {
    dispatch({
      type: AUTH_SUCCESS,
      user: dataUser.user
    });
  } else {
    dispatch({
      type: RESET_AUTH,
    });
  }
}

export const updateUser = (data) => async (dispatch) => {
  dispatch({
    type: AUTH_REQUEST
  });

  const dataUser = await updateUserRequest(data)

  if (dataUser.success) {
    dispatch({
      type: AUTH_SUCCESS,
      user: dataUser.user
    });
  } else {
    dispatch({
      type: AUTH_ERROR,
    });
  }
}

export const logout = () => async (dispatch) => {
  dispatch({
    type: AUTH_REQUEST
  });

  const data = await logoutRequest();

  if (data.success) {
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('accessToken');
    dispatch({
      type: RESET_AUTH,
    });
  } else {
    dispatch({
      type: AUTH_ERROR,
    });
  }
}

export const resetAuth = () => ({
  type: RESET_AUTH,
});
