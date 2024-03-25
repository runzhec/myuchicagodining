import UseNumberInputCompact from "../components/ChangeQuantity";

function capitalizeWords(str) {
  return str
    .split(" ")
    .map(function (word) {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" ");
}

function getSelectedColumns(setSelectedFoods) {
  const columns = [
    {
      field: "food",
      headerName: "Food",
      disableColumnMenu: true,
      flex: 1.75,
    },
    {
      field: "quantity",
      headerName: "Quantity",
      flex: 1.75,
      renderCell: ({ value, row }) => {
        if (row.id.includes("header")) {
          return null;
        }
        const key = `${row.hallAndMeal}-${row.food}-${value}`;

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
  ];

  return columns;
}

function getSelectedRows(selectedFoods) {
  let rows = [];

  Object.keys(selectedFoods).forEach((key) => {
    const headerRow = {
      id: key + " header",
      food: capitalizeWords(key.replace("_", " ")),
    };
    rows.push(headerRow);
    Object.keys(selectedFoods[key]).forEach((food) => {
      const row = {
        id: key + food,
        food: food,
        quantity: selectedFoods[key][food]["quant"],
        protein: selectedFoods[key][food]["protein"],
        calories: selectedFoods[key][food]["calories"],
        carbs: selectedFoods[key][food]["carbs"],
        fat: selectedFoods[key][food]["fat"],
        hallAndMeal: key,
      };
      rows.push(row);
    });
  });

  console.log(rows);
  return rows;
}

export { getSelectedRows, getSelectedColumns };
