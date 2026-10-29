import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../Auth/authContext";
import "./css/assignments.css";

const API = import.meta.env.VITE_API;

export default function Assignments() {
  const { token } = useAuth();
  const [assignments, setAssignments] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getAssignments() {
      try {
        setError("");

        const response = await fetch(`${API}/assignments`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const message = await response.text();
          throw new Error(`Error ${response.status}: ${message}`);
        }

        const data = await response.json();
        setAssignments(data);
      } catch (error) {
        setError(error.message);
      }
    }

    if (token) {
      getAssignments();
    } else {
      setAssignments([]);
      setError("");
    }
  }, [token]);

  const completedAssignments = assignments.filter(
    (assignment) => assignment.is_complete,
  );

  const activeAssignments = assignments.filter(
    (assignment) => !assignment.is_complete,
  );

  const userId = token ? JSON.parse(atob(token.split(".")[1])).id : null;

  const myAssignments = assignments.filter(
    (assignment) => assignment.created_by === Number(userId),
  );

  return (
    <div className="assignments-page">
      {/* SIDEBAR */}
      <aside className="assignments-sidebar">
        <Link to="/" className="assignments-brand">
          🎓 Course Connect
        </Link>

        <p className="assignments-menu-label">MENU</p>

        <nav className="assignments-nav">
          <Link to="/">🏠 Dashboard</Link>
          <Link to="/Study">📚 Study</Link>
          <Link to="/Groups">👥 Groups</Link>
          <Link to="/Assignments" className="selected">
            📝 Assignments
          </Link>
          <Link to="/Profile">👤 Profile</Link>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="assignments-main">
        <header className="assignments-header">
          <div>
            <p className="assignments-eyebrow">COURSE CONNECT / YOUR WORK</p>
            <h1>Assignments</h1>
            <p>
              Stay organized, keep track of deadlines, and celebrate your
              progress.
            </p>
          </div>

          <Link to="/" className="assignments-home-button">
            ← Back Home
          </Link>
        </header>

        {/* WELCOME BANNER */}
        <section className="assignments-welcome">
          <h2>One step at a time.</h2>
          <p>
            Every assignment is an opportunity to learn something new. Keep
            track of your group's work and make progress toward your goals.
          </p>
        </section>

        {error && (
          <p className="assignments-error" role="alert">
            {error}
          </p>
        )}

        {!token && (
          <p className="assignments-notice">
            Please <Link to="/Login">log in</Link> to view your assignments.
          </p>
        )}

        {/* ASSIGNMENT SECTIONS */}
        {token && !error && (
          <>
            {/* ACTIVE ASSIGNMENTS */}
            <section className="assignment-section">
              <div className="assignment-section-heading">
                <div>
                  <h2>My Assignments</h2>
                  <p>Your active assignments across your groups.</p>
                </div>

                <div className="assignment-heading-actions">
                  <span className="assignment-count">
                    {activeAssignments.length} active
                  </span>
                </div>
              </div>

              {activeAssignments.length === 0 ? (
                <div className="assignment-empty">
                  <span>📚</span>
                  <h3>You're all caught up!</h3>
                  <p>
                    You don't have any active assignments right now. Check your
                    groups for new work.
                  </p>
                  <Link to="/Groups">Explore your groups →</Link>
                </div>
              ) : (
                <div className="assignment-list">
                  {activeAssignments.map((assignment) => (
                    <article
                      className="assignment-card"
                      key={assignment.assignment_id}
                    >
                      <span className="assignment-card-icon">📝</span>

                      <div className="assignment-details">
                        <h3>{assignment.assignment_name}</h3>

                        <p>{assignment.assignment_description}</p>

                        <p>
                          <strong>Group:</strong> {assignment.group_title}
                        </p>

                        <p className="assignment-due">
                          <strong>Due:</strong>{" "}
                          {assignment.due_date
                            ? new Date(assignment.due_date).toLocaleDateString()
                            : "No due date"}
                        </p>
                      </div>

                      <span className="assignment-status">In progress</span>
                    </article>
                  ))}
                </div>
              )}
            </section>

            {/* ASSIGNMENTS CREATED BY THE USER */}
            <section className="assignment-section">
              <div className="assignment-section-heading">
                <div>
                  <h2>Created by Me</h2>
                  <p>Assignments you've created for your groups.</p>
                </div>

                <div className="assignment-heading-actions">
                  <span className="assignment-count">
                    {myAssignments.length} created
                  </span>
                </div>
              </div>

              {myAssignments.length === 0 ? (
                <div className="assignment-empty">
                  <span>✏️</span>
                  <h3>No assignments created yet</h3>
                  <p>
                    When you create assignments for your groups, they'll appear
                    here.
                  </p>
                  <Link to="/Groups">Visit your groups →</Link>
                </div>
              ) : (
                <div className="assignment-list">
                  {myAssignments.map((assignment) => (
                    <article
                      className="assignment-card"
                      key={assignment.assignment_id}
                    >
                      <span className="assignment-card-icon">✏️</span>

                      <div className="assignment-details">
                        <h3>{assignment.assignment_name}</h3>

                        <p>
                          <strong>Group:</strong> {assignment.group_title}
                        </p>

                        <p className="assignment-due">
                          <strong>Due:</strong>{" "}
                          {assignment.due_date
                            ? new Date(assignment.due_date).toLocaleDateString()
                            : "No due date"}
                        </p>
                      </div>

                      <span className="assignment-status">
                        {assignment.is_complete ? "Completed" : "In progress"}
                      </span>
                    </article>
                  ))}
                </div>
              )}
            </section>

            {/* COMPLETED ASSIGNMENTS */}
            <section className="assignment-section">
              <div className="assignment-section-heading">
                <div>
                  <h2>Completed Assignments</h2>
                  <p>Look back at the work you've finished.</p>
                </div>

                <div className="assignment-heading-actions">
                  <span className="assignment-count">
                    {completedAssignments.length} completed
                  </span>
                </div>
              </div>

              {completedAssignments.length === 0 ? (
                <div className="assignment-empty">
                  <span>✓</span>
                  <h3>Your achievements start here</h3>
                  <p>
                    Completed assignments will appear here when their status is
                    marked as complete.
                  </p>
                </div>
              ) : (
                <div className="assignment-list">
                  {completedAssignments.map((assignment) => (
                    <article
                      className="assignment-card"
                      key={assignment.assignment_id}
                    >
                      <span className="assignment-card-icon">✅</span>

                      <div className="assignment-details">
                        <h3>{assignment.assignment_name}</h3>

                        <p>
                          <strong>Group:</strong> {assignment.group_title}
                        </p>

                        <p>{assignment.assignment_description}</p>
                      </div>

                      <span className="assignment-status">Completed</span>
                    </article>
                  ))}
                </div>
              )}
            </section>
          </>
        )}

        <footer className="assignments-footer">
          <p>Course Connect · Learn together, achieve together.</p>
        </footer>
      </main>
    </div>
  );
}
