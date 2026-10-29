import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useAuth } from "../Auth/authContext";
import "../Pages/css/assignments.css";

const API = import.meta.env.VITE_API;

export default function Assignments() {
  const { token } = useAuth();
  const [searchParams] = useSearchParams();
  const groupId = searchParams.get("groupId");

  const [assignments, setAssignments] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [assignmentName, setAssignmentName] = useState("");
  const [assignmentDescription, setAssignmentDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getAssignments() {
      try {
        setLoading(true);
        setError("");

        const endpoint = groupId
          ? `${API}/groups/${groupId}/assignments`
          : `${API}/assignments`;

        const response = await fetch(endpoint, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const message = await response.text();
          throw new Error(message || "Could not load assignments.");
        }

        const data = await response.json();
        setAssignments(data);
      } catch (error) {
        console.error(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    if (token) {
      getAssignments();
    } else {
      setAssignments([]);
      setError("");
    }
  }, [token, groupId]);

  async function handleCreateAssignment(event) {
    event.preventDefault();

    if (!groupId) {
      setError("Select a study group before creating an assignment.");
      return;
    }

    try {
      setError("");

      const response = await fetch(`${API}/groups/${groupId}/assignments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          assignment_name: assignmentName,
          assignment_description: assignmentDescription,
          due_date: dueDate || null,
        }),
      });

      if (!response.ok) {
        const message = await response.text();
        throw new Error(message || "Could not create assignment.");
      }

      const newAssignment = await response.json();

      setAssignments((current) => [...current, newAssignment]);
      setAssignmentName("");
      setAssignmentDescription("");
      setDueDate("");
      setShowForm(false);
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  }

  async function handleDeleteAssignment(assignmentId) {
    try {
      setError("");

      const response = await fetch(`${API}/assignments/${assignmentId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const message = await response.text();
        throw new Error(message || "Could not delete assignment.");
      }

      setAssignments((current) =>
        current.filter(
          (assignment) => assignment.assignment_id !== assignmentId,
        ),
      );
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  }

  const activeAssignments = assignments.filter(
    (assignment) => !assignment.is_complete,
  );

  const completedAssignments = assignments.filter(
    (assignment) => assignment.is_complete,
  );

  const myAssignments = groupId
    ? assignments.filter(
        (assignment) =>
          assignment.created_by != null &&
          String(assignment.created_by) === String(assignments.currentUserId),
      )
    : [];

  return (
    <div className="assignments-page">
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

        <section className="assignments-welcome">
          <h2>One step at a time.</h2>
          <p>
            Every assignment is an opportunity to learn something new. Keep
            track of your group's work and make progress toward your goals.
          </p>
        </section>

        {!token && (
          <p className="assignments-notice">
            Please <Link to="/Login">log in</Link> to view your assignments.
          </p>
        )}

        {error && (
          <p className="assignments-error" role="alert">
            {error}
          </p>
        )}

        {token && (
          <>
            <section className="assignment-section">
              <div className="assignment-section-heading">
                <div>
                  <h2>{groupId ? "Group Assignments" : "My Assignments"}</h2>
                  <p>
                    {groupId
                      ? "Assignments for your selected study group."
                      : "Your assignments across your study groups."}
                  </p>
                </div>

                <div className="assignment-heading-actions">
                  <span className="assignment-count">
                    {assignments.length}{" "}
                    {assignments.length === 1 ? "assignment" : "assignments"}
                  </span>

                  {groupId && (
                    <button
                      type="button"
                      className="new-assignment-button"
                      onClick={() => setShowForm((current) => !current)}
                    >
                      {showForm ? "Cancel" : "+ New Assignment"}
                    </button>
                  )}
                </div>
              </div>

              {!groupId && (
                <div className="assignment-empty">
                  <span>👥</span>
                  <h3>Explore your study groups</h3>
                  <p>
                    Visit a group to create assignments specifically for that
                    group.
                  </p>
                  <Link to="/Groups">Go to Groups →</Link>
                </div>
              )}

              {showForm && groupId && (
                <form
                  className="assignment-form"
                  onSubmit={handleCreateAssignment}
                >
                  <h3>Create an Assignment</h3>

                  <label>
                    Assignment Name
                    <input
                      type="text"
                      value={assignmentName}
                      onChange={(event) =>
                        setAssignmentName(event.target.value)
                      }
                      placeholder="Example: Finish chapter 5"
                      required
                    />
                  </label>

                  <label>
                    Description
                    <textarea
                      value={assignmentDescription}
                      onChange={(event) =>
                        setAssignmentDescription(event.target.value)
                      }
                      placeholder="What do you need to complete?"
                      required
                    />
                  </label>

                  <label>
                    Due Date
                    <input
                      type="date"
                      value={dueDate}
                      onChange={(event) => setDueDate(event.target.value)}
                    />
                  </label>

                  <button type="submit" className="create-assignment-button">
                    Create Assignment
                  </button>
                </form>
              )}

              {loading && <p>Loading assignments...</p>}

              {!loading && !error && assignments.length === 0 && (
                <div className="assignment-empty">
                  <span>📝</span>
                  <h3>No assignments yet</h3>
                  <p>
                    {groupId
                      ? "Create the first assignment for this study group."
                      : "Assignments will appear here when you have work in your groups."}
                  </p>
                </div>
              )}

              {!loading && assignments.length > 0 && (
                <div className="assignment-list">
                  {assignments.map((assignment) => (
                    <article
                      className="assignment-card"
                      key={assignment.assignment_id}
                    >
                      <span className="assignment-card-icon">📝</span>

                      <div className="assignment-details">
                        <h3>{assignment.assignment_name}</h3>
                        <p>{assignment.assignment_description}</p>

                        {assignment.group_title && (
                          <p>
                            <strong>Group:</strong> {assignment.group_title}
                          </p>
                        )}

                        <p className="assignment-due">
                          <strong>Due:</strong>{" "}
                          {assignment.due_date
                            ? new Date(
                                `${String(assignment.due_date).slice(0, 10)}T00:00:00`,
                              ).toLocaleDateString()
                            : "No due date"}
                        </p>
                      </div>

                      <span className="assignment-status">
                        {assignment.is_complete ? "Completed" : "In progress"}
                      </span>

                      {groupId && (
                        <button
                          type="button"
                          onClick={() =>
                            handleDeleteAssignment(assignment.assignment_id)
                          }
                        >
                          Delete
                        </button>
                      )}
                    </article>
                  ))}
                </div>
              )}
            </section>

            <section className="assignment-section">
              <div className="assignment-section-heading">
                <div>
                  <h2>Active Assignments</h2>
                  <p>Work that still needs your attention.</p>
                </div>
                <span className="assignment-count">
                  {activeAssignments.length} active
                </span>
              </div>

              {activeAssignments.length === 0 && (
                <div className="assignment-empty">
                  <span>🎉</span>
                  <h3>You're all caught up!</h3>
                  <p>You don't have any active assignments in this view.</p>
                </div>
              )}
            </section>

            <section className="assignment-section">
              <div className="assignment-section-heading">
                <div>
                  <h2>Completed Assignments</h2>
                  <p>Look back at the work you've finished.</p>
                </div>
                <span className="assignment-count">
                  {completedAssignments.length} completed
                </span>
              </div>

              {completedAssignments.length === 0 && (
                <div className="assignment-empty">
                  <span>✓</span>
                  <h3>Your achievements start here</h3>
                  <p>
                    Completed assignments will appear here when their status is
                    marked as complete.
                  </p>
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
