import { useState, useEffect } from 'react';

import appStyle from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor /burger-constructor';
import { checkResponse } from '../../utils/functions';
import { IngredientsContext } from '../../services/appContext';
import { API_BASE_URL } from '../../utils/config';

function App() {
  const [ingredients, setIngredients] = useState([]);
  const [result, setResult] = useState({ isLoading: false, hasError: false });

  const getData = () => {
    setResult({ hasError: false, isLoading: true });

    fetch(`${API_BASE_URL}ingredients`)
      .then(checkResponse)
      .then(data => {
        if (data.success) {
          setIngredients(data.data);
          setResult({ hasError: false, isLoading: false });
        } else {
          setResult({ hasError: true, isLoading: false });
        }
      })
      .catch(e => {
        setResult({ hasError: true, isLoading: false });
      });
  }

  useEffect(() => {
    getData();
  }, []);

  const { isLoading, hasError } = result;

  return (
    <div className={appStyle.app}>
      <AppHeader />
      <main className='container pr-5 pl-5'>
        {isLoading && 'Загрузка...'}
        {hasError && 'Произошла ошибка'}
        {
          !isLoading &&
          !hasError &&
          ingredients.length &&
          <div className={appStyle.mainContent}>
            <IngredientsContext.Provider value={{ ingredients, setIngredients }}>
              <BurgerIngredients />
              <BurgerConstructor />
            </IngredientsContext.Provider>
          </div>
        }
      </main >
    </div >
  );
}

export default App;
