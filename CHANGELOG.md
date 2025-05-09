[0.4.0] - 2025-05-02

Added
  - Bootstrap for styling (Add Expense and Dashboard pages)
  - Dashboard Components (DashboardModule, Dashboard, DashboardSummary, DashboardGraph)
      - Dashboard uses backend data and will create a graph (using React Charts) and a summary based on it
      - Ability to export the summary as a pdf
  - Ability to toggle a light/dark mode, which works on every page
  - Ability to filter expenses on the Add Expense page
    
Changed 
  - Added Dashboard as a protected route

[0.3.0] - 2025-04-01

Added
  - Authentication & Authorization flow using Parse-based AuthService
  - Login, Signup, and Logout components (AuthLogin, AuthRegister, AuthLogout)
  - ProtectedRoute component to guard routes from unauthenticated access
  - AuthModule component for redirecting authenticated users away from login/signup
  - Redirect logic for users who manually navigate to protected URLs while unauthenticated

Changed
  - Moved authentication methods (createUser, loginUser, logoutUser, checkUser) into a dedicated AuthService
  - Updated main routing in Components.jsx to protect / and redirect unauthorized users to /auth
  - Prevent already-logged-in users from navigating to the auth routes


[0.2.0] - 2025-03-07
Added 
  - Separate Parse Models - Expenses and Expense Categories
  - React - ExpenseForm.js acts as a Parent Component and AddExpenseForm.js acts as a Child Component
  
Changed
  - Vite - Site now utilizes Vite and has adopted a new file structure because of it
  - Expense Logic - Added logic to officially add expenses and also keep track of previous and newly added ones.
