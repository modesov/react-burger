import { memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import sectionIngredientsStyle from './section-ingredients.module.css';
import Ingredient from '../ingredient/ingredient';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { ingredientPropTypes } from '../../utils/propTypeConst';
import { cleanDetailsIngredient, setDetailsIngredient } from '../../services/actions/details-ingredient';
import { selectorDetailsIngredient } from '../../services/selectors';

function SectionIngredients({ ingredients }) {
  const detailsIngredient = useSelector(selectorDetailsIngredient);
  const dispatch = useDispatch();

  const handleOpenModalIngredient = useCallback(
    (data) => {
      dispatch(setDetailsIngredient(data));
    },
    [dispatch]
  );

  const handleCloseModalIngredient = useCallback(
    () => {
      dispatch(cleanDetailsIngredient());
    },
    [dispatch]
  );

  return (
    <>
      <ul className={`${sectionIngredientsStyle.list} pr-1 pl-1 pt-6 pb-6`}>
        {ingredients.map((ingredient) => (
          <li key={ingredient._id} className={`${sectionIngredientsStyle.item} mr-3 ml-3`}>
            <Ingredient ingredient={ingredient} handleOpenModalIngredient={handleOpenModalIngredient} />
          </li>
        ))}
      </ul>
      {detailsIngredient &&
        (
          <Modal onClose={handleCloseModalIngredient} title='Детали ингредиента'>
            <IngredientDetails detailsIngredient={detailsIngredient} />
          </Modal>
        )
      }
    </>
  );
}

SectionIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropTypes).isRequired,
}

export default memo(SectionIngredients);
