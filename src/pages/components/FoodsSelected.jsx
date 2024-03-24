import { DataGrid } from "@mui/x-data-grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";

export default function SelectedGrid({ rows = [], columns }) {
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
    <div className="selected-grid">
      {" "}
      {/* Ensure this div has the class applied */}
      <ThemeProvider theme={theme}>
        <DataGrid
          rows={rows}
          columns={columns}
          getRowHeight={() => "auto"}
          sx={{
            height: 1, // This makes DataGrid take the full height of its parent div
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
