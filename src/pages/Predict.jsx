import React, { useState } from "react";
import NavBar from "./components/NavBar.jsx";
import uniqueMeals from "./utils/uniqueMealsArray.js";
import { useTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import FutureGrid from "./components/FutureGrid.jsx";
import fetchFutureAvailability from "./utils/predictPopulateGrid.js";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

function CircularIndeterminate() {
  return (
    <Box sx={{ display: "flex", marginTop: "200px" }}>
      <CircularProgress />
    </Box>
  );
}

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
    //if (e.target.value.trim() === "") {
    setAvailability([]);
    //}
    setShowSearchResults(true); // Show search results while typing
  };

  return (
    <ThemeProvider theme={theme}>
      <NavBar />
      <div style={{ padding: "20px" }}>
        <div className="title-main">
          <h1>Future Food Availability Search</h1>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <TextField
            id="outlined-search"
            label="Search for foods..."
            type="search"
            variant="outlined"
            value={searchTerm}
            onChange={handleSearchChange}
            onFocus={() => setShowSearchResults(true)}
            style={{
              width: "40%",
              minWidth: "350px",
              borderRadius: "20px",
              fontFamily: "Nunito, sans-serif",
            }}
            InputProps={{
              style: {
                borderRadius: "20px",
                fontFamily: "Nunito, sans-serif",
              },
            }}
            InputLabelProps={{
              style: {
                fontFamily: "Nunito, sans-serif",
              },
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          {searchTerm && showSearchResults && (
            <Paper
              style={{
                maxHeight: 400,
                overflow: "auto",
                padding: "10px",
                borderRadius: "20px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                width: "45%",
                minWidth: "350px",
              }}
            >
              <List dense component="nav" aria-label="search results">
                {uniqueMeals
                  .filter((meal) =>
                    meal.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((meal, index) => (
                    <ListItem disablePadding key={index}>
                      <ListItemButton onClick={() => handleSearchSelect(meal)}>
                        <ListItemText
                          primary={meal}
                          primaryTypographyProps={{
                            style: { fontFamily: "Nunito, sans-serif" },
                          }}
                        />
                      </ListItemButton>
                    </ListItem>
                  ))}
              </List>
            </Paper>
          )}
          {!searchTerm &&
            !showSearchResults &&
            (availability.length > 0 ? (
              <FutureGrid rows={availability} columns={columns} />
            ) : (
              <CircularIndeterminate />
            ))}
        </div>
      </div>
    </ThemeProvider>
  );
}
