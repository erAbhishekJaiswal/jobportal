// Create the ProtectedRoute component
import { Navigate } from "react-router-dom";


export function PrivateRoute({ children, role }) {
  if (!sessionStorage.getItem("token")) {
    return <Navigate to="/signup" replace />;
  }

  if (role && sessionStorage.getItem("role") !== role) {
    return <Navigate to="/not-authorized" replace />;
  }

  return children;
}

// public routes
export function PublicRoute({ children }) {
  return sessionStorage.getItem("token") ? children : children;
}