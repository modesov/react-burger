import { combineReducers } from 'redux';

import tabs from './tabs';
import ingredients from './ingredients';
import selectedIngredients from './selected-ingredients';
import detailsIngredient from './details-ingredient';
import order from './order';

export default combineReducers({
  tabs,
  ingredients,
  selectedIngredients,
  detailsIngredient,
  order
});
