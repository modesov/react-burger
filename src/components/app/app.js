import { useState, useEffect } from 'react';

import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor /burger-constructor';
import appStyle from './app.module.css';
import { checkResponse } from '../../utils/functions';

const API_BASE_URL = 'https://norma.nomoreparties.space/api/';

function App() {
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [state, setState] = useState({
    isLoading: false,
    hasError: false,
    data: []
  });

  const getData = () => {
    setState({ ...state, hasError: false, isLoading: true });
    fetch(`${API_BASE_URL}ingredients`)
      .then(checkResponse)
      .then(data => {
        data.success
          ? setState({ ...state, data: data.data, hasError: false, isLoading: false }) 
          : setState({ ...state, hasError: true, isLoading: false })
      })
      .catch(e => {
        setState({ ...state, hasError: true, isLoading: false });
      });
  }

  useEffect(() => {
    getData();
  }, []);

  const onSelected = (ingredient) => {
    setSelectedIngredients([
      ...selectedIngredients,
      ingredient
    ]);
  } 

  const onDeleteIngredient = (index) => {
    const newArr = [...selectedIngredients];
    newArr.splice(index, 1)
    setSelectedIngredients(newArr);
  }
  
  const { data, isLoading, hasError } = state;

  return (
    <div className={appStyle.app}>
      <AppHeader />
      <main className='container pr-5 pl-5'>
          {isLoading && 'Загрузка...'}
          {hasError && 'Произошла ошибка'}
          {
            !isLoading &&
            !hasError &&
            data.length &&
            <div className={appStyle.mainContent}>          
              <BurgerIngredients data={data} onSelected={onSelected} selectedIngredients={selectedIngredients}/>
              <BurgerConstructor data={data} selectedIngredients={selectedIngredients} onDeleteIngredient={onDeleteIngredient} />         
            </div>
          }
      </main>
    </div>
  );
}

export default App;
