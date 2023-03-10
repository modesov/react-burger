import { requestIngredients } from '../api';
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

  requestIngredients()
    .then(data => {
      dispatch({
        type: GET_INGREDIENTS_SUCCESS,
        data: data.data
      });
    })
    .catch(error => {
      dispatch({
        type: GET_INGREDIENTS_FAILED,
      });
    });
}

export const cleanIngredients = () => ({
  type: CLEAN_INGREDIENTS
});
