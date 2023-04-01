import { FC, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';

import burgerInsidesStyle from './burger-insides.module.css';
import ItemBurgerInside from '../item-burger-inside/item-burger-inside';
import { deleteSelectedIngredient, updateSelectedIngredients } from '../../services/actions/selected-ingredients';
import { SelectedIngredientType } from '../../utils/types';

interface BurgerInsidesProps {
  burgerInsides: SelectedIngredientType[];
}

export type FindIndexCallback = (id: string) => number | undefined;
export type MoveBurgerIngredientsCallback = (element: SelectedIngredientType, atIndex: number) => void;

const BurgerInsides: FC<BurgerInsidesProps> = ({ burgerInsides }) => {
  const [, dropRef] = useDrop(() => ({ accept: 'constructor' }));
  const dispatch = useDispatch();

  const deleteIngredient = (uuid: string) => {
    dispatch(deleteSelectedIngredient(uuid));
  }

  const findIndex = useCallback<FindIndexCallback>(
    (id) => {
      const item: SelectedIngredientType | undefined = burgerInsides.find(el => el.uuid === id);
      return item ? burgerInsides.indexOf(item) : undefined;
    },
    [burgerInsides]
  );

  const moveBurgerIngredients = useCallback<MoveBurgerIngredientsCallback>(
    (element, atIndex) => {
      const index = findIndex(element.uuid);

      if (index) {
        const updatedBurgerInsides = [...burgerInsides];
        updatedBurgerInsides.splice(index, 1);
        updatedBurgerInsides.splice(atIndex, 0, element);

        dispatch(updateSelectedIngredients(updatedBurgerInsides));
      }
    },
    [burgerInsides, dispatch, findIndex]
  );

  return (
    <ul ref={dropRef} className={burgerInsidesStyle.list}>
      {burgerInsides.map((el) => (
        <ItemBurgerInside
          key={el.uuid}
          element={el}
          handleDelete={deleteIngredient}
          findIndex={findIndex}
          moveBurgerIngredients={moveBurgerIngredients}
        />
      ))}
    </ul>
  );
}

export default BurgerInsides;
