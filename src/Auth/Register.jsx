import { useState } from "react";
import { Link, useNavigate } from "react-router";

export default function Register() {
  const navigate = useNavigate;

  return (
    <>
      <h1>Start learning</h1>
      <form>
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
            Already have an account? Continue learning{" "}
            <Link to="/Login">here.</Link>
          </p>
        </footer>
      </form>
    </>
  );
}
