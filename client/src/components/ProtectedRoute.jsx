import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

function ProtectedRoute() {
  const token = useAuthStore((state) => state.token);
  const hydrationComplete = useAuthStore((state) => state.hydrationComplete);
  const location = useLocation();

  if (!hydrationComplete) {
    return null;
  }

  if (!token) {
    return <Navigate replace state={{ from: location }} to="/login" />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
