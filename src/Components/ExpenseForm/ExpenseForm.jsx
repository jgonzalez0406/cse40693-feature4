import React, { useState, useEffect } from 'react';
import AddExpenseForm from './AddExpenseForm';
import { getAllExpenses } from '../../Common/Services/ExpenseTypeService'; // Import the function to get expenses


// Parent component that renders the AddExpenseForm and a list of expenses
export default function ExpenseForm() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    getAllExpenses()
      .then((data) => {
        console.log('Fetched expenses:', data);
        setExpenses(data);
      })
      .catch((err) => console.error('Error fetching expenses:', err));
  }, []);

  const handleAddExpense = (newExpense) => {
    setExpenses((prev) => [...prev, newExpense]);
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Add a New Expense</h1>
      <AddExpenseForm onAddExpense={handleAddExpense} />

      <h2 className="mt-5 mb-3">Expense List</h2>
      <div className="table-responsive">
        <table className="table table-striped table-hover align-middle mb-0">
          <thead className="table-light">
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th className="text-end">Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((exp) => (
              <tr key={exp.id}>
                <td>{exp.get('name')}</td>
                <td>{exp.get('category')?.get('name') || 'N/A'}</td>
                <td className="text-end">${exp.get('amount')}</td>
                <td>{exp.get('date')?.toLocaleDateString() || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
