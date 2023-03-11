import { memo, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useDrag } from 'react-dnd';
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import ingredientStyle from './ingredient.module.css';
import { ingredientPropTypes } from '../../utils/propTypeConst';
import { selectorSelectedIngredients } from '../../services/selectors';
import { Link, useLocation } from 'react-router-dom';

function Ingredient({ ingredient }) {
  const location = useLocation();
  const [{ isDrag }, dragRef] = useDrag({
    type: 'ingredient',
    item: ingredient,
    collect: monitor => ({
      isDrag: monitor.isDragging()
    })
  });

  const { wrapIngredient, burgerInsides } = useSelector(selectorSelectedIngredients);

  const countSelected = useMemo(() => (
    [...burgerInsides, wrapIngredient, wrapIngredient].reduce((acc, el) => el._id === ingredient._id ? acc + 1 : acc, 0)
  ), [burgerInsides, ingredient._id, wrapIngredient]);

  return (
    <Link
      to={`/ingredients/${ingredient._id}`}
      className={ingredientStyle.link}
      state={{ background: location }}
    >
      <div
        ref={dragRef}
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
    </Link>
  );
};

Ingredient.propTypes = {
  ingredient: ingredientPropTypes.isRequired
}

export default memo(Ingredient);
