import { FC } from 'react';

import feedStyle from './feed.module.css';
import { OrderList } from '../order-list/order-list';
import { FeedsInfo } from '../feeds-info/feeds-info';
import { useSelector } from '../../services/hooks';
import { selectorWSOrders } from '../../services/selectors';

export const Feed: FC = () => {
  const { data } = useSelector(selectorWSOrders);

  if (!data?.orders) {
    return null;
  }

  return (
    <>
      <div className={feedStyle.mainContent}>
        <section className={feedStyle.sectionOrderList}>
          <h1 className="text text_type_main-large mt-10 mb-5">Лента заказов</h1>
          <OrderList orders={data.orders} />
        </section>
        <section className='pt-20'>
          <FeedsInfo />
        </section>
      </div>
    </>
  )
}
