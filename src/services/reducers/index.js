import { combineReducers } from 'redux';

import {
  GET_INGREDIENTS,
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_SUCCESS,
  CLEAN_INGREDIENTS,
  SET_CURRENT_TAB,
  SET_DETAILS_INGREDIENT,
  CLEAN_DETAILS_INGREDIENT,
  ADD_SELECTED_INGREDIENT,
  DELETE_SELECTED_INGREDIENT,
  CLEAN_SELECTED_INGREDIENT,
  UPDATE_SELECTED_INGREDIENTS,
  ORDER_REGISTRATION,
  ORDER_REGISTRATION_SUCCESS,
  ORDER_REGISTRATION_FAILED,
  ORDER_CLEAN,
  IS_DRAG_INGREDIENT
} from '../constants';


const tabsInitialState = [
  {
    value: 'bun',
    text: 'Булки',
    isActive: true,
  },
  {
    value: 'sauce',
    text: 'Соусы',
    isActive: false,
  },
  {
    value: 'main',
    text: 'Начинки',
    isActive: false,
  },
];

const tabs = (state = tabsInitialState, action) => {
  switch (action.type) {
    case SET_CURRENT_TAB: {
      return state.map((tab) => ({ ...tab, isActive: tab.value === action.value }));
    }
    default: {
      return state;
    }
  }
}


const ingredientsInitialState = {
  isLoading: false,
  hasError: false,
  data: []
}

const ingredients = (state = ingredientsInitialState, action) => {
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
        ...state,
        isLoading: false,
        hasError: true
      };
    }
    case CLEAN_INGREDIENTS: {
      return ingredientsInitialState
    }
    default: {
      return state;
    }
  }
}


const selectedIngredientsInitialState = {
  wrapIngredient: {},
  burgerInsides: []
}

const selectedIngredients = (state = selectedIngredientsInitialState, action) => {
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
      return selectedIngredientsInitialState;
    }
    case UPDATE_SELECTED_INGREDIENTS: {      
      return {...state, burgerInsides: action.updatedBurgerInsides}
    }
    default: {
      return state;
    }
  }
}


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


const orderInitialState = {
  isOrderRegistration: false,
  hasOrderError: false,
  orderData: null
}

const order = (state = orderInitialState, action) => {
  switch (action.type) {
    case ORDER_REGISTRATION: {
      return {
        ...order,
        isOrderRegistration: true,
        hasOrderError: false
      }
    }
    case ORDER_REGISTRATION_SUCCESS: {
      return {
        ...state,
        isOrderRegistration: false,
        orderData: action.data
      }
    }
    case ORDER_REGISTRATION_FAILED: {
      return {
        ...state,
        isOrderRegistration: false,
        hasOrderError: true
      }
    }
    case ORDER_CLEAN: {
      return orderInitialState
    }
    default: {
      return state;
    }
  }
}


const isDragIngredient = (state = false, action) => {
  switch (action.type) {
    case IS_DRAG_INGREDIENT: {
      return action.value;
    }
    default: {
      return state;
    }
  }
}


const rootReducer = combineReducers({
  tabs,
  ingredients,
  selectedIngredients,
  detailsIngredient,
  order,
  isDragIngredient
});

export default rootReducer;
