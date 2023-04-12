import { FC } from 'react'
import { useSelector } from '../../services/hooks';
import { useNavigate, useParams } from 'react-router-dom';
import Modal from '../modal/modal';
import { Order } from '../order/order';
import { RootStateType, TWSOrderState } from '../../utils/types';

interface ModalOrderDetailsProps {
  selector: (state: RootStateType) => TWSOrderState
}

export const ModalOrderDetails: FC<ModalOrderDetailsProps> = ({selector}) => {
  const { data } = useSelector(selector);
  const { id } = useParams();
  const navigate = useNavigate();
  const order = data?.orders.find(el => el._id === id);

  const handleOnClose = () => {
    navigate(-1);
  }

  if (!order) {
    return null;
  }

  return (
    <Modal onClose={handleOnClose}>
      <Order order={order} />
    </Modal>
  )
}
