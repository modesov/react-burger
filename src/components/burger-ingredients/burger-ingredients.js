import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import burgerIngredientsStyle from './burger-ingredients.module.css';
import Switch from '../switch/switch';
import SectionType from '../section-type/section-type';
import SectionIngredients from '../section-ingredients/section-ingredients';
import Notification from '../notification/notification';
import Loader from '../loader/Loader';
import { cleanIngredients, getIngredients } from '../../services/actions/ingredients';
import { selectorDetailsIngredient, selectorIngredients, selectorTabs } from '../../services/selectors';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { cleanDetailsIngredient, setDetailsIngredient } from '../../services/actions/details-ingredient';

function BurgerIngredients({ ingredientId }) {
  const detailsIngredient = useSelector(selectorDetailsIngredient);
  const navigate = useNavigate();
  const tabs = useSelector(selectorTabs);
  const { data, isLoading, hasError } = useSelector(selectorIngredients);
  const dispatch = useDispatch();
  const root = useRef();

  if (!ingredientId && detailsIngredient) {
    dispatch(cleanDetailsIngredient());
  }

  useEffect(() => {
    dispatch(getIngredients());
  }, []);

  useEffect(() => {
    if(data.length && ingredientId) {
      const ingredient = data.find(el => el._id === ingredientId);
      if (ingredient) {
        dispatch(setDetailsIngredient(ingredient));
      }
    }

  }, [data, dispatch, ingredientId])

  const handleCloseModalIngredient = useCallback(
    () => {
      dispatch(cleanDetailsIngredient());
      navigate('/');
    },
    [dispatch, navigate]
  );

  const handleCleanIngredients = () => {
    dispatch(cleanIngredients());
  }

  const onClickTab = useCallback((value) => {
    document.querySelector(`#${value}`).scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }, []);

  const ingredientsBySections = useMemo(() => {
    return (
      <section ref={root} className={burgerIngredientsStyle.ingredients}>
        {tabs.map((tab) => {
          const ingredients = data.filter((ingredient) => ingredient.type === tab.value);
          return (
            <SectionType key={tab.value} value={tab.value} text={tab.text} root={root.current}>
              <SectionIngredients ingredients={ingredients} />
            </SectionType>
          )
        })
        }
      </section>
    )
  }, [data]);



  return (
    <>
      <section className={burgerIngredientsStyle.ingredientsBox}>
        {isLoading && <Loader />}
        {!isLoading && !hasError && data.length > 0 &&
          (
            <>
              <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
              <Switch tabs={tabs} onClick={onClickTab} />
              {ingredientsBySections}
            </>
          )
        }
        {
          hasError &&
          (<Notification type='error' onClose={handleCleanIngredients}>
            Ошибка загрузки страницы. <br /> Наши инженеры уже в курсе и разбираются с этой проблемой. <br /> Попробуйте позднее.
          </Notification>)
        }
      </section>
      {detailsIngredient &&
        (
          <Modal onClose={handleCloseModalIngredient} title='Детали ингредиента'>
            <IngredientDetails detailsIngredient={detailsIngredient} />
          </Modal>
        )
      }
    </>

  );
}

BurgerIngredients.propTypes = {
  ingredientId: PropTypes.string
}

export default BurgerIngredients;
