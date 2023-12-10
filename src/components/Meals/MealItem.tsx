import React from 'react';
import type {Meal} from '../../types';
import {Link} from 'react-router-dom';

interface Props {
  meal: Meal;
  onDelete: React.MouseEventHandler;
}

const MealItem: React.FC<Props> = ({meal, onDelete}) => {

  return (
    <div className="card mb-2">
      <div className="card-header">{meal.time}</div>
      <div className="card-body row">
        <div className="blockquote mb-0 col">
          <p>{meal.description}</p>
        </div>
        <div className="col-2 text-end">
          <p>{meal.calories} Kcal</p>
        </div>
        <div className="col-2 text-end">
          <button className="btn btn-danger d-block ms-auto w-50 mb-2" onClick={onDelete}>Delete</button>
          <Link to={'/edit-meal/' + meal.id} className="btn btn-success w-50">Edit</Link>
        </div>
      </div>
    </div>
  );
};

export default MealItem;