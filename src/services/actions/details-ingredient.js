import {
  SET_DETAILS_INGREDIENT,
  CLEAN_DETAILS_INGREDIENT
} from '../constants';

export const setDetailsIngredient = (data) => ({
  type: SET_DETAILS_INGREDIENT,
  data: data
});

export const cleanDetailsIngredient = () => ({
  type: CLEAN_DETAILS_INGREDIENT,
});
