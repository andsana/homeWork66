import React, {useState} from 'react';
import {ApiMeal, MealMutation} from '../../types';
import ButtonSpinner from '../Spinner/ButtonSpinner';

const initialState: MealMutation = {
  time: '',
  description: '',
  calories: '',
};

interface Props {
  onSubmit: (meal: ApiMeal) => void;
  existingDish?: MealMutation;
  isEdit?: boolean;
  isLoading?: boolean;
}

const MealForm: React.FC<Props> = ({onSubmit, existingDish = initialState, isEdit = false, isLoading = false}) => {
  const [meal, setMeal] = useState<MealMutation>(existingDish);

  const changeMeal = (e: React.ChangeEvent<HTMLSelectElement | HTMLTextAreaElement | HTMLInputElement>) => {
    setMeal((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;

    onSubmit({
      ...meal,
      calories: parseFloat(meal.calories),
    });
  };

  return (
    <form onSubmit={onFormSubmit}>
      <h4>{isEdit ? 'Edit meal' : 'Add new meal'}</h4>
      <div className="form-group">
        <label htmlFor="meal">Meal time</label>
        <select
          name="time"
          required
          id="meal"
          className="form-control"
          value={meal.time}
          onChange={changeMeal}
        >
          <option value="">Empty</option>
          <option value="breakfast">Breakfast</option>
          <option value="snack">Snack</option>
          <option value="lunch">Lunch</option>
          <option value="dinner">Dinner</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="name">Description</label>
        <textarea
          name="description"
          required
          id="description"
          className="form-control"
          value={meal.description}
          onChange={changeMeal}
        />
      </div>
      <div className="form-group">
        <label htmlFor="name">Kcal</label>
        <input
          type="number"
          name="calories"
          required
          id="price"
          className="form-control"
          value={meal.calories}
          onChange={changeMeal}
        />
      </div>
      <button type="submit" className="btn btn-success" disabled={isLoading}>
        {isLoading && <ButtonSpinner/>}
        Save
      </button>
    </form>

  );
};

export default MealForm;