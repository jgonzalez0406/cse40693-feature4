import React from "react";
import ExpenseForm from "./ExpenseForm.jsx";

/* MAIN MODULE WITH STATEFUL PARENT AND STATELESS CHILD */
const ExpenseModule = () => (
  <div className="container my-5">
    <div className="card shadow-sm">
      <div className="card-header">
        <h4 className="mb-0">Add &amp; View Expenses</h4>
      </div>
      <div className="card-body">
        <ExpenseForm />
      </div>
    </div>
  </div>
);

export default ExpenseModule;

