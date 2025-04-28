import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../App";  // adjust the path if needed

export default function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <nav 
      className="navbar navbar-expand-lg" 
      style={{ backgroundColor: "var(--card-bg)" }}
    >
      <div className="container">
        <Link className="navbar-brand" to="/">FinanceTracker</Link>

        <button
          className="btn btn-outline-secondary ms-auto"
          onClick={toggleTheme}
        >
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>

        <ul className="navbar-nav ms-3">
          <li className="nav-item">
            <Link className="nav-link" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/auth/register">Register</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/auth/login">Login</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/auth/dashboard">Dashboard</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/auth/add_expense">Add Expense</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link logout" to="/auth/logout">Logout</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
