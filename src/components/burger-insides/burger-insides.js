import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';
import PropTypes from 'prop-types';

import burgerInsidesStyle from './burger-insides.module.css';
import ItemBurgerInside from '../item-burger-inside/item-burger-inside';
import { itemBurgerInsidePropTypes } from '../../utils/propTypeConst';
import { deleteSelectedIngredient, updateSelectedIngredients } from '../../services/actions';

function BurgerInsides({ burgerInsides }) {
  const [, dropRef] = useDrop(() => ({ accept: 'constructor' }));
  const dispatch = useDispatch();

  const deleteIngredient = (uuid) => {
    dispatch(deleteSelectedIngredient(uuid));
  }

  const findIndex = useCallback(
    (id) => {
      const item = burgerInsides.find(el => el.uuid === id);
      return burgerInsides.indexOf(item);
    },
    [burgerInsides]
  );

  const moveBurgerIngredients = useCallback(
    (element, atIndex) => {
      const index = findIndex(element.uuid);
      const updatedBurgerInsides = [...burgerInsides];
      updatedBurgerInsides.splice(index, 1);
      updatedBurgerInsides.splice(atIndex, 0, element);

      dispatch(updateSelectedIngredients(updatedBurgerInsides));
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

BurgerInsides.propTypes = {
  burgerInsides: PropTypes.arrayOf(itemBurgerInsidePropTypes).isRequired,
}

export default BurgerInsides;
