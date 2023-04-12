import { OrderType } from '../../utils/types';
import { TOrderActions } from '../actions/order';
import {
  ORDER_REGISTRATION,
  ORDER_REGISTRATION_SUCCESS,
  ORDER_REGISTRATION_FAILED,
  ORDER_CLEAN
} from '../constants';

type TOrderState = {
  isOrderRegistration: boolean;
  hasOrderError: boolean;
  orderData: OrderType | null;
}

const initialState: TOrderState = {
  isOrderRegistration: false,
  hasOrderError: false,
  orderData: null
}

const order = (state = initialState, action: TOrderActions): TOrderState => {
  switch (action.type) {
    case ORDER_REGISTRATION: {
      return {
        ...state,
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
        ...initialState,
        hasOrderError: true
      }
    }
    case ORDER_CLEAN: {
      return initialState
    }
    default: {
      return state;
    }
  }
}

export default order;
