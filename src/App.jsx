// src/App.jsx
import React, { useState, useEffect, createContext } from "react";
import Components from "./Components/Components";
import "./index.css";  // your global CSS with --bg / --fg variables

// Create a ThemeContext for toggling light/dark
export const ThemeContext = createContext();

export default function App() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );

  // Whenever theme changes, update the HTML attribute and persist it
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Toggle between "light" and "dark"
  const toggleTheme = () =>
    setTheme((curr) => (curr === "light" ? "dark" : "light"));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <Components />
    </ThemeContext.Provider>
  );
}
