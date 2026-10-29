import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../Auth/AuthContext";
import "./css/assignments.css";

const API = import.meta.env.VITE_API;

export default function Assignments() {
  const { token } = useAuth();
  const [assignments, setAssignments] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getAssignments() {
      try {
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
      <nav className="assignments-nav">
        <Link to="/">Home</Link>
        <Link to="/Groups">Groups</Link>
        <Link to="/Profile">Profile</Link>
      </nav>

      <main className="assignments-content">
        <header className="assignments-header">
          <p className="assignments-eyebrow">COURSE CONNECT / YOUR WORK</p>
          <h1>Course Connect</h1>
          <h2>Assignments</h2>
          <p className="assignments-subtitle">
            Stay organized and keep track of your group's work.
          </p>
        </header>

        {error && <p className="assignments-error">{error}</p>}

        {!token && (
          <p className="assignments-notice">
            Please <Link to="/Login">log in</Link> to view assignments.
          </p>
        )}

        {token && !error && (
          <div className="assignments-sections">
            <section className="assignments-section">
              <div className="assignments-section-heading">
                <span className="assignments-icon assignments-icon-purple">
                  📚
                </span>
                <div>
                  <h3>My Assignments</h3>
                  <p>Your active assignments across your groups.</p>
                </div>
                <span className="assignments-count">
                  {activeAssignments.length}
                </span>
              </div>

              {activeAssignments.length === 0 ? (
                <p className="assignments-empty">No active assignments yet.</p>
              ) : (
                <div className="assignments-list">
                  {activeAssignments.map((assignment) => (
                    <article
                      className="assignment-card"
                      key={assignment.assignment_id}
                    >
                      <h4>{assignment.assignment_name}</h4>
                      <p>{assignment.assignment_description}</p>
                      <p className="assignment-group">
                        <strong>Group:</strong> {assignment.group_title}
                      </p>
                      <p className="assignment-due">
                        <strong>Due:</strong>{" "}
                        {assignment.due_date
                          ? new Date(assignment.due_date).toLocaleDateString()
                          : "No due date"}
                      </p>
                    </article>
                  ))}
                </div>
              )}
            </section>

            <section className="assignments-section">
              <div className="assignments-section-heading">
                <span className="assignments-icon assignments-icon-green">
                  ✏️
                </span>
                <div>
                  <h3>Created by Me</h3>
                  <p>Assignments you've created for your groups.</p>
                </div>
                <span className="assignments-count">
                  {myAssignments.length}
                </span>
              </div>

              {myAssignments.length === 0 ? (
                <p className="assignments-empty">
                  You haven't created any assignments yet.
                </p>
              ) : (
                <div className="assignments-list">
                  {myAssignments.map((assignment) => (
                    <article
                      className="assignment-card assignment-card-compact"
                      key={assignment.assignment_id}
                    >
                      <h4>{assignment.assignment_name}</h4>
                      <p className="assignment-group">
                        <strong>Group:</strong> {assignment.group_title}
                      </p>
                    </article>
                  ))}
                </div>
              )}
            </section>

            <section className="assignments-section">
              <div className="assignments-section-heading">
                <span className="assignments-icon assignments-icon-blue">
                  ✓
                </span>
                <div>
                  <h3>Completed Assignments</h3>
                  <p>Look back at the work you've finished.</p>
                </div>
                <span className="assignments-count">
                  {completedAssignments.length}
                </span>
              </div>

              {completedAssignments.length === 0 ? (
                <p className="assignments-empty">
                  No completed assignments yet.
                </p>
              ) : (
                <div className="assignments-list">
                  {completedAssignments.map((assignment) => (
                    <article
                      className="assignment-card assignment-card-completed"
                      key={assignment.assignment_id}
                    >
                      <h4>{assignment.assignment_name}</h4>
                      <p className="assignment-group">
                        <strong>Group:</strong> {assignment.group_title}
                      </p>
                    </article>
                  ))}
                </div>
              )}
            </section>
          </div>
        )}
      </main>

      <footer className="assignments-footer">
        <p>Course Connect · Learn together, achieve together.</p>
      </footer>
    </div>
  );
}
