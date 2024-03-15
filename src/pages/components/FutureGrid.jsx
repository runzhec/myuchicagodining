import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';

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

export default function FutureGrid({ rows, columns }) {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <div className="future-grid">
        <ThemeProvider theme={theme}>
            <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            autoHeight
            getRowId={(row) => row.id}
            sx={{
                "&.MuiDataGrid-root--densityCompact .MuiDataGrid-cell": {
                  py: "15px",
                },
                "&.MuiDataGrid-root--densityStandard .MuiDataGrid-cell": {
                  py: "22px",
                },
                "&.MuiDataGrid-root--densityComfortable .MuiDataGrid-cell": {
                  py: "26px",
                },
                "& .MuiDataGrid-columnHeaderTitle": {
                  fontWeight: "bold",
                },
                fontSize: "0.9rem",
                fontWeight: "400",
                color: "#838c96",
              }}
            />
        </ThemeProvider>
      </div>
    </div>
  );
}
