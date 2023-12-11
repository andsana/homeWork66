import React, {useState} from 'react';
import type {Meal} from '../../types';
import {Link} from 'react-router-dom';
import ButtonSpinner from '../Spinner/ButtonSpinner';

interface Props {
  meal: Meal;
  onDelete: (id: string) => Promise<void>;
}

const MealItem: React.FC<Props> = ({meal, onDelete}) => {
  const [deleting, setDeleting] = useState(false);

  const deleteClick = async () => {
    setDeleting(true);
    try {
      await onDelete(meal.id);
    } finally {
      setDeleting(false);
    }
  };


  return (
    <div className="card mb-2">
      <div className="card-header">
        <span className="me-3">{meal.time}</span>
        <span>{meal.date}</span>
      </div>
      <div className="card-body row">
        <div className="blockquote mb-0 col">
          <p>{meal.description}</p>
        </div>
        <div className="col-2 text-end">
          <p>{meal.calories} Kcal</p>
        </div>
        <div className="col-2 text-end">
          <button className="btn btn-danger d-block ms-auto w-50 mb-2" onClick={deleteClick} disabled={deleting}>
            {deleting && <ButtonSpinner/>}
            Delete
          </button>
          <Link to={'/edit-meal/' + meal.id} className="btn btn-success w-50">Edit</Link>
        </div>
      </div>
    </div>
  );
};

export default MealItem;