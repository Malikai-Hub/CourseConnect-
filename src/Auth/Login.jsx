import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
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
      await login({ email, password });
      navigate("/");
    } catch (e) {
      setError("Error");
    }
  };
  return (
    <>
      <Link to="/" className="login-home-link">
        🏠 Home
      </Link>
      <main className="login-page">
        <h1 className="login-heading">Continue learning</h1>
        <form className="login-form" onSubmit={onLogin}>
          <label className="login-label">
            Email
            <input type="email" name="email" required />
          </label>
          <label className="login-label">
            Password
            <input type="password" name="password" required />
          </label>
          <button className="login-button">Sign in</button>
          {error && <p className="login-error">{error}</p>}
        </form>

        <footer className="login-footer">
          <p>
            Need an account? Start learning <Link to="/Register">here</Link>
          </p>
        </footer>
      </main>
    </>
  );
}
