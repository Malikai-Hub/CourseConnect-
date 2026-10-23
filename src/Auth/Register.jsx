import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "./AuthContext";

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
      console.error(e);
      setError(String(e));
    }
  };
  return (
    <>
      <h1>Start learning</h1>
      <form onSubmit={onRegister}>
        <label>
          Username
          <input type="text" name="username" required />
        </label>
        <label>
          Email
          <input type="email" name="email" required />
        </label>
        <label>
          Password
          <input type="password" name="password" required />
        </label>

        <button>Sign up</button>
        <footer>
          <p>
            Already have an account? Continue learning
            <Link to="/Login">here.</Link>
          </p>
        </footer>
        {error && <p>{error}</p>}
      </form>
    </>
  );
}
