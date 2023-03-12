import { requestOrderRegistration, requestUpdateToken } from '../api';
import { cleanSelectedIngredients } from './selected-ingredients';
import {
  ORDER_REGISTRATION,
  ORDER_REGISTRATION_SUCCESS,
  ORDER_REGISTRATION_FAILED,
  ORDER_CLEAN
} from '../constants';

export const orderRegistration = (ingredientIds) => async (dispatch) => {
  dispatch({
    type: ORDER_REGISTRATION
  });

  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');

  if (accessToken) {
    requestOrderRegistration(ingredientIds, accessToken)
      .then(data => {
        dispatch({
          type: ORDER_REGISTRATION_SUCCESS,
          data: data
        });
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
                  dispatch({
                    type: ORDER_REGISTRATION_SUCCESS,
                    data: data
                  });
                  dispatch(cleanSelectedIngredients());
                })
                .catch(error => {
                  dispatch({
                    type: ORDER_REGISTRATION_FAILED,
                  });
                })
            })
            .catch(error => {
              dispatch({
                type: ORDER_REGISTRATION_FAILED,
              });
            })
        } else {
          dispatch({
            type: ORDER_REGISTRATION_FAILED,
          });
        }
      })
  } else {
    dispatch({
      type: ORDER_REGISTRATION_FAILED,
    });
  }
}

export const orderClean = () => ({
  type: ORDER_CLEAN
});
