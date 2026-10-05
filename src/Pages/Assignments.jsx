import { Link } from "react-router-dom";

export default function Assignments() {
  return (
    <>
      <nav>
        <Link to="/">Home </Link>
        <Link to="/Groups">Groups </Link>
        <Link to="/Profile">Profile </Link>
      </nav>
      <header>
        <h1>Course Connect</h1>
        <h2>Assignments</h2>
      </header>
      <body>
        <h4>My Assignments:</h4>
        <h5>Created by me:</h5>
        <footer>
          <h6>Completed Assignments:</h6>
        </footer>
      </body>
    </>
  );
}
