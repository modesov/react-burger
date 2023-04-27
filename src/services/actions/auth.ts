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
import { AppDispatch, AppThunk, AuthUserType, UserLoginType, UserType } from '../../utils/types';

export interface IGetAuthRequestAction {
  readonly type: typeof AUTH_REQUEST;
}

export interface IGetAuthSuccessAction {
  readonly type: typeof AUTH_SUCCESS;
  readonly user: AuthUserType;
}

export interface IGetAuthErrorAction {
  readonly type: typeof AUTH_ERROR;
}

export interface IGetResetAuthAction {
  readonly type: typeof RESET_AUTH;
}

export type TAuthActions =
  | IGetAuthRequestAction
  | IGetAuthSuccessAction
  | IGetAuthErrorAction
  | IGetResetAuthAction;

export const getAuthRequestAction = (): IGetAuthRequestAction => ({
  type: AUTH_REQUEST
})

export const getAuthSuccessAction = (user: AuthUserType): IGetAuthSuccessAction => ({
  type: AUTH_SUCCESS,
  user
})

export const getAuthErrorAction = (): IGetAuthErrorAction => ({
  type: AUTH_ERROR
})

export const getResetAuthAction = (): IGetResetAuthAction => ({
  type: RESET_AUTH
});

export const authorization = (data: UserLoginType | UserType, type: string = 'login'): AppThunk  => (dispatch: AppDispatch) => { 
  dispatch(getAuthRequestAction());

  requestAuthorization(data, type)
    .then(data => {
      localStorage.setItem('refreshToken', data.refreshToken);
      localStorage.setItem('accessToken', data.accessToken);

      dispatch(getAuthSuccessAction(data.user));
    })
    .catch(error => {
      dispatch(getAuthErrorAction());
    });
}

export const getUser = (): AppThunk => (dispatch: AppDispatch) => {
  dispatch(getAuthRequestAction());

  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');

  if (accessToken) {
    requestUser(accessToken)
      .then(data => {
        dispatch(getAuthSuccessAction(data.user));
      })
      .catch(error => {
        if (error.message === 'jwt expired' && refreshToken) {
          requestUpdateToken(refreshToken)
            .then(data => {
              localStorage.setItem('accessToken', data.accessToken);
              localStorage.setItem('refreshToken', data.refreshToken);

              requestUser(data.accessToken)
                .then(data => {
                  dispatch(getAuthSuccessAction(data.user));
                })
                .catch(error => {
                  dispatch(getAuthErrorAction());
                })
            })
            .catch(error => {
              dispatch(getAuthErrorAction());
            })
        } else {
          dispatch(getAuthErrorAction());
        }
      })
  } else {
    dispatch(getResetAuthAction());
  }
}

export const updateUser = (data: UserType): AppThunk => (dispatch: AppDispatch) => {
  dispatch(getAuthRequestAction());

  const accessToken: string | null = localStorage.getItem('accessToken');
  const refreshToken: string | null = localStorage.getItem('refreshToken');

  if (accessToken) {
    requestUpdateUser(data, accessToken)
      .then(dataUser => {
        dispatch(getAuthSuccessAction(dataUser.user));
      })
      .catch(error => {
        if (error.message === 'jwt expired' && refreshToken) {
          requestUpdateToken(refreshToken)
            .then(dataToken => {
              localStorage.setItem('accessToken', dataToken.accessToken);
              localStorage.setItem('refreshToken', dataToken.refreshToken);

              requestUpdateUser(data, dataToken.accessToken)
                .then(dataUser => {
                  dispatch(getAuthSuccessAction(dataUser.user));
                })
                .catch(error => {
                  dispatch(getAuthErrorAction());
                })
            })
            .catch(error => {
              dispatch(getAuthErrorAction());
            })
        } else {
          dispatch(getAuthErrorAction());
        }
      })
  } else {
    dispatch(getResetAuthAction());
  }
}

export const logout = (): AppThunk => (dispatch: AppDispatch) => {
  dispatch(getAuthRequestAction());

  const refreshToken: string | null = localStorage.getItem('refreshToken');

  if (refreshToken) {
    requestLogout(refreshToken)
      .then(data => {
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('accessToken');
        dispatch(getResetAuthAction());
      })
      .catch(error => {
        dispatch(getAuthErrorAction());
      });
  } else {
    dispatch(getResetAuthAction());
  }
}
