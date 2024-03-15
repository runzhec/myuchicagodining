function withRenderCell(column) {
  return {
    ...column,
    flex: 1.75,
    disableColumnMenu: true,
    sortable: false,
    renderCell: (params) => {
      const isTrue = params.value === "true";
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {isTrue ? (
            <svg width="24" height="24" viewBox="0 0 24 24">
              <path
                fill="green"
                d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"
              />
            </svg>
          ) : (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
                fill="#F44336"
              />
            </svg>
          )}
        </div>
      );
    },
  };
}

function getColumns(isSmallScreen) {
  const columns = [
    {
      field: "food",
      headerName: "Food",
      flex: 4.0,
      disableColumnMenu: true,
    },
    ...[
      {
        field: "north",
        headerName: isSmallScreen ? "BK" : "Baker",
      },
      {
        field: "woodlawn",
        headerName: isSmallScreen ? "WL" : "Woodlawn",
      },
      {
        field: "south",
        headerName: isSmallScreen ? "CA" : "Cathey",
      },
      {
        field: "bartlett",
        headerName: isSmallScreen ? "BT" : "Bartlett",
      },
    ].map(withRenderCell),
  ];

  return columns;
}

const extractFoodNames = (mealData) => {
  let foodNames = [];

  mealData.forEach((station) => {
    if (station.foods && station.foods.length > 0) {
      station.foods.forEach((food) => {
        foodNames.push(food.name.trim());
      });
    }
  });

  // Optional: Remove duplicates if necessary
  foodNames = [...new Set(foodNames)];

  return foodNames;
};

async function getRows(meal_type, url) {
  // Explicitly return the fetch promise chain
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (!data) {
      return [];
    }

    let rowHeaders = [];

    const north_set = new Set(extractFoodNames(data["north_" + meal_type]));
    const south_set = new Set(extractFoodNames(data["south_" + meal_type]));
    const woodlawn_set = new Set(
      extractFoodNames(data["woodlawn_" + meal_type])
    );
    const bartlett_set = new Set(
      extractFoodNames(data["bartlett_" + meal_type])
    );

    rowHeaders = [...north_set, ...south_set, ...woodlawn_set, ...bartlett_set];

    rowHeaders = [...new Set(rowHeaders.sort())];
    let rows = [];

    rowHeaders.forEach((header) => {
      const currRow = {
        id: header.trim(),
        food: header.trim(),
        north: north_set.has(header) ? "true" : "false",
        south: south_set.has(header) ? "true" : "false",
        woodlawn: woodlawn_set.has(header) ? "true" : "false",
        bartlett: bartlett_set.has(header) ? "true" : "false",
      };
      rows.push(currRow);
    });

    return rows;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export { getRows, getColumns };
