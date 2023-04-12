import { FC } from 'react'

import orderListStyle from './order-list.module.css';
import { WSOrderType } from '../../utils/types';
import { OrderItem } from '../order-item/order-item';

interface OrderListProps {
  orders: WSOrderType[];
}

export const OrderList: FC<OrderListProps> = ({ orders }) => {
  return (
    <ul className={orderListStyle.list}>
      {orders.map(order => <OrderItem key={order._id} order={order} />)}
    </ul>
  )
}
