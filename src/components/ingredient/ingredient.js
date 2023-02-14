import React, { useState } from 'react';
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import ingredientStyle from './ingredient.module.css';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { ingredientPropTypes } from '../../utils/propTypeConst';

const Ingredient = React.memo(({ ingredient }) => {
  const [isVisibleModalIngredient, setIsVisibleModalIngredient] = useState(false);

  const handleOpenModalIngredient = () => {
    setIsVisibleModalIngredient(true);
  }

  const handleCloseModalIngredient = () => {
    setIsVisibleModalIngredient(false);
  }

  return (
    <>
      <div onClick={handleOpenModalIngredient} className={ingredientStyle.ingredientBox}>
        <Counter count={1} size="default" extraClass="m-1" />
        <div className='ml-4 mr-4'>
          <img src={ingredient.image} alt={ingredient.name} />
        </div>
        <div className={`${ingredientStyle.priceBox} mt-1 mb-1`}>
          <span className='mr-2 text text_type_digits-default'>{ingredient.price}</span><CurrencyIcon type="primary" />
        </div>
        <div className={`${ingredientStyle.title} text text_type_main-default`}>{ingredient.name}</div>
      </div>
      {isVisibleModalIngredient &&
        <Modal onClose={handleCloseModalIngredient} title='Детали ингредиента'>
          <IngredientDetails data={ingredient} />
        </Modal>
      }
    </>
  );
});

Ingredient.propTypes = {
  ingredient: ingredientPropTypes.isRequired,
}

export default Ingredient;
