import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchPatientOverview } from "../lib/authApi";
import { apiBaseUrl } from "../lib/api";
import { useAuthStore } from "../store/useAuthStore";

function DashboardPage() {
  const navigate = useNavigate();
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const [overview, setOverview] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const loadOverview = async () => {
      try {
        setIsLoading(true);
        const response = await fetchPatientOverview(token);

        if (!cancelled) {
          setOverview(response);
          setErrorMessage("");
        }
      } catch (error) {
        if (!cancelled) {
          if (error.status === 401) {
            logout();
            navigate("/login", { replace: true });
            return;
          }

          setErrorMessage(error.message);
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    loadOverview();

    return () => {
      cancelled = true;
    };
  }, [logout, navigate, token]);

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const memberId = user?.id
    ? `VS-${user.id.slice(-6).toUpperCase()}`
    : "Pending";
  const accountLabel =
    user?.role === "patient"
      ? "Patient account"
      : `${user?.role || "secure"} access`;

  return (
    <main className="dashboard-shell">
      <header className="dashboard-header">
        <div>
          <span className="eyebrow">Patient Care Dashboard</span>
          <h1>Welcome back, {user?.fullName || "VitalSync Member"}</h1>
          <p>
            Review your upcoming visits, care reminders, and support details
            from one streamlined healthcare workspace.
          </p>
          <div className="meta-row">
            <span className="profile-chip">Member ID {memberId}</span>
            <span className="profile-chip">Secure session active</span>
          </div>
        </div>

        <div className="header-actions">
          <span className="pill">{accountLabel}</span>
          <button className="button button-secondary" onClick={handleLogout} type="button">
            Sign Out
          </button>
        </div>
      </header>

      {errorMessage ? <p className="status error">{errorMessage}</p> : null}

      <section className="stats-grid">
        {(overview?.stats || []).map((item) => (
          <article className="stat-card" key={item.label}>
            <span>{item.label}</span>
            <strong>{item.value}</strong>
            <p>{item.note}</p>
          </article>
        ))}
      </section>

      <section className="dashboard-grid">
        <article className="detail-card">
          <p className="card-kicker">Next Visit</p>
          <h2>Upcoming appointment</h2>
          {isLoading ? (
            <p className="muted">Loading your latest appointment details...</p>
          ) : (
            <>
              <p>{overview?.message}</p>
              <div className="appointment-card">
                <strong>{overview?.nextAppointment?.doctorName}</strong>
                <span>{overview?.nextAppointment?.department}</span>
                <span>{overview?.nextAppointment?.slot}</span>
                <span>{overview?.nextAppointment?.location}</span>
                <span>{overview?.nextAppointment?.mode}</span>
                <span>{overview?.nextAppointment?.checkIn}</span>
                <span className="pill">{overview?.nextAppointment?.status}</span>
              </div>
            </>
          )}
        </article>

        <article className="detail-card">
          <p className="card-kicker">Portal Services</p>
          <h2>What you can do here</h2>
          <div className="card-stack">
            {(overview?.portalHighlights || []).map((item) => (
              <div className="service-list" key={item.title}>
                <strong>{item.title}</strong>
                <p>{item.detail}</p>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="dashboard-grid">
        <article className="detail-card">
          <p className="card-kicker">Care Team</p>
          <h2>People supporting your journey</h2>
          <div className="care-list">
            {(overview?.careTeam || []).map((member) => (
              <div className="care-list-item" key={member.name}>
                <strong>{member.name}</strong>
                <span>{member.specialty}</span>
                <p>{member.availability}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="detail-card">
          <p className="card-kicker">Reminders</p>
          <h2>Keep these in mind</h2>
          <div className="reminder-list">
            {(overview?.reminders || []).map((item) => (
              <div className="reminder-item" key={item.title}>
                <strong>{item.title}</strong>
                <p>{item.detail}</p>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="dashboard-grid">
        <article className="detail-card">
          <p className="card-kicker">Profile Summary</p>
          <h2>Your account details</h2>
          <dl className="info-list">
            <div>
              <dt>Patient name</dt>
              <dd>{user?.fullName || "-"}</dd>
            </div>
            <div>
              <dt>Primary email</dt>
              <dd>{user?.email || "-"}</dd>
            </div>
            <div>
              <dt>Member ID</dt>
              <dd>{memberId}</dd>
            </div>
            <div>
              <dt>Portal endpoint</dt>
              <dd>{apiBaseUrl}</dd>
            </div>
          </dl>
        </article>

        <article className="detail-card">
          <p className="card-kicker">Support And Security</p>
          <h2>Need help with your access?</h2>
          <div className="card-stack">
            <div className="service-list">
              <strong>Email support</strong>
              <p>{overview?.supportDesk?.email}</p>
            </div>
            <div className="service-list">
              <strong>Care desk</strong>
              <p>{overview?.supportDesk?.phone}</p>
            </div>
            <div className="service-list">
              <strong>Availability</strong>
              <p>{overview?.supportDesk?.availability}</p>
            </div>
          </div>
          <p className="muted security-note">{overview?.securityNote}</p>
        </article>
      </section>
    </main>
  );
}

export default DashboardPage;
