import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "Nunito, sans-serif",
  },
});

const StyledToggleButtonGroup = styled(ToggleButtonGroup)({
  backgroundColor: "#f1f3fa",
  borderRadius: "20px",
});

const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
  "&.MuiToggleButton-root": {
    borderRadius: "18px",
    border: "none",
    color: "#313a46",
    padding: "3px 18px",
    fontSize: "0.9375rem",
    textTransform: "none",
    fontWeight: 700,
    "&.Mui-selected": {
      color: "#fff",
      backgroundColor: "maroon",
    },
  },
}));

function ToggleSearchModeButton({ mealType, setMealType }) {
  const [alignment, setAlignment] = useState(mealType);

  const handleAlignment = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
      setMealType(newAlignment);
    }
  };

  return (
    <div className="button-group">
      <ThemeProvider theme={theme}>
        <StyledToggleButtonGroup
          size="small"
          value={alignment}
          exclusive
          onChange={handleAlignment}
          aria-label="text alignment"
        >
          <StyledToggleButton value={"breakfast"} aria-label="centered">
            Breakfast
          </StyledToggleButton>
          <StyledToggleButton value={"lunch"} aria-label="centered">
            Lunch
          </StyledToggleButton>
          <StyledToggleButton value={"dinner"} aria-label="centered">
            Dinner
          </StyledToggleButton>
        </StyledToggleButtonGroup>
      </ThemeProvider>
    </div>
  );
}

export default ToggleSearchModeButton;
