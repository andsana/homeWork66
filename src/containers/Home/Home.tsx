import {Link} from 'react-router-dom';
import Meals from '../../components/Meals/Meals';
import {Meal} from '../../types';
import React from 'react';
import Spinner from '../../components/Spinner/Spinner';

interface Props {
  mealsLoading: boolean;
  meals: Meal[];
  deleteMeal: (id: string) => void;
}

const Home: React.FC<Props> = ({mealsLoading, meals, deleteMeal}) => {

  return (
    <>
      <div className="row mt-2">
        <div className="col">
          Total calories: <strong>900</strong> kcal
        </div>
        <div className="col text-end">
          <Link to="/new-meal" className="btn btn-primary">Add new meal</Link>
        </div>
      </div>
      <div className="row">
        {mealsLoading ? <Spinner/> : (
          <Meals
            meals={meals}
            deleteMeal={deleteMeal}/>
        )}
      </div>
    </>
  );
};

export default Home;