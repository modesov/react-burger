import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectorIngredients } from "../services/selectors";

export const useDetailsIngredient = () => {
  const { data: ingredients, isLoading } = useSelector(selectorIngredients);
  const [detailsIngredient, setDetailsIngredient] = useState(null);
  const [isError, setError] = useState(false);
  const { idIngredient } = useParams();

  useEffect(() => {
    if (ingredients.length && idIngredient) {
      const ingredient = ingredients.find(el => el._id === idIngredient);
      if (ingredient) {
        setDetailsIngredient(ingredient);
      } else {
        setError(true);
      }
    }

  }, [idIngredient, ingredients]);

  return { isError, detailsIngredient, setDetailsIngredient, idIngredient, isLoading };
}