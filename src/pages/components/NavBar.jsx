import React from "react";
import { useNavigate } from "react-router-dom";

function NavBar() {
  let navigate = useNavigate();
  const redirectToAnotherPage = (nextPage) => {
    navigate(nextPage);
  };

  return (
    <>
      <div className="maroon-bar">
        <button onClick={() => redirectToAnotherPage("/landing")}>Home</button>
        <button onClick={() => redirectToAnotherPage("/macros")}>Macros</button>
        <button onClick={() => redirectToAnotherPage("/predict")}>
          Predict
        </button>
      </div>
    </>
  );
}

export default NavBar;
