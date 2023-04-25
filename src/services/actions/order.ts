import { requestOrderRegistration, requestUpdateToken } from '../api';
import { cleanSelectedIngredients } from './selected-ingredients';
import {
  ORDER_REGISTRATION,
  ORDER_REGISTRATION_SUCCESS,
  ORDER_REGISTRATION_FAILED,
  ORDER_CLEAN
} from '../constants';
import { AppDispatch, AppThunk, OrderType } from '../../utils/types';

export interface IOrderReregistrationAction {
  readonly type: typeof ORDER_REGISTRATION;
}

export interface IOrderReregistrationSuccessAction {
  readonly type: typeof ORDER_REGISTRATION_SUCCESS;
  readonly data: OrderType;
}

export interface IOrderReregistrationFailedAction {
  readonly type: typeof ORDER_REGISTRATION_FAILED;
}

export interface IOrderCleanAction {
  readonly type: typeof ORDER_CLEAN;
}

export type TOrderActions =
  | IOrderReregistrationAction
  | IOrderReregistrationSuccessAction
  | IOrderReregistrationFailedAction
  | IOrderCleanAction;
 
export const getOrderRegistrationAction = (): IOrderReregistrationAction => ({
  type: ORDER_REGISTRATION
})

export const getOrderRegistrationSuccessAction = (data: OrderType): IOrderReregistrationSuccessAction => ({
  type: ORDER_REGISTRATION_SUCCESS,
  data
})

export const getOrderRegistrationFailedAction = (): IOrderReregistrationFailedAction => ({
  type: ORDER_REGISTRATION_FAILED,
})

export const orderRegistration = (ingredientIds: string[]): AppThunk => (dispatch: AppDispatch) => {
  dispatch(getOrderRegistrationAction());

  const accessToken: string | null = localStorage.getItem('accessToken');
  const refreshToken: string | null = localStorage.getItem('refreshToken');

  if (accessToken) {
    requestOrderRegistration(ingredientIds, accessToken)
      .then(data => {
        dispatch(getOrderRegistrationSuccessAction(data));
        dispatch(cleanSelectedIngredients());
      })
      .catch(error => {
        if (error.message === 'jwt expired' && refreshToken) {
          requestUpdateToken(refreshToken)
            .then(data => {
              localStorage.setItem('accessToken', data.accessToken);
              localStorage.setItem('refreshToken', data.refreshToken);

              requestOrderRegistration(ingredientIds, data.accessToken)
                .then(data => {
                  dispatch(getOrderRegistrationSuccessAction(data));
                  dispatch(cleanSelectedIngredients());
                })
                .catch(error => {
                  dispatch(getOrderRegistrationFailedAction());
                })
            })
            .catch(error => {
              dispatch(getOrderRegistrationFailedAction());
            })
        } else {
          dispatch(getOrderRegistrationFailedAction());
        }
      })
  } else {
    dispatch(getOrderRegistrationFailedAction());
  }
}

export const orderClean = (): IOrderCleanAction => ({
  type: ORDER_CLEAN
});
