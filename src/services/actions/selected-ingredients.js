import { v4 as uuid } from 'uuid';

import {
  ADD_SELECTED_INGREDIENT,
  DELETE_SELECTED_INGREDIENT,
  CLEAN_SELECTED_INGREDIENT,
  UPDATE_SELECTED_INGREDIENTS
} from '../constants';

export const addSelectedIngredient = (data) => ({
  type: ADD_SELECTED_INGREDIENT,
  data: { ...data, uuid: uuid() }
});

export const deleteSelectedIngredient = (uuid) => ({
  type: DELETE_SELECTED_INGREDIENT,
  uuid: uuid
});

export const cleanSelectedIngredients = () => ({
  type: CLEAN_SELECTED_INGREDIENT,
});

export const updateSelectedIngredients = (updatedBurgerInsides) => ({
  type: UPDATE_SELECTED_INGREDIENTS,
  updatedBurgerInsides
});