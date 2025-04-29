// src/Components/Dashboard/Dashboard.jsx
import React, { useContext } from 'react';
import DashboardGraph from './DashboardGraph.jsx';
import Summary from './DashboardSummary.jsx';
import { ThemeContext } from '../../App';

export default function Dashboard() {
  const { theme } = useContext(ThemeContext);

  // In light mode keep the original dark header; in dark mode switch to grey
  const headerClass = theme === 'dark'
    ? 'bg-secondary text-white'
    : 'bg-dark text-white';

  // Toggle graph container background/text based on theme
  const graphClass = theme === 'dark'
    ? 'bg-secondary text-white'
    : 'bg-light text-dark';

  // Toggle summary container background/text based on theme
  const summaryClass = theme === 'dark'
    ? 'bg-secondary text-white'
    : 'bg-light text-dark';

  return (
    <div className="container my-4">
      {/* Header: original dark in light mode, grey in dark mode */}
      <div className={`${headerClass} p-4 rounded mb-4 shadow`}>
        <h2 className="text-center m-0">Dashboard</h2>
      </div>

      {/* Main content */}
      <div className="row">
        {/* Left column - Graph */}
        <div className="col-md-8 mb-3">
          <div className={`${graphClass} p-4 rounded shadow h-100`}>
            <DashboardGraph />
          </div>
        </div>

        {/* Right column - Summary */}
        <div className="col-md-4 mb-3">
          <div className={`${summaryClass} p-4 rounded shadow h-100`}>
            <Summary />
          </div>
        </div>
      </div>
    </div>
  );
}
