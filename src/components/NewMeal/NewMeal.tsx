import axiosApi from '../../axiosApi';
import {ApiMeal} from '../../types';
import {useNavigate} from 'react-router-dom';
import {useState} from 'react';
import MealForm from '../mealForm/mealForm';

const NewMeal = () => {
  const navigate = useNavigate();
  const [creating, setCreating] = useState(false);

  const createMeal = async (meal: ApiMeal) => {
    try {
      setCreating(true);
      await axiosApi.post('meals.json', meal);
      navigate('/');
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="row mt-2">
      <div className="col">
        <MealForm onSubmit={createMeal} isLoading={creating}/>
      </div>
    </div>
  );
};

export default NewMeal;