import { IngredientType } from '../../utils/types';
import { TIngredientsActions } from '../actions/ingredients';
import {
  GET_INGREDIENTS,
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_SUCCESS,
  CLEAN_INGREDIENTS
} from '../constants';

type TIngredientsState = {
  isLoading: boolean;
  hasError: boolean;
  data: IngredientType[]
}

const initialState: TIngredientsState = {
  isLoading: false,
  hasError: false,
  data: []
}

const ingredients = (state = initialState, action: TIngredientsActions): TIngredientsState => {
  switch (action.type) {
    case GET_INGREDIENTS: {
      return {
        ...state,
        isLoading: true,
        hasError: false
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        data: action.data,
        isLoading: false
      };
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...initialState,
        hasError: true
      };
    }
    case CLEAN_INGREDIENTS: {
      return initialState
    }
    default: {
      return state;
    }
  }
}

export default ingredients;
