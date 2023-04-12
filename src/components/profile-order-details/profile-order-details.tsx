import { FC } from "react";
import { Order } from "../order/order";
import { useSelector } from "../../services/hooks";
import { selectorWSProfileOrders } from "../../services/selectors";
import { useParams } from "react-router-dom";

const ProfileOrderDetails: FC = () => {
  const { data } = useSelector(selectorWSProfileOrders);
  const { id } = useParams();

  const order = data?.orders.find(el => el._id === id);
  
  if (!order) {
    return null;
  }

  return (
    <Order order={order}/>
  )
}

export default ProfileOrderDetails;
