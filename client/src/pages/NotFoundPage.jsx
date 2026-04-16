import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <main className="loader-screen">
      <div className="loader-card not-found-card">
        <span className="eyebrow">404</span>
        <h1>We could not find that page</h1>
        <p>The address may have changed, or the page is no longer available.</p>
        <Link className="button" to="/login">
          Return to Sign In
        </Link>
      </div>
    </main>
  );
}

export default NotFoundPage;
