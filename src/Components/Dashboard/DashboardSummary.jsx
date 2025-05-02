import React, { useContext } from 'react';
import { ThemeContext } from '../../App';
import { jsPDF } from 'jspdf';

// Child summary component displays the lifetime and monthly spending summary
function Summary({ expenses, loading }) {
  const { theme } = useContext(ThemeContext);

  if (loading) {
    return <div>Loading summary...</div>;
  }

  // Declare variables for current and last month/year
  const currentDate = new Date();
  const thisMonth = currentDate.getMonth();
  const thisYear = currentDate.getFullYear();
  const lastMonthDate = new Date(currentDate);
  lastMonthDate.setMonth(thisMonth - 1);
  const lastMonth = lastMonthDate.getMonth();
  const lastYear = lastMonthDate.getFullYear();

  // Format month and year for display 
  // ex. "January 2023"
  const formattedThisMonth = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });
  const formattedLastMonth = lastMonthDate.toLocaleString('default', { month: 'long', year: 'numeric' });

  // Calculate lifetime total and category summary
  const lifetimeTotal = expenses.reduce((sum, e) => sum + Number(e.get('amount')), 0);
  const lifetimeCategorySummary = {};
  expenses.forEach(e => {
    const name = e.get('category')?.get('name') || 'Unknown';
    lifetimeCategorySummary[name] = (lifetimeCategorySummary[name] || 0) + Number(e.get('amount'));
  });

  // Filter expenses for the current month
  const thisMonthExpenses = expenses.filter(e => {
    const d = new Date(e.get('date'));
    return d.getMonth() === thisMonth && d.getFullYear() === thisYear;
  });

  // Filter expenses for the last month
  const lastMonthExpenses = expenses.filter(e => {
    const d = new Date(e.get('date'));
    return d.getMonth() === lastMonth && d.getFullYear() === lastYear;
  });

  // Calculate this month total and compare with last month
  const thisTotal = thisMonthExpenses.reduce((sum, e) => sum + Number(e.get('amount')), 0);
  const lastTotal = lastMonthExpenses.reduce((sum, e) => sum + Number(e.get('amount')), 0);
  // Calculate the difference and format the summary text
  const diff = thisTotal - lastTotal;
  const moreOrLess = diff >= 0 ? 'more' : 'less';
  const diffAmt = Math.abs(diff).toFixed(2);
  const summaryText = `You spent $${diffAmt} ${moreOrLess} than ${formattedLastMonth}.`;

  // Calculate this month category summary
  const thisMonthCategorySummary = {};
  thisMonthExpenses.forEach(e => {
    const name = e.get('category')?.get('name') || 'Unknown';
    thisMonthCategorySummary[name] = (thisMonthCategorySummary[name] || 0) + Number(e.get('amount'));
  });

  const liClass = theme === 'dark'
    ? 'list-group-item bg-dark text-white border-secondary'
    : 'list-group-item bg-light';

  // Export to PDF handler
  const handleExportPDF = () => {
    const doc = new jsPDF();

    // Set the font size and add a title
    doc.setFontSize(18);
    doc.text('Expense Summary', 10, 10);

    // Mock the format of the actual summary
    doc.setFontSize(14);
    doc.text(`Lifetime Total: $${lifetimeTotal.toFixed(2)}`, 10, 20);

    doc.text('Lifetime Category Breakdown:', 10, 30);
    let y = 40;
    Object.entries(lifetimeCategorySummary).forEach(([cat, amt]) => {
      doc.text(`- ${cat}: $${amt.toFixed(2)}`, 10, y);
      y += 10;
    });

    y += 10;
    doc.text(`Summary for ${formattedThisMonth}:`, 10, y);
    y += 10;
    doc.text(`This Month Total: $${thisTotal.toFixed(2)}`, 10, y);
    y += 10;
    doc.text(summaryText, 10, y);

    y += 10;
    doc.text('This Month Category Breakdown:', 10, y);
    y += 10;

    // Add the category breakdown for this month
    Object.entries(thisMonthCategorySummary).forEach(([cat, amt]) => {
      doc.text(`- ${cat}: $${amt.toFixed(2)}`, 10, y);
      y += 10;
    });

    y += 10;
    doc.text('This Month Expenses:', 10, y);
    y += 10;
    thisMonthExpenses.forEach((e, index) => {
      doc.text(
        `- ${e.get('name')} — $${Number(e.get('amount')).toFixed(2)}`,
        10,
        y
      );
      y += 10;
      if (y > 280) {
        doc.addPage();
        y = 10;
      }
    });

    // Save the PDF with a dynamic filename based on the current month
    doc.save(`Expense_Summary_${formattedThisMonth}.pdf`);
  };

  return (
    <div className="container my-4">
      <div className={`card shadow-sm ${theme === 'dark' ? 'bg-secondary text-white' : 'bg-light text-dark'}`}>
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center">
            <h4>Lifetime Spending</h4>
            <button 
              className={`btn ${theme === 'dark' ? 'btn-danger' : 'btn-primary'}`} 
              onClick={handleExportPDF}
            >
              Export PDF
            </button>
          </div>
          <p>Total spent: ${lifetimeTotal.toFixed(2)}</p>
          <p>Category Breakdown:</p>
          <ul className="list-group mb-4">
            {Object.entries(lifetimeCategorySummary).map(([category, amount]) => (
              <li key={category} className={liClass}>
                {category}: ${amount.toFixed(2)}
              </li>
            ))}
          </ul>

          <h4>Summary for {formattedThisMonth}</h4>
          <p>Total spent: ${thisTotal.toFixed(2)}</p>
          <p>{summaryText}</p>
          <p>Category Breakdown:</p>
          <ul className="list-group mb-4">
            {Object.entries(thisMonthCategorySummary).map(([category, amount]) => (
              <li key={category} className={liClass}>
                {category}: ${amount.toFixed(2)}
              </li>
            ))}
          </ul>

          <h6>List of Expenses</h6>
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
