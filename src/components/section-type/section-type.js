import PropTypes from 'prop-types';

import sectionTypeStyle from './section-type.module.css';
import Ingredient from "../ingredient/ingredient";
import { tabPropTypes, ingredientPropTypes } from '../../utils/propTypeConst';

function SectionType({tab, ingredients, onSelected}) {
    return (
        <section id={tab.value} className='pt-10'>
            <h2 className="text text_type_main-medium">{tab.text}</h2>
            <ul className={`${sectionTypeStyle.list} pr-1 pl-1 pt-6 pb-6`}>
                {ingredients.map(ingredient => <li key={ingredient._id} className={`${sectionTypeStyle.item} mr-3 ml-3`}>
                        <Ingredient ingredient={ingredient} onSelected={onSelected} />
                    </li>)}
            </ul>
        </section>
    );
}

SectionType.propTypes = {
    tab: tabPropTypes.isRequired,
    ingredients: PropTypes.arrayOf(ingredientPropTypes).isRequired,
    onSelected: PropTypes.func.isRequired,
}

export default SectionType;
