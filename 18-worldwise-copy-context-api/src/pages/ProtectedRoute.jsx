// 18.240 Protecting the route from accessing using URLs
// 1) Create a function for ProtectedRoute and wrap the entire application
// 2) The app the main route and rest are all nested routes
// 3) Wrap the AppLayout inside ProtectedRoute function: App.jsx file

import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/FakeAuthContext";
import { useEffect } from "react";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(
    function () {
      if (!isAuthenticated) navigate("/");
    },
    [isAuthenticated, navigate]
  );

  return isAuthenticated ? children : null;
}

export { ProtectedRoute };
