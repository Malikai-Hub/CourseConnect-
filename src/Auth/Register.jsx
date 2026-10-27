import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./authContext";
import "./Register.css";

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [error, setError] = useState("");

  const onRegister = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      setError("");
      await register({ username, email, password });
      navigate("/");
    } catch {
      setError(
        "Unable to create your account. Please check your information and try again.",
      );
    }
  };

  return (
    <div className="register-page">
      <div className="register-shell">
        <section className="register-brand-panel">
          <Link to="/" className="register-logo">
            <span className="register-cc-logo" aria-hidden="true">
              <span className="register-cc-shape register-cc-purple"></span>
              <span className="register-cc-shape register-cc-orange"></span>
            </span>

            <span className="register-logo-text">
              Course <strong>Connect</strong>
            </span>
          </Link>

          <div className="register-brand-content">
            <p className="register-eyebrow">JOIN COURSE CONNECT</p>

            <h1>
              Learn together.
              <span>Grow together.</span>
            </h1>

            <p className="register-brand-description">
              Create your account and start connecting with classmates, study
              groups, assignments, and everything you're learning.
            </p>

            <div className="register-brand-note">
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

          <div className="register-decoration" aria-hidden="true">
            <span className="register-decoration-card purple">✦</span>

            <span className="register-decoration-card orange">✓</span>

            <span className="register-decoration-card yellow">+</span>
          </div>
        </section>

        <section className="register-form-panel">
          <div className="register-form-wrapper">
            <p className="register-form-eyebrow">GET STARTED</p>

            <h2>Create your account</h2>

            <p className="register-form-intro">
              Join Course Connect and build your learning space.
            </p>

            <form className="register-form" onSubmit={onRegister}>
              <label>
                Username
                <input
                  type="text"
                  name="username"
                  placeholder="Choose a username"
                  autoComplete="username"
                  required
                />
              </label>

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
                  placeholder="Create a password"
                  autoComplete="new-password"
                  required
                />
              </label>

              {error && <p className="register-error">{error}</p>}

              <button type="submit">
                Create Account
                <span>→</span>
              </button>
            </form>

            <div className="register-login">
              <p>Already have an account?</p>

              <Link to="/Login">Sign in →</Link>
            </div>
          </div>

          <footer className="register-footer">
            Course Connect • Learn together. Go further.
          </footer>
        </section>
      </div>
    </div>
  );
}
