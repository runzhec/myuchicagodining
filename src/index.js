// Adjust the import statements to include AppWrapper
import React from "react";
import ReactDOM from "react-dom/client";
import AppWrapper from "./AppWrapper"; // Import AppWrapper
import "./assets/index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AppWrapper /> {/* Use AppWrapper here */}
  </React.StrictMode>
);
