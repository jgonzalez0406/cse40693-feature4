// src/Components/Dashboard/Summary.jsx
import React, { useState, useEffect, useContext } from 'react';
import { getAllExpenses } from '../../Common/Services/ExpenseTypeService'; // Import the function to get expenses
import { ThemeContext } from '../../App';                              // Import ThemeContext for dark/light mode

function Summary() {
  // Get current theme ("light" or "dark") and toggle function from context
  const { theme } = useContext(ThemeContext);

  const [thisMonthExpenses, setThisMonthExpenses] = useState([]);
  const [lastMonthExpenses, setLastMonthExpenses] = useState([]);
  const [totalSpentEver, setTotalSpentEver] = useState(0);
  const [summaryText, setSummaryText] = useState("");
  const [categorySummary, setCategorySummary] = useState({});
  const [lifetimeCategorySummary, setLifetimeCategorySummary] = useState({});

  // Determine current and last month/year for filtering
  const currentDate   = new Date();
  const thisMonth     = currentDate.getMonth();
  const thisYear      = currentDate.getFullYear();
  const lastMonthDate = new Date(currentDate);
  lastMonthDate.setMonth(thisMonth - 1);
  const lastMonth = lastMonthDate.getMonth();
  const lastYear  = lastMonthDate.getFullYear();

  // Format for display, e.g. "April 2025"
  const formattedThisMonth = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });
  const formattedLastMonth = lastMonthDate.toLocaleString('default', { month: 'long', year: 'numeric' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all expenses
        const expenses = await getAllExpenses();

        // Calculate lifetime total
        const total = expenses.reduce((sum, e) => sum + Number(e.get('amount')), 0);
        setTotalSpentEver(total);

        // Build lifetime category summary
        const lifeCat = {};
        expenses.forEach(e => {
          const name = e.get('category')?.get('name') || 'Unknown';
          lifeCat[name] = (lifeCat[name] || 0) + Number(e.get('amount'));
        });
        setLifetimeCategorySummary(lifeCat);

        // Filter expenses into this month and last month arrays
        const thisArr = [], lastArr = [];
        expenses.forEach(e => {
          const d = new Date(e.get('date'));
          if (d.getMonth() === thisMonth && d.getFullYear() === thisYear) {
            thisArr.push(e);
          } else if (d.getMonth() === lastMonth && d.getFullYear() === lastYear) {
            lastArr.push(e);
          }
        });
        setThisMonthExpenses(thisArr);
        setLastMonthExpenses(lastArr);

        // Build category summary for this month
        const monthCat = {};
        thisArr.forEach(e => {
          const name = e.get('category')?.get('name') || 'Unknown';
          monthCat[name] = (monthCat[name] || 0) + Number(e.get('amount'));
        });
        setCategorySummary(monthCat);

        // Compute summary text comparing this month vs last month spending
        const thisTotal = thisArr.reduce((sum, e) => sum + Number(e.get('amount')), 0);
        const lastTotal = lastArr.reduce((sum, e) => sum + Number(e.get('amount')), 0);
        const diff = thisTotal - lastTotal;
        const moreOrLess = diff >= 0 ? 'more' : 'less';
        const diffAmt = Math.abs(diff).toFixed(2);
        setSummaryText(`You spent $${diffAmt} ${moreOrLess} than ${formattedLastMonth}.`);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [thisMonth, thisYear, lastMonth, lastYear, formattedLastMonth]);

  // Determine list-group-item classes based on theme
  const liClass = theme === 'dark'
    ? 'list-group-item bg-dark text-white border-secondary'
    : 'list-group-item bg-light';

  return (
    <div className="container my-4">
      {/* Card background and text toggle for dark/light mode */}
      <div className={`card shadow-sm ${
        theme === 'dark'
          ? 'bg-secondary text-white'
          : 'bg-light text-dark'
      }`}>
        <div className="card-body">
          <h4>Lifetime Spending</h4>
          <p>Total spent: ${totalSpentEver.toFixed(2)}</p>
          <p>Category breakdown:</p>
          {/* Lifetime breakdown list with theme-based styling */}
          <ul className="list-group mb-4">
            {Object.entries(lifetimeCategorySummary).map(([category, amount]) => (
              <li key={category} className={liClass}>
                {category}: ${amount.toFixed(2)}
              </li>
            ))}
          </ul>

          <h4>Summary for {formattedThisMonth}</h4>
          <p>
            Total spent: ${thisMonthExpenses
              .reduce((sum, e) => sum + Number(e.get('amount')), 0)
              .toFixed(2)}
          </p>
          <p>{summaryText}</p>
          <p>Category breakdown:</p>
          {/* This month breakdown list */}
          <ul className="list-group mb-4">
            {Object.entries(categorySummary).map(([category, amount]) => (
              <li key={category} className={liClass}>
                {category}: ${amount.toFixed(2)}
              </li>
            ))}
          </ul>

          <h6>List of Expenses</h6>
          {/* List of individual expenses */}
          <ul className="list-group">
            {thisMonthExpenses.map((expense, index) => (
              <li key={index} className={liClass}>
                {expense.get('name')} — ${expense.get('amount')}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Summary;
