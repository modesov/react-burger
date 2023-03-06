import { useLocation, useParams } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import mainPageStyle from './main-page.module.css';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import { IngredientDetailsPage } from "../ingredient-details-page/ingredient-details-page";

export const MainPage = () => {
  const {id} = useParams();
  const location = useLocation();

  if (id && location.state?.type !== 'modal') {
    return (<IngredientDetailsPage ingredientId={id} />);
  }
  
  return (
    <div className={mainPageStyle.mainContent}>
      <DndProvider backend={HTML5Backend}>
        <BurgerIngredients ingredientId={id}/>
        <BurgerConstructor />
      </DndProvider>
    </div>
  );
}
