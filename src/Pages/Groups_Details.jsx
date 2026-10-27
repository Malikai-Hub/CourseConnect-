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
  const [posts, setPosts] = useState([]);
  const [postError, setPostError] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [postNotes, setPostNotes] = useState("");

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

        //Updated so that it won't only show could not load assignments if your not in group
        if (response.status === 403) {
          setAssignments([]);
          setAssignmentError("");
          return;
        }

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

  async function handleCreatePost(e) {
    e.preventDefault();
    setPostError("");

    try {
      const response = await fetch(`${API}/groups/${groupId}/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          post_title: postTitle,
          notes: postNotes,
        }),
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const newPost = await response.json();

      setPosts((currentPosts) => [newPost, ...currentPosts]);
      setPostTitle("");
      setPostNotes("");
    } catch (error) {
      setPostError(error.message);
    }
  }

  useEffect(() => {
    async function getPosts() {
      try {
        setPostError("");

        const response = await fetch(`${API}/groups/${groupId}/posts`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 403) {
          setPosts([]);
          return;
        }

        if (!response.ok) {
          throw new Error("Could not load group posts.");
        }

        const data = await response.json();
        setPosts(data);
      } catch (error) {
        setPostError(error.message);
      }
    }

    if (token && group?.is_member) {
      getPosts();
    } else {
      setPosts([]);
    }
  }, [groupId, token, group?.is_member]);

  async function handleMember() {
    try {
      const isMember = group.is_member;

      const response = await fetch(
        isMember
          ? `${API}/groups/${groupId}/members/me`
          : `${API}/groups/${groupId}/members`,
        {
          method: isMember ? "DELETE" : "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const groupResponse = await fetch(`${API}/groups/${groupId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!groupResponse.ok) {
        throw new Error("Could not refresh group details.");
      }

      const updatedGroup = await groupResponse.json();
      setGroup(updatedGroup);

      //Refreshes assignment page after a user joins or leaves
      if (updatedGroup.is_member) {
        const assignmentsResponse = await fetch(
          `${API}/groups/${groupId}/assignments`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (assignmentsResponse.ok) {
          setAssignments(await assignmentsResponse.json());
        }
      } else {
        setAssignments([]);
      }
    } catch (error) {
      setError(error.message);
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
          <button onClick={handleMember}>Leave Group</button>
        ) : (
          <button onClick={handleMember}>Join Group</button>
        )
      ) : (
        <p>
          Please <Link to="/Login">log in</Link> to join this group.
        </p>
      )}

      <h2>Assignments</h2>

      {!token ? (
        <p>Please log in and join this group to see assignments.</p>
      ) : !group.is_member ? (
        <p>Join this group to see assignments.</p>
      ) : (
        <>
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
      )}

      <h2>Group Posts</h2>

      {!token ? (
        <p>Please log in to view group posts.</p>
      ) : !group.is_member ? (
        <p>Join this group to view and create posts.</p>
      ) : (
        <>
          {postError && <p>{postError}</p>}

          <form onSubmit={handleCreatePost}>
            <input
              type="text"
              placeholder="Post title..."
              value={postTitle}
              onChange={(event) => setPostTitle(event.target.value)}
              required
            />

            <input
              placeholder="Message..."
              value={postNotes}
              onChange={(event) => setPostNotes(event.target.value)}
              required
            />

            <button type="submit">Create Post</button>
          </form>

          {posts.length === 0 ? (
            <p>No posts yet. Start the conversation!</p>
          ) : (
            posts.map((post) => (
              <div key={post.post_id}>
                <h3>{post.post_title}</h3>
                <p>{post.notes}</p>
                <p>Posted by: {post.username}</p>
                <p>{new Date(post.created_at).toLocaleString()}</p>
              </div>
            ))
          )}
        </>
      )}
    </>
  );
}
//added extra functions for better accessability for the user
