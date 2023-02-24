import {
  SET_DETAILS_INGREDIENT,
  CLEAN_DETAILS_INGREDIENT
} from '../constants';

const detailsIngredient = (state = null, action) => {
  switch (action.type) {
    case SET_DETAILS_INGREDIENT: {
      return action.data
    }
    case CLEAN_DETAILS_INGREDIENT: {
      return null
    }
    default: {
      return state;
    }
  }
}

export default detailsIngredient;
