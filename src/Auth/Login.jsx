import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./authContext";
import "./Login.css";

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
    <div className="login-page">
      <div className="login-shell">
        <section className="login-brand-panel">
          <Link to="/" className="login-logo">
            <span className="login-cc-logo" aria-hidden="true">
              <span className="login-cc-shape login-cc-purple"></span>
              <span className="login-cc-shape login-cc-orange"></span>
            </span>

            <span className="login-logo-text">
              Course <strong>Connect</strong>
            </span>
          </Link>

          <div className="login-brand-content">
            <p className="login-eyebrow">WELCOME BACK</p>

            <h1>
              Study together.
              <span>Go further.</span>
            </h1>

            <p className="login-brand-description">
              Sign in to reconnect with your study groups, assignments, and
              learning space.
            </p>

            <div className="login-brand-note">
              <p>
                Study.
                <br />
                Plan.
                <br />
                Connect.
                <br />
                Succeed.
              </p>
            </div>
          </div>

          <div className="login-decoration" aria-hidden="true">
            <span className="login-decoration-card purple">✦</span>

            <span className="login-decoration-card orange">✓</span>

            <span className="login-decoration-card yellow">+</span>
          </div>
        </section>

        <section className="login-form-panel">
          <div className="login-form-wrapper">
            <p className="login-form-eyebrow">YOUR LEARNING SPACE</p>

            <h2>Continue learning</h2>

            <p className="login-form-intro">
              Enter your account information to sign in.
            </p>

            <form className="login-form" onSubmit={onLogin}>
              <label>
                Email
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  autoComplete="email"
                  required
                />
              </label>

              <label>
                Password
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                />
              </label>

              {error && <p className="login-error">{error}</p>}

              <button type="submit">
                Sign In
                <span>→</span>
              </button>
            </form>

            <div className="login-register">
              <p>New to Course Connect?</p>

              <Link to="/Register">Create an account →</Link>
            </div>
          </div>

          <footer className="login-footer">
            Course Connect • Learn together. Go further.
          </footer>
        </section>
      </div>
    </div>
  );
}
