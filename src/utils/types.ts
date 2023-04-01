import React from "react";

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

export interface OrderType {
  name: string;
  order: {
    number: number;
  }
  success: boolean;
}

export interface UserLoginType {
  email: string;
  password: string;
}

export interface UserType extends UserLoginType {
  name: string;
}

export interface ResetPasswordType { 
  password: string;
  token: string;
}

export type HandleFunctionType = () => void


