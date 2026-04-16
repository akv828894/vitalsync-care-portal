import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

function PublicOnlyRoute() {
  const token = useAuthStore((state) => state.token);
  const hydrationComplete = useAuthStore((state) => state.hydrationComplete);

  if (!hydrationComplete) {
    return null;
  }

  if (token) {
    return <Navigate replace to="/dashboard" />;
  }

  return <Outlet />;
}

export default PublicOnlyRoute;
