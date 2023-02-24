import {
  ADD_SELECTED_INGREDIENT,
  DELETE_SELECTED_INGREDIENT,
  CLEAN_SELECTED_INGREDIENT,
  UPDATE_SELECTED_INGREDIENTS
} from '../constants';

const initialState = {
  wrapIngredient: {},
  burgerInsides: []
}

const selectedIngredients = (state = initialState, action) => {
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
