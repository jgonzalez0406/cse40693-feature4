import React from "react";
import ExpenseModule from "./ExpenseForm/ExpenseModule.jsx";
import NavBar from "./Navigation/NavBar.jsx";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import AuthModule from "./Auth/Auth.jsx";
import AuthRegister from "./Auth/AuthRegister";
import AuthLogin from "./Auth/AuthLogin";
import AuthLogout from "./Auth/AuthLogout.jsx";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute.jsx";

export default function Components() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/auth" element={<AuthModule />} />
        <Route path="/auth/register" element={<AuthRegister />} />
        <Route path="/auth/login" element={<AuthLogin />} />
        <Route path="/auth/logout" element={<AuthLogout />} />
        <Route path="/" element={<ProtectedRoute path="/" element={ExpenseModule} />} />
        <Route path="*" element={<Navigate to="/auth" replace />} />
      </Routes>
    </Router>
  );
}
