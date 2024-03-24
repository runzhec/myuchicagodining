import NavBar from "./components/NavBar.jsx";
import SelectedGrid from "./components/FoodsSelected.jsx";
import {
  getSelectedRows,
  getSelectedColumns,
} from "./utils/selectedPopulateGrid.js";
import { useState, useEffect } from "react";
import InputFieldGroup from "./components/InputFieldGroup.jsx";
import getMacroData from "./utils/getMacroData.js";
import Pie from "./components/PieChart";
import Bars from "./components/BarChart.jsx";

function calculateNutrientIntake(age, weight, heightFt, heightIn, sex) {
  let height = heightFt * 12 + heightIn;

  weight = weight * 0.453592;
  height = height * 2.54;

  // Calculate Basal Metabolic Rate (BMR) using the Mifflin-St Jeor Equation
  let BMR =
    sex === "Male"
      ? 10 * weight + 6.25 * height - 5 * age + 5
      : 10 * weight + 6.25 * height - 5 * age - 161;

  // Assume a moderate activity level with a multiplier of 1.55 for Total Daily Energy Expenditure (TDEE)
  let calories = Math.round(BMR * 1.55);

  let proteinPercent = 0.15; // Averaging recommended range to 15% of total calories
  let fatPercent = 0.3; // Middle of the recommended range for fat
  let carbsPercent = 1 - (proteinPercent + fatPercent); // Remainder for carbohydrates

  let proteinCalories = Math.round(calories * proteinPercent);
  let fatCalories = Math.round(calories * fatPercent);
  let carbCalories = Math.round(calories * carbsPercent);

  let proteinGrams = Math.round(proteinCalories / 4); // 4 calories per gram of protein
  let fatGrams = Math.round(fatCalories / 9); // 9 calories per gram of fat
  let carbGrams = Math.round(carbCalories / 4); // 4 calories per gram of carbohydrates

  return {
    calories: calories,
    protein: proteinGrams,
    fat: fatGrams,
    carbs: carbGrams,
  };
}

function TotalMacrosDisplay({ macro, quant, units }) {
  return (
    <div class="circular-div">
      Total {macro}: {quant}
      {units}
    </div>
  );
}

export default function Macros({ selectedFoods, setSelectedFoods }) {
  const cols = getSelectedColumns(setSelectedFoods);
  const [rows, updateRows] = useState(getSelectedRows(selectedFoods));

  useEffect(() => {
    updateRows(getSelectedRows(selectedFoods));
  }, [selectedFoods]);

  const [totalMacros, setTotalMacros] = useState(getMacroData(selectedFoods));
  const [sex, setSex] = useState("Male");
  const [weight, setWeight] = useState(160);
  const [heightFt, setHeightFt] = useState(5);
  const [heightIn, setHeightIn] = useState(10);
  const [showStats, setShowStats] = useState(true);

  const [idealMacros, setIdealMacros] = useState(
    calculateNutrientIntake(20, weight, heightFt, heightIn, sex)
  );

  useEffect(() => {
    setTotalMacros(getMacroData(selectedFoods));
  }, [selectedFoods]);

  useEffect(() => {
    setIdealMacros(
      calculateNutrientIntake(20, weight, heightFt, heightIn, sex)
    );
  }, [weight, heightFt, heightIn, sex]);

  return (
    <>
      <NavBar />
      <div className="title-main">
        <h1>My Macros</h1>
      </div>
      {showStats && (
        <>
          <div className="title-main">
            <button onClick={() => setShowStats(false)}>Submit</button>
          </div>
          <div className="title-main">
            <InputFieldGroup
              sex={sex}
              setSex={setSex}
              weight={weight}
              setWeight={setWeight}
              heightFt={heightFt}
              setHeightFt={setHeightFt}
              heightIn={heightIn}
              setHeightIn={setHeightIn}
            />
          </div>
        </>
      )}
      {!showStats && (
        <>
          <div
            className="responsive-container"
            style={{ marginBottom: "40px" }}
          >
            <TotalMacrosDisplay
              macro={"Calories"}
              quant={totalMacros["calories"]}
            />
            <TotalMacrosDisplay
              macro={"Protein"}
              quant={totalMacros["protein"]}
              units={"g"}
            />
            <TotalMacrosDisplay
              macro={"Fat"}
              quant={totalMacros["fat"]}
              units={"g"}
            />
            <TotalMacrosDisplay
              macro={"Carbs"}
              quant={totalMacros["carbs"]}
              units={"g"}
            />
          </div>
          <div className="responsive-container">
            {rows.length > 0 && (
              <div>
                <SelectedGrid rows={rows} columns={cols} />
              </div>
            )}
            <div>
              {rows.length > 0 && (
                <Pie
                  fat={totalMacros["fat"]}
                  protein={totalMacros["protein"]}
                  carbs={totalMacros["carbs"]}
                />
              )}
              {rows.length === 0 && (
                <div className="title-main">
                  <h3 style={{ textAlign: "center" }}>
                    Please make food selections in home page to see your macros
                  </h3>
                </div>
              )}
              <Bars
                fat={totalMacros["fat"]}
                protein={totalMacros["protein"]}
                carbs={totalMacros["carbs"]}
                idealFat={idealMacros["fat"]}
                idealProtein={idealMacros["protein"]}
                idealCarbs={idealMacros["carbs"]}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
}
