import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";

export default function BasicBars({
  fat,
  protein,
  carbs,
  idealFat,
  idealProtein,
  idealCarbs,
}) {
  const chartSettings = {
    width: 500,
    height: 300,
  };

  return (
    <div style={{ marginTop: "100px" }}>
      <BarChart
        xAxis={[
          {
            scaleType: "band",
            data: ["Protein", "Fat", "Carbs"],
            label: "All units in (g)",
          },
        ]}
        series={[
          { data: [protein, fat, carbs], label: "Current" },
          { data: [idealProtein, idealFat, idealCarbs], label: "Ideal" },
        ]}
        {...chartSettings}
      />
    </div>
  );
}
