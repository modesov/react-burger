import { FC } from "react";
import clsx from "clsx";

import ingredientIconStyle from './ingredient-icon.module.css'

interface IngredientIconProps {
  srcSet: string;
  src: string;
  alt?: string;
  overflow?: number;
  extraClass?: string;
}

export const IngredientIcon: FC<IngredientIconProps> = ({
  srcSet,
  src,
  alt = "ingredient",
  overflow = 0,
  extraClass
}) => {
  return (
    <div className={clsx(ingredientIconStyle.container, extraClass)}>
      <div>
        <picture className={ingredientIconStyle.picture}>
          <source srcSet={srcSet} />
          <img src={src} alt={alt} width="112" height="56" />
        </picture>
        {overflow > 0 && (
          <div
            className={clsx(ingredientIconStyle.container, ingredientIconStyle.picture, ingredientIconStyle.overflow)}
          >
            <div className={clsx(ingredientIconStyle.picture, "text text_type_main-small")}>
              +{overflow}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};