import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { checkUser } from "../Auth/AuthService";

// ProtectedRoute component checks if the user is authenticated before rendering the component
// If the user is authenticated, it renders the component passed to it; otherwise, it redirects to the 'auth' route
const ProtectedRoute = ({ element: Component, ...rest }) => {
  console.log("element: ", Component);
  const navigate = useNavigate();
  const goBackHandler = () => {
    navigate("/auth");
  };

  useEffect (() => {
    if (!checkUser()) {
      navigate("/auth"); // Redirect to auth page if not authenticated
    }
  }, [navigate]);

  if (checkUser())
  {
    return <Component />;
  }
  else
  {
    return;
  }
};

export default ProtectedRoute;

// TODO: Add a loading spinner while checking authentication status, to let the user know something is happening :)
