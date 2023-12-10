import Appbar from './components/Appbar/Appbar';
import {Route, Routes, useLocation} from 'react-router-dom';
import Home from './containers/Home/Home';
import NewMeal from './containers/NewMeal/NewMeal';
import {useCallback, useEffect, useState} from 'react';
import {Meal, MealsList} from './types';
import axiosApi from './axiosApi';


function App() {
  const location = useLocation();
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchMeals = useCallback(async () => {
    try {
      setLoading(true);
      const mealsResponse = await axiosApi.get<MealsList | null>('/meals.json');
      const meals = mealsResponse.data;

      if (!meals) {
        setMeals([]);
      } else {
        const newMeals = Object.keys(meals).map((id) => {
          const meal = meals[id];
          return {
            ...meal,
            id,
          };
        });
        setMeals(newMeals);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (location.pathname === '/') {
      void fetchMeals();
    }
  }, [location.pathname, fetchMeals]);

  const deleteMeal = async (id: string) => {
    if (window.confirm('Do you really want to delete?')) {
      await axiosApi.delete('meals/' + id + '.json');
      await fetchMeals();
    }
  };

  return (
    <>
      <header>
        <Appbar/>
      </header>
      <main className="container-fluid">
        <Routes>
          <Route path="/" element={(
            <Home
              meals={meals}
              mealsLoading={loading}
              deleteMeal={deleteMeal}
            />
          )}/>
          <Route path="/new-meal" element={<NewMeal/>}/>
        </Routes>
      </main>
    </>
  );
}

export default App;
