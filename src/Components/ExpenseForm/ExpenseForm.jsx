import React, { useState, useEffect, useContext } from 'react';
import AddExpenseForm from './AddExpenseForm';
import { getAllExpenses } from '../../Common/Services/ExpenseTypeService';
import { ThemeContext } from '../../App';

export default function ExpenseForm() {
  const [expenses, setExpenses] = useState([]);

  // Filter states
  const [filterCategory, setFilterCategory] = useState('');
  const [filterMinAmt, setFilterMinAmt] = useState('');
  const [filterMaxAmt, setFilterMaxAmt] = useState('');
  const [filterDate, setFilterDate] = useState('');

  // Theme
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    getAllExpenses()
      .then((data) => setExpenses(data))
      .catch((err) => console.error('Error fetching expenses:', err));
  }, []);

  const handleAddExpense = (newExpense) =>
    setExpenses((prev) => [...prev, newExpense]);

  // Build unique category list for the datalist
  const categoryOptions = Array.from(
    new Set(
      expenses
        .map((e) => e.get('category')?.get('name'))
        .filter(Boolean)
    )
  );

  // Apply filters to the expenses array
  const filteredExpenses = expenses
    .filter((e) => {
      const cat = e.get('category')?.get('name') || '';
      return !filterCategory || cat === filterCategory;
    })
    .filter((e) => {
      const amt = Number(e.get('amount'));
      return (
        (!filterMinAmt || amt >= Number(filterMinAmt)) &&
        (!filterMaxAmt || amt <= Number(filterMaxAmt))
      );
    })
    .filter((e) => {
      if (!filterDate) return true;
      const expDate = e.get('date')?.toISOString().slice(0, 10);
      return expDate >= filterDate;
    });

  // Helpers for input classes in dark mode
  const inputClass = theme === 'dark'
    ? 'form-control bg-dark text-white border-secondary'
    : 'form-control';

  return (
    <div className={`container mt-4 ${theme === 'dark' ? 'text-white' : ''}`}>
      <h1 className="mb-4">Add a New Expense</h1>
      <AddExpenseForm onAddExpense={handleAddExpense} />

      {/* ——— Filter Bar ——— */}
      <div className="row g-2 mb-4 align-items-end">
        <div className="col-md-3">
          <label className="form-label">Category</label>
          <input
            list="category-list"
            className={inputClass}
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            placeholder="All"
          />
          <datalist id="category-list">
            {categoryOptions.map((cat) => (
              <option key={cat} value={cat} />
            ))}
          </datalist>
        </div>

        <div className="col-md-3">
          <label className="form-label">Min Amount</label>
          <input
            type="number"
            className={inputClass}
            value={filterMinAmt}
            onChange={(e) => setFilterMinAmt(e.target.value)}
            placeholder="0"
            min="0"
          />
        </div>

        <div className="col-md-3">
          <label className="form-label">Max Amount</label>
          <input
            type="number"
            className={inputClass}
            value={filterMaxAmt}
            onChange={(e) => setFilterMaxAmt(e.target.value)}
            placeholder="Any"
            min="0"
          />
        </div>

        <div className="col-md-3">
          <label className="form-label">Date On/After</label>
          <input
            type="date"
            className={inputClass}
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
          />
        </div>
      </div>

      {/* ——— Expense List Table ——— */}
      <h2 className="mb-3">Expense List</h2>
      <div className="table-responsive">
        <table
          className={`table align-middle mb-0 ${
            theme === 'dark'
              ? 'table-dark'
              : 'table-light table-striped table-hover'
          }`}
        >
          <thead className="table-light">
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th className="text-end">Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredExpenses.map((exp) => (
              <tr key={exp.id}>
                <td>{exp.get('name')}</td>
                <td>{exp.get('category')?.get('name') || 'N/A'}</td>
                <td className="text-end">${exp.get('amount')}</td>
                <td>
                  {exp.get('date')
                    ? exp.get('date').toLocaleDateString()
                    : 'N/A'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
