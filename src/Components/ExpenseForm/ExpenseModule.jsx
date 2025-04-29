import React, { useContext } from "react";
import ExpenseForm from "./ExpenseForm.jsx";
import { ThemeContext } from "../../App";

/* MAIN MODULE WITH STATEFUL PARENT AND STATELESS CHILD */
const ExpenseModule = () => {
  const { theme } = useContext(ThemeContext);

  // For dark mode: use Bootstrap's bg-dark + white text
  // For light mode: use bg-light (light gray) + dark text
  const cardClasses = `card shadow-sm ${
    theme === "dark" ? "bg-dark text-white" : "bg-light text-dark"
  }`;

  return (
    <div className="container my-5">
      <div className={cardClasses}>
        <div className="card-header">
          <h4 className="mb-0">Add &amp; View Expenses</h4>
        </div>
        <div className="card-body">
          <ExpenseForm />
        </div>
      </div>
    </div>
  );
};

export default ExpenseModule;
