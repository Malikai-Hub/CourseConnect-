import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../Auth/AuthContext";

const API = import.meta.env.VITE_API;

export default function GroupDetails() {
  const { groupId } = useParams();
  const { token } = useAuth();

  const [group, setGroup] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchGroup() {
      try {
        const response = await fetch(
          `${API}/groups/${groupId}`,
          {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
          },
          [groupId, token],
        );

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
  }, [groupId]);

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
    </>
  );
}
