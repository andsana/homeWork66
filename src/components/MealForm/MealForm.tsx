import React, {useState} from 'react';
import {ApiMeal, MealMutation} from '../../types';
import ButtonSpinner from '../Spinner/ButtonSpinner';

const initialState: MealMutation = {
  date: new Date().toISOString().split('T')[0],
  time: '',
  description: '',
  calories: '',
};

interface Props {
  onSubmit: (meal: ApiMeal) => void;
  existingMeal?: MealMutation;
  isEdit?: boolean;
  isLoading?: boolean;
}

const MealForm: React.FC<Props> = ({onSubmit, existingMeal = initialState, isEdit = false, isLoading = false}) => {
  const [meal, setMeal] = useState<MealMutation>(existingMeal);

  const formatDate = (inputDate: string) => {
    const date = new Date(inputDate);
    const year = date.getFullYear();
    const month = `0${date.getMonth() + 1}`.slice(-2);
    const day = `0${date.getDate()}`.slice(-2);
    return `${year}-${month}-${day}`;
  };

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
      date: formatDate(meal.date),
    });
  };

  return (
    <form onSubmit={onFormSubmit}>
      <h4>{isEdit ? 'Edit meal' : 'Add new meal'}</h4>
      <div className="form-group">
        <label htmlFor="date">Date of meal</label>
        <input
          type="date"
          name="date"
          value={meal.date}
          required
          id="date"
          className="form-control"
          onChange={changeMeal}
        />
      </div>
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