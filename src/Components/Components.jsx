import React from "react";
import ExpenseModule from "./ExpenseForm/ExpenseModule.jsx";
import NavBar from "./Navigation/NavBar.jsx";

const Components = () => {
  return (
    <div>
      <NavBar/>
      <ExpenseModule />
    </div>
  );
};

export default Components;