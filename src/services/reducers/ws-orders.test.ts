import { WSOrdersType } from "../../utils/types";
import {
  WS_ORDERS_CONNECTION_CLOSED,
  WS_ORDERS_CONNECTION_ERROR,
  WS_ORDERS_CONNECTION_SUCCESS,
  WS_ORDERS_GET_MESSAGE
} from "../constants";
import wsOrders, { initialState } from "./ws-orders";

describe('ws-order reducer', () => {
  test('should return the initial state ws-order', () => {
    expect(wsOrders(initialState, null)).toEqual(initialState);
  });

  test('should work out WS_ORDERS_CONNECTION_SUCCESS correctly', () => {
    const action = { type: WS_ORDERS_CONNECTION_SUCCESS };

    expect(wsOrders(initialState, action)).toEqual({ ...initialState, wsConnected: true });
  });

  test('should work out WS_ORDERS_CONNECTION_ERROR correctly', () => {
    const action = { type: WS_ORDERS_CONNECTION_ERROR };

    expect(wsOrders(initialState, action)).toEqual({ ...initialState, error: true, wsConnected: false });
  });

  test('should work out WS_ORDERS_CONNECTION_CLOSED correctly', () => {
    const action = { type: WS_ORDERS_CONNECTION_CLOSED };

    expect(wsOrders({ ...initialState, wsConnected: true }, action)).toEqual(initialState);
  });

  test('should work out WS_ORDERS_GET_MESSAGE correctly', () => {
    const data: WSOrdersType = {
      "orders": [
        {
          "_id": "644773b045c6f2001be6d7d7",
          "ingredients": [
            "643d69a5c3f7b9001cfa093c",
            "643d69a5c3f7b9001cfa093c",
            "643d69a5c3f7b9001cfa0942",
            "643d69a5c3f7b9001cfa0943"
          ],
          "status": "done",
          "name": "Space краторный spicy бургер",
          "createdAt": "2023-04-25T06:31:12.525Z",
          "updatedAt": "2023-04-25T06:31:12.566Z",
          "number": 1412
        }
      ],
      "total": 1038,
      "totalToday": 106
    };
    const action = { type: WS_ORDERS_GET_MESSAGE, payload: data };

    expect(wsOrders({ ...initialState, wsConnected: true }, action)).toEqual({ ...initialState, wsConnected: true, data: data });
  });
});