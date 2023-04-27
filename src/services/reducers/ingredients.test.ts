import { IngredientType } from "../../utils/types";
import { cleanIngredients, getIngredientsAction, getIngredientsFailedAction, getIngredientsSuccessAction } from "../actions/ingredients";
import ingredients, { initialState } from "./ingredients";

const data: IngredientType[] = [
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
    "_id": "643d69a5c3f7b9001cfa0941",
    "name": "Биокотлета из марсианской Магнолии",
    "type": "main",
    "proteins": 420,
    "fat": 142,
    "carbohydrates": 242,
    "calories": 4242,
    "price": 424,
    "image": "https://code.s3.yandex.net/react/code/meat-01.png",
    "image_mobile": "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
    "image_large": "https://code.s3.yandex.net/react/code/meat-01-large.png",
    "__v": 0
  }
];

describe('order reducer', () => {
  test('should return the initial state ingredients', () => {
    expect(ingredients(undefined, null))
      .toEqual(initialState);
  });

  test('should work out GET_INGREDIENTS correctly', () => {
    const action = getIngredientsAction();

    expect(ingredients(initialState, action)).toEqual({ ...initialState, isLoading: true });
  });

  test('should work out GET_INGREDIENTS_SUCCESS correctly', () => {
    const action = getIngredientsSuccessAction(data);

    expect(ingredients(initialState, action)).toEqual({ ...initialState, data: data });
  });

  test('should work out GET_INGREDIENTS_FAILED correctly', () => {
    const action = getIngredientsFailedAction();

    expect(ingredients(initialState, action)).toEqual({ ...initialState, hasError: true });
  });

  test('should work out CLEAN_INGREDIENTS correctly', () => {
    const action = cleanIngredients();

    expect(ingredients({...initialState, data}, action)).toEqual(initialState);
  });
});