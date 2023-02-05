import PropTypes from 'prop-types';
import { Button, ConstructorElement, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import burgerConstructorStyle from './burger-constructor.module.css';
import { ingredientPropTypes } from '../../utils/propTypeConst'
 
function BurgerConstructor({ selectedIngredients }) {
    const newSelectedIngredients = selectedIngredients.slice();
    const wrapIngredient = newSelectedIngredients.shift();
    const totalPrice = newSelectedIngredients.reduce((total, el) => total + el.price, wrapIngredient?.price * 2);

    return (
        <section className={`${burgerConstructorStyle.constructorBox} pt-25 pr-4 pl-4`}>
            {wrapIngredient && (
                <div className='ml-8 mb-4'>
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
                            <li className={`${burgerConstructorStyle.item}`} key={index}>
                                <div className={burgerConstructorStyle.iconDrag}><DragIcon type="primary" /></div>
                                <ConstructorElement
                                    isLocked={false}
                                    text={el.name}
                                    price={el.price}
                                    thumbnail={el.image_mobile}
                                />
                            </li>
                        );
                    })}
                </ul>
            }
            {wrapIngredient && (
                <div className='ml-8 mt-4'>
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
                    <Button htmlType="button" type="primary" size="large">
                        Оформить заказ
                    </Button>
                </div>
            )
            : null
            }
        </section>
    );
}

BurgerConstructor.propTypes = {
    selectedIngredients: PropTypes.arrayOf(ingredientPropTypes).isRequired
}

export default BurgerConstructor;
