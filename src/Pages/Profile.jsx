import { Link } from "react-router-dom";

export default function Profile() {
  return (
    <>
      <nav>
        <Link to="/">Home </Link>
        <Link to="/Assignments">Assignments </Link>
        <Link to="/Groups">Groups </Link>
      </nav>
      <header>
        <h1>Course Connect</h1>
        <h2>Profile</h2>
        <h3>Welcome</h3>
      </header>
      <body>
        <h3>Active Groups:</h3>
        <h3>Created Groups:</h3>
        <footer>
          <h4>Completed Assignments:</h4>
          <h4>Completed Tests:</h4>
        </footer>
      </body>
    </>
  );
}
