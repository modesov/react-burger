import { Navigate, useNavigate } from "react-router-dom";
import { useDetailsIngredient } from "../../hooks/use-details-ingredient";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Loader from "../loader/Loader";
import Modal from "../modal/modal";

export const ModalDetailsIngredient = () => {
  const { isError, detailsIngredient, setDetailsIngredient, isLoading, idIngredient } = useDetailsIngredient();
  const navigate = useNavigate();

  const handleModalClose = () => {
    setDetailsIngredient(null);
    navigate('/');
  };

  if (isError) {
    return <Navigate to={`/ingredients/${idIngredient}`} />;
  }

  return (
    <>
      {isLoading && <Loader />}
      {detailsIngredient && (
        <Modal onClose={handleModalClose} title='Детали ингредиента'>
          <IngredientDetails detailsIngredient={detailsIngredient} />
        </Modal>
      )}
    </>
  );
}