import ingredientDetailsStyle from './ingredient-details.module.css';
import { ingredientPropTypes } from '../../utils/propTypeConst';

function IngredientDetails({data}) {
    return (
        <div className='pl-15 pr-15'>
            <div className={`${ingredientDetailsStyle.img} pr-5 pl-5 mb-4`}>
                <img src={data.image_large} alt={data.name} />
            </div>
            <p className={`${ingredientDetailsStyle.title} text text_type_main-medium mb-8`}>{data.name}</p>
            <div className={`${ingredientDetailsStyle.specifications}`}>
                <div className={`${ingredientDetailsStyle.itemSpecification}`}>
                    <span className='text text_type_main-default text_color_inactive'>Калории,ккал</span>
                    <span className='text text_type_digits-default text_color_inactive'>{data.calories}</span>
                </div>                
                <div className={`${ingredientDetailsStyle.itemSpecification}`}>
                    <span className='text text_type_main-default text_color_inactive'>Белки, г</span>
                    <span className='text text_type_digits-default text_color_inactive'>{data.proteins}</span>
                </div>
                <div className={`${ingredientDetailsStyle.itemSpecification}`}>
                    <span className='text text_type_main-default text_color_inactive'>Жиры, г</span>
                    <span className='text text_type_digits-default text_color_inactive'>{data.fat}</span>
                </div>
                <div className={`${ingredientDetailsStyle.itemSpecification}`}>
                    <span className='text text_type_main-default text_color_inactive'>Углеводы, г</span>
                    <span className='text text_type_digits-default text_color_inactive'>{data.carbohydrates}</span>
                </div>
            </div>
        </div>
    );
}

IngredientDetails.propTypes = {
    data: ingredientPropTypes.isRequired
}

export default IngredientDetails;
