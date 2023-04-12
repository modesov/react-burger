import { FC } from 'react'
import { useParams } from 'react-router-dom';

import { Order } from '../order/order';
import { useSelector } from '../../services/hooks';
import { selectorWSOrders } from '../../services/selectors';

export const FeedDetails: FC = () => {
  const { data } = useSelector(selectorWSOrders);
  const { id } = useParams();

  const order = data?.orders.find(el => el._id === id);

  if (!order) {
    return null;
  }

  return (
    <Order order={order}/>
  )
}
