import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../Auth/authContext";
import "./Groups.css";

const API = import.meta.env.VITE_API;

export default function Groups() {
  const { token } = useAuth();

  const [groups, setGroups] = useState([]);
  const [groupTitle, setGroupTitle] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getGroups() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`${API}/groups`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

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

    if (token) {
      getGroups();
    }
  }, [token]);

  async function handleCreateGroup(event) {
    event.preventDefault();

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

      setGroups((currentGroups) => [...currentGroups, newGroup]);

      setGroupTitle("");
      setGroupDescription("");
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  }

import { Link } from "react-router-dom";
import { useAuth } from "../Auth/AuthContext";
import { useState, useEffect } from "react";
const API = import.meta.env.VITE_API;

export default function Group() {
  const { token } = useAuth();
  const [error, setError] = useState("");
  const [groups, setGroups] = useState([]);
  const [search, setSearch] = useState("");
  const [groupTitle, setGroupTitle] = useState("");
  const [groupDescription, setGroupDescription] = useState("");

  //Used BookBuddy to help me write useEffect
  useEffect(() => {
    const syncGroups = async () => {
      try {
        const response = await fetch(`${API}/groups/browse`);

        if (!response.ok) {
          throw new Error("Error");
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
        throw new Error(data.error || "Failed to create group");
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

          <Link to="/Groups" className="groups-nav-link active">
            Groups
          </Link>

          <Link to="/Study" className="groups-nav-link">
            Study
          </Link>

          <Link to="/Assignments" className="groups-nav-link">
            Assignments
          </Link>

          <Link to="/Profile" className="groups-nav-link">
            Profile
          </Link>
        </nav>

        <div className="groups-nav-actions">
          <div className="groups-search-small">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="11" cy="11" r="6"></circle>
              <path d="m16 16 4 4"></path>
            </svg>

            <input
              type="search"
              placeholder="Search..."
              aria-label="Search Course Connect"
            />
          </div>

          <Link
            to="/Profile"
            className="groups-profile-circle"
            aria-label="Profile"
          >
            M
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

            <form className="groups-search-form">
              <input
                name="search"
                type="search"
                placeholder="Search for a group..."
                aria-label="Search for group"
              />

              <button type="button">Search</button>
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
                  onChange={(event) => setGroupDescription(event.target.value)}
                  placeholder="What will your group study?"
                  required
                />
              </label>

              <button type="submit">
                Create Group
                <span>→</span>
              </button>
            </form>
          </div>
        </section>

        {error && <div className="groups-error">{error}</div>}

        <section className="my-groups-section">
          <div className="my-groups-heading">
            <div>
              <p>YOUR COMMUNITY</p>
              <h2>My Groups</h2>
            </div>

            <span className="group-count">
              {groups.length} {groups.length === 1 ? "group" : "groups"}
            </span>
          </div>

          {loading && (
            <div className="groups-status">
              <p>Loading your groups...</p>
            </div>
          )}

          {!loading && !error && groups.length === 0 && (
            <div className="groups-empty-state">
              <span className="groups-empty-icon">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="9" cy="8" r="3"></circle>
                  <circle cx="17" cy="9" r="2"></circle>
                  <path d="M3 19c0-3 2.7-5 6-5s6 2 6 5"></path>
                  <path d="M15 14c3 0 5 1.7 5 4"></path>
                </svg>
              </span>

              <div>
                <h3>Your groups will appear here</h3>
                <p>Create your first group and start studying together.</p>
              </div>
            </div>
          )}

          {!loading && groups.length > 0 && (
            <div className="groups-grid">
              {groups.map((group) => (
                <article className="group-card" key={group.group_id}>
                  <div className="group-card-icon">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
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
                    to={`/Assignments?groupId=${group.group_id}`}
                    className="group-card-link"
                  >
                    View Assignments
                    <span>→</span>
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
      <form>
        <p>Connect with other students</p>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          name="search"
          type="search"
          placeholder="Search for group..."
          aria-label="Search for group"
        />
        {error && <p>{error}</p>}
      </form>
      {token ? (
        <>
          <form onSubmit={handleCreateGroup}>
            <p>Create group</p>
            <label>
              <input
                value={groupTitle}
                onChange={(e) => setGroupTitle(e.target.value)}
                placeholder="Enter group name..."
                aria-label="Enter group name"
                required
              />
            </label>
            <label>
              <input
                value={groupDescription}
                onChange={(e) => setGroupDescription(e.target.value)}
                placeholder="Group description..."
                aria-label="Group description"
                required
              />
            </label>
            <label>
              <input
                placeholder="Group image url..."
                aria-label="Group image"
              />
            </label>
            <button>Create</button>
          </form>
        </>
      ) : (
        <p>
          Please <Link to="/Login">log in</Link> to create or join a group.
        </p>
      )}
      <h2>Groups:</h2>
      {filteredGroups.map((group) => (
        <div key={group.group_id}>
          <h3>{group.group_title}</h3>
          <p>{group.group_description}</p>
          <Link to={`/Groups/${group.group_id}`}>View Group</Link>
        </div>
      ))}
    </>
  );
}
