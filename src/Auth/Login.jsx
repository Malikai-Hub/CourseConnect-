import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./authContext";
import "../Pages/css/Login.css";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const onLogin = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      setError("");
      await login({ email, password });
      navigate("/");
    } catch {
      setError("Unable to sign in. Please check your email and password.");
    }
  };

  return (
    <main className="login-page">
      <nav className="login-nav">
        <Link to="/" className="login-logo">
          <span className="login-logo-mark">
            <span className="login-logo-purple">C</span>
            <span className="login-logo-orange">C</span>
          </span>
          <span>Course Connect</span>
        </Link>

        <Link to="/" className="login-home-link">
          ← Home
        </Link>
      </nav>

      <section className="login-content">
        <div className="login-decoration login-decoration-one"></div>
        <div className="login-decoration login-decoration-two"></div>

        <div className="login-intro">
          <span className="login-eyebrow">WELCOME BACK</span>

          <h1>
            Your next big
            <span> idea awaits.</span>
          </h1>

          <p>
            Pick up where you left off, connect with your study groups, and keep
            making progress toward your goals.
          </p>

          <div className="login-benefits">
            <div className="login-benefit">
              <span className="login-benefit-icon">✦</span>
              <span>Return to your study groups</span>
            </div>

            <div className="login-benefit">
              <span className="login-benefit-icon">✓</span>
              <span>Stay on top of assignments</span>
            </div>

            <div className="login-benefit">
              <span className="login-benefit-icon">♡</span>
              <span>Keep learning together</span>
            </div>
          </div>
        </div>

        <div className="login-card">
          <div className="login-card-heading">
            <span className="login-card-icon">✦</span>
            <p className="login-card-eyebrow">YOUR LEARNING SPACE</p>
            <h2>Welcome back!</h2>
            <p className="login-card-description">
              Sign in to continue your learning journey.
            </p>
          </div>

          <form className="login-form" onSubmit={onLogin}>
            <label className="login-label">
              Email address
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                autoComplete="email"
                required
              />
            </label>

            <label className="login-label">
              Password
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                autoComplete="current-password"
                required
              />
            </label>

            {error && (
              <p className="login-error" role="alert">
                {error}
              </p>
            )}

            <button type="submit" className="login-button">
              Sign in <span>→</span>
            </button>
          </form>

          <div className="login-divider">
            <span>GREAT TO HAVE YOU HERE</span>
          </div>

          <p className="login-footer">
            Need an account? <Link to="/Register">Create one here</Link>
          </p>
        </div>
      </section>

      <footer className="login-page-footer">
        Made for learners, built for connection.
      </footer>
    </main>
  );
}
