import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useAuth } from "../Auth/authContext";
import "./Assignments.css";
import { Link } from "react-router-dom";
import { useAuth } from "../Auth/AuthContext";

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

  // Load assignments for the selected group
  useEffect(() => {
    async function getAssignments() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`${API}/groups/${groupId}/assignments`, {
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

    if (token && groupId) {
      getAssignments();
    }
  }, [token, groupId]);

  // Create a new assignment
  async function handleCreateAssignment(event) {
    event.preventDefault();

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

      setAssignments((currentAssignments) => [
        ...currentAssignments,
        newAssignment,
      ]);

      setAssignmentName("");
      setAssignmentDescription("");
      setDueDate("");
      setShowForm(false);
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  }

  // Delete an assignment
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

      setAssignments((currentAssignments) =>
        currentAssignments.filter(
          (assignment) => assignment.assignment_id !== assignmentId,
        ),
      );
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  }

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
            <p className="assignments-eyebrow">YOUR LEARNING SPACE</p>

            <h1>Assignments</h1>

            <p>Organize your tasks and keep track of your progress.</p>
          </div>

          <Link to="/" className="assignments-home-button">
            ← Dashboard
          </Link>
        </header>

        <section className="assignments-welcome">
          <h2>One task at a time!</h2>

          <p>Stay organized, manage your work, and celebrate your progress.</p>
        </section>

        <section className="assignment-section">
          <div className="assignment-section-heading">
            <div>
              <h2>My Assignments</h2>

              {groupId ? (
                <p>Assignments for your selected study group.</p>
              ) : (
                <p>Select a group to view its assignments.</p>
              )}
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
                  onClick={() => setShowForm(!showForm)}
                >
                  {showForm ? "Cancel" : "+ New Assignment"}
                </button>
              )}
            </div>
          </div>

          {!groupId && (
            <div className="assignment-empty">
              <span>👥</span>

              <h3>Choose a study group first</h3>

              <p>
                Go to Groups and select View Assignments for the group you want
                to work with.
              </p>

              <Link to="/Groups">Go to Groups →</Link>
            </div>
          )}

          {showForm && groupId && (
            <form className="assignment-form" onSubmit={handleCreateAssignment}>
              <h3>Create an Assignment</h3>

              <label>
                Assignment Name
                <input
                  type="text"
                  value={assignmentName}
                  onChange={(event) => setAssignmentName(event.target.value)}
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

          {error && <p>{error}</p>}

          {loading && <p>Loading assignments...</p>}

          {!loading && groupId && !error && assignments.length === 0 && (
            <div className="assignment-empty">
              <span>📝</span>

              <h3>No assignments yet</h3>

              <p>Create the first assignment for this study group.</p>
            </div>
          )}

          <div className="assignment-list">
            {assignments.map((assignment) => (
              <article
                className="assignment-card"
                key={assignment.assignment_id}
              >
                <div className="assignment-card-icon">📝</div>

                <div className="assignment-details">
                  <h3>{assignment.assignment_name}</h3>

                  <p>{assignment.assignment_description}</p>

                  <p className="assignment-due">
                    Due:{" "}
                    {assignment.due_date
                      ? new Date(
                          `${assignment.due_date}T00:00:00`,
                        ).toLocaleDateString()
                      : "No due date"}
                  </p>
                </div>

                <span className="assignment-status">
                  {assignment.is_complete ? "Completed" : "In progress"}
                </span>

                <button
                  type="button"
                  onClick={() =>
                    handleDeleteAssignment(assignment.assignment_id)
                  }
                >
                  Delete
                </button>
              </article>
            ))}
          </div>
        </section>

        <section className="assignment-section">
          <div className="assignment-section-heading">
            <div>
              <h2>Completed Assignments</h2>

              <p>Keep track of the work you've finished.</p>
            </div>
          </div>

          <div className="assignment-empty">
            <span>✅</span>

            <h3>Completed assignments coming next</h3>

            <p>
              We'll connect completion after the backend endpoint is confirmed.
            </p>
          </div>
        </section>

        <footer className="assignments-footer">
          Course Connect · Learn together, grow together.
        </footer>
      </main>
    </div>
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
    <>
      <nav>
        <Link to="/">Home</Link> <Link to="/Groups">Groups</Link>{" "}
        <Link to="/Profile">Profile</Link>
      </nav>

      <header>
        <h1>Course Connect</h1>
        <h2>Assignments</h2>
      </header>

      {error && <p>{error}</p>}

      {!token && (
        <p>
          Please <Link to="/Login">log in</Link> to view assignments.
        </p>
      )}

      {token && !error && (
        <>
          <section>
            <h3>My Assignments</h3>
            {activeAssignments.length === 0 ? (
              <p>No active assignments yet.</p>
            ) : (
              activeAssignments.map((assignment) => (
                <article key={assignment.assignment_id}>
                  <h4>{assignment.assignment_name}</h4>
                  <p>{assignment.assignment_description}</p>
                  <p>Group: {assignment.group_title}</p>
                  <p>
                    Due:{" "}
                    {assignment.due_date
                      ? new Date(assignment.due_date).toLocaleDateString()
                      : "No due date"}
                  </p>
                </article>
              ))
            )}
          </section>

          <section>
            <h3>Created by Me</h3>
            {myAssignments.length === 0 ? (
              <p>You haven't created any assignments yet.</p>
            ) : (
              myAssignments.map((assignment) => (
                <p key={assignment.assignment_id}>
                  {assignment.assignment_name} — {assignment.group_title}
                </p>
              ))
            )}
          </section>

          <section>
            <h3>Completed Assignments</h3>
            {completedAssignments.length === 0 ? (
              <p>No completed assignments yet.</p>
            ) : (
              completedAssignments.map((assignment) => (
                <p key={assignment.assignment_id}>
                  {assignment.assignment_name} — {assignment.group_title}
                </p>
              ))
            )}
          </section>
        </>
      )}

      <footer></footer>
    </>
  );
}
