import { useContext, useEffect, useReducer, useState } from 'react';
import { Button, ConstructorElement, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import burgerConstructorStyle from './burger-constructor.module.css';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { checkResponse } from '../../utils/functions';
import { IngredientsContext } from '../../services/appContext';
import { API_BASE_URL } from '../../utils/config';

function reducerTotalPrice(state, action) {
  return action.ingredients.reduce((total, el) => total + el.price, action.initialValue);
}

function BurgerConstructor() {
  const { ingredients } = useContext(IngredientsContext);

  const [wrapIngredient] = useState(ingredients.find((el) => el.type === 'bun'));
  const [selectedIngredients, setSelectedIngredients] = useState(ingredients.filter((el) => el.type !== 'bun'));
  const [order, setOrder] = useState({ isLoading: false, hasError: false, orderNumber: null });
  const [isVisibleModalOrder, setIsVisibleModalOrder] = useState(false);
  const [totalPrice, dispatchTotalPrice] = useReducer(reducerTotalPrice, 0);

  useEffect(() => {
    dispatchTotalPrice({
      ingredients: selectedIngredients,
      initialValue: wrapIngredient.price * 2
    })
  }, [wrapIngredient, selectedIngredients]);

  const placeOrder = () => {
    setOrder({ ...order, hasError: false, isLoading: true });

    fetch(`${API_BASE_URL}orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({ ingredients: selectedIngredients.map(el => el._id) })
    })
      .then(checkResponse)
      .then(data => {
        if (data.success) {
          setOrder({ isLoading: false, hasError: false, orderNumber: data.order.number });
        } else {
          setOrder({ ...order, isLoading: false, hasError: true });
        }
      })
      .catch(e => {
        setOrder({ ...order, isLoading: false, hasError: true });
      })
      .finally(() => {
        setIsVisibleModalOrder(true);
      });
  }

  const handleOpenModalOrder = () => {
    placeOrder();
  }

  const handleCloseModalOrder = () => {
    setIsVisibleModalOrder(false);
    setOrder({ isLoading: false, hasError: false, orderNumber: null });
  }

  const deleteIngredients = (evt) => {
    const indexElement = evt.currentTarget.closest('li').dataset.index;
    const newArray = [...selectedIngredients];
    if (newArray[indexElement]) {
      newArray.splice(indexElement, 1);
      setSelectedIngredients(newArray);
    }
  }

  return (
    <section className={`${burgerConstructorStyle.constructorBox} pt-25 pr-4 pl-4`}>
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
      {selectedIngredients &&
        <ul className={burgerConstructorStyle.list}>
          {selectedIngredients.map((el, index) => {
            return (
              <li className={`${burgerConstructorStyle.item}`} key={index} data-index={index}>
                <div className={burgerConstructorStyle.iconDrag}><DragIcon type="primary" /></div>
                <div className={burgerConstructorStyle.element}>
                  <ConstructorElement
                    isLocked={false}
                    text={el.name}
                    price={el.price}
                    thumbnail={el.image_mobile}
                    handleClose={deleteIngredients}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      }
      {wrapIngredient && (
        <div className={`${burgerConstructorStyle.element} ml-8 mt-4`}>
          <ConstructorElement
            className='mt-2'
            type="bottom"
            isLocked={true}
            text={`${wrapIngredient.name} (низ)`}
            price={wrapIngredient.price}
            thumbnail={wrapIngredient.image_mobile}
          />
        </div>
      )}
      {totalPrice ? (
        <div className={`${burgerConstructorStyle.totalBox} mt-10 mb-10`}>
          <div className={`${burgerConstructorStyle.totalPrice} text text_type_digits-medium mr-10`}>
            <span className='mr-2'>{totalPrice}</span>
            <CurrencyIcon type="primary" />
          </div>
          <Button onClick={handleOpenModalOrder} htmlType="button" type="primary" size="large">
            {order.isLoading ? 'Оформляем.....' : 'Оформить заказ'}
          </Button>
        </div>
      )
        : null
      }
      {isVisibleModalOrder &&
        <Modal onClose={handleCloseModalOrder}>
          <OrderDetails order={order} />
        </Modal>
      }
    </section>
  );
}

export default BurgerConstructor;
