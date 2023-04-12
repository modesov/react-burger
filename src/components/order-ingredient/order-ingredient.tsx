import { FC } from 'react';
import { IngredientIcon } from '../ingredient-icon/ingredient-icon';
import orderIngredientStyle from './order-ingredient.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import clsx from 'clsx';
import { IngredientType } from '../../utils/types';

interface OrderIngredientProps {
  orderIngredient: IngredientType
  count: number
}

export const OrderIngredient: FC<OrderIngredientProps> = ({ orderIngredient, count }) => {

  return (
    <li className={orderIngredientStyle.item}>
      <IngredientIcon
        src={orderIngredient.image}
        srcSet={orderIngredient.image}
      />
      <div className={clsx(orderIngredientStyle.name, "text text_type_main-default ml-4 mr-4")}>
        {orderIngredient.name}
      </div>
      <div className={orderIngredientStyle.price}>
        <span className="text text_type_digits-default mr-2">{`${count} x ${orderIngredient.price}`}</span>
        <CurrencyIcon type="primary" />
      </div>
    </li>
  )
}
