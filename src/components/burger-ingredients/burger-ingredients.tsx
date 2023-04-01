import { FC, ReactNode, useCallback, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import burgerIngredientsStyle from './burger-ingredients.module.css';
import Switch from '../switch/switch';
import SectionType from '../section-type/section-type';
import SectionIngredients from '../section-ingredients/section-ingredients';
import Notification from '../notification/notification';
import Loader from '../loader/Loader';
import { cleanIngredients } from '../../services/actions/ingredients';
import { selectorIngredients, selectorTabs } from '../../services/selectors';
import { HandleFunctionType, IngredientType, TabType } from '../../utils/types';

export type OnClickTabCallback = (value: string) => void;

const BurgerIngredients: FC = () => {
  const tabs = useSelector(selectorTabs);
  const { data, isLoading, hasError } = useSelector(selectorIngredients);
  const dispatch = useDispatch();
  const root = useRef(null);

  const handleCleanIngredients: HandleFunctionType = () => {
    dispatch(cleanIngredients());
  }

  const onClickTab = useCallback<OnClickTabCallback>((value) => {
    document.querySelector(`#${value}`)?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }, []);

  const ingredientsBySections = useMemo<ReactNode>(() => {
    return (
      <section ref={root} className={burgerIngredientsStyle.ingredients}>
        {tabs.map((tab: TabType) => {
          const ingredients = data.filter((ingredient: IngredientType) => ingredient.type === tab.value);
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
    </>
  );
}

export default BurgerIngredients;
