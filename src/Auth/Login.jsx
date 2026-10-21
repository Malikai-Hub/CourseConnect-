import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

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
      <h1>Continue learning</h1>
      <form onSubmit={onLogin}>
        <label>
          Email
          <input type="email" name="email" required />
        </label>
        <label>
          Password
          <input type="password" name="password" required />
        </label>
        <button>Sign in</button>
        {error && <p>{error}</p>}
      </form>

      <footer>
        <p>
          Need an account? Start learning <Link to="/Register">here</Link>
        </p>
      </footer>
    </>
  );
}
