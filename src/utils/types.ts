import React from "react";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { store } from "../services/store";
import { TTabsActions } from "../services/actions/tabs";
import { TSelectedIngredientActions } from "../services/actions/selected-ingredients";
import { TOrderActions } from "../services/actions/order";
import { TIngredientsActions } from "../services/actions/ingredients";
import { TAuthActions } from "../services/actions/auth";
import { TWSOrdersActions } from "../services/actions/ws-orders";

import { 
  WS_ORDERS_CONNECTION_START,
  WS_ORDERS_CONNECTION_SUCCESS,
  WS_ORDERS_CONNECTION_ERROR,
  WS_ORDERS_CONNECTION_CLOSED,
  WS_ORDERS_GET_MESSAGE,
  WS_PROFILE_ORDERS_CONNECTION_START,
  WS_PROFILE_ORDERS_CONNECTION_SUCCESS,
  WS_PROFILE_ORDERS_CONNECTION_CLOSED,
  WS_PROFILE_ORDERS_CONNECTION_ERROR,
  WS_PROFILE_ORDERS_GET_MESSAGE
 } from '../services/constants';
import { TWSProfileOrdersActions } from "../services/actions/ws-profile-orders";

export interface ItemsMenuType {
  href: string;
  text: string;
  icon: React.ReactNode;
}

export interface IngredientType {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
}

export interface SelectedIngredientType extends IngredientType {
  uuid: string;
}

export interface TabType {
  value: string;
  text: string;
  isActive: boolean;
}

export interface OwnerType {
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
} 

export interface OrderInfoType {
    ingredients: IngredientType[];
    _id: string;
    owner: OwnerType;
    status: 'created' | 'pending' | 'done';
    name: string;
    createdAt: string;
    updatedAt: string;
    number: number;
    price: number;
}

export interface OrderType {
  name: string;
  order: OrderInfoType;
  success: boolean;
}

export interface WSOrderType {
  ingredients: string[];
  _id: string;
  status: 'created' | 'pending' | 'done';
  name: string;
  number: number;
  createdAt: string;
  updatedAt: string;
}

export interface WSOrdersType {
  orders: WSOrderType[];
  total: number;
  totalToday: number;
}

export interface WSOrdersResponseType extends WSOrdersType {
  success: boolean;
}

export interface UserLoginType {
  email: string;
  password: string;
}

export interface UserType extends UserLoginType {
  name: string;
}

export interface AuthUserType {
  email: string;
  name: string;
}

export interface ResetPasswordType {
  password: string;
  token: string;
}

export type TWSOrderState = {
  wsConnected: boolean;
  data: WSOrdersType | null;
  error: boolean;
}

export type HandleFunctionType = () => void;

export type TApplicationActions =
  | TTabsActions
  | TSelectedIngredientActions
  | TOrderActions
  | TIngredientsActions
  | TAuthActions
  | TWSOrdersActions
  | TWSProfileOrdersActions;

export type RootStateType = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<RootStateType, unknown, TApplicationActions>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootStateType, unknown, TApplicationActions>;

export type TWSStoreActions = {
  wsInit: typeof  WS_ORDERS_CONNECTION_START | typeof WS_PROFILE_ORDERS_CONNECTION_START,
  onOpen: typeof  WS_ORDERS_CONNECTION_SUCCESS | typeof   WS_PROFILE_ORDERS_CONNECTION_SUCCESS,
  onClose: typeof WS_ORDERS_CONNECTION_CLOSED | typeof   WS_PROFILE_ORDERS_CONNECTION_CLOSED,
  onError: typeof  WS_ORDERS_CONNECTION_ERROR | typeof   WS_PROFILE_ORDERS_CONNECTION_ERROR,
  onMessage: typeof  WS_ORDERS_GET_MESSAGE | typeof   WS_PROFILE_ORDERS_GET_MESSAGE
};


