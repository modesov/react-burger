import {
  TypedUseSelectorHook, 
  useSelector as selectorHook,
  useDispatch as dispatchHook
} from "react-redux";
import { AppDispatch, RootStateType } from "../utils/types";


export const useSelector:  TypedUseSelectorHook<RootStateType> = selectorHook;
export const useDispatch = () => dispatchHook<AppDispatch>();
