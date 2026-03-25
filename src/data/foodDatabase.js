export const foodDatabase = [
  { id: 'apple', name: 'Fresh Apple', calories: 95, carbs: 25, proteins: 0.5, fats: 0.3, type: 'fruit', fiber: 'high' },
  { id: 'banana', name: 'Banana', calories: 105, carbs: 27, proteins: 1.3, fats: 0.4, type: 'fruit', fiber: 'medium' },
  { id: 'broccoli', name: 'Broccoli', calories: 31, carbs: 6, proteins: 2.6, fats: 0.3, type: 'vegetable', fiber: 'high' },
  { id: 'carrot', name: 'Carrot', calories: 41, carbs: 10, proteins: 0.9, fats: 0.2, type: 'vegetable', fiber: 'high' },
  { id: 'chicken_breast', name: 'Chicken Breast', calories: 165, carbs: 0, proteins: 31, fats: 3.6, type: 'protein', fiber: 'none' },
  { id: 'yogurt', name: 'Greek Yogurt', calories: 100, carbs: 4, proteins: 17, fats: 0.7, type: 'dairy', fiber: 'none' },
  { id: 'oatmeal', name: 'Oatmeal', calories: 150, carbs: 27, proteins: 5, fats: 3, type: 'grain', fiber: 'high' },
  { id: 'almonds', name: 'Almonds', calories: 160, carbs: 6, proteins: 6, fats: 14, type: 'fat', fiber: 'medium' },
  { id: 'spinach', name: 'Spinach', calories: 7, carbs: 1, proteins: 0.9, fats: 0.1, type: 'vegetable', fiber: 'high' },
  { id: 'egg', name: 'Hard Boiled Egg', calories: 78, carbs: 0.6, proteins: 6, fats: 5, type: 'protein', fiber: 'none' },
];

export const getRandomFood = () => {
  return foodDatabase[Math.floor(Math.random() * foodDatabase.length)];
};
