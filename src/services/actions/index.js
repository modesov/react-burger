import { v4 as uuid } from 'uuid';
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

const API_BASE_URL = 'https://norma.nomoreparties.space/api/';

const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};


export const getIngredients = () => (dispatch) => {
  dispatch({
    type: GET_INGREDIENTS
  });

  fetch(`${API_BASE_URL}ingredients`)
    .then(checkResponse)
    .then(data => {
      if (data.success) {
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          data: data.data
        });
      } else {
        dispatch({
          type: GET_INGREDIENTS_FAILED,
        });
      }
    })
    .catch(e => {
      dispatch({
        type: GET_INGREDIENTS_FAILED,
      });
    });
}

export const cleanIngredients = () => ({
  type: CLEAN_INGREDIENTS
});


export const setCurrentTab = (value) => ({
  type: SET_CURRENT_TAB,
  value: value
});


export const setDetailsIngredients = (data) => ({
  type: SET_DETAILS_INGREDIENT,
  data: data
});

export const cleanDetailsIngredients = () => ({
  type: CLEAN_DETAILS_INGREDIENT,
});


export const addSelectedIngredient = (data) => ({
  type: ADD_SELECTED_INGREDIENT,
  data: {...data, uuid: uuid()}
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


export const orderRegistration = (ingredientIds) => (dispatch, getState) => {
  dispatch({
    type: ORDER_REGISTRATION
  });

  fetch(`${API_BASE_URL}orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({ ingredients: ingredientIds })
  })
    .then(checkResponse)
    .then(data => {
      if (data.success) {
        dispatch({
          type: ORDER_REGISTRATION_SUCCESS,
          data: data
        });
        dispatch(cleanSelectedIngredients());
      } else {
        dispatch({
          type: ORDER_REGISTRATION_FAILED,
        });
      }
    })
    .catch(e => {
      dispatch({
        type: ORDER_REGISTRATION_FAILED,
      });
    });
}

export const orderClean = () => ({
  type: ORDER_CLEAN
}); 

export const setIsDragIngredient = (value) => ({
  type: IS_DRAG_INGREDIENT,
  value
});
