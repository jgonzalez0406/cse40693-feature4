import {
  html,
  render,
} from "https://unpkg.com/htm/preact/standalone.module.js";
import { AddExpenseForm } from "./AddExpenseForm.js"; // Importing the child components

const expenseForm = () =>
  function App() {
    function handleAddExpense() {
      alert("Expense submitted");
    }

    return html`<h1>Add a New Expense</h1>
      <p>Please fill out the details below.</p>
      <hr />
      <${AddExpenseForm} onAddExpense=${handleAddExpense} />`;
  };

export default expenseForm;
