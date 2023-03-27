import { createSelector } from 'reselect';

export const selectorTabs = state => state.tabs;

export const selectorIngredients = state => state.ingredients;

export const selectorSelectedIngredients = state => state.selectedIngredients;

export const selectorDetailsIngredient = state => state.detailsIngredient;

export const selectorOrder = state => state.order;

export const selectorAuth = state => state.auth;

export const selectorUser = state => state.auth.user;

export const selectorIngredientCounters = createSelector(
  selectorSelectedIngredients,
  selectorIngredients,
  ({ wrapIngredient, burgerInsides }, { data: ingredients }) => {
    const counters = {};
    ingredients.forEach(ingredient => {
      counters[ingredient._id] = [...burgerInsides, wrapIngredient, wrapIngredient].reduce(
        (acc, el) => el._id === ingredient._id ? acc + 1 : acc, 0
      );
    });

    return counters;
  }
);
