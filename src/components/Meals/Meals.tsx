import React from 'react';
import {Meal} from '../../types';
import MealItem from './MealItem';

interface Props {
  meals: Meal[];
  deleteMeal: (id: string) => void;
}

const Meals: React.FC<Props> = ({meals, deleteMeal}) => {
  return (
    <>
      <h4>Meals</h4>
      {meals.map((meal) => (
        <MealItem
          key={meal.id}
          meal={meal}
          onDelete={() => deleteMeal(meal.id)}/>
      ))}
    </>
  );
};

export default Meals;