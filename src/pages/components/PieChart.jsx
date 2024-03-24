import * as React from "react";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";

const size = {
  width: 400,
  height: 200,
};

function calculatePercentage(macro, total) {
  // Calculate the percentage
  let percentage = (macro / total) * 100;

  return parseFloat(percentage.toFixed(1));
}

export default function PieArcLabel({ fat, protein, carbs }) {
  const total = fat + protein + carbs;

  const data = [
    { id: 0, value: calculatePercentage(fat, total), label: "Fat" },
    { id: 1, value: calculatePercentage(protein, total), label: "Protein" },
    { id: 2, value: calculatePercentage(carbs, total), label: "Carbs" },
  ];

  return (
    <PieChart
      series={[
        {
          arcLabel: (item) => `${item.value}%`,
          arcLabelMinAngle: 45,
          data,
        },
      ]}
      sx={{
        [`& .${pieArcLabelClasses.root}`]: {
          fill: "white",
          fontWeight: "bold",
        },
      }}
      {...size}
    />
  );
}
