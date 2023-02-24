import {
  GET_INGREDIENTS,
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_SUCCESS,
  CLEAN_INGREDIENTS
} from '../constants';

const initialState = {
  isLoading: false,
  hasError: false,
  data: []
}

const ingredients = (state = initialState, action) => {
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
