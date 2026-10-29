import { Link } from "react-router-dom";
import { useAuth } from "../Auth/authContext";
import { useState, useEffect } from "react";
import "./css/groups.css";

const API = import.meta.env.VITE_API;

export default function Group() {
  const { token } = useAuth();

  const [error, setError] = useState("");
  const [groups, setGroups] = useState([]);
  const [search, setSearch] = useState("");
  const [groupTitle, setGroupTitle] = useState("");
  const [groupDescription, setGroupDescription] = useState("");

  // Used BookBuddy to help me write useEffect
  useEffect(() => {
    const syncGroups = async () => {
      try {
        const response = await fetch(`${API}/groups/browse`);

        if (!response.ok) {
          throw new Error("Failed to load groups.");
        }

        const data = await response.json();
        setGroups(data);
      } catch (error) {
        setError(error.message);
      }
    };

    syncGroups();
  }, []);

  const filteredGroups = groups.filter((group) =>
    group.group_title.toLowerCase().includes(search.trim().toLowerCase()),
  );

  async function handleCreateGroup(e) {
    e.preventDefault();
    setError("");

    try {
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

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create group.");
      }

      setGroups((currentGroups) => [data, ...currentGroups]);
      setGroupTitle("");
      setGroupDescription("");
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div className="groups-page">
      {/* Navigation */}
      <nav className="groups-topbar">
        <Link to="/" className="groups-logo">
          <span className="groups-cc-logo" aria-hidden="true">
            <span className="groups-cc-shape groups-cc-purple" />
            <span className="groups-cc-shape groups-cc-orange" />
          </span>

          <span className="groups-logo-text">
            Course <strong>Connect</strong>
          </span>
        </Link>

        <div className="groups-nav">
          <Link to="/" className="groups-nav-link">
            Home
          </Link>
          <Link to="/Study" className="groups-nav-link">
            Study Sets
          </Link>
          <Link to="/Groups" className="groups-nav-link active">
            Groups
          </Link>
          <Link to="/Assignments" className="groups-nav-link">
            Assignments
          </Link>
        </div>

        <div className="groups-nav-actions">
          <Link
            to="/Profile"
            className="groups-profile-circle"
            aria-label="View profile"
          >
            👤
          </Link>
        </div>
      </nav>

      <main className="groups-main">
        {/* Hero section */}
        <section className="groups-hero">
          <div className="groups-hero-content">
            <p className="groups-eyebrow">LEARN TOGETHER</p>

            <h1>
              Find your
              <span>study people.</span>
            </h1>

            <p className="groups-hero-description">
              Connect with other students, discover study groups, and make
              learning a little less lonely.
            </p>
          </div>

          <div className="groups-hero-decoration">
            <span className="groups-people-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </span>
            <p>
              Better together,
              <br />
              one session at a time.
            </p>
          </div>
        </section>

        {/* Search and create group */}
        <section className="groups-tools">
          <div className="groups-search-card">
            <div className="groups-section-heading">
              <span className="groups-heading-icon groups-purple-icon">
                <svg viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-4-4" />
                </svg>
              </span>

              <div>
                <p>DISCOVER</p>
                <h2>Find a study group</h2>
              </div>
            </div>

            <form
              className="groups-search-form"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                name="search"
                type="search"
                placeholder="Search by group name..."
                aria-label="Search for a group"
              />
              <button type="submit">Search</button>
            </form>
          </div>

          <div className="groups-create-card">
            <div className="groups-section-heading">
              <span className="groups-heading-icon groups-orange-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </span>

              <div>
                <p>START SOMETHING</p>
                <h2>Create a study group</h2>
              </div>
            </div>

            {token ? (
              <form className="groups-create-form" onSubmit={handleCreateGroup}>
                <label>
                  Group name
                  <input
                    value={groupTitle}
                    onChange={(e) => setGroupTitle(e.target.value)}
                    placeholder="e.g. Biology Study Buddies"
                    required
                  />
                </label>

                <label>
                  Description
                  <input
                    value={groupDescription}
                    onChange={(e) => setGroupDescription(e.target.value)}
                    placeholder="What will your group study?"
                    required
                  />
                </label>

                <button type="submit">
                  <span aria-hidden="true">+</span> Create group
                </button>
              </form>
            ) : (
              <p className="groups-status">
                Please <Link to="/Login">log in</Link> to create a study group.
              </p>
            )}
          </div>
        </section>

        {/* Group list */}
        <section className="my-groups-section">
          <div className="my-groups-heading">
            <div>
              <p>YOUR NEXT STUDY SESSION STARTS HERE</p>
              <h2>Explore study groups</h2>
            </div>

            <span className="group-count">
              {filteredGroups.length}{" "}
              {filteredGroups.length === 1 ? "group" : "groups"}
            </span>
          </div>

          {error && <p className="groups-error">{error}</p>}

          {filteredGroups.length === 0 ? (
            <div className="groups-empty-state">
              <span className="groups-empty-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-4-4" />
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
                    : "Be the first to create a group and invite other students."}
                </p>
              </div>
            </div>
          ) : (
            <div className="groups-grid">
              {filteredGroups.map((group) => (
                <article className="group-card" key={group.group_id}>
                  <span className="group-card-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </span>

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
                    View group <span aria-hidden="true">→</span>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* Footer */}
        <footer className="groups-footer">
          <p>
            Made for students, <span>by students.</span>
          </p>
          <p>Course Connect © {new Date().getFullYear()}</p>
        </footer>
      </main>
    </div>
  );
}
