function withRenderCell(column) {
  return {
    ...column,
    flex: 1.75,
    disableColumnMenu: true,
    sortable: false,
  };
}

function getHallColumns(isSmallScreen) {
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
        if (row.id.includes("Station")) {
          return row.food;
        }
        return value;
      },
    },
    ...[
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

async function getHallRows(meal_type, diningHall, url) {
  // Explicitly return the fetch promise chain
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (!data) {
      return [];
    }

    let rows = [];

    const diningHallMap = {
      Bartlett: "bartlett_",
      Woodlawn: "woodlawn_",
      Cathey: "south_",
      Baker: "north_",
    };

    data[diningHallMap[diningHall] + meal_type].forEach(
      (station, stationIndex) => {
        const headerRow = {
          id: station["station"] + " station",
          food: station["station"],
        };
        // some stations may not be open/serve food
        if (station["foods"]) {
          rows.push(headerRow);
        }
        station["foods"].forEach((food, foodIndex) => {
          const uniqueId = `${food[
            "name"
          ].trim()}_${stationIndex}_${foodIndex}`;
          const currRow = {
            id: uniqueId,
            food: food["name"].trim(),
            calories: food["calories"]["value"],
            protein: food["protein"]["value"],
            carbs: food["carb"]["value"],
          };
          rows.push(currRow);
        });
      }
    );

    return rows;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export { getHallRows, getHallColumns };
