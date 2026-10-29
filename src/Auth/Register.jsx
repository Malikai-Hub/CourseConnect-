import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "./AuthContext";
import "../Pages/css/Login.css";

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
      await register({ username, email, password });
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
        <h1 className="login-heading">Start learning</h1>
        <form className="login-form" onSubmit={onRegister}>
          <label className="login-label">
            Username
            <input type="text" name="username" required />
          </label>
          <label className="login-label">
            Email
            <input type="email" name="email" required />
          </label>
          <label className="login-label">
            Password
            <input type="password" name="password" required />
          </label>

          <button className="login-button">Sign up</button>
          <footer className="login-footer">
            <p>
              Already have an account? Continue learning
              <Link to="/Login"> here.</Link>
            </p>
          </footer>
          {error && <p className="login-error">{error}</p>}
        </form>
      </main>
    </>
  );
}
