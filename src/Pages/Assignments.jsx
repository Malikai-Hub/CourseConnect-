import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../Auth/AuthContext";

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
