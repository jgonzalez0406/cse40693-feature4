import { useEffect } from "react";
import { logoutUser } from "./AuthService";
import { useNavigate } from "react-router-dom";

// AuthLogout component handles user logout
// This component will call the logoutUser function and redirect to the login page
const AuthLogout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    logoutUser().then(() => {
      navigate("/auth/login", { replace: true });
    });
  }, [navigate]);

  return <p>Logging out...</p>;
};

export default AuthLogout;

// TODO: Add a confirmation dialog before logging out
// TODO: Check if a user is logged in before attempting to log out