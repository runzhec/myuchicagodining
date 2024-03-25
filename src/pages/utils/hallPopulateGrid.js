import UseNumberInputCompact from "../components/ChangeQuantity";

const diningHallMap = {
  Bartlett: "bartlett_",
  Woodlawn: "woodlawn_",
  Cathey: "south_",
  Baker: "north_",
};

function withRenderCell(column) {
  return {
    ...column,
    flex: 1.75,
    disableColumnMenu: true,
    sortable: false,
  };
}

function getHallColumns(
  isSmallScreen,
  selectedFoods,
  setSelectedFoods,
  mealType,
  diningHall
) {
  const hallAndMeal = diningHallMap[diningHall] + mealType;
  const columns = [
    {
      field: "food",
      headerName: "Food",
      flex: 4.0,
      disableColumnMenu: true,
      colSpan: ({ row }) => {
        if (row.id.includes("Station")) {
          return 5;
        }
        return 1;
      },
      valueGetter: ({ value, row }) => {
        if (row.id.includes("station")) {
          return row.food;
        }
        return value;
      },
    },
    ...[
      {
        field: "quantity",
        headerName: "Quantity",
        renderCell: ({ value, row }) => {
          if (row.id.includes("station")) {
            return null;
          }
          const key = `${hallAndMeal}-${row.food}-${value}`;

          return (
            <UseNumberInputCompact
              key={key}
              initVal={value}
              setSelectedFoods={setSelectedFoods}
              hallAndMeal={row.hallAndMeal}
              food={row.food}
              calories={row.calories}
              protein={row.protein}
              carbs={row.carbs}
              fat={row.fat}
            />
          );
        },
      },
      {
        field: "calories",
        headerName: isSmallScreen ? "Cal" : "Calories",
      },
      {
        field: "protein",
        headerName: isSmallScreen ? "Protein" : "Protein(g)",
      },
      {
        field: "carbs",
        headerName: isSmallScreen ? "Carb" : "Carbs(g)",
      },
    ].map(withRenderCell),
  ];

  return columns;
}

async function getHallRows(meal_type, diningHall, url, selectedFoods) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (!data) {
      return [];
    }

    let rows = [];

    const hallAndMeal = diningHallMap[diningHall] + meal_type;

    data[hallAndMeal].forEach((station, stationIndex) => {
      const headerRow = {
        id: station["station"] + " station",
        food: station["station"],
      };
      // some stations may not be open/serve food
      if (station["foods"]) {
        rows.push(headerRow);
      }
      station["foods"].forEach((food, foodIndex) => {
        const uniqueId = `${food["name"].trim()}_${stationIndex}_${foodIndex}`;
        const currRow = {
          id: uniqueId,
          hallAndMeal: hallAndMeal,
          food: food["name"].trim(),
          quantity:
            selectedFoods[hallAndMeal] &&
            selectedFoods[hallAndMeal][food["name"]]
              ? selectedFoods[hallAndMeal][food["name"]]["quant"]
              : 0,
          calories: food["calories"]["value"],
          protein: food["protein"]["value"],
          carbs: food["carb"]["value"],
          fat: food["total_fat"]["value"],
        };
        rows.push(currRow);
      });
    });

    return rows;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export { getHallRows, getHallColumns };
