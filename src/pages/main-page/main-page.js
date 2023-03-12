import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import mainPageStyle from './main-page.module.css';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';

export const MainPage = () => {
  return (
    <div className={mainPageStyle.mainContent}>
      <DndProvider backend={HTML5Backend}>
        <BurgerIngredients />
        <BurgerConstructor />
      </DndProvider>
    </div>
  );
}
