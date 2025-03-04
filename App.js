import {
  html,
  render,
} from "https://unpkg.com/htm/preact/standalone.module.js";
import { AddExpenseForm } from "./Components/ExpenseForm/AddExpenseForm.js"; // Importing the child components
import Navbar from "./Components/Navigation/NavBar.js";
import expenseForm from "./Components/ExpenseForm/ExpenseForm.js";

// App Component
function App() {
  return html`
    <div>
      <${Navbar} />
      <${expenseForm()}< />
    </div>
  `;
}

// Render the App
render(html`<${App} />`, document.getElementById("app"));
