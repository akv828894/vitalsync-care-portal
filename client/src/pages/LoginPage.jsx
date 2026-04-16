import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import { loginUser } from "../lib/authApi";
import { useAuthStore } from "../store/useAuthStore";

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const setAuth = useAuthStore((state) => state.setAuth);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const redirectTarget = location.state?.from?.pathname || "/dashboard";

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    try {
      setIsSubmitting(true);
      setErrorMessage("");

      const response = await loginUser({
        email: formData.get("email"),
        password: formData.get("password"),
      });

      setAuth({
        token: response.token,
        user: response.user,
      });

      navigate(redirectTarget, { replace: true });
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout
      eyebrow="Secure Sign In"
      title="Welcome back to your care portal"
      subtitle="Review appointments, follow care instructions, and stay connected with your clinic team from one secure dashboard."
      footer={
        <p>
          New patient? <Link to="/register">Create your account</Link>
        </p>
      }
    >
      <form className="form-grid" onSubmit={handleSubmit}>
        <label className="form-field">
          <span>Email</span>
          <input
            autoComplete="email"
            name="email"
            placeholder="aman@example.com"
            required
            type="email"
          />
        </label>

        <label className="form-field">
          <span>Password</span>
          <input
            autoComplete="current-password"
            minLength="6"
            name="password"
            placeholder="Enter your password"
            required
            type="password"
          />
        </label>

        {errorMessage ? <p className="status error">{errorMessage}</p> : null}

        <button className="button" disabled={isSubmitting} type="submit">
          {isSubmitting ? "Signing you in..." : "Access Dashboard"}
        </button>

        <p className="auth-note">
          Provider and operations accounts are managed separately by authorized
          clinic administrators.
        </p>
      </form>
    </AuthLayout>
  );
}

export default LoginPage;
