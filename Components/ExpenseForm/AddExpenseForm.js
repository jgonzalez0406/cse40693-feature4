// Import Preact
import {
  html,
  useState,
} from "https://unpkg.com/htm/preact/standalone.module.js";

// Expense Form Component
export function AddExpenseForm({ onAddExpense }) {
  const [expense, setExpense] = useState({
    name: "",
    date: "",
    category: "",
    amount: "",
  });

  // Defines function handleChange
  // This takes in an event and updates the expense useState
  // Accesses each property of the expense object based on the input fields
  // In this case: name, date, category, amount
  const handleChange = (e) => {
    setExpense({ ...expense, [e.target.name]: e.target.value });
  };

  // Defines function handleSubmit
  // This takes in an event and will push an alert when the submit button is pressed
  const handleSubmit = (e) => {
    e.preventDefault(); // prevents the page from reloading
    onAddExpense(expense); // Sends expense up to parent
  };

  return html`
    <form class="expense-form" onSubmit=${handleSubmit}>
      <label>Expense Name</label>
      <input
        type="text"
        name="name"
        value=${expense.name}
        onInput=${handleChange}
        required
      />

      <label>Date</label>
      <input
        type="date"
        name="date"
        value=${expense.date}
        onInput=${handleChange}
        required
      />

      <label>Category</label>
      <select
        name="category"
        value=${expense.category}
        onChange=${handleChange}
        required
      >
        <option value="">Select Category</option>
        <option value="Groceries">Groceries</option>
        <option value="Utilities">Utilities</option>
        <option value="Rent/Mortgage">Rent/Mortgage</option>
        <option value="Subscriptions">Subscriptions</option>
        <option value="Others">Others</option>
      </select>

      <label>Amount</label>
      <input
        type="number"
        name="amount"
        step="0.01"
        value=${expense.amount}
        onInput=${handleChange}
        required
      />

      <button type="submit">Add Expense</button>
    </form>
  `;
}
