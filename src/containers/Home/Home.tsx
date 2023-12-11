import {Link} from 'react-router-dom';
import Meals from '../../components/Meals/Meals';
import {Meal} from '../../types';
import React from 'react';
import Spinner from '../../components/Spinner/Spinner';

interface Props {
  mealsLoading: boolean;
  meals: Meal[];
  deleteMeal: (id: string) => Promise<void>;
}

const Home: React.FC<Props> = ({mealsLoading, meals, deleteMeal}) => {
  const today = new Date().toISOString().split('T')[0];
  const mealsToDay = meals.filter((meal) => meal.date === today);
  const total = mealsToDay.reduce((sum, meal) => {
    return sum + meal.calories;
  }, 0);

  return (
    <>
      <div className="row m-2">
        {meals.length > 0 && (
          <div className="col">
            Total calories today: <strong>{total}</strong> kcal
          </div>
        )}
        <div className="col text-end">
          <Link to="/new-meal" className="btn btn-primary">Add new meal</Link>
        </div>
      </div>

      <div className="row">
        {mealsLoading ? <Spinner/> : (
          <Meals
            meals={meals}
            deleteMeal={deleteMeal}
          />
        )}
      </div>
    </>
  );
};

export default Home;