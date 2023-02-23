import { useCallback, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, ConstructorElement, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrop } from 'react-dnd';

import burgerConstructorStyle from './burger-constructor.module.css';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import Notification from '../notification/notification';
import Loader from '../loader/Loader';
import BurgerInsides from '../burger-insides/burger-insides';
import { addSelectedIngredient, orderClean, orderRegistration } from '../../services/actions';

function BurgerConstructor() {
  const { wrapIngredient, burgerInsides } = useSelector(state => state.selectedIngredients);
  const { isOrderRegistration, hasOrderError, orderData } = useSelector(state => state.order);
  const isDragIngredient = useSelector(state => state.isDragIngredient);
  const [isNotification, setIsNotification] = useState(false);
  const dispatch = useDispatch();

  const [{ isHover }, dropRef] = useDrop({
    accept: 'ingredient',
    drop(item) {
      if (!wrapIngredient._id && item.type !== 'bun') {
        setIsNotification(true);
      } else {
        dispatch(addSelectedIngredient(item));
      }
    },
    collect: monitor => ({
      isHover: monitor.isOver(),
    })
  });

  const handleOrderRegistration = () => {
    const ingredientIds = [wrapIngredient, ...burgerInsides].map(el => el._id);
    dispatch(orderRegistration(ingredientIds));
  }

  const handleCleanOrder = () => {
    dispatch(orderClean());
  }

  const handleCloseNotification = useCallback(
    () => {
      setIsNotification(false);
    }, []
  );

  const totalPrice = useMemo(() => {
    const initialValue = +wrapIngredient?.price * 2;
    return burgerInsides.reduce((total, el) => total + el.price, initialValue);
  }, [burgerInsides, wrapIngredient]);

  return (
    <section
      ref={dropRef}
      className={`mt-20 pt-5 pr-4 pl-4
        ${burgerConstructorStyle.constructorBox} 
        ${isHover ? burgerConstructorStyle.isHover : ''} 
        ${isDragIngredient ? burgerConstructorStyle.isDrag : ''}`
      }
    >
      {wrapIngredient._id && (
        <div className={`${burgerConstructorStyle.element} ml-8 mb-4`}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${wrapIngredient.name} (верх)`}
            price={wrapIngredient.price}
            thumbnail={wrapIngredient.image_mobile}
          />
        </div>
      )}

      <BurgerInsides burgerInsides={burgerInsides} />

      {wrapIngredient._id && (
        <div className={`${burgerConstructorStyle.element} ml-8 mt-4`}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${wrapIngredient.name} (низ)`}
            price={wrapIngredient.price}
            thumbnail={wrapIngredient.image_mobile}
          />
        </div>
      )}
      {totalPrice > 0 && (
        <div className={`${burgerConstructorStyle.totalBox} mt-10 mb-10`}>
          <div className={`${burgerConstructorStyle.totalPrice} text text_type_digits-medium mr-10`}>
            <span className='mr-2'>{totalPrice}</span>
            <CurrencyIcon type="primary" />
          </div>
          <Button onClick={handleOrderRegistration} htmlType="button" type="primary" size="large">
            {isOrderRegistration ? 'Оформляем.....' : 'Оформить заказ'}
          </Button>
        </div>
      )}
      {isOrderRegistration && <Loader />}
      {!isOrderRegistration && orderData && (
        <Modal onClose={handleCleanOrder}>
          <OrderDetails order={orderData} />
        </Modal>
      )
      }
      {hasOrderError && (
        <Notification type='error' onClose={handleCleanOrder}>
          Ошибка оформления заказа. Попробуйте еще раз
        </Notification>
      )
      }
      {isNotification && (
        <Notification type='warning' onClose={handleCloseNotification}>
          Сначала добавьте булку из раздела "Булки"!
        </Notification>
      )
      }
    </section>
  );
}

export default BurgerConstructor;
