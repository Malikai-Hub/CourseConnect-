import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../Auth/authContext";

const API = import.meta.env.VITE_API;

export default function Groups() {
  const { token } = useAuth();

  const [groups, setGroups] = useState([]);
  const [groupTitle, setGroupTitle] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Load the groups that the logged-in user belongs to
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

  // Create a new group
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

  return (
    <>
      <nav>
        <Link to="/">Home </Link>
        <Link to="/Study">Study Sets </Link>
        <Link to="/Assignments">Assignments </Link>
      </nav>

      <header>
        <h1>Course Connect</h1>
        <h2>Groups</h2>
      </header>

      <form>
        <p>Connect with other students</p>

        <input
          name="search"
          type="search"
          placeholder="Search for group..."
          aria-label="Search for group"
        />

        <button type="button">Search</button>
      </form>

      <form onSubmit={handleCreateGroup}>
        <p>Create group</p>

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
            placeholder="Group description..."
            required
          />
        </label>

        <button type="submit">Create</button>
      </form>

      {error && <p>{error}</p>}

      <section>
        <h2>My Groups</h2>

        {loading && <p>Loading groups...</p>}

        {!loading && !error && groups.length === 0 && (
          <p>You don't belong to any groups yet.</p>
        )}

        {groups.map((group) => (
          <article key={group.group_id}>
            <h3>{group.group_title}</h3>

            <p>{group.group_description}</p>

            <Link to={`/Assignments?groupId=${group.group_id}`}>
              View Assignments
            </Link>
          </article>
        ))}
      </section>
    </>
  );
}
