// Maps MobileNet ImageNet class labels to food items with nutritional data.
// MobileNet recognizes ~1000 ImageNet classes, many of which are food-related.

export const foodDatabase = [
  // Fruits
  { id: 'banana', name: 'Banana', calories: 105, carbs: 27, proteins: 1.3, fats: 0.4, type: 'fruit', fiber: 'medium', labels: ['banana'] },
  { id: 'apple', name: 'Apple', calories: 95, carbs: 25, proteins: 0.5, fats: 0.3, type: 'fruit', fiber: 'high', labels: ['granny smith', 'apple'] },
  { id: 'orange', name: 'Orange', calories: 62, carbs: 15, proteins: 1.2, fats: 0.2, type: 'fruit', fiber: 'high', labels: ['orange'] },
  { id: 'strawberry', name: 'Strawberry', calories: 32, carbs: 8, proteins: 0.7, fats: 0.3, type: 'fruit', fiber: 'medium', labels: ['strawberry'] },
  { id: 'pineapple', name: 'Pineapple', calories: 82, carbs: 22, proteins: 0.9, fats: 0.2, type: 'fruit', fiber: 'medium', labels: ['pineapple'] },
  { id: 'lemon', name: 'Lemon', calories: 17, carbs: 5, proteins: 0.6, fats: 0.2, type: 'fruit', fiber: 'medium', labels: ['lemon'] },
  { id: 'fig', name: 'Fig', calories: 74, carbs: 19, proteins: 0.8, fats: 0.3, type: 'fruit', fiber: 'high', labels: ['fig'] },
  { id: 'pomegranate', name: 'Pomegranate', calories: 83, carbs: 19, proteins: 1.7, fats: 1.2, type: 'fruit', fiber: 'high', labels: ['pomegranate'] },
  { id: 'custard_apple', name: 'Custard Apple', calories: 94, carbs: 24, proteins: 2.1, fats: 0.6, type: 'fruit', fiber: 'high', labels: ['custard apple'] },

  // Vegetables
  { id: 'broccoli', name: 'Broccoli', calories: 31, carbs: 6, proteins: 2.6, fats: 0.3, type: 'vegetable', fiber: 'high', labels: ['broccoli'] },
  { id: 'cauliflower', name: 'Cauliflower', calories: 25, carbs: 5, proteins: 1.9, fats: 0.3, type: 'vegetable', fiber: 'high', labels: ['cauliflower'] },
  { id: 'cucumber', name: 'Cucumber', calories: 16, carbs: 4, proteins: 0.7, fats: 0.1, type: 'vegetable', fiber: 'medium', labels: ['cucumber'] },
  { id: 'bell_pepper', name: 'Bell Pepper', calories: 31, carbs: 6, proteins: 1, fats: 0.3, type: 'vegetable', fiber: 'medium', labels: ['bell pepper'] },
  { id: 'mushroom', name: 'Mushroom', calories: 22, carbs: 3, proteins: 3.1, fats: 0.3, type: 'vegetable', fiber: 'medium', labels: ['mushroom', 'agaric'] },
  { id: 'corn', name: 'Corn', calories: 96, carbs: 21, proteins: 3.4, fats: 1.5, type: 'vegetable', fiber: 'medium', labels: ['ear', 'corn'] },
  { id: 'artichoke', name: 'Artichoke', calories: 47, carbs: 11, proteins: 3.3, fats: 0.2, type: 'vegetable', fiber: 'high', labels: ['artichoke'] },
  { id: 'zucchini', name: 'Zucchini', calories: 17, carbs: 3, proteins: 1.2, fats: 0.3, type: 'vegetable', fiber: 'medium', labels: ['zucchini', 'courgette'] },
  { id: 'cabbage', name: 'Cabbage', calories: 25, carbs: 6, proteins: 1.3, fats: 0.1, type: 'vegetable', fiber: 'high', labels: ['head cabbage'] },
  { id: 'cardoon', name: 'Cardoon', calories: 17, carbs: 4, proteins: 0.7, fats: 0.1, type: 'vegetable', fiber: 'high', labels: ['cardoon'] },
  { id: 'spaghetti_squash', name: 'Spaghetti Squash', calories: 31, carbs: 7, proteins: 0.6, fats: 0.6, type: 'vegetable', fiber: 'medium', labels: ['spaghetti squash'] },
  { id: 'acorn_squash', name: 'Acorn Squash', calories: 40, carbs: 10, proteins: 0.8, fats: 0.1, type: 'vegetable', fiber: 'medium', labels: ['acorn squash'] },
  { id: 'butternut_squash', name: 'Butternut Squash', calories: 45, carbs: 12, proteins: 1, fats: 0.1, type: 'vegetable', fiber: 'medium', labels: ['butternut squash'] },

  // Proteins & Dairy
  { id: 'egg', name: 'Egg', calories: 78, carbs: 0.6, proteins: 6, fats: 5, type: 'protein', fiber: 'none', labels: ['hen-of-the-woods'] },
  { id: 'meat_loaf', name: 'Meat Loaf', calories: 149, carbs: 5, proteins: 15, fats: 8, type: 'protein', fiber: 'none', labels: ['meat loaf'] },

  // Baked goods & Prepared
  { id: 'pizza', name: 'Pizza', calories: 266, carbs: 33, proteins: 11, fats: 10, type: 'prepared', fiber: 'none', labels: ['pizza'] },
  { id: 'hotdog', name: 'Hot Dog', calories: 290, carbs: 24, proteins: 10, fats: 17, type: 'prepared', fiber: 'none', labels: ['hotdog', 'hot dog'] },
  { id: 'hamburger', name: 'Hamburger', calories: 295, carbs: 24, proteins: 17, fats: 14, type: 'prepared', fiber: 'none', labels: ['cheeseburger'] },
  { id: 'burrito', name: 'Burrito', calories: 206, carbs: 26, proteins: 9, fats: 7, type: 'prepared', fiber: 'medium', labels: ['burrito'] },
  { id: 'bagel', name: 'Bagel', calories: 245, carbs: 48, proteins: 10, fats: 1.5, type: 'grain', fiber: 'medium', labels: ['bagel'] },
  { id: 'pretzel', name: 'Pretzel', calories: 380, carbs: 80, proteins: 9, fats: 3, type: 'grain', fiber: 'none', labels: ['pretzel'] },
  { id: 'french_loaf', name: 'French Bread', calories: 274, carbs: 56, proteins: 9, fats: 1.5, type: 'grain', fiber: 'medium', labels: ['french loaf'] },

  // Beverages & Misc
  { id: 'espresso', name: 'Espresso Coffee', calories: 2, carbs: 0, proteins: 0.1, fats: 0, type: 'beverage', fiber: 'none', labels: ['espresso'] },
  { id: 'wine', name: 'Wine', calories: 83, carbs: 3, proteins: 0.1, fats: 0, type: 'beverage', fiber: 'none', labels: ['red wine', 'wine bottle'] },
  { id: 'beer', name: 'Beer', calories: 43, carbs: 4, proteins: 0.5, fats: 0, type: 'beverage', fiber: 'none', labels: ['beer glass', 'beer bottle'] },
  { id: 'ice_cream', name: 'Ice Cream', calories: 207, carbs: 24, proteins: 3.5, fats: 11, type: 'dessert', fiber: 'none', labels: ['ice cream'] },
  { id: 'chocolate', name: 'Chocolate', calories: 546, carbs: 60, proteins: 5, fats: 31, type: 'dessert', fiber: 'none', labels: ['chocolate sauce'] },
  { id: 'guacamole', name: 'Guacamole', calories: 160, carbs: 9, proteins: 2, fats: 15, type: 'prepared', fiber: 'high', labels: ['guacamole'] },
  { id: 'potpie', name: 'Pot Pie', calories: 220, carbs: 19, proteins: 8, fats: 13, type: 'prepared', fiber: 'none', labels: ['potpie'] },
  { id: 'trifle', name: 'Trifle', calories: 160, carbs: 22, proteins: 3, fats: 7, type: 'dessert', fiber: 'none', labels: ['trifle'] },
];

// Match a MobileNet prediction label to our food database
export const matchLabelToFood = (label) => {
  const lower = label.toLowerCase();
  
  for (const food of foodDatabase) {
    for (const foodLabel of food.labels) {
      if (lower.includes(foodLabel) || foodLabel.includes(lower)) {
        return food;
      }
    }
  }

  return null;
};

// Fallback: create a generic food entry from just a label
export const createGenericFood = (label) => ({
  id: 'unknown',
  name: label.split(',')[0].trim().replace(/^\w/, c => c.toUpperCase()),
  calories: 50,
  carbs: 10,
  proteins: 2,
  fats: 1,
  type: 'unknown',
  fiber: 'none',
  labels: [label]
});

export const getRandomFood = () => {
  return foodDatabase[Math.floor(Math.random() * foodDatabase.length)];
};
