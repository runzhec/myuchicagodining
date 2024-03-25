function convertToNumberWithCleanup(str) {
  // Use a regular expression to remove non-numeric characters except for the decimal point
  // Sometimes there are trailing 'g's or '+'s
  if (str) {
    const numericPart = str.replace(/[^0-9.]/g, "");
    return Number(numericPart);
  } else {
    return 0;
  }
}

export default function calculateTotalNutrients(selectedFoods) {
  let totalCalories = 0;
  let totalProtein = 0;
  let totalCarbs = 0;
  let totalFat = 0;

  Object.keys(selectedFoods).forEach((mealType) => {
    const foods = selectedFoods[mealType];

    Object.keys(foods).forEach((foodItem) => {
      const item = foods[foodItem];
      const quant = item.quant;

      totalCalories += convertToNumberWithCleanup(item.calories) * quant;
      totalProtein += convertToNumberWithCleanup(item.protein) * quant;
      totalCarbs += convertToNumberWithCleanup(item.carbs) * quant;
      totalFat += convertToNumberWithCleanup(item.fat) * quant;
    });
  });

  return {
    calories: totalCalories,
    protein: totalProtein,
    carbs: totalCarbs,
    fat: totalFat,
  };
}
