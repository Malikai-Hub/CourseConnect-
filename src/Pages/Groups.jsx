import { Link, Navigate } from "react-router-dom";

export default function Group() {
  return (
    <>
      <nav>
        <Link to="/">Home </Link>
        <Link to="/Study">Study Sets </Link>
        <Link to="/Assignments">Assignments </Link>
      </nav>
      <header>
        <h1>Course Connect</h1>
      </header>
      <body>
        <form>
          <p>Connect with other students</p>
          <input
            name="search"
            type="search"
            placeholder="Search for group..."
            aria-label="Search for group"
          />
          <button>Search</button>
        </form>
        <form>
          <p>Create group</p>
          <label>
            <input
              placeholder="Enter group name..."
              aria-label="Enter group name"
              required
            />
          </label>
          <label>
            <input
              placeholder="Group description..."
              aria-label="Group description"
              required
            />
          </label>
          <label>
            <input placeholder="Group image url..." aria-label="Group image" />
          </label>
          <button>Create</button>
        </form>
        <h2>Groups:</h2>
      </body>
    </>
  );
}
