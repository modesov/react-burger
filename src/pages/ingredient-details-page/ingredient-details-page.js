import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ingredientDetailsPageStyle from './ingredient-details-page.module.css';
import CenterBox from '../../components/UI/center-box/center-box';
import IngredientDetails from '../../components/ingredient-details/ingredient-details';
import { selectorIngredients } from '../../services/selectors';
import { getIngredients } from '../../services/actions/ingredients';
import Loader from '../../components/loader/Loader';

export const IngredientDetailsPage = ({ ingredientId }) => {
  const { data: ingredients, isLoading } = useSelector(selectorIngredients);
  const dispatch = useDispatch();
  const ingredient = ingredients.find(el => el._id === ingredientId);

  useEffect(() => {
    if (!ingredients.length) {
      dispatch(getIngredients());
    }
  }, []);

  return (
    <>
      {isLoading && <Loader />}
      {ingredient && (
        <CenterBox>
          <IngredientDetails detailsIngredient={ingredient} />
        </CenterBox>
      )}
    </>
  );
}
