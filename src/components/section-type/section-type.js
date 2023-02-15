import { useContext } from 'react';

import sectionTypeStyle from './section-type.module.css';
import Ingredient from "../ingredient/ingredient";
import { tabPropTypes } from '../../utils/propTypeConst';
import { IngredientsContext } from '../../services/appContext';

function SectionType({ tab }) {
  const { ingredients } = useContext(IngredientsContext);
  const typeIngredients = ingredients.filter(el => el.type === tab.value);
  
  return (
    <section id={tab.value} className='pt-10'>
      <h2 className="text text_type_main-medium">{tab.text}</h2>
      <ul className={`${sectionTypeStyle.list} pr-1 pl-1 pt-6 pb-6`}>
        {typeIngredients.map(ingredient => <li key={ingredient._id} className={`${sectionTypeStyle.item} mr-3 ml-3`}>
          <Ingredient ingredient={ingredient} />
        </li>)}
      </ul>
    </section>
  );
}

SectionType.propTypes = {
  tab: tabPropTypes.isRequired,
}

export default SectionType;
