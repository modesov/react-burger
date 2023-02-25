import { API_BASE_URL, checkResponse } from '../api';
import { cleanSelectedIngredients } from './selected-ingredients';
import {
  ORDER_REGISTRATION,
  ORDER_REGISTRATION_SUCCESS,
  ORDER_REGISTRATION_FAILED,
  ORDER_CLEAN
} from '../constants';

export const orderRegistration = (ingredientIds) => (dispatch, getState) => {
  dispatch({
    type: ORDER_REGISTRATION
  });

  fetch(`${API_BASE_URL}orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({ ingredients: ingredientIds })
  })
    .then(checkResponse)
    .then(data => {
      if (data.success) {
        dispatch({
          type: ORDER_REGISTRATION_SUCCESS,
          data: data
        });
        dispatch(cleanSelectedIngredients());
      } else {
        dispatch({
          type: ORDER_REGISTRATION_FAILED,
        });
      }
    })
    .catch(e => {
      dispatch({
        type: ORDER_REGISTRATION_FAILED,
      });
    });
}

export const orderClean = () => ({
  type: ORDER_CLEAN
});
