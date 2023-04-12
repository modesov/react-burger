import { FC, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import orderItemStyle from './order-item.module.css';
import { IngredientType, WSOrderType } from '../../utils/types';
import { IngredientIcon } from '../ingredient-icon/ingredient-icon';
import { useSelector } from '../../services/hooks';
import { selectorIngredients } from '../../services/selectors';
import { getStatusOrderByCode, prepareDate } from '../../utils';

const COUNT_SHOW_ICONS = 6;

interface OrderItemProps {
  order: WSOrderType
}

export const OrderItem: FC<OrderItemProps> = ({ order }) => {
  const location = useLocation();
  const { data: ingredients } = useSelector(selectorIngredients);

  const orderIngredients = useMemo<IngredientType[]>(() => {
    const arIngredients: IngredientType[] = [];
    order.ingredients.forEach(ingredientId => {
      const item = ingredients.find(el => el._id === ingredientId);
      if (item) {
        arIngredients.push(item);
      }
    });

    return arIngredients;
  }, [ingredients, order.ingredients]);

  const totalPrice = useMemo<number>(() => (
    orderIngredients.reduce((acc, el) => acc + el.price, 0)
  ), [orderIngredients]);

  const overflow = orderIngredients.length > COUNT_SHOW_ICONS ? orderIngredients.length - COUNT_SHOW_ICONS : 0;

  const icons = orderIngredients.slice(0, COUNT_SHOW_ICONS).map((el, index) => (
    <IngredientIcon
      key={index}
      src={el.image}
      srcSet={el.image}
      overflow={!index ? overflow : 0}
      extraClass={orderItemStyle.itemsPicture}
    />
  ));

  const dateCreate = prepareDate(order.createdAt);

  const status = getStatusOrderByCode(order.status);

  return (
    <li className={orderItemStyle.item}>
      <Link to={order._id} className={orderItemStyle.link} state={{ background: location }}>
        <div className={orderItemStyle.header}>
          <div className="text text_type_digits-default">#{order.number}</div>
          <div className="text text_type_main-default text_color_inactive">{dateCreate}</div>
        </div>
        <div className="text text_type_main-medium">
          {order.name}
        </div>
        <div className="text text_type_main-default mb-6" style={{color: status.color}}>{status.text}</div>
        <div className={orderItemStyle.info}>
          <div className={orderItemStyle.icons}>
            {icons}
          </div>
          <div className={orderItemStyle.price}>
            <span className="text text_type_digits-default mr-2">{totalPrice}</span>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </Link>
    </li>
  )
}
