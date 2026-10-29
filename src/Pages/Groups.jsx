import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../Auth/authContext";
import "../Pages/css/groups.css";

const API = import.meta.env.VITE_API;

export default function Groups() {
  const { token } = useAuth();

  const [groups, setGroups] = useState([]);
  const [groupTitle, setGroupTitle] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Load all public groups, whether the visitor is logged in or not.
  useEffect(() => {
    async function getGroups() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`${API}/groups/browse`);

        if (!response.ok) {
          const message = await response.text();
          throw new Error(message || "Could not load groups.");
        }

        const data = await response.json();
        setGroups(data);
      } catch (error) {
        console.error(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    getGroups();
  }, []);

  async function handleCreateGroup(event) {
    event.preventDefault();

    if (!token) {
      setError("Please log in to create a study group.");
      return;
    }

    try {
      setError("");

      const response = await fetch(`${API}/groups`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          group_title: groupTitle,
          group_description: groupDescription,
        }),
      });

      if (!response.ok) {
        const message = await response.text();
        throw new Error(message || "Could not create group.");
      }

      const newGroup = await response.json();

      // Add the new group to the displayed list.
      setGroups((currentGroups) => [...currentGroups, newGroup]);
      setGroupTitle("");
      setGroupDescription("");
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  }

  const filteredGroups = groups.filter((group) =>
    group.group_title.toLowerCase().includes(search.trim().toLowerCase()),
  );

  return (
    <div className="groups-page">
      <header className="groups-topbar">
        <Link to="/" className="groups-logo" aria-label="Course Connect home">
          <span className="groups-cc-logo" aria-hidden="true">
            <span className="groups-cc-shape groups-cc-purple"></span>
            <span className="groups-cc-shape groups-cc-orange"></span>
          </span>

          <span className="groups-logo-text">
            Course <strong>Connect</strong>
          </span>
        </Link>

        <nav className="groups-nav">
          <Link to="/" className="groups-nav-link">
            Home
          </Link>
          <Link to="/Study" className="groups-nav-link">
            Study
          </Link>
          <Link to="/Groups" className="groups-nav-link active">
            Groups
          </Link>
          <Link to="/Assignments" className="groups-nav-link">
            Assignments
          </Link>
        </nav>

        <div className="groups-nav-actions">
          <Link
            to="/Profile"
            className="groups-profile-circle"
            aria-label="View profile"
          >
            👤
          </Link>
        </div>
      </header>

      <main className="groups-main">
        <section className="groups-hero">
          <div className="groups-hero-content">
            <p className="groups-eyebrow">LEARN TOGETHER</p>

            <h1>
              Find your people.
              <span>Study smarter together.</span>
            </h1>

            <p className="groups-hero-description">
              Create a study group, connect with classmates, and keep everyone
              moving toward the same goal.
            </p>
          </div>

          <div className="groups-hero-decoration" aria-hidden="true">
            <div className="groups-people-icon">
              <svg viewBox="0 0 24 24">
                <circle cx="9" cy="8" r="3"></circle>
                <circle cx="17" cy="9" r="2"></circle>
                <path d="M3 19c0-3 2.7-5 6-5s6 2 6 5"></path>
                <path d="M15 14c3 0 5 1.7 5 4"></path>
              </svg>
            </div>

            <p>
              Connect.
              <br />
              Collaborate.
              <br />
              Grow.
            </p>
          </div>
        </section>

        <section className="groups-tools">
          <div className="groups-search-card">
            <div className="groups-section-heading">
              <span className="groups-heading-icon groups-purple-icon">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="11" cy="11" r="6"></circle>
                  <path d="m16 16 4 4"></path>
                </svg>
              </span>

              <div>
                <p>FIND YOUR COMMUNITY</p>
                <h2>Search Groups</h2>
              </div>
            </div>

            <form
              className="groups-search-form"
              onSubmit={(event) => event.preventDefault()}
            >
              <input
                name="search"
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search for a group..."
                aria-label="Search for a group"
              />

              <button type="submit">Search</button>
            </form>
          </div>

          <div className="groups-create-card">
            <div className="groups-section-heading">
              <span className="groups-heading-icon groups-orange-icon">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 5v14M5 12h14"></path>
                </svg>
              </span>

              <div>
                <p>START SOMETHING NEW</p>
                <h2>Create a Group</h2>
              </div>
            </div>

            {token ? (
              <form className="groups-create-form" onSubmit={handleCreateGroup}>
                <label>
                  Group name
                  <input
                    value={groupTitle}
                    onChange={(event) => setGroupTitle(event.target.value)}
                    placeholder="Enter group name..."
                    required
                  />
                </label>

                <label>
                  Group description
                  <input
                    value={groupDescription}
                    onChange={(event) =>
                      setGroupDescription(event.target.value)
                    }
                    placeholder="What will your group study?"
                    required
                  />
                </label>

                <button type="submit">
                  Create Group <span>→</span>
                </button>
              </form>
            ) : (
              <p className="groups-status">
                Please <Link to="/Login">log in</Link> to create a study group.
              </p>
            )}
          </div>
        </section>

        {error && (
          <div className="groups-error" role="alert">
            {error}
          </div>
        )}

        <section className="my-groups-section">
          <div className="my-groups-heading">
            <div>
              <p>YOUR COMMUNITY</p>
              <h2>Study Groups</h2>
            </div>

            <span className="group-count">
              {filteredGroups.length}{" "}
              {filteredGroups.length === 1 ? "group" : "groups"}
            </span>
          </div>

          {loading && (
            <div className="groups-status">
              <p>Loading study groups...</p>
            </div>
          )}

          {!loading && !error && filteredGroups.length === 0 && (
            <div className="groups-empty-state">
              <span className="groups-empty-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <circle cx="9" cy="8" r="3"></circle>
                  <circle cx="17" cy="9" r="2"></circle>
                  <path d="M3 19c0-3 2.7-5 6-5s6 2 6 5"></path>
                  <path d="M15 14c3 0 5 1.7 5 4"></path>
                </svg>
              </span>

              <div>
                <h3>
                  {search.trim()
                    ? "No matching groups found"
                    : "No study groups yet"}
                </h3>
                <p>
                  {search.trim()
                    ? "Try another group name or clear your search."
                    : "Be the first to create a group and start studying together."}
                </p>
              </div>
            </div>
          )}

          {!loading && filteredGroups.length > 0 && (
            <div className="groups-grid">
              {filteredGroups.map((group) => (
                <article className="group-card" key={group.group_id}>
                  <div className="group-card-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24">
                      <circle cx="9" cy="8" r="3"></circle>
                      <circle cx="17" cy="9" r="2"></circle>
                      <path d="M3 19c0-3 2.7-5 6-5s6 2 6 5"></path>
                      <path d="M15 14c3 0 5 1.7 5 4"></path>
                    </svg>
                  </div>

                  <div className="group-card-content">
                    <p className="group-label">STUDY GROUP</p>
                    <h3>{group.group_title}</h3>
                    <p className="group-description">
                      {group.group_description}
                    </p>
                  </div>

                  <Link
                    to={`/Groups/${group.group_id}`}
                    className="group-card-link"
                  >
                    View group <span>→</span>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </section>

        <footer className="groups-footer">
          <span>Course Connect</span>
          <p>Study • Plan • Connect • Succeed</p>
        </footer>
      </main>
    </div>
  );
}
