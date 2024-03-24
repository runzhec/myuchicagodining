import { getColumns, getRows } from "./utils/allPopulateGrid.js";
import { getHallColumns, getHallRows } from "./utils/hallPopulateGrid.js";
import ComparisonGrid from "./components/ComparisonGrid.jsx";
import { useState, useEffect } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import StyledToggleButton from "./components/MealToggle.jsx";
import NavBar from "./components/NavBar.jsx";

const initalMealType = () => {
  const currentTime = new Date();
  const hour = currentTime.getHours();
  const minutes = currentTime.getMinutes();

  // Check if it's past 2:30 PM
  const hasPassedTwoThirtyPM = hour > 14 || (hour === 14 && minutes > 30);
  if (hasPassedTwoThirtyPM) {
    return "dinner";
  }

  // Check if it's past 10:30 AM
  const hasPassedTenThirtyAM = hour > 10 || (hour === 10 && minutes > 30);
  if (hasPassedTenThirtyAM) {
    return "lunch";
  }

  return "breakfast";
};

function Landing({ selectedFoods, setSelectedFoods }) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [rows, setRows] = useState([]);
  const [cols, setCols] = useState(getColumns(isSmallScreen));

  const [mealType, setMealType] = useState(initalMealType);
  const [diningHall, setDiningHall] = useState("All");

  const date = new Date();

  //Format the date as YYYY-M-D
  const formattedDate = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}`;

  //const url = `https://myuofcdining.net/json/${formattedDate}.json`;
  const url = `/json/${formattedDate}.json`;
  console.log(selectedFoods);

  useEffect(() => {
    if (diningHall === "All") {
      getRows(mealType, url)
        .then((rows) => {
          setRows(rows);
          // Ensure setCols is called right after setRows in the promise chain
        })
        .then(() => setCols(getColumns(isSmallScreen)))
        .catch(console.error);
    } else {
      getHallRows(mealType, diningHall, url, selectedFoods)
        .then((rows) => {
          setRows(rows);
          // Ensure setCols is called right after setRows in the promise chain
        })
        .then(() =>
          setCols(
            getHallColumns(
              isSmallScreen,
              selectedFoods,
              setSelectedFoods,
              mealType,
              diningHall
            )
          )
        )
        .catch(console.error);
    }
  }, [
    mealType,
    diningHall,
    isSmallScreen,
    url,
    selectedFoods,
    setSelectedFoods,
  ]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <NavBar />
        <div className="title-main">
          <h1>Compare UChicago Dinning Halls</h1>
        </div>
        <StyledToggleButton mealType={mealType} setMealType={setMealType} />
        <ComparisonGrid
          rows={rows}
          columns={cols}
          diningHall={diningHall}
          setDiningHall={setDiningHall}
        />
      </ThemeProvider>
    </>
  );
}

export default Landing;
