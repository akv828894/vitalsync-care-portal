import { Link } from "react-router-dom";

function AuthLayout({ eyebrow, title, subtitle, footer, children }) {
  return (
    <main className="auth-shell">
      <section className="auth-brand-panel">
        <div className="trust-strip">
          <span className="trust-item">Secure access</span>
          <span className="trust-item">Skyline care portal</span>
          <span className="trust-item">24 x 7 visibility</span>
        </div>

        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{subtitle}</p>

        <div className="panel-grid">
          <article className="mini-panel">
            <span className="mini-label">Designed For Patients</span>
            <strong>Appointments, records, and follow-ups in one calm workspace.</strong>
            <p>
              The portal is built to feel reassuring, fast, and easy to use for
              everyday patient care interactions.
            </p>
          </article>

          <article className="mini-panel">
            <span className="mini-label">Built For Trust</span>
            <strong>Private access, verified sessions, and role-aware protection.</strong>
            <p>
              VitalSync keeps account access controlled while giving clinics a
              cleaner digital experience across patient-facing journeys.
            </p>
          </article>
        </div>

        <ul className="auth-list">
          <li>Book and review upcoming appointments with clear status visibility.</li>
          <li>Access prescriptions, care updates, and service reminders in one place.</li>
          <li>Keep patient identity and session access secure throughout the flow.</li>
          <li>Give clinics a polished login experience that feels production ready.</li>
        </ul>

        <p className="support-copy">
          Need onboarding help? VitalSync support teams can guide patients,
          care coordinators, and administrative staff through account access.
        </p>
      </section>

      <section className="auth-card">
        <Link className="brand-mark" to="/">
          VitalSync
        </Link>
        <p className="section-label">Secure Care Portal</p>
        {children}
        <div className="auth-footer">{footer}</div>
      </section>
    </main>
  );
}

export default AuthLayout;
