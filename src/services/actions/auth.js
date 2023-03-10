import {
  requestAuthorization,
  requestLogout,
  requestUpdateToken,
  requestUpdateUser,
  requestUser
} from '../api';
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

  requestAuthorization(data, type)
    .then(data => {
      localStorage.setItem('refreshToken', data.refreshToken);
      localStorage.setItem('accessToken', data.accessToken);

      dispatch({
        type: AUTH_SUCCESS,
        user: data.user
      });
    })
    .catch(error => {
      dispatch({
        type: AUTH_ERROR,
      });
    });
}

export const getUser = () => async (dispatch) => {
  dispatch({
    type: AUTH_REQUEST
  });

  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');

  if (accessToken) {
    requestUser(accessToken)
      .then(data => {
        dispatch({
          type: AUTH_SUCCESS,
          user: data.user
        });
      })
      .catch(error => {
        if (error.message === 'jwt expired' && refreshToken) {
          requestUpdateToken(refreshToken)
            .then(data => {
              localStorage.setItem('accessToken', data.accessToken);
              localStorage.setItem('refreshToken', data.refreshToken);

              requestUser(data.accessToken)
                .then(data => {
                  dispatch({
                    type: AUTH_SUCCESS,
                    user: data.user
                  });
                })
                .catch(error => {
                  dispatch({
                    type: AUTH_ERROR,
                  });
                })
            })
            .catch(error => {
              dispatch({
                type: AUTH_ERROR,
              });
            })
        } else {
          dispatch({
            type: AUTH_ERROR,
          });
        }
      })
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

  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');

  if (accessToken) {
    requestUpdateUser(data, accessToken)
      .then(dataUser => {
        dispatch({
          type: AUTH_SUCCESS,
          user: dataUser.user
        });
      })
      .catch(error => {
        if (error.message === 'jwt expired' && refreshToken) {
          requestUpdateToken(refreshToken)
            .then(dataToken => {
              localStorage.setItem('accessToken', dataToken.accessToken);
              localStorage.setItem('refreshToken', dataToken.refreshToken);

              requestUpdateUser(data, dataToken.accessToken)
                .then(dataUser => {
                  dispatch({
                    type: AUTH_SUCCESS,
                    user: dataUser.user
                  });
                })
                .catch(error => {
                  dispatch({
                    type: AUTH_ERROR,
                  });
                })
            })
            .catch(error => {
              dispatch({
                type: AUTH_ERROR,
              });
            })
        } else {
          dispatch({
            type: AUTH_ERROR,
          });
        }
      })
  } else {
    dispatch({
      type: RESET_AUTH,
    });
  }
}

export const logout = () => async (dispatch) => {
  dispatch({
    type: AUTH_REQUEST
  });

  const refreshToken = localStorage.getItem('refreshToken');

  requestLogout(refreshToken)
    .then(data => {
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('accessToken');
      dispatch({
        type: RESET_AUTH,
      });
    })
    .catch(error => {
      dispatch({
        type: AUTH_ERROR,
      });
    });
}

export const resetAuth = () => ({
  type: RESET_AUTH,
});
