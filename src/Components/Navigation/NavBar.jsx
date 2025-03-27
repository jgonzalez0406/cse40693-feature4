import React from "react";
import { Link } from "react-router-dom";

// Navbar Component
export default function Navbar() {
  return (
    <nav>
      <ul className="nav-list">
        {/* Each Link points to a route you define in <Routes> */}
        <li><Link to="/">Home</Link></li>
        <li><Link to="/auth/register">Register</Link></li>
        <li><Link to="/auth/login">Login</Link></li>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/add_expense">Add Expense</Link></li>
      </ul>
    </nav>
  );
}

