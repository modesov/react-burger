import { requestIngredients } from '../api';
import {
  GET_INGREDIENTS,
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_SUCCESS,
  CLEAN_INGREDIENTS
} from '../constants';
import { AppDispatch, AppThunk, IngredientType } from '../../utils/types';

export interface IGetIngredientsAction {
  readonly type: typeof GET_INGREDIENTS;
}

export interface IGetIngredientsSuccessAction {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  readonly data: IngredientType[];
}

export interface IGetIngredientsFailedAction {
  readonly type: typeof GET_INGREDIENTS_FAILED;
}

export interface IGetCleanIngredientsAction {
  readonly type: typeof CLEAN_INGREDIENTS;
}

export type TIngredientsActions = 
  | IGetIngredientsAction
  | IGetIngredientsSuccessAction
  | IGetIngredientsFailedAction
  | IGetCleanIngredientsAction;

export const getIngredientsAction = (): IGetIngredientsAction => ({
  type: GET_INGREDIENTS
})

export const getIngredientsSuccessAction = (data: IngredientType[]): IGetIngredientsSuccessAction => ({
  type: GET_INGREDIENTS_SUCCESS,
  data
})

export const getIngredientsFailedAction = (): IGetIngredientsFailedAction => ({
  type: GET_INGREDIENTS_FAILED
})

export const getIngredients = (): AppThunk => (dispatch: AppDispatch) => {
  dispatch(getIngredientsAction());

  requestIngredients()
    .then(data => {
      dispatch(getIngredientsSuccessAction(data.data));
    })
    .catch(error => {
      dispatch(getIngredientsFailedAction());
    });
}

export const cleanIngredients = (): IGetCleanIngredientsAction => ({
  type: CLEAN_INGREDIENTS
});
