import { FC } from 'react';

import feedsInfoStyle from './feeds-info.module.css';
import { useSelector } from '../../services/hooks';
import { selectorWSOrders } from '../../services/selectors';

export const FeedsInfo: FC = () => {
  const { data } = useSelector(selectorWSOrders);

  const readyOrders = data?.orders.filter(el => el.status === 'done').slice(0, 10)
  const atWork = data?.orders.filter(el => el.status === 'pending').slice(0, 10)

  return (
    <>
      <section className={`${feedsInfoStyle.statuses} mt-4 mb-15`}>
        <div className={feedsInfoStyle.ready}>
          <div className={`${feedsInfoStyle.header} text text_type_main-medium pb-6`}>Готовы:</div>
          <div className={feedsInfoStyle.body}>
            <ul className={feedsInfoStyle.list}>
              {readyOrders?.map(el => <li key={el._id} className="text text_type_digits-default mb-2">{el.number}</li>)}
            </ul>
          </div>
        </div>
        <div className={feedsInfoStyle.atWork}>
          <div className={`${feedsInfoStyle.header} text text_type_main-medium pb-6`}>В работе:</div>
          <div className={feedsInfoStyle.body}>
            <ul className={feedsInfoStyle.list}>
            {atWork?.map(el => <li key={el._id} className="text text_type_digits-default mb-2">{el.number}</li>)}
            </ul>
          </div>
        </div>
      </section>
      <section className="mb-15">
        <div className="text text_type_main-medium">Выполнено за все время:</div>
        <div className="text text_type_digits-large">{data?.total}</div>
      </section>
      <section>
        <div className="text text_type_main-medium">Выполнено за сегодня:</div>
        <div className="text text_type_digits-large">{data?.totalToday}</div>
      </section>
    </>
  )
}
