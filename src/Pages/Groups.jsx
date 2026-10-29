import { Link } from "react-router-dom";
import { useAuth } from "../Auth/AuthContext";
import { useState, useEffect } from "react";
const API = import.meta.env.VITE_API;
import "./css/groups.css";

export default function Group() {
  const { token } = useAuth();
  const [error, setError] = useState("");
  const [groups, setGroups] = useState([]);
  const [search, setSearch] = useState("");
  const [groupTitle, setGroupTitle] = useState("");
  const [groupDescription, setGroupDescription] = useState("");

  //Used BookBuddy to help me write useEffect
  useEffect(() => {
    const syncGroups = async () => {
      try {
        const response = await fetch(`${API}/groups/browse`);

        if (!response.ok) {
          throw new Error("Error");
        }

        const data = await response.json();
        setGroups(data);
      } catch (error) {
        setError(error.message);
      }
    };

    syncGroups();
  }, []);

  const filteredGroups = groups.filter((group) =>
    group.group_title.toLowerCase().includes(search.trim().toLowerCase()),
  );

  async function handleCreateGroup(e) {
    e.preventDefault();
    setError("");

    try {
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

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create group");
      }

      setGroups((currentGroups) => [data, ...currentGroups]);
      setGroupTitle("");
      setGroupDescription("");
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div className="groups-page">
      <nav>
        <Link to="/">Home </Link>
        <Link to="/Study">Study Sets </Link>
        <Link to="/Assignments">Assignments </Link>
      </nav>

      <header className="groups-header">
        <h1>Course Connect</h1>
        <p className="groups-subtitle">
          Connect with other students and find your study group.
        </p>
      </header>

      <main className="groups-content">
        <form className="groups-panel groups-search">
          <p>Connect with other students</p>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            name="search"
            type="search"
            placeholder="Search for group..."
            aria-label="Search for group"
          />
          {error && <p className="groups-error">{error}</p>}
        </form>

        {token ? (
          <>
            <form
              className="groups-panel create-group-form"
              onSubmit={handleCreateGroup}
            >
              <p>Create group</p>
              <label>
                <input
                  value={groupTitle}
                  onChange={(e) => setGroupTitle(e.target.value)}
                  placeholder="Enter group name..."
                  aria-label="Enter group name"
                  required
                />
              </label>
              <label>
                <input
                  value={groupDescription}
                  onChange={(e) => setGroupDescription(e.target.value)}
                  placeholder="Group description..."
                  aria-label="Group description"
                  required
                />
              </label>
              <label>
                <input
                  placeholder="Group image url..."
                  aria-label="Group image"
                />
              </label>
              <button>Create</button>
            </form>
          </>
        ) : (
          <p className="groups-login-message">
            Please <Link to="/Login">log in</Link> to create or join a group.
          </p>
        )}

        <h2 className="groups-list-heading">Groups:</h2>

        <div className="groups-grid">
          {filteredGroups.map((group) => (
            <div className="group-card" key={group.group_id}>
              <h3>{group.group_title}</h3>
              <p>{group.group_description}</p>
              <Link to={`/Groups/${group.group_id}`}>View Group</Link>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
