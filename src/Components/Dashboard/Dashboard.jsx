// src/Components/Dashboard/Dashboard.jsx
import React, { useContext, useEffect, useState } from 'react';
import DashboardGraph from './DashboardGraph.jsx';
import Summary from './DashboardSummary.jsx';
import { ThemeContext } from '../../App';
import { getAllExpenses } from '../../Common/Services/ExpenseTypeService';

// Stateful parent component for the dashboard
// It fetches expenses data and passes it to child components for rendering
export default function Dashboard() {
  const { theme } = useContext(ThemeContext);

  // State to hold expenses data and loading state
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch expenses data when the component mounts
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const allExpenses = await getAllExpenses();
        setExpenses(allExpenses);
      } catch (error) {
        console.error('Error fetching expenses:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchExpenses();
  }, []);

  const headerClass = theme === 'dark'
    ? 'bg-secondary text-white'
    : 'bg-dark text-white';

  const graphClass = theme === 'dark'
    ? 'bg-secondary text-white'
    : 'bg-light text-dark';

  const summaryClass = theme === 'dark'
    ? 'bg-secondary text-white'
    : 'bg-light text-dark';

  return (
    <div className="container my-4">
      {/* Header */}
      <div className={`${headerClass} p-4 rounded mb-4 shadow`}>
        <h2 className="text-center m-0">Dashboard</h2>
      </div>

      {/* Main Content */}
      <div className="row">
        <div className="col-md-8 mb-3">
          <div className={`${graphClass} p-4 rounded shadow h-100`}>
            <DashboardGraph expenses={expenses} loading={loading} />
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className={`${summaryClass} p-4 rounded shadow h-100`}>
            <Summary expenses={expenses} loading={loading} />
          </div>
        </div>
      </div>
    </div>
  );
}
