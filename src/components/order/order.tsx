import { FC } from 'react'
import clsx from "clsx";

import CenterBox from '../UI/center-box/center-box';
import orderStyle from './order.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { WSOrderType } from '../../utils/types';
import { useSelector } from '../../services/hooks';
import { selectorIngredients } from '../../services/selectors';
import { OrderIngredient } from '../order-ingredient/order-ingredient';
import { getStatusOrderByCode, prepareDate } from '../../utils';

interface OrderProps {
  order: WSOrderType;
}

export const Order: FC<OrderProps> = ({ order }) => {
  const { data: ingredients } = useSelector(selectorIngredients);  
  const orderIngredients = ingredients.filter(el => order.ingredients.includes(el._id));

  let totalPrice = 0;
  const counters: {[name: string]: number} = {};
  orderIngredients.forEach(el  => {
    const count = order.ingredients.filter(id => id === el._id).length;
    counters[el._id] = count;
    totalPrice += el.price * count;
  });

  const status = getStatusOrderByCode(order.status);

  return (
    <CenterBox className={orderStyle.centerBox}>
      <div className="text text_type_digits-default mb-10" style={{ textAlign: 'center' }}>#{order.number}</div>
      <div className="text text_type_main-medium mb-3">{order.name}</div>
      <div className="text text_type_main-default mb-15" style={{ color: status.color }}>{status.text}</div>
      <div className="text text_type_main-medium mb-6">Состав:</div>
      <ul className={orderStyle.list}>
        {orderIngredients.map(el => <OrderIngredient key={el._id} orderIngredient={el} count={counters[el._id]} />)}
      </ul>
      <div className={clsx(orderStyle.footer, 'mt-10 mb-10')}>
        <div className="text text_type_main-default text_color_inactive">{prepareDate(order.createdAt)}</div>
        <div className={orderStyle.price}>
          <span className="text text_type_digits-default mr-2">{totalPrice}</span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </CenterBox>
  )
}
