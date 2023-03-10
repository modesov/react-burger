import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import CenterBox from '../../components/UI/center-box/center-box';
import IngredientDetails from '../../components/ingredient-details/ingredient-details';
import { NotFound404 } from '../not-found-404/not-found-404';
import { selectorIngredients } from '../../services/selectors';
import Loader from '../../components/loader/Loader';

export const IngredientDetailsPage = () => {
  const { data: ingredients, isLoading } = useSelector(selectorIngredients);
  const [detailsIngredient, setDetailsIngredient] = useState(null);
  const { idIngredient } = useParams();

  useEffect(() => {
    if (ingredients && idIngredient) {
      const ingredient = ingredients.find(el => el._id === idIngredient);
      if (ingredient) {
        setDetailsIngredient(ingredient);
      }
    }

  }, [idIngredient, ingredients]);

  if (ingredients && !detailsIngredient) {
    return (<NotFound404 />);
  }

  return (
    <>
      {isLoading && <Loader />}
      <CenterBox>
        <h1 className='text text_type_main-large'>Детали ингредиента</h1>
        <IngredientDetails detailsIngredient={detailsIngredient} />
      </CenterBox>
    </>
  );
}
