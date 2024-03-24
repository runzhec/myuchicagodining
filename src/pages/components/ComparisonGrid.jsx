import {
  DataGrid,
  GridToolbarQuickFilter,
  GridToolbarContainer,
} from "@mui/x-data-grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Select, MenuItem, Typography, Box } from "@mui/material";

function CustomToolbar({ diningHall, setDiningHall }) {
  const changeDiningHall = (changed) => {
    setDiningHall(changed.target.value);
  };

  const diningHalls = ["All", "Baker", "Woodlawn", "Cathey", "Bartlett"];
  const buttonStyling = {
    marginRight: "10px",
    "& .MuiFormControlLabel-label": {
      fontFamily: "Nunito, sans-serif",
    },
  };

  return (
    <GridToolbarContainer
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 2,
      }}
    >
      {/* Dropdown menu */}
      <Box>
        <Typography
          sx={{
            fontFamily: "Nunito, sans-serif",
            display: "inline",
            fontSize: "0.9rem",
          }}
        >
          Select Dining Hall:
        </Typography>
        <Select
          defaultValue={diningHall}
          onChange={changeDiningHall}
          size="small"
          variant="outlined"
          sx={{
            width: 150,
            height: 35,
            marginLeft: 2,
            marginRight: 2,
            fontFamily: "Nunito, sans-serif",
            "& .MuiOutlinedInput-input": {
              fontFamily: "Nunito, sans-serif",
              fontSize: "0.9rem",
            },
            "& .MuiSelect-select": {
              fontFamily: "Nunito, sans-serif",
              fontSize: "0.9rem",
            },
          }}
        >
          {diningHalls.map((val) => (
            <MenuItem
              key={val}
              value={val}
              sx={{ fontFamily: "Nunito, sans-serif", fontSize: "0.9rem" }}
            >
              {val}
            </MenuItem>
          ))}
        </Select>
      </Box>
      <Box>
        <div>
          <GridToolbarQuickFilter
            sx={{
              ...buttonStyling,
              "& .MuiInputBase-input": {
                fontFamily: "Nunito, sans-serif",
                fontSize: "0.9rem",
                color: "#838c96",
              },
            }}
          />
        </div>
      </Box>
    </GridToolbarContainer>
  );
}

export default function ComparisonGrid({
  rows = [],
  columns,
  diningHall,
  setDiningHall,
}) {
  const theme = createTheme({
    typography: {
      fontFamily: "Nunito, sans-serif",
    },
    components: {
      MuiDataGrid: {
        styleOverrides: {
          root: {
            fontFamily: "Nunito, sans-serif",
          },
        },
      },
    },
  });

  return (
    <div className="comparison-grid">
      <ThemeProvider theme={theme}>
        <DataGrid
          rows={rows}
          columns={columns}
          getRowHeight={() => "auto"}
          components={{
            Toolbar: CustomToolbar,
          }}
          componentsProps={{
            toolbar: {
              diningHall,
              setDiningHall,
            },
          }}
          sx={{
            "&.MuiDataGrid-root--densityStandard .MuiDataGrid-cell": {
              py: "22px",
            },

            "& .MuiDataGrid-columnHeaderTitle": {
              fontWeight: "bold",
            },
            fontSize: "0.9rem",
            fontWeight: "400",
            color: "#838c96",
          }}
          initialState={{
            pagination: { pageSize: 100 },
          }}
          pageSize={100}
          pageSizeOptions={[100]}
        />
      </ThemeProvider>
    </div>
  );
}
