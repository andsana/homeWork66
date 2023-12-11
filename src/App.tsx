import Appbar from './components/Appbar/Appbar';
import {Route, Routes, useLocation} from 'react-router-dom';
import Home from './containers/Home/Home';
import NewMeal from './containers/NewMeal/NewMeal';
import {useCallback, useEffect, useState} from 'react';
import {Meal, MealsList} from './types';
import axiosApi from './axiosApi';
import EditMeal from './containers/EditMeal/EditMeal';


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
        newMeals.sort((a, b) => {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
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
    await axiosApi.delete('meals/' + id + '.json');
    await fetchMeals();
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
          <Route path="/edit-meal/:id" element={<EditMeal/>}/>
        </Routes>
      </main>
    </>
  );
}

export default App;
