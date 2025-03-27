import React from "react";
import ExpenseModule from "./ExpenseForm/ExpenseModule.jsx";
import NavBar from "./Navigation/NavBar.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

export default function Components() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<ExpenseModule />} />
      </Routes>
    </Router>
  );
}
