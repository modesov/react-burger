import { FC, memo } from 'react';

import sectionIngredientsStyle from './section-ingredients.module.css';
import Ingredient from '../ingredient/ingredient';
import { selectorIngredientCounters } from '../../services/selectors';
import { IngredientType } from '../../utils/types';
import { useSelector } from '../../services/hooks';

interface SectionIngredientsProps {
  ingredients: IngredientType[];
}

interface CountersType {
  id: string;
  count: number;
}

const SectionIngredients: FC<SectionIngredientsProps> = ({ ingredients }) => {
  const counters: CountersType[] = useSelector(selectorIngredientCounters);

  return (
    <ul className={`${sectionIngredientsStyle.list} pr-1 pl-1 pt-6 pb-6`}>
      {ingredients.map((ingredient) => (
        <li key={ingredient._id} className={`${sectionIngredientsStyle.item} mr-3 ml-3`}>
          <Ingredient ingredient={ingredient} countSelected={counters.find(el => el.id === ingredient._id)?.count} />
        </li>
      ))}
    </ul>
  );
}

export default memo(SectionIngredients);
