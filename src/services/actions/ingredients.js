import { API_BASE_URL, checkResponse } from '../api';
import {
  GET_INGREDIENTS,
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_SUCCESS,
  CLEAN_INGREDIENTS
} from '../constants';

export const getIngredients = () => (dispatch) => {
  dispatch({
    type: GET_INGREDIENTS
  });

  fetch(`${API_BASE_URL}ingredients`)
    .then(checkResponse)
    .then(data => {
      if (data.success) {
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          data: data.data
        });
      } else {
        dispatch({
          type: GET_INGREDIENTS_FAILED,
        });
      }
    })
    .catch(e => {
      dispatch({
        type: GET_INGREDIENTS_FAILED,
      });
    });
}

export const cleanIngredients = () => ({
  type: CLEAN_INGREDIENTS
});
