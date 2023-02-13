import PropTypes from 'prop-types';

import orderDetailsStyle from './order-details.module.css';
import done from '../../images/done.svg';

function OrderDetails({ order }) {
  return (
    <div className={`${orderDetailsStyle.box} pt-4 pr-15 pb-15 pl-15`}>
      {order.hasError
        ? <p className="text text_type_main-medium">Ошибка оформления заказа. Попробуйте еще раз.</p>
        : <>
          <p className="text text_type_digits-large mb-8">{order.orderNumber}</p>
          <p className="text text_type_main-medium">идентификатор заказа</p>
          <div className="mt-15 mb-15"><img src={done} alt="done" /></div>
          <p className="text text_type_main-default mb-2">Ваш заказ начали готовить</p>
          <p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
        </>
      }
    </div>
  );
}

OrderDetails.propTypes = {
  order: PropTypes.shape({
    isLoading: PropTypes.bool.isRequired,
    hasError: PropTypes.bool.isRequired,
    orderNumber: PropTypes.number.isRequired,
  })
}

export default OrderDetails;
