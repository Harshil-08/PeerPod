import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  const { token, loading } = useAuth();
  if (loading) return <div>Loading...</div>;

  if (!token) {
    console.log("not logged in", token);
    return <Navigate to={"/login"} />;
  }
  return children;
};
