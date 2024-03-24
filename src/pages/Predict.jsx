import React, { useState } from "react";
import NavBar from "./components/NavBar.jsx";
import uniqueMeals from "./utils/uniqueMealsArray.js";
import { useTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import FutureGrid from "./components/FutureGrid.jsx";
import fetchFutureAvailability from "./utils/predictPopulateGrid.js";

export default function Predict() {
  const [searchTerm, setSearchTerm] = useState("");
  const [availability, setAvailability] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(true); // control the visibility of search results

  const theme = useTheme();

  const columns = [
    {
      field: "date",
      headerName: "Date",
      width: 140,
      valueGetter: (params) => {
        // formatting date column
        const date = new Date(params.value);
        return date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "2-digit",
        });
      },
    },
    {
      field: "diningHall",
      headerName: "Dining Hall",
      width: 150,
    },
    {
      field: "mealTime",
      headerName: "Meal Time",
      width: 130,
    },
    {
      field: "food",
      headerName: "Food",
      width: 200,
    },
  ];

  const handleSearchSelect = async (food) => {
    setSearchTerm("");
    setShowSearchResults(false);
    const data = await fetchFutureAvailability(food);
    setAvailability(data); // Populate the grid with fetched data
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value.trim() === "") {
      setAvailability([]);
    }
    setShowSearchResults(true); // Show search results while typing
  };

  return (
    <ThemeProvider theme={theme}>
      <NavBar />
      <div style={{ padding: "20px" }}>
        <div className="title-main">
          <h1>Future Food Availability Search</h1>
        </div>
        <input
          type="text"
          placeholder="Search for foods..."
          value={searchTerm}
          onChange={handleSearchChange}
          onFocus={() => setShowSearchResults(true)}
          style={{
            margin: "10px 0",
            padding: "10px",
            width: "calc(100% - 20px)",
          }}
        />
        {searchTerm && showSearchResults && (
          <List>
            {uniqueMeals
              .filter((meal) =>
                meal.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((meal, index) => (
                <ListItem disablePadding key={index}>
                  <ListItemButton onClick={() => handleSearchSelect(meal)}>
                    <ListItemText primary={meal} />
                  </ListItemButton>
                </ListItem>
              ))}
          </List>
        )}
        {availability.length > 0 && ( // Only show the FutureGrid if there are items in the availability array
          <FutureGrid rows={availability} columns={columns} />
        )}
      </div>
    </ThemeProvider>
  );
}
