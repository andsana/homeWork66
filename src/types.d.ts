export interface Meal {
    id: string;
    time: string;
    description: string;
    calories: number;
}

export type ApiMeal = Omit<Meal, 'id'>

export interface MealsList {
  [id: string]: ApiMeal;
}

export interface MealMutation {
    time: string;
    description: string;
    calories: string;
}