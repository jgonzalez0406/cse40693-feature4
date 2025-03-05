import React, { useState } from 'react';
import { createExpense } from '../../src/Common/Services/ExpenseTypeService'; // Import the createExpense function

function AddExpenseForm({ onAddExpense }) {
  const [expense, setExpense] = useState({
    name: '',
    date: '',
    category: '',
    amount: '',
  });

  const handleChange = (e) => {
    setExpense({ ...expense, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the page from reloading
    
    try {
      // Call createExpense and await the result
      const newExpense = await createExpense(expense);

      // Once the expense is created, pass it to the parent
      onAddExpense(newExpense);
  
      // Clear the form fields after successful submission
      setExpense({
        name: "",
        date: "",
        category: "",
        amount: "",
      });
    } catch (error) {
      console.error("Error creating expense:", error);
    }
  };
  

  return (
    <form class="expense-form" onSubmit={handleSubmit}>
      <label>Expense Name</label>
      <input
        type="text"
        name="name"
        value={expense.name}
        onChange={handleChange}
        required
      />
      <label>Date</label>
      <input
        type="date"
        name="date"
        value={expense.date}
        onChange={handleChange}
        required
      />
      <label>Category</label>
      <select
        name="category"
        value={expense.category}
        onChange={handleChange}
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
        value={expense.amount}
        onChange={handleChange}
        required
      />
      <button type="submit">Add Expense</button>
    </form>
  );
}

export default AddExpenseForm;
