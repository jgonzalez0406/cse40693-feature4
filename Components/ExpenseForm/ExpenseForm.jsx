import React, { useState, useEffect } from 'react';
import AddExpenseForm from './AddExpenseForm';
import { getAllExpenses } from '../../src/Common/Services/ExpenseTypeService'; // Import the function to get expenses

function App() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    getAllExpenses()
      .then((expenses) => {
        console.log('Fetched expenses:', expenses);  // Log the expenses data
        setExpenses(expenses);
      })
      .catch((error) => console.error('Error fetching expenses:', error));
  }, []);
  

  const handleAddExpense = (newExpense) => {
    setExpenses((prevExpenses) => [...prevExpenses, newExpense]); // Add the new expense to the list
  };

  return (
    <div>
      <h1>Add a New Expense</h1>
      <AddExpenseForm onAddExpense={handleAddExpense} /> {/* Pass handler to child */}
      <h2>Expense List</h2>
      <ul>
      {expenses.map((expense) => (
        <li key={expense.id}>
          {expense.get('name')} - {expense.get('category') ? expense.get('category').get('name') : 'N/A'} - ${expense.get('amount')} on {expense.get('date') ? expense.get('date').toLocaleDateString() : 'N/A'}
        </li>
      ))}
    </ul>
    </div>
  );
}

export default App;
