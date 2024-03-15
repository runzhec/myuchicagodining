async function fetchFutureAvailability(selectedFood) {
    const startDate = new Date();
    const endDate = new Date(2024, 5, 4); // End date: June 4, 2024
    let dateArray = [];
  
    // Generate an array of dates
    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
      dateArray.push(new Date(d));
    }
  
    // Reset the date object after modification in the loop
    startDate.setDate(startDate.getDate() - (endDate - startDate) / (1000 * 60 * 60 * 24));
  
    const fetchPromises = dateArray.map(date => {
      const formattedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
      const url = `/json/${formattedDate}.json`;
  
      return fetch(url)
        .then(response => response.json())
        .then(data => {
          const mealTypes = ['north_breakfast', 'north_lunch', 'north_dinner', 'bartlett_breakfast', 'bartlett_lunch', 'bartlett_dinner', 'woodlawn_breakfast', 'woodlawn_lunch', 'woodlawn_dinner', 'south_breakfast', 'south_lunch_dinner'];
          let dayData = [];
  
          mealTypes.forEach(mealType => {
            if (data[mealType]) {
              data[mealType].forEach(meal => {
                meal.foods.forEach(food => {
                  if (food.name.toLowerCase().includes(selectedFood.toLowerCase())) {
                    dayData.push({
                      id: `${date.toISOString().split('T')[0]}-${mealType}-${food.name.replace(/\s+/g, '-')}`,
                      date: new Date(formattedDate),
                      diningHall: mealType.split('_')[0].charAt(0).toUpperCase() + mealType.split('_')[0].slice(1),
                      mealTime: mealType.split('_')[1].charAt(0).toUpperCase() + mealType.split('_')[1].slice(1),
                      food: food.name,
                    });
                  }
                });
              });
            }
          });
          return dayData;
        })
        .catch(error => {
          console.error(`Error fetching data for ${formattedDate}:`, error);
          return [];
        });
    });
  
    // Wait for promises to resolve
    const results = await Promise.all(fetchPromises);
    return results.flat();
  }
  
  export default fetchFutureAvailability;
  