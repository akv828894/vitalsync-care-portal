import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import FullScreenLoader from "./components/FullScreenLoader";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicOnlyRoute from "./components/PublicOnlyRoute";
import { fetchCurrentUser } from "./lib/authApi";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import RegisterPage from "./pages/RegisterPage";
import { useAuthStore } from "./store/useAuthStore";

function App() {
  const token = useAuthStore((state) => state.token);
  const hydrationComplete = useAuthStore((state) => state.hydrationComplete);
  const setUser = useAuthStore((state) => state.setUser);
  const logout = useAuthStore((state) => state.logout);
  const [sessionChecked, setSessionChecked] = useState(false);

  useEffect(() => {
    if (!hydrationComplete) {
      return;
    }

    let cancelled = false;

    const syncSession = async () => {
      setSessionChecked(false);

      if (!token) {
        setSessionChecked(true);
        return;
      }

      try {
        const response = await fetchCurrentUser(token);

        if (!cancelled) {
          setUser(response.user);
        }
      } catch {
        if (!cancelled) {
          logout();
        }
      } finally {
        if (!cancelled) {
          setSessionChecked(true);
        }
      }
    };

    syncSession();

    return () => {
      cancelled = true;
    };
  }, [hydrationComplete, logout, setUser, token]);

  if (!hydrationComplete || !sessionChecked) {
    return <FullScreenLoader message="Restoring your secure care session..." />;
  }

  return (
    <Routes>
      <Route
        element={<Navigate replace to={token ? "/dashboard" : "/login"} />}
        path="/"
      />

      <Route element={<PublicOnlyRoute />}>
        <Route element={<LoginPage />} path="/login" />
        <Route element={<RegisterPage />} path="/register" />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardPage />} path="/dashboard" />
      </Route>

      <Route element={<NotFoundPage />} path="*" />
    </Routes>
  );
}

export default App;
