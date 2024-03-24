// In a new file, e.g., AppWrapper.js
import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Macros from "./pages/Macros";
import Predict from "./pages/Predict";

function AppWrapper() {
  const [selectedFoods, setSelectedFoods] = useState({});

  return (
    <BrowserRouter>
      <Routes>
        <Route
          index
          element={
            <Landing
              selectedFoods={selectedFoods}
              setSelectedFoods={setSelectedFoods}
            />
          }
        />
        <Route
          path="/landing"
          element={
            <Landing
              selectedFoods={selectedFoods}
              setSelectedFoods={setSelectedFoods}
            />
          }
        />
        <Route
          path="/macros"
          element={
            <Macros
              selectedFoods={selectedFoods}
              setSelectedFoods={setSelectedFoods}
            />
          }
        />
        <Route path="/predict" element={<Predict />} />
        <Route
          path="*"
          element={
            <Landing
              selectedFoods={selectedFoods}
              setSelectedFoods={setSelectedFoods}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppWrapper;
