import {useState} from 'react';
import PropTypes from 'prop-types';

import burgerIngredientsStyle from './burger-ingredients.module.css';
import { tabs } from '../../utils/data';
import Switch from '../switch/switch';
import SectionType from '../section-type/section-type';
import { ingredientPropTypes } from '../../utils/propTypeConst'

function BurgerIngredients({data, onSelected}) {
    const [current, setCurrent] = useState(tabs[0].value);

    return (
        <section className={burgerIngredientsStyle.ingredientsBox}>
            <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
            <Switch tabs={tabs} current={current} setCurrent={setCurrent}/>
            <section className={burgerIngredientsStyle.ingredients}>
                {tabs.map(tab => {
                    const ingredients = data.filter(el => el.type === tab.value);
                    return (<SectionType key={tab.value} tab={tab} ingredients={ingredients} onSelected={onSelected} />);
                })}
            </section>
        </section>
    );
}

BurgerIngredients.propTypes = {
    data: PropTypes.arrayOf(ingredientPropTypes).isRequired,
    onSelected: PropTypes.func.isRequired
}

export default BurgerIngredients;