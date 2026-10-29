import { Link } from "react-router-dom";
import { useAuth } from "../Auth/AuthContext";
import { useEffect, useState } from "react";
import "./css/profile.css";

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
      <nav className="profile-nav">
        <Link to="/">Home</Link>
        <Link to="/Assignments">Assignments</Link>
        <Link to="/Groups">Groups</Link>
      </nav>

      <main className="profile-content">
        <header className="profile-header">
          <h1>Course Connect</h1>
          <h2>Profile</h2>
          <h3>Welcome{username ? `, ${username}` : ""}!</h3>

          {token ? (
            <button className="profile-logout-button" onClick={logout}>
              Log Out
            </button>
          ) : (
            <Link className="profile-signin-button" to="/Login">
              Sign In
            </Link>
          )}
        </header>

        <div className="profile-sections">
          <section className="profile-section">
            <h3>Active Groups:</h3>

            {activeGroups.length === 0 ? (
              <p className="profile-empty">
                You haven't joined any groups yet.
              </p>
            ) : (
              <div className="profile-group-list">
                {activeGroups.map((group) => (
                  <div className="profile-group-card" key={group.group_id}>
                    <Link to={`/Groups/${group.group_id}`}>
                      {group.group_title}
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className="profile-section">
            <h3>Active Assignments:</h3>

            {!token ? (
              <p className="profile-empty">
                Sign in to view your active assignments.
              </p>
            ) : activeAssignments.length === 0 ? (
              <p className="profile-empty">You have no active assignments.</p>
            ) : (
              <div className="profile-assignment-list">
                {activeAssignments.map((assignment) => (
                  <div
                    className="profile-assignment-card"
                    key={assignment.assignment_id}
                  >
                    <h4>{assignment.assignment_name}</h4>
                    <p className="profile-assignment-group">
                      Group: {assignment.group_title}
                    </p>
                    <p>{assignment.assignment_description}</p>
                    <p className="profile-assignment-due">
                      Due:{" "}
                      {assignment.due_date
                        ? new Date(assignment.due_date).toLocaleDateString()
                        : "No due date"}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
