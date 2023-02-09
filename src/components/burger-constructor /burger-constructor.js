import { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, ConstructorElement, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import burgerConstructorStyle from './burger-constructor.module.css';
import { ingredientPropTypes } from '../../utils/propTypeConst'
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';

function BurgerConstructor({ data, selectedIngredients, onDeleteIngredient }) {
    const [isVisibleModalOrder, setIsVisibleModalOrder] = useState(false);
    const [isVisibleModalIngredient, setIsVisibleModalIngredient] = useState(false);
    const [ingredientDetailsData, setIngredientDetailsData] = useState({});
    const [orderId, setOrderId] = useState(null);

    const placeOrder = () => {
        // запрос на сервер. Размещаем заказ на сервере и возвращаем id заказа
        const id = '034536'
        if (!id) {
            return false
        }

        setOrderId(id);
        return true;
    }

    const handleOpenModalOrder = () => {
        if (placeOrder()) {
            setIsVisibleModalOrder(true);
        }
    }

    const handleCloseModalOrder = () => {
        setIsVisibleModalOrder(false);
        setOrderId(null);
    }

    const handleOpenModalIngredient = (evt) => {
        const ingredientId = evt.currentTarget.dataset.id;        
        if(!ingredientDetailsData || ingredientDetailsData._id !== ingredientId) {
            const ingredientData = data.find(el => el._id === ingredientId);
            setIngredientDetailsData(ingredientData !== undefined ? ingredientData : {});
        }
        
        setIsVisibleModalIngredient(true);
    }

    const handleCloseModalIngredient = () => {
        setIsVisibleModalIngredient(false);
    }

    function deleteIngredient(evt) {
        evt.stopPropagation();
        const indexElement = evt.currentTarget.closest('li').dataset.index;
        onDeleteIngredient(+indexElement + 1);
    }

    const newSelectedIngredients = selectedIngredients.slice();
    const wrapIngredient = newSelectedIngredients.shift();
    const totalPrice = newSelectedIngredients.reduce((total, el) => total + el.price, wrapIngredient?.price * 2);

    return (
        <section className={`${burgerConstructorStyle.constructorBox} pt-25 pr-4 pl-4`}>
            {wrapIngredient && (
                <div onClick={handleOpenModalIngredient} data-id={wrapIngredient._id} className={`${burgerConstructorStyle.element} ml-8 mb-4`}>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text={`${wrapIngredient.name} (верх)`}
                        price={wrapIngredient.price}
                        thumbnail={wrapIngredient.image_mobile}
                    />
                </div>
            )}
            {newSelectedIngredients &&
                <ul className={burgerConstructorStyle.list}>
                    {newSelectedIngredients.map((el, index) => {
                        return (
                            <li className={`${burgerConstructorStyle.item}`} key={index} data-index={index}>
                                <div className={burgerConstructorStyle.iconDrag}><DragIcon type="primary" /></div>
                                <div onClick={handleOpenModalIngredient} data-id={el._id} className={burgerConstructorStyle.element}>
                                    <ConstructorElement
                                        isLocked={false}
                                        text={el.name}
                                        price={el.price}
                                        thumbnail={el.image_mobile}
                                        handleClose={deleteIngredient}
                                    />
                                </div>
                            </li>
                        );
                    })}
                </ul>
            }
            {wrapIngredient && (
                <div onClick={handleOpenModalIngredient} data-id={wrapIngredient._id} className={`${burgerConstructorStyle.element} ml-8 mt-4`}>
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
                        Оформить заказ
                    </Button>
                </div>
            )
                : null
            }
            {isVisibleModalOrder && orderId &&
                <Modal onClose={handleCloseModalOrder}>
                    <OrderDetails orderId={orderId} />
                </Modal>
            }
            {isVisibleModalIngredient && ingredientDetailsData &&
                <Modal onClose={handleCloseModalIngredient} title='Детали ингредиента'>
                    <IngredientDetails data={ingredientDetailsData} />
                </Modal>
            }
        </section>
    );
}

BurgerConstructor.propTypes = {
    data: PropTypes.arrayOf(ingredientPropTypes).isRequired,
    selectedIngredients: PropTypes.arrayOf(ingredientPropTypes).isRequired,
    onDeleteIngredient: PropTypes.func.isRequired
}

export default BurgerConstructor;
