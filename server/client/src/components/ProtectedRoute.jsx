import { Navigate } from "react-router-dom";
import Loader from "./Loader";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  // Optional: You can add a small loading state if checking from server
  if (token === null) {
    return <Navigate to="/login" />;
  }

  // Show loader briefly while route is being validated (optional enhancement)
  if (!token) {
    return <Loader />;
  }

  return children;
}
