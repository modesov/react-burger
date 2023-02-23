import { memo, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useDrag } from 'react-dnd';
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import ingredientStyle from './ingredient.module.css';
import { ingredientPropTypes } from '../../utils/propTypeConst';
import { setIsDragIngredient } from '../../services/actions';

function Ingredient({ ingredient, handleOpenModalIngredient }) {
  const dispatch = useDispatch();

  const [{ isDrag }, dragRef] = useDrag({
    type: 'ingredient',
    item: ingredient,
    collect: monitor => ({
      isDrag: monitor.isDragging()
    })
  });

  useEffect(() => {
    dispatch(setIsDragIngredient(isDrag));
  }, [dispatch, isDrag]);

  const { wrapIngredient, burgerInsides } = useSelector(state => state.selectedIngredients);

  const countSelected = useMemo(() => (
    [...burgerInsides, wrapIngredient].reduce((acc, el) => el._id === ingredient._id ? acc + 1 : acc, 0)
  ), [burgerInsides, ingredient._id, wrapIngredient]);

  return (
    <div
      ref={dragRef}
      onClick={() => handleOpenModalIngredient(ingredient)}
      className={`${ingredientStyle.ingredientBox} ${isDrag ? ingredientStyle.isDrag : ''}`}
    >
      {countSelected > 0 && <Counter count={countSelected} size="default" extraClass="m-1" />}
      <div className='ml-4 mr-4'>
        <img src={ingredient.image} alt={ingredient.name} />
      </div>
      <div className={`${ingredientStyle.priceBox} mt-1 mb-1`}>
        <span className='mr-2 text text_type_digits-default'>{ingredient.price}</span><CurrencyIcon type="primary" />
      </div>
      <div className={`${ingredientStyle.title} text text_type_main-default`}>{ingredient.name}</div>
    </div>
  );
};

Ingredient.propTypes = {
  ingredient: ingredientPropTypes.isRequired,
  handleOpenModalIngredient: PropTypes.func.isRequired
}

export default memo(Ingredient);
