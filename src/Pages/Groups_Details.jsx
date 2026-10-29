import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../Auth/authContext";
import "./css/groupDetails.css";

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
        setError("");

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

    if (token && group?.is_member) {
      getAssignments();
    } else {
      setAssignments([]);
    }
  }, [groupId, token, group?.is_member]);

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
      setError("");

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
    } catch (error) {
      setError(error.message);
    }
  }

  if (error && !group) {
    return (
      <div className="group-details-page">
        <nav className="group-details-topbar">
          <Link to="/Groups" className="group-details-logo">
            <span className="group-details-logo-mark">CC</span>
            <span>
              Course <strong>Connect</strong>
            </span>
          </Link>
        </nav>

        <main className="group-details-main">
          <p className="group-details-alert">{error}</p>
          <Link to="/Groups" className="group-details-back-link">
            ← Back to groups
          </Link>
        </main>
      </div>
    );
  }

  if (!group) {
    return (
      <div className="group-details-page">
        <nav className="group-details-topbar">
          <Link to="/Groups" className="group-details-logo">
            <span className="group-details-logo-mark">CC</span>
            <span>
              Course <strong>Connect</strong>
            </span>
          </Link>
        </nav>

        <main className="group-details-main">
          <p className="group-details-loading">Loading your study space...</p>
        </main>
      </div>
    );
  }

  return (
    <div className="group-details-page">
      {/* Navigation */}
      <nav className="group-details-topbar">
        <Link to="/" className="group-details-logo">
          <span className="group-details-logo-mark">CC</span>
          <span>
            Course <strong>Connect</strong>
          </span>
        </Link>

        <div className="group-details-nav-links">
          <Link to="/">Home</Link>
          <Link to="/Study">Study Sets</Link>
          <Link to="/Groups" className="active">
            Groups
          </Link>
          <Link to="/Assignments">Assignments</Link>
        </div>

        <Link
          to="/Profile"
          className="group-details-profile"
          aria-label="View profile"
        >
          👤
        </Link>
      </nav>

      <main className="group-details-main">
        {/* Group hero */}
        <header className="group-details-hero">
          <div className="group-details-hero-content">
            <Link to="/Groups" className="group-details-back-link">
              ← All study groups
            </Link>

            <p className="group-details-eyebrow">
              COURSE CONNECT / YOUR STUDY SPACE
            </p>

            <h1>{group.group_title}</h1>

            <p className="group-details-description">
              {group.group_description}
            </p>

            <div className="group-details-meta">
              <span>
                <span aria-hidden="true">♧</span>
                {group.member_count ?? 0}{" "}
                {group.member_count === 1 ? "member" : "members"}
              </span>

              <span>
                <span aria-hidden="true">◷</span>
                Created{" "}
                {group.created_date
                  ? new Date(group.created_date).toLocaleDateString()
                  : "date unavailable"}
              </span>
            </div>

            {token ? (
              <button
                type="button"
                className={
                  group.is_member
                    ? "group-details-member-button is-member"
                    : "group-details-member-button"
                }
                onClick={handleMember}
              >
                {group.is_member ? "✓  Joined group" : "+  Join group"}
              </button>
            ) : (
              <p className="group-details-login-message">
                <Link to="/Login">Log in</Link> to join this study group.
              </p>
            )}

            {error && <p className="group-details-alert">{error}</p>}
          </div>

          <div className="group-details-hero-art" aria-hidden="true">
            <div className="group-details-art-circle">
              <svg viewBox="0 0 24 24">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <p>Study better, together.</p>
          </div>
        </header>

        {/* Assignments */}
        <section className="group-details-panel">
          <div className="group-details-section-heading">
            <div className="group-details-heading-icon purple">
              <svg viewBox="0 0 24 24">
                <path d="M9 11l3 3L22 4" />
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
              </svg>
            </div>

            <div>
              <p className="group-details-section-label">STAY ON TRACK</p>
              <h2>Group assignments</h2>
              <p>Keep your group's upcoming work organized.</p>
            </div>

            <span className="group-details-count">
              {assignments.length}{" "}
              {assignments.length === 1 ? "assignment" : "assignments"}
            </span>
          </div>

          {!token ? (
            <p className="group-details-notice">
              Please log in and join this group to access assignments.
            </p>
          ) : !group.is_member ? (
            <p className="group-details-notice">
              Join this group to see and create assignments.
            </p>
          ) : (
            <>
              <form
                className="group-details-form"
                onSubmit={handleCreateAssignment}
              >
                <label>
                  Assignment name
                  <input
                    type="text"
                    placeholder="e.g. Chapter 4 review"
                    value={assignmentName}
                    onChange={(event) => setAssignmentName(event.target.value)}
                    required
                  />
                </label>

                <label>
                  Description
                  <input
                    type="text"
                    placeholder="What needs to get done?"
                    value={assignmentDescription}
                    onChange={(event) =>
                      setAssignmentDescription(event.target.value)
                    }
                    required
                  />
                </label>

                <label>
                  Due date
                  <input
                    type="date"
                    value={dueDate}
                    onChange={(event) => setDueDate(event.target.value)}
                  />
                </label>

                <button type="submit" className="group-details-primary-button">
                  + Create assignment
                </button>
              </form>

              {assignmentError && (
                <p className="group-details-alert">{assignmentError}</p>
              )}

              {assignments.length === 0 ? (
                <div className="group-details-empty">
                  <span aria-hidden="true">✎</span>
                  <h3>No assignments yet</h3>
                  <p>Create the first assignment for your study group.</p>
                </div>
              ) : (
                <div className="group-details-assignment-grid">
                  {assignments.map((assignment) => (
                    <article
                      className="group-details-assignment-card"
                      key={assignment.assignment_id}
                    >
                      <span className="group-details-card-tag">ASSIGNMENT</span>
                      <h3>{assignment.assignment_name}</h3>
                      <p>{assignment.assignment_description}</p>
                      <div className="group-details-due-date">
                        <span aria-hidden="true">◷</span>
                        <span>
                          <strong>Due:</strong>{" "}
                          {assignment.due_date
                            ? new Date(assignment.due_date).toLocaleDateString()
                            : "No due date"}
                        </span>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </>
          )}
        </section>

        {/* Group posts */}
        <section className="group-details-panel">
          <div className="group-details-section-heading">
            <div className="group-details-heading-icon orange">
              <svg viewBox="0 0 24 24">
                <path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5z" />
              </svg>
            </div>

            <div>
              <p className="group-details-section-label">SHARE & CONNECT</p>
              <h2>Group discussion</h2>
              <p>Share notes, ask questions, and learn from each other.</p>
            </div>

            <span className="group-details-count">
              {posts.length} {posts.length === 1 ? "post" : "posts"}
            </span>
          </div>

          {!token ? (
            <p className="group-details-notice">
              Please <Link to="/Login">log in</Link> to view group posts.
            </p>
          ) : !group.is_member ? (
            <p className="group-details-notice">
              Join this group to view and create posts.
            </p>
          ) : (
            <>
              {postError && <p className="group-details-alert">{postError}</p>}

              <form
                className="group-details-post-form"
                onSubmit={handleCreatePost}
              >
                <label>
                  Post title
                  <input
                    type="text"
                    placeholder="What would you like to discuss?"
                    value={postTitle}
                    onChange={(event) => setPostTitle(event.target.value)}
                    required
                  />
                </label>

                <label>
                  Your message
                  <textarea
                    placeholder="Share your notes or start a conversation..."
                    value={postNotes}
                    onChange={(event) => setPostNotes(event.target.value)}
                    rows={3}
                    required
                  />
                </label>

                <button type="submit" className="group-details-primary-button">
                  + Share post
                </button>
              </form>

              {posts.length === 0 ? (
                <div className="group-details-empty">
                  <span aria-hidden="true">✉</span>
                  <h3>Start the conversation</h3>
                  <p>No posts yet. Share something with your group!</p>
                </div>
              ) : (
                <div className="group-details-post-list">
                  {posts.map((post) => (
                    <article
                      className="group-details-post-card"
                      key={post.post_id}
                    >
                      <div
                        className="group-details-post-avatar"
                        aria-hidden="true"
                      >
                        {(post.username || "?").charAt(0).toUpperCase()}
                      </div>

                      <div className="group-details-post-body">
                        <div className="group-details-post-heading">
                          <div>
                            <h3>{post.post_title}</h3>
                            <p className="group-details-post-author">
                              Posted by {post.username || "Group member"}
                            </p>
                          </div>

                          <time>
                            {post.created_at
                              ? new Date(post.created_at).toLocaleString()
                              : ""}
                          </time>
                        </div>

                        <p className="group-details-post-notes">{post.notes}</p>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </>
          )}
        </section>

        <footer className="group-details-footer">
          <Link to="/Groups">← Explore more study groups</Link>
          <p>
            Course <strong>Connect</strong> · Made for students, by students.
          </p>
        </footer>
      </main>
    </div>
  );
}
