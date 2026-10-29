import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./authContext";
import "../Pages/css/Register.css";

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
    <main className="register-page">
      <nav className="register-nav">
        <Link to="/" className="register-logo">
          <span className="register-logo-mark">
            <span className="register-logo-purple">C</span>
            <span className="register-logo-orange">C</span>
          </span>
          <span>Course Connect</span>
        </Link>

        <Link to="/" className="register-home-link">
          ← Home
        </Link>
      </nav>

      <section className="register-content">
        <div className="register-decoration register-decoration-one"></div>
        <div className="register-decoration register-decoration-two"></div>

        <div className="register-intro">
          <span className="register-eyebrow">
            YOUR NEXT CHAPTER STARTS HERE
          </span>

          <h1>
            Start learning.
            <span> Grow together.</span>
          </h1>

          <p>
            Find your people, build better study habits, and make learning
            something you look forward to.
          </p>

          <div className="register-benefits">
            <div className="register-benefit">
              <span className="register-benefit-icon">✦</span>
              <span>Connect with study groups</span>
            </div>

            <div className="register-benefit">
              <span className="register-benefit-icon">✓</span>
              <span>Keep track of assignments</span>
            </div>

            <div className="register-benefit">
              <span className="register-benefit-icon">♡</span>
              <span>Learn better, together</span>
            </div>
          </div>
        </div>

        <div className="register-card">
          <div className="register-card-heading">
            <span className="register-card-icon">✦</span>
            <p className="register-card-eyebrow">WELCOME TO THE COMMUNITY</p>
            <h2>Create your account</h2>
            <p className="register-card-description">
              Set up your account to get started.
            </p>
          </div>

          <form className="register-form" onSubmit={onRegister}>
            <label className="register-label">
              Username
              <input
                type="text"
                name="username"
                placeholder="Choose a username"
                autoComplete="username"
                required
              />
            </label>

            <label className="register-label">
              Email address
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                autoComplete="email"
                required
              />
            </label>

            <label className="register-label">
              Password
              <input
                type="password"
                name="password"
                placeholder="Create a password"
                autoComplete="new-password"
                required
              />
            </label>

            {error && (
              <p className="register-error" role="alert">
                {error}
              </p>
            )}

            <button type="submit" className="register-button">
              Create account <span>→</span>
            </button>
          </form>

          <div className="register-divider">
            <span>ALREADY PART OF THE COMMUNITY?</span>
          </div>

          <p className="register-footer">
            Already have an account? <Link to="/Login">Log in here</Link>
          </p>
        </div>
      </section>

      <footer className="register-page-footer">
        Made for learners, built for connection.
      </footer>
    </main>
  );
}
