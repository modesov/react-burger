import { addSelectedIngredient, cleanSelectedIngredients, deleteSelectedIngredient, updateSelectedIngredients } from "../actions/selected-ingredients"
import selectedIngredients, { initialState } from "./selected-ingredients";

describe('selected-ingredients reducer', () => {
  it('should return the initial state selected-ingredients', () => {
    expect(selectedIngredients(undefined, null))
      .toEqual(initialState);
  });

  it('should added bun', () => {
    const data = {
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
    }
    const action = addSelectedIngredient(data);

    expect(selectedIngredients(initialState, action))
      .toEqual({ ...initialState, wrapIngredient: action.data });
  });

  it('should added Not a bun', () => {
    const data = {
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
    }
    const action = addSelectedIngredient(data);

    expect(selectedIngredients(initialState, action))
      .toEqual({ ...initialState, burgerInsides: [action.data] });
  });

  it('should delete the selected ingredient', () => {
    const init = {
      ...initialState, burgerInsides: [
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
          "__v": 0,
          "uuid": "f835bd76-f501-4c92-9ac9-9db2acbe1558"
        },
        {
          "_id": "643d69a5c3f7b9001cfa0940",
          "name": "Говяжий метеорит (отбивная)",
          "type": "main",
          "proteins": 800,
          "fat": 800,
          "carbohydrates": 300,
          "calories": 2674,
          "price": 3000,
          "image": "https://code.s3.yandex.net/react/code/meat-04.png",
          "image_mobile": "https://code.s3.yandex.net/react/code/meat-04-mobile.png",
          "image_large": "https://code.s3.yandex.net/react/code/meat-04-large.png",
          "__v": 0,
          "uuid": "6632a30e-31be-41cb-9119-50aca1a55fda"
        }
      ]
    }
    const action = deleteSelectedIngredient('6632a30e-31be-41cb-9119-50aca1a55fda');

    expect(selectedIngredients(init, action))
      .toEqual({
        ...initialState, burgerInsides: [
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
            "__v": 0,
            "uuid": "f835bd76-f501-4c92-9ac9-9db2acbe1558"
          }
        ]
      });
  });

  it('should clean the selected ingredients', () => {
    const init = {
      ...initialState,
      wrapIngredient: {
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
        "__v": 0,
        "uuid": "19af11d6-c054-4b37-846f-8da1b9cc7a91"
      },
      burgerInsides: [
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
          "__v": 0,
          "uuid": "f835bd76-f501-4c92-9ac9-9db2acbe1558"
        },
        {
          "_id": "643d69a5c3f7b9001cfa0940",
          "name": "Говяжий метеорит (отбивная)",
          "type": "main",
          "proteins": 800,
          "fat": 800,
          "carbohydrates": 300,
          "calories": 2674,
          "price": 3000,
          "image": "https://code.s3.yandex.net/react/code/meat-04.png",
          "image_mobile": "https://code.s3.yandex.net/react/code/meat-04-mobile.png",
          "image_large": "https://code.s3.yandex.net/react/code/meat-04-large.png",
          "__v": 0,
          "uuid": "6632a30e-31be-41cb-9119-50aca1a55fda"
        }
      ]
    }
    const action = cleanSelectedIngredients();

    expect(selectedIngredients(init, action))
      .toEqual(initialState);
  });

  it('should updated the selected ingredients', () => {
    const init = {
      ...initialState,
      wrapIngredient: {
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
        "__v": 0,
        "uuid": "19af11d6-c054-4b37-846f-8da1b9cc7a91"
      },
      burgerInsides: [
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
          "__v": 0,
          "uuid": "f835bd76-f501-4c92-9ac9-9db2acbe1558"
        },
        {
          "_id": "643d69a5c3f7b9001cfa0940",
          "name": "Говяжий метеорит (отбивная)",
          "type": "main",
          "proteins": 800,
          "fat": 800,
          "carbohydrates": 300,
          "calories": 2674,
          "price": 3000,
          "image": "https://code.s3.yandex.net/react/code/meat-04.png",
          "image_mobile": "https://code.s3.yandex.net/react/code/meat-04-mobile.png",
          "image_large": "https://code.s3.yandex.net/react/code/meat-04-large.png",
          "__v": 0,
          "uuid": "6632a30e-31be-41cb-9119-50aca1a55fda"
        }
      ]
    }

    const updatedBurgerInsides = [
      {
        "_id": "643d69a5c3f7b9001cfa0940",
        "name": "Говяжий метеорит (отбивная)",
        "type": "main",
        "proteins": 800,
        "fat": 800,
        "carbohydrates": 300,
        "calories": 2674,
        "price": 3000,
        "image": "https://code.s3.yandex.net/react/code/meat-04.png",
        "image_mobile": "https://code.s3.yandex.net/react/code/meat-04-mobile.png",
        "image_large": "https://code.s3.yandex.net/react/code/meat-04-large.png",
        "__v": 0,
        "uuid": "6632a30e-31be-41cb-9119-50aca1a55fda"
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
        "__v": 0,
        "uuid": "f835bd76-f501-4c92-9ac9-9db2acbe1558"
      }
    ];

    const action = updateSelectedIngredients(updatedBurgerInsides);

    expect(selectedIngredients(init, action))
      .toEqual({...init, burgerInsides: updatedBurgerInsides});
  });
})