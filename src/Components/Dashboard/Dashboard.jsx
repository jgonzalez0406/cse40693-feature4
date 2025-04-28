import React from 'react';
import DashboardGraph from './DashboardGraph.jsx'; // Assuming you have a DashboardGraph component
import Summary from './DashboardSummary.jsx'; // Assuming you have a DashboardSummary component

// This is a parent component that will hold the state and pass it down to the child components
function Dashboard() {
  return (
    <div className="container my-4">
      {/* Header */}
      <div className="bg-dark text-white p-4 rounded mb-4 shadow">
        <h2 className="text-center m-0">Dashboard</h2>
      </div>

      {/* Main content */}
      <div className="row">
        {/* Left column - Graph */}
        <div className="col-md-8 mb-3">
          <div className="p-4 bg-light rounded shadow h-100">
            {/* Call graph component here, e.g., <DashboardGraph /> */}
            <DashboardGraph/>
          </div>
        </div>

        {/* Right column - Summary */}
        <div className="col-md-4 mb-3">
          <div className="p-4 bg-secondary text-white rounded shadow h-100">
            <Summary/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
