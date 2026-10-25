import { Link } from "react-router-dom";
import "./Assignments.css";

export default function Assignments() {
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
              <p>Tasks you're working on.</p>
            </div>

            <span className="assignment-count">
              {sampleAssignments.length} examples
            </span>
          </div>

          <div className="assignment-list">
            {sampleAssignments.map((assignment) => (
              <article className="assignment-card" key={assignment.id}>
                <div className="assignment-card-icon">📝</div>
                <div className="assignment-details">
                  <h3>{assignment.title}</h3>
                  <p>{assignment.course}</p>

                  <p className="assignment-due">Due: {assignment.due}</p>
                </div>

                <span className="assignment-status">{assignment.status}</span>
              </article>
            ))}
          </div>
          <p className="sample-notice">
            These are sample assignments for the layout, not saved tasks.
          </p>
        </section>

        <section className="assignment-section">
          <div className="assignment-section-heading">
            <div>
              <h2>Created by Me</h2>
              <p>Assignments you create for your study sessions.</p>
            </div>
          </div>

          <div className="assignment-empty">
            <span>✏️</span>
            <h3>Your created assignments will appear here</h3>

            <p>
              We'll connect this section to your backend after checking the
              available API routes.
            </p>
          </div>
        </section>

        <section className="assignment-section">
          <div className="assignment-section-heading">
            <div>
              <h2>Completed Assignments</h2>
              <p>Keep track of work you've finished.</p>
            </div>
          </div>

          <div className="assignment-empty">
            <span>✅</span>
            <h3>No completed assignments to display yet</h3>
          </div>
        </section>

        <footer className="assignments-footer">
          Course Connect · Learn together, grow together.
        </footer>
      </main>
    </div>
  );
}
