// src/Components/ExpenseForm/AddExpenseForm.jsx
import React, { useState, useContext } from 'react';
import { createExpense } from '../../Common/Services/ExpenseTypeService';
import { ThemeContext } from '../../App';

function AddExpenseForm({ onAddExpense }) {
  const { theme } = useContext(ThemeContext);
  const [expense, setExpense] = useState({
    name: '',
    date: '',
    category: '',
    amount: '',
  });

  // Compute classes based on theme
  const baseInputClass = 'form-control mb-2';
  const inputClass =
    theme === 'dark'
      ? `${baseInputClass} bg-dark text-white border-secondary`
      : baseInputClass;
  const baseSelectClass = 'form-select mb-2';
  const selectClass =
    theme === 'dark'
      ? `${baseSelectClass} bg-dark text-white border-secondary`
      : baseSelectClass;
  const buttonClass =
    theme === 'dark' ? 'btn btn-outline-light' : 'btn btn-primary';

  // Toggle form background via the expense-form class
  const formBgClass =
    theme === 'dark'
      ? 'expense-form p-4 rounded bg-secondary bg-opacity-25'
      : 'expense-form p-4 rounded bg-white';

  const handleChange = (e) =>
    setExpense({ ...expense, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newExpense = await createExpense(expense);
      onAddExpense(newExpense);
      setExpense({ name: '', date: '', category: '', amount: '' });
    } catch (error) {
      console.error('Error creating expense:', error);
    }
  };

  return (
    <div className={`container mt-4 ${theme === 'dark' ? 'text-white' : ''}`}>
      {/* Removed duplicate heading here */}

      <form className={formBgClass} onSubmit={handleSubmit}>
        <label className="form-label">Expense Name</label>
        <input
          type="text"
          name="name"
          value={expense.name}
          onChange={handleChange}
          required
          className={inputClass}
        />

        <label className="form-label">Date</label>
        <input
          type="date"
          name="date"
          value={expense.date}
          onChange={handleChange}
          required
          className={inputClass}
        />

        <label className="form-label">Category</label>
        <select
          name="category"
          value={expense.category}
          onChange={handleChange}
          required
          className={selectClass}
        >
          <option value="">Select Category</option>
          <option value="Groceries">Groceries</option>
          <option value="Utilities">Utilities</option>
          <option value="Rent/Mortgage">Rent/Mortgage</option>
          <option value="Subscriptions">Subscriptions</option>
          <option value="Others">Others</option>
        </select>

        <label className="form-label">Amount</label>
        <input
          type="number"
          name="amount"
          step="0.01"
          value={expense.amount}
          onChange={handleChange}
          required
          className={inputClass}
        />

        <div className="d-grid mt-3">
          <button type="submit" className={buttonClass}>
            Add Expense
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddExpenseForm;
