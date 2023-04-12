import { createSelector } from 'reselect';
import { RootStateType } from '../utils/types';

export interface CounterType {
  id: string;
  count: number;
}

export const selectorTabs = (state: RootStateType) => state.tabs;

export const selectorIngredients = (state: RootStateType) => state.ingredients;

export const selectorSelectedIngredients = (state: RootStateType) => state.selectedIngredients;

export const selectorOrder = (state: RootStateType) => state.order;

export const selectorAuth = (state: RootStateType) => state.auth;

export const selectorUser = (state: RootStateType) => state.auth.user;

export const selectorWSOrders = (state: RootStateType) => state.wsOrders

export const selectorWSProfileOrders = (state: RootStateType) => state.wsProfileOrders

export const selectorIngredientCounters = createSelector(
  selectorSelectedIngredients,
  selectorIngredients,
  ({ wrapIngredient, burgerInsides }, { data: ingredients }) => {
    const counters: CounterType[] = [];
    ingredients.forEach(ingredient => {
      counters.push({
        id: ingredient._id,
        count: [...burgerInsides, wrapIngredient, wrapIngredient].reduce(
          (acc: number, el) => el?._id === ingredient._id ? acc + 1 : acc, 0
        )
      });
    });

    return counters
  }
);
