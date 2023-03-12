import CenterBox from '../../components/UI/center-box/center-box';
import IngredientDetails from '../../components/ingredient-details/ingredient-details';
import { NotFound404 } from '../not-found-404/not-found-404';
import Loader from '../../components/loader/Loader';
import { useDetailsIngredient } from '../../hooks/use-details-ingredient';

export const IngredientDetailsPage = () => {
  const { isError, detailsIngredient, isLoading } = useDetailsIngredient();

  if (isError) {
    return (<NotFound404 />);
  }

  return (
    <>
      {isLoading && <Loader />}
      {detailsIngredient && (
        <CenterBox>
          <h1 className='text text_type_main-large'>Детали ингредиента</h1>
          <IngredientDetails detailsIngredient={detailsIngredient} />
        </CenterBox>
      )}
    </>
  );
}
