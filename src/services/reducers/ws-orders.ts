import { TWSOrderState } from '../../utils/types';
import { TWSOrdersActions } from '../actions/ws-orders';
import {
  WS_ORDERS_CONNECTION_SUCCESS,
  WS_ORDERS_CONNECTION_ERROR,
  WS_ORDERS_CONNECTION_CLOSED,
  WS_ORDERS_GET_MESSAGE
} from '../constants';

export const initialState: TWSOrderState = {
  wsConnected: false,
  data: null,
  error: false,
}

const wsOrders = (state = initialState, action: TWSOrdersActions | null): TWSOrderState => {
  switch (action?.type) {
    case WS_ORDERS_CONNECTION_SUCCESS: {
      return {
        ...state,
        wsConnected: true
      };
    }
    case WS_ORDERS_CONNECTION_ERROR: {
      return {
        ...state,
        error: true,
        wsConnected: false
      };
    }
    case WS_ORDERS_CONNECTION_CLOSED: {
      return { ...initialState }
    }
    case WS_ORDERS_GET_MESSAGE: {
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

export default wsOrders;
