import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import appStyle from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor /burger-constructor';

function App() {
  return (
    <div className={appStyle.app}>
      <AppHeader />
      <main className='container pr-5 pl-5'>
        <div className={appStyle.mainContent}>
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor />
          </DndProvider>
        </div>
      </main>
    </div>
  );
}

export default App;
