import { Link } from "react-router-dom";

export default function Study() {
  return (
    <>
      <nav>
        <Link to="/">Home </Link>
        <Link to="/Profile">Profile </Link>
        <Link to="/Assignments">Assignments </Link>
        <Link to="/Groups">Groups </Link>
      </nav>
      <header>
        <h1>Course Connect</h1>
      </header>
      <body>
        <form>
          <label>
            <p>Search for study set:</p>
            <input
              name="search"
              type="search"
              placeholder="Search for set..."
              aria-label="Search for set"
            />
            <button>Search</button>
          </label>
        </form>
        <form>
          <p>Create study set:</p>
          <input
            name="name"
            type="name"
            placeholder="Enter name..."
            aria-label="Enter name"
          />
          <input
            name="description"
            type="description"
            placeholder="Enter description..."
            aria-label="Enter description"
          />
          <button>Create</button>
        </form>
        <h2>Study Sets:</h2>
      </body>
    </>
  );
}
