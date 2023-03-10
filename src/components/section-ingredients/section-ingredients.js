import { memo } from 'react';
import PropTypes from 'prop-types';

import sectionIngredientsStyle from './section-ingredients.module.css';
import Ingredient from '../ingredient/ingredient';
import { ingredientPropTypes } from '../../utils/propTypeConst';

function SectionIngredients({ ingredients }) {
  return (
    <ul className={`${sectionIngredientsStyle.list} pr-1 pl-1 pt-6 pb-6`}>
      {ingredients.map((ingredient) => (
        <li key={ingredient._id} className={`${sectionIngredientsStyle.item} mr-3 ml-3`}>
          <Ingredient ingredient={ingredient} />
        </li>
      ))}
    </ul>
  );
}

SectionIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropTypes).isRequired,
}

export default memo(SectionIngredients);
