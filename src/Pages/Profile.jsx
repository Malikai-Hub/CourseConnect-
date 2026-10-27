import { Link } from "react-router-dom";
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
