import { FC, useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDrop } from 'react-dnd';
import { Button, ConstructorElement, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import burgerConstructorStyle from './burger-constructor.module.css';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import Notification from '../notification/notification';
import Loader from '../loader/Loader';
import BurgerInsides from '../burger-insides/burger-insides';
import { addSelectedIngredient } from '../../services/actions/selected-ingredients';
import { orderClean, orderRegistration } from '../../services/actions/order';
import { selectorOrder, selectorSelectedIngredients, selectorUser } from '../../services/selectors';
import { HandleFunctionType, IngredientType, SelectedIngredientType } from '../../utils/types';
import { useDispatch, useSelector } from '../../services/hooks';

const BurgerConstructor: FC = () => {
  const { wrapIngredient, burgerInsides } = useSelector(selectorSelectedIngredients);
  const { isOrderRegistration, hasOrderError, orderData } = useSelector(selectorOrder);
  const [isNotification, setIsNotification] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(selectorUser);
  const navigate = useNavigate();

  const [{ isHover }, dropRef] = useDrop({
    accept: 'ingredient',
    drop(item: IngredientType) {
      if (!wrapIngredient && item.type !== 'bun') {
        setIsNotification(true);
      } else {
        dispatch(addSelectedIngredient(item));
      }
    },
    collect: monitor => ({
      isHover: monitor.isOver(),
    })
  });

  const handleOrderRegistration: HandleFunctionType = () => {
    if (!user) {
      navigate('/login');
    } else {
      // Не забываем две булочки в заказ
      const ingredientIds: string[] = [wrapIngredient, wrapIngredient, ...burgerInsides].map(el => el ? el._id : '');
      dispatch(orderRegistration(ingredientIds));
    }
  }

  const handleCleanOrder: HandleFunctionType = () => {
    dispatch(orderClean());
  }

  const handleCloseNotification = useCallback<HandleFunctionType>(
    () => {
      setIsNotification(false);
    }, []
  );

  const totalPrice = useMemo<number>(() => {
    const initialValue = wrapIngredient ? +wrapIngredient?.price * 2 : 0;
    return burgerInsides.reduce((total: number, el: SelectedIngredientType) => total + el.price, initialValue);
  }, [burgerInsides, wrapIngredient]);

  return (
    <section
      ref={dropRef}
      className={`${burgerConstructorStyle.constructorBox} ${isHover ? burgerConstructorStyle.isHover : ''} mt-20 pt-5 pr-4 pl-4`}
    >
      {!wrapIngredient && (
        <div className={`text text_type_main-medium ${burgerConstructorStyle.hintBun}`}>
          Перенесите булку сюда
        </div>
      )}
      {wrapIngredient && (
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
      {wrapIngredient && !burgerInsides.length ?
        (
          <div className={`text text_type_main-medium ${burgerConstructorStyle.hintOtherIngredient}`}>
            Сюда остальные ингредиенты
          </div>
        )
        :
        (<BurgerInsides burgerInsides={burgerInsides} />)
      }
      {wrapIngredient && (
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
