import { useState } from "react";
import { Link, useNavigate } from "react-router";

export default function Login() {
  const navigate = useNavigate;

  return (
    <>
      <h1>Continue learning</h1>
      <form>
        <label>
          Email
          <input type="email" name="email" required />
        </label>
        <label>
          Password
          <input type="password" name="password" required />
        </label>
      </form>
      <button>Sign in</button>
      <footer>
        <p>
          Need an account? Start learning <Link to="/Register">here</Link>
        </p>
      </footer>
    </>
  );
}
