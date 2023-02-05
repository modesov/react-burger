import { useState } from 'react';

import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor /burger-constructor';
import appStyle from './app.module.css';
import { data } from '../../utils/data';

function App() {
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  const onSelected = (ingredient) => {
    setSelectedIngredients([
      ...selectedIngredients,
      ingredient
    ]);
  } 
  
  return (
    <div className={appStyle.app}>
      <AppHeader />
      <main className='container pr-5 pl-5'>
        <div className={appStyle.mainContent}>
          <BurgerIngredients data={data} onSelected={onSelected}/>
          <BurgerConstructor selectedIngredients={selectedIngredients} />
        </div>
      </main>
    </div>
  );
}

export default App;
