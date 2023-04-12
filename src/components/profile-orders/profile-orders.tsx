import { FC } from "react";

import profileOrdersStyle from './profile-orders.module.css';
import { OrderList } from "../order-list/order-list";
import { useSelector } from "../../services/hooks";
import { selectorWSProfileOrders } from "../../services/selectors";

const ProfileOrders: FC = () => {
  const { data } = useSelector(selectorWSProfileOrders);

  if (!data) {
    return null;
  }

  return (
    <section className={profileOrdersStyle.wrapper}>
      <OrderList orders={data.orders} />
    </section>
  );
}

export default ProfileOrders;
