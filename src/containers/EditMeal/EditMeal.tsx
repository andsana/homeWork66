import {useParams} from 'react-router-dom';
import {useCallback, useEffect, useState} from 'react';
import {ApiMeal} from '../../types';
import axiosApi from '../../axiosApi';
import Spinner from '../../components/Spinner/Spinner';
import MealForm from '../../components/MealForm/MealForm';

const EditMeal = () => {
  const {id} = useParams();
  const [meal, setMeal] = useState<ApiMeal | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const fetchOneMeal = useCallback(async () => {
    try {
      const mealResponse = await axiosApi.get<ApiMeal | null>('meals/' + id + '.json');
      setMeal(mealResponse.data);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    void fetchOneMeal();
  }, [fetchOneMeal]);

  const onSubmit = async (meal: ApiMeal) => {
    try {
      setUpdating(true);
      await axiosApi.put('/meals/' + id + '.json', meal);
    } finally {
      setUpdating(false);
    }
  };

  const existingMeal = meal ? {
    ...meal,
    calories: meal.calories.toString(),
  } : undefined;

  let formSection = <Spinner/>;

  if (!loading) {
    if (meal) {
      formSection = (
        <MealForm
          onSubmit={onSubmit}
          existingMeal={existingMeal}
          isEdit
          isLoading={updating}
        />
      );
    } else {
      formSection = <h4>Not found</h4>;
    }
  }

  return (
    <div className="row mt-2">
      <div className="col">
        {formSection}
      </div>
    </div>
  );
};

export default EditMeal;