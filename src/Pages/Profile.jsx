import { Link } from "react-router-dom";
import "./Profile.css";
import { useAuth } from "../Auth/AuthContext";
import { useEffect, useState } from "react";

export default function Profile() {
  const { logout, token } = useAuth();
  const [username, setUsername] = useState("");
  const [activeGroups, setActiveGroups] = useState([]);
  const [activeAssignments, setActiveAssignments] = useState([]);

  useEffect(() => {
    async function getProfile() {
      if (!token) return;

      const response = await fetch(`${import.meta.env.VITE_API}/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const user = await response.json();
        setUsername(user.username);
      }
      const getGroup = await fetch(`${import.meta.env.VITE_API}/groups`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (getGroup.ok) {
        const groups = await getGroup.json();
        setActiveGroups(groups);
      }
      const getAssignments = await fetch(
        `${import.meta.env.VITE_API}/assignments`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (getAssignments.ok) {
        const assignments = await getAssignments.json();

        setActiveAssignments(
          assignments.filter((assignment) => !assignment.is_complete),
        );
      }
    }

    getProfile();
  }, [token]);
  return (
    <div className="profile-page">
      <header className="profile-topbar">
        <Link to="/" className="profile-logo" aria-label="Course Connect home">
          <span className="profile-cc-logo" aria-hidden="true">
            <span className="profile-cc-shape profile-cc-purple"></span>
            <span className="profile-cc-shape profile-cc-orange"></span>
          </span>

          <span className="profile-logo-text">
            Course <strong>Connect</strong>
          </span>
        </Link>

        <nav className="profile-nav">
          <Link to="/" className="profile-nav-link">
            Home
          </Link>

          <Link to="/Groups" className="profile-nav-link">
            Groups
          </Link>

          <Link to="/Study" className="profile-nav-link">
            Study
          </Link>

          <Link to="/Assignments" className="profile-nav-link">
            Assignments
          </Link>

          <Link to="/Profile" className="profile-nav-link active">
            Profile
          </Link>
        </nav>

        <div className="profile-nav-actions">
          <div className="profile-search-small">
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

          <div className="profile-circle">M</div>
        </div>
      </header>

      <main className="profile-main">
        <section className="profile-hero">
          <div className="profile-avatar">M</div>

          <div className="profile-hero-content">
            <p className="profile-eyebrow">YOUR PROFILE</p>

            <h1>
              Welcome back.
              <span>Keep growing.</span>
            </h1>

            <p>
              Your Course Connect space for keeping up with your groups,
              assignments, and study progress.
            </p>
          </div>

          <div className="profile-hero-note" aria-hidden="true">
            <p>
              Learn.
              <br />
              Connect.
              <br />
              Succeed.
            </p>
          </div>
        </section>

        <section className="profile-stats">
          <article className="profile-stat-card">
            <span className="profile-stat-icon purple">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="9" cy="8" r="3"></circle>
                <circle cx="17" cy="9" r="2"></circle>
                <path d="M3 19c0-3 2.7-5 6-5s6 2 6 5"></path>
                <path d="M15 14c3 0 5 1.7 5 4"></path>
              </svg>
            </span>

            <div>
              <strong>0</strong>
              <p>Active Groups</p>
            </div>
          </article>

          <article className="profile-stat-card">
            <span className="profile-stat-icon orange">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 5v14M5 12h14"></path>
              </svg>
            </span>

            <div>
              <strong>0</strong>
              <p>Created Groups</p>
            </div>
          </article>

          <article className="profile-stat-card">
            <span className="profile-stat-icon yellow">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="m5 12 4 4L19 6"></path>
              </svg>
            </span>

            <div>
              <strong>0</strong>
              <p>Completed</p>
            </div>
          </article>
        </section>

        <section className="profile-content-grid">
          <div className="profile-card">
            <div className="profile-card-heading">
              <div>
                <p>YOUR COMMUNITY</p>
                <h2>Active Groups</h2>
              </div>

              <Link to="/Groups">View Groups →</Link>
            </div>

            <div className="profile-empty">
              <span className="profile-empty-icon purple">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="9" cy="8" r="3"></circle>
                  <circle cx="17" cy="9" r="2"></circle>
                  <path d="M3 19c0-3 2.7-5 6-5s6 2 6 5"></path>
                  <path d="M15 14c3 0 5 1.7 5 4"></path>
                </svg>
              </span>

              <div>
                <h3>No active groups yet</h3>
                <p>Your study groups will appear here.</p>
              </div>
            </div>
          </div>

          <div className="profile-card">
            <div className="profile-card-heading">
              <div>
                <p>CREATED BY YOU</p>
                <h2>Created Groups</h2>
              </div>

              <Link to="/Groups">Create Group →</Link>
            </div>

            <div className="profile-empty">
              <span className="profile-empty-icon orange">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 5v14M5 12h14"></path>
                </svg>
              </span>

              <div>
                <h3>Start a new study group</h3>
                <p>Groups you create will show up here.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="profile-progress">
          <div className="profile-progress-heading">
            <div>
              <p>YOUR PROGRESS</p>
              <h2>Learning Activity</h2>
            </div>
          </div>

          <div className="profile-progress-grid">
            <article>
              <span className="progress-icon yellow">✓</span>

              <div>
                <strong>Completed Assignments</strong>
                <p>0 completed</p>
              </div>
            </article>

            <article>
              <span className="progress-icon purple">✦</span>

              <div>
                <strong>Completed Tests</strong>
                <p>0 completed</p>
              </div>
            </article>

            <article>
              <span className="progress-icon orange">○</span>

              <div>
                <strong>Posts</strong>
                <p>0 posts</p>
              </div>
            </article>
          </div>
        </section>

        <section className="profile-motivation">
          <span>✦</span>

          <div>
            <p>KEEP GOING</p>
            <h2>Every study session counts.</h2>
          </div>
        </section>

        <footer className="profile-footer">
          <span>Course Connect</span>

          <p>Study • Plan • Connect • Succeed</p>
        </footer>
      </main>
    </div>
    <>
      <nav>
        <Link to="/">Home </Link>
        <Link to="/Assignments">Assignments </Link>
        <Link to="/Groups">Groups </Link>
      </nav>
      <header>
        <h1>Course Connect</h1>
        <h2>Profile</h2>
        <h3>Welcome{username ? `, ${username}` : ""}!</h3>
        {token ? (
          <button onClick={logout}>Log Out</button>
        ) : (
          <Link to="/Login">Sign In</Link>
        )}
      </header>

      <h3>Active Groups:</h3>

      {activeGroups.length === 0 ? (
        <p>You haven't joined any groups yet.</p>
      ) : (
        activeGroups.map((group) => (
          <div key={group.group_id}>
            <Link to={`/Groups/${group.group_id}`}>{group.group_title}</Link>
          </div>
        ))
      )}
      <h3>Active Assignments:</h3>

      {!token ? (
        <p>Sign in to view your active assignments.</p>
      ) : activeAssignments.length === 0 ? (
        <p>You have no active assignments.</p>
      ) : (
        activeAssignments.map((assignment) => (
          <div key={assignment.assignment_id}>
            <h4>{assignment.assignment_name}</h4>
            <p>Group: {assignment.group_title}</p>
            <p>{assignment.assignment_description}</p>
            <p>
              Due:{" "}
              {assignment.due_date
                ? new Date(assignment.due_date).toLocaleDateString()
                : "No due date"}
            </p>
          </div>
        ))
      )}
    </>
  );
}
