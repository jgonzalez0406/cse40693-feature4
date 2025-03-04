import { html } from "https://unpkg.com/htm/preact/standalone.module.js";

// Navbar Component
export default function Navbar() {
  return html`
    <nav>
      <ul class="nav-list">
        <li><a href="../index.html">Home</a></li>
        <li><a href="../register/register.html">Register</a></li>
        <li><a href="../login/login.html">Login</a></li>
        <li><a href="../dashboard/dashboard.html">Dashboard</a></li>
        <li><a href="../add_expense/add_expense.html">Add Expense</a></li>
      </ul>
    </nav>
  `;
}
