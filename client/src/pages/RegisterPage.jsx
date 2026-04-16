import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import { registerUser } from "../lib/authApi";
import { useAuthStore } from "../store/useAuthStore";

function RegisterPage() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    try {
      setIsSubmitting(true);
      setErrorMessage("");

      const response = await registerUser({
        fullName: formData.get("fullName"),
        email: formData.get("email"),
        password: formData.get("password"),
        role: formData.get("role"),
      });

      setAuth({
        token: response.token,
        user: response.user,
      });

      navigate("/dashboard", { replace: true });
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout
      eyebrow="Create Patient Account"
      title="Create your VitalSync access"
      subtitle="Start a secure patient profile to manage visits, prescriptions, and care updates with confidence."
      footer={
        <p>
          Already registered? <Link to="/login">Sign in here</Link>
        </p>
      }
    >
      <form className="form-grid" onSubmit={handleSubmit}>
        <label className="form-field">
          <span>Full name</span>
          <input
            autoComplete="name"
            name="fullName"
            placeholder="Aman Kumar"
            required
            type="text"
          />
        </label>

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
            autoComplete="new-password"
            minLength="6"
            name="password"
            placeholder="Minimum 6 characters"
            required
            type="password"
          />
        </label>

        <input name="role" type="hidden" value="patient" />

        {errorMessage ? <p className="status error">{errorMessage}</p> : null}

        <button className="button" disabled={isSubmitting} type="submit">
          {isSubmitting ? "Creating your access..." : "Create Account"}
        </button>

        <p className="auth-note">
          Medical staff and operations access are provisioned internally to keep
          the portal safe and professionally managed.
        </p>
      </form>
    </AuthLayout>
  );
}

export default RegisterPage;
