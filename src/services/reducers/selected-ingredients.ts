import { SelectedIngredientType } from '../../utils/types';
import { TSelectedIngredientActions } from '../actions/selected-ingredients';
import {
  ADD_SELECTED_INGREDIENT,
  DELETE_SELECTED_INGREDIENT,
  CLEAN_SELECTED_INGREDIENT,
  UPDATE_SELECTED_INGREDIENTS
} from '../constants';

type TSelectedIngredientsState = {
  wrapIngredient: SelectedIngredientType | null,
  burgerInsides: SelectedIngredientType[]
}

const initialState: TSelectedIngredientsState = {
  wrapIngredient: null,
  burgerInsides: []
}

const selectedIngredients = (state = initialState, action: TSelectedIngredientActions): TSelectedIngredientsState => {
  switch (action.type) {
    case ADD_SELECTED_INGREDIENT: {
      if (action.data.type === 'bun') {
        return { ...state, wrapIngredient: action.data }
      }

      return {...state, burgerInsides: [...state.burgerInsides, action.data]}
    }
    case DELETE_SELECTED_INGREDIENT: {
      return {...state, burgerInsides: state.burgerInsides.filter(el => el.uuid !== action.uuid)}
    }
    case CLEAN_SELECTED_INGREDIENT: {
      return initialState;
    }
    case UPDATE_SELECTED_INGREDIENTS: {      
      return {...state, burgerInsides: action.updatedBurgerInsides}
    }
    default: {
      return state;
    }
  }
}

export default selectedIngredients;
