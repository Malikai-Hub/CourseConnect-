import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../Auth/AuthContext";

const API = import.meta.env.VITE_API;

export default function GroupDetails() {
  const { groupId } = useParams();
  const { token } = useAuth();

  const [group, setGroup] = useState(null);
  const [error, setError] = useState("");
  const [assignments, setAssignments] = useState([]);
  const [assignmentError, setAssignmentError] = useState("");
  const [assignmentName, setAssignmentName] = useState("");
  const [assignmentDescription, setAssignmentDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    async function fetchGroup() {
      try {
        const response = await fetch(`${API}/groups/${groupId}`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });

        if (!response.ok) {
          throw new Error("Could not load group details.");
        }

        const data = await response.json();
        setGroup(data);
      } catch (error) {
        setError(error.message);
      }
    }

    fetchGroup();
  }, [groupId, token]);
  useEffect(() => {
    async function getAssignments() {
      try {
        const response = await fetch(`${API}/groups/${groupId}/assignments`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });

        if (!response.ok) {
          throw new Error("Could not load assignments.");
        }

        const data = await response.json();
        setAssignments(data);
      } catch (error) {
        setAssignmentError(error.message);
      }
    }

    if (token) {
      getAssignments();
    }
  }, [groupId, token]);
  async function handleCreateAssignment(e) {
    e.preventDefault();
    setAssignmentError("");

    try {
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
        throw new Error(await response.text());
      }

      const newAssignment = await response.json();

      setAssignments((currentAssignments) => [
        ...currentAssignments,
        newAssignment,
      ]);

      setAssignmentName("");
      setAssignmentDescription("");
      setDueDate("");
    } catch (error) {
      setAssignmentError(error.message);
    }
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!group) {
    return <p>Loading group details...</p>;
  }

  return (
    <>
      <nav>
        <Link to="/Groups">Back to Groups</Link>
      </nav>

      <h1>{group.group_title}</h1>
      <p>{group.group_description}</p>

      <p>Members:{group.member_count}</p>

      <p>
        Created:
        {new Date(group.created_date).toLocaleDateString()}
      </p>

      {token ? (
        group.is_member ? (
          <button>Leave Group</button>
        ) : (
          <button>Join Group</button>
        )
      ) : (
        <p>
          Please <Link to="/Login">log in</Link> to join this group.
        </p>
      )}

      <h2>Assignments</h2>

      {token && group.is_member && (
        <form onSubmit={handleCreateAssignment}>
          <input
            type="text"
            placeholder="Assignment name"
            value={assignmentName}
            onChange={(event) => setAssignmentName(event.target.value)}
            required
          />

          <input
            placeholder="Assignment description"
            value={assignmentDescription}
            onChange={(event) => setAssignmentDescription(event.target.value)}
            required
          />

          <input
            placeholder="Due date"
            type="date"
            value={dueDate}
            onChange={(event) => setDueDate(event.target.value)}
          />

          <button type="submit">Create Assignment</button>
        </form>
      )}

      {assignmentError && <p>{assignmentError}</p>}

      {assignments.length === 0 ? (
        <p>No assignments for this group yet.</p>
      ) : (
        assignments.map((assignment) => (
          <div key={assignment.assignment_id}>
            <h3>{assignment.assignment_name}</h3>
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
