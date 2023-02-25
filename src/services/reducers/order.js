import {
  ORDER_REGISTRATION,
  ORDER_REGISTRATION_SUCCESS,
  ORDER_REGISTRATION_FAILED,
  ORDER_CLEAN
} from '../constants';

const initialState = {
  isOrderRegistration: false,
  hasOrderError: false,
  orderData: null
}

const order = (state = initialState, action) => {
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
