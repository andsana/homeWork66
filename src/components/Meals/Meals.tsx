import React from 'react';
import {Meal} from '../../types';
import MealItem from './MealItem';

interface Props {
  meals: Meal[];
  deleteMeal: (id: string) => Promise<void>;
}

const Meals: React.FC<Props> = ({meals, deleteMeal}) => {

  return (
    <>
      {meals.length > 0
        ? meals.map((meal) => (
          <MealItem
            key={meal.id}
            meal={meal}
            onDelete={() => deleteMeal(meal.id)}
          />
        ))
        : <div className="alert alert-primary">Not Found! Please add new meal!</div>
      }
    </>
  );
};

export default Meals;