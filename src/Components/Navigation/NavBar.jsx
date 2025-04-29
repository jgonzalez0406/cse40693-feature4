import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../App";

export default function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <nav
      className={`navbar navbar-expand-lg ${
        theme === "dark" ? "navbar-dark bg-dark" : "navbar-light bg-light"
      }`}
    >
      <div className="container">
        <Link className="navbar-brand" to="/">FinanceTracker</Link>
        <ul className="navbar-nav ms-auto align-items-center">
          <li className="nav-item">
            <button
              onClick={toggleTheme}
              className="btn btn-outline-secondary me-3"
            >
              {theme === "light" ? "🌙 Dark" : "☀️ Light"}
            </button>
          </li>
          <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/auth/register">Register</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/auth/login">Login</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/auth/dashboard">Dashboard</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/auth/add_expense">Add Expense</Link></li>
          <li className="nav-item"><Link className="nav-link logout" to="/auth/logout">Logout</Link></li>
        </ul>
      </div>
    </nav>
  );
}
