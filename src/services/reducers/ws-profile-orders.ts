import { TWSOrderState } from '../../utils/types';
import { TWSProfileOrdersActions } from '../actions/ws-profile-orders';
import {
  WS_PROFILE_ORDERS_CONNECTION_SUCCESS,
  WS_PROFILE_ORDERS_CONNECTION_ERROR,
  WS_PROFILE_ORDERS_CONNECTION_CLOSED,
  WS_PROFILE_ORDERS_GET_MESSAGE
} from '../constants';

const initialState: TWSOrderState = {
  wsConnected: false,
  data: null,
  error: null,
}

const wsProfileOrders = (state = initialState, action: TWSProfileOrdersActions): TWSOrderState => {
  switch (action.type) {
    case WS_PROFILE_ORDERS_CONNECTION_SUCCESS: {
      return {
        ...state,
        wsConnected: true
      };
    }
    case WS_PROFILE_ORDERS_CONNECTION_ERROR: {
      return {
        ...state,
        error: action.payload,
        wsConnected: false
      };
    }
    case WS_PROFILE_ORDERS_CONNECTION_CLOSED: {
      return { ...initialState }
    }
    case WS_PROFILE_ORDERS_GET_MESSAGE: {
      return {
        ...state,
        data: action.payload
      }
    }
    default: {
      return state;
    }
  }
}

export default wsProfileOrders;
