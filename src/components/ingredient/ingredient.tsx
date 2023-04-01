import { FC, memo } from 'react';
import { useDrag } from 'react-dnd';
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import ingredientStyle from './ingredient.module.css';
import { Link, useLocation } from 'react-router-dom';
import { IngredientType } from '../../utils/types';

interface IngredientProps {
  ingredient: IngredientType;
  countSelected: number | undefined;
}

const Ingredient: FC<IngredientProps> = ({ ingredient, countSelected }) => {
  const location = useLocation();
  const [{ isDrag }, dragRef] = useDrag({
    type: 'ingredient',
    item: ingredient,
    collect: monitor => ({
      isDrag: monitor.isDragging()
    })
  });

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
        {countSelected !== undefined && countSelected > 0 && <Counter count={countSelected} size="default" extraClass="m-1" />}
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

export default memo(Ingredient);
