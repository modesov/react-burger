import { v4 as uuid } from 'uuid';

import {
  ADD_SELECTED_INGREDIENT,
  DELETE_SELECTED_INGREDIENT,
  CLEAN_SELECTED_INGREDIENT,
  UPDATE_SELECTED_INGREDIENTS
} from '../constants';
import { SelectedIngredientType, IngredientType } from '../../utils/types';

export interface IAddSelectedIngredientAction {
  readonly type: typeof ADD_SELECTED_INGREDIENT;
  readonly data: SelectedIngredientType;
}

export interface IDeleteSelectedIngredientAction {
  readonly type: typeof DELETE_SELECTED_INGREDIENT;
  readonly uuid: string;
}

export interface ICleanSelectedIngredientAction {
  readonly type: typeof CLEAN_SELECTED_INGREDIENT;
}

export interface IUpdateSelectedIngredientAction {
  readonly type: typeof UPDATE_SELECTED_INGREDIENTS;
  readonly updatedBurgerInsides: SelectedIngredientType[];
}

export type TSelectedIngredientActions =
  | IAddSelectedIngredientAction
  | IDeleteSelectedIngredientAction
  | ICleanSelectedIngredientAction
  | IUpdateSelectedIngredientAction;


export const addSelectedIngredient = (data: IngredientType): IAddSelectedIngredientAction => ({
  type: ADD_SELECTED_INGREDIENT,
  data: { ...data, uuid: uuid() }
});

export const deleteSelectedIngredient = (uuid: string): IDeleteSelectedIngredientAction => ({
  type: DELETE_SELECTED_INGREDIENT,
  uuid: uuid
});

export const cleanSelectedIngredients = (): ICleanSelectedIngredientAction => ({
  type: CLEAN_SELECTED_INGREDIENT,
});

export const updateSelectedIngredients = (updatedBurgerInsides: SelectedIngredientType[]): IUpdateSelectedIngredientAction => ({
  type: UPDATE_SELECTED_INGREDIENTS,
  updatedBurgerInsides
});