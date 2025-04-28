// src/Components/Navigation/NavBar.jsx
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../App";  // make sure the path is correct

export default function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <nav>
      <ul className="nav-list">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/auth/register">Register</Link></li>
        <li><Link to="/auth/login">Login</Link></li>
        <li><Link to="/auth/dashboard">Dashboard</Link></li>
        <li><Link to="/auth/add_expense">Add Expense</Link></li>
        <li className="logout"><Link to="/auth/logout">Logout</Link></li>

        {/* Theme toggle on the far right */}
        <li className="theme-toggle" style={{ marginLeft: "auto" }}>
          <button
            onClick={toggleTheme}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "1.2rem"
            }}
            aria-label="Toggle light/dark mode"
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>
        </li>
      </ul>
    </nav>
  );
}
