import React from 'react';
import PropTypes from 'prop-types';
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import ingredientStyle from './ingredient.module.css';
import { ingredientPropTypes } from '../../utils/propTypeConst';

const Ingredient = React.memo(({ingredient, onSelected, selectedIngredients}) => {
    const count = selectedIngredients.filter(el => el._id === ingredient._id).length;

    const selected = () => {
        onSelected(ingredient);
    }

    return (
        <div className={ingredientStyle.ingredientBox} onClick={selected}>
            {count > 0 && <Counter count={count} size="default" extraClass="m-1" />}            
            <div className='ml-4 mr-4'>
                <img src={ingredient.image} alt={ingredient.name} />
            </div>
            <div className={`${ingredientStyle.priceBox} mt-1 mb-1`}>
                <span className='mr-2 text text_type_digits-default'>{ingredient.price}</span><CurrencyIcon type="primary" />
            </div>
            <div className={`${ingredientStyle.title} text text_type_main-default`}>{ingredient.name}</div>
        </div>
    );
});

Ingredient.propTypes = {
    ingredient: ingredientPropTypes.isRequired,
    onSelected: PropTypes.func.isRequired,
    selectedIngredients: PropTypes.arrayOf(ingredientPropTypes).isRequired
}

export default Ingredient;
