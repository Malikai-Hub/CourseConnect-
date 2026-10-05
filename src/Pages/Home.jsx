import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Home() {
  return (
    <>
      <nav>
        <Link to="/Groups">Groups </Link>
        <Link to="/Register">Sign Up </Link>
        <Link to="/Profile">Profile </Link>
        <Link to="/Assignments">Assignments </Link>
        <Link to="/Study">Study </Link>
        <Link>Quiz </Link>
      </nav>
      <header>
        <h1>Course Connect</h1>
        <h2>Dashboard</h2>
      </header>
      <body>
        <h2>Upcoming tasks:</h2>
        <h2>Upcoming study sessions:</h2>
        <h3>Recent Study Sets:</h3>
        <h4>Recent Post Replies:</h4>
      </body>
      <footer></footer>
    </>
  );
}
