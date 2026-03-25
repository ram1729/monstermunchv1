const OFF_API_URL = 'https://world.openfoodfacts.org/api/v0/product/';

export const fetchProductByBarcode = async (barcode) => {
  try {
    const response = await fetch(`${OFF_API_URL}${barcode}.json`);
    const data = await response.json();
    
    if (data.status === 1) {
      const p = data.product;
      return {
        id: barcode,
        name: p.product_name || 'Unknown Product',
        brands: p.brands,
        image: p.image_url,
        carbs: p.nutriments?.carbohydrates_100g || 0,
        proteins: p.nutriments?.proteins_100g || 0,
        fats: p.nutriments?.fat_100g || 0,
        fiber: p.nutriments?.fiber_100g || 0,
        score: p.nutriscore_grade || 'unknown'
      };
    }
    return null;
  } catch (err) {
    console.error('Error fetching OpenFoodFacts data:', err);
    return null;
  }
};
