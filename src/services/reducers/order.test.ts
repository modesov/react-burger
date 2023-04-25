import { OrderType } from "../../utils/types";
import { getOrderRegistrationAction, getOrderRegistrationFailedAction, getOrderRegistrationSuccessAction, orderClean } from "../actions/order";
import order, { initialState } from "./order";

const data: OrderType = {
  "success": true,
  "name": "Антарианский space традиционный-галактический краторный бургер",
  "order": {
    "ingredients": [
      {
        "_id": "643d69a5c3f7b9001cfa093c",
        "name": "Краторная булка N-200i",
        "type": "bun",
        "proteins": 80,
        "fat": 24,
        "carbohydrates": 53,
        "calories": 420,
        "price": 1255,
        "image": "https://code.s3.yandex.net/react/code/bun-02.png",
        "image_mobile": "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
        "image_large": "https://code.s3.yandex.net/react/code/bun-02-large.png",
        "__v": 0
      },
      {
        "_id": "643d69a5c3f7b9001cfa093c",
        "name": "Краторная булка N-200i",
        "type": "bun",
        "proteins": 80,
        "fat": 24,
        "carbohydrates": 53,
        "calories": 420,
        "price": 1255,
        "image": "https://code.s3.yandex.net/react/code/bun-02.png",
        "image_mobile": "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
        "image_large": "https://code.s3.yandex.net/react/code/bun-02-large.png",
        "__v": 0
      },
      {
        "_id": "643d69a5c3f7b9001cfa0943",
        "name": "Соус фирменный Space Sauce",
        "type": "sauce",
        "proteins": 50,
        "fat": 22,
        "carbohydrates": 11,
        "calories": 14,
        "price": 80,
        "image": "https://code.s3.yandex.net/react/code/sauce-04.png",
        "image_mobile": "https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
        "image_large": "https://code.s3.yandex.net/react/code/sauce-04-large.png",
        "__v": 0
      },
      {
        "_id": "643d69a5c3f7b9001cfa0945",
        "name": "Соус с шипами Антарианского плоскоходца",
        "type": "sauce",
        "proteins": 101,
        "fat": 99,
        "carbohydrates": 100,
        "calories": 100,
        "price": 88,
        "image": "https://code.s3.yandex.net/react/code/sauce-01.png",
        "image_mobile": "https://code.s3.yandex.net/react/code/sauce-01-mobile.png",
        "image_large": "https://code.s3.yandex.net/react/code/sauce-01-large.png",
        "__v": 0
      },
      {
        "_id": "643d69a5c3f7b9001cfa0944",
        "name": "Соус традиционный галактический",
        "type": "sauce",
        "proteins": 42,
        "fat": 24,
        "carbohydrates": 42,
        "calories": 99,
        "price": 15,
        "image": "https://code.s3.yandex.net/react/code/sauce-03.png",
        "image_mobile": "https://code.s3.yandex.net/react/code/sauce-03-mobile.png",
        "image_large": "https://code.s3.yandex.net/react/code/sauce-03-large.png",
        "__v": 0
      }
    ],
    "_id": "6447f20b45c6f2001be6d924",
    "owner": {
      "name": "Денис",
      "email": "msdenimod@yandex.ru",
      "createdAt": "2023-04-20T07:00:10.664Z",
      "updatedAt": "2023-04-25T12:22:06.880Z"
    },
    "status": "done",
    "name": "Антарианский space традиционный-галактический краторный бургер",
    "createdAt": "2023-04-25T15:30:19.282Z",
    "updatedAt": "2023-04-25T15:30:19.372Z",
    "number": 1466,
    "price": 2693
  }
};

describe('order reducer', () => {
  test('should return the initial state order', () => {
    expect(order(undefined, null))
      .toEqual(initialState);
  });

  test('should work out ORDER_REGISTRATION correctly', () => {
    const action = getOrderRegistrationAction();

    expect(order(initialState, action)).toEqual({ ...initialState, isOrderRegistration: true });
  });

  test('should work out ORDER_REGISTRATION_SUCCESS correctly', () => {
    const action = getOrderRegistrationSuccessAction(data);

    expect(order(initialState, action)).toEqual({ ...initialState, isOrderRegistration: false, orderData: data });
  });

  test('should work out ORDER_REGISTRATION_FAILED correctly', () => {
    const action = getOrderRegistrationFailedAction();

    expect(order({ ...initialState, isOrderRegistration: true }, action)).toEqual({ ...initialState, isOrderRegistration: false, hasOrderError: true });
  });

  test('should work out ORDER_CLEAN correctly', () => {
    const action = orderClean();

    expect(order({ ...initialState, orderData: data }, action)).toEqual(initialState);
  });
});