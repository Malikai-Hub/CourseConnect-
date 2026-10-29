import { Link } from "react-router-dom";
import "./css/Home.css";

export default function Home() {
  return (
    <div className="home-page">
      {/* TOP NAVIGATION */}
      <header className="topbar">
        <Link to="/" className="logo">
          <span className="cc-logo" aria-hidden="true">
            <span className="cc-shape cc-blue"></span>
            <span className="cc-shape cc-coral"></span>
          </span>

          <span className="logo-text">
            Course <strong>Connect</strong>
          </span>
        </Link>

        <nav className="top-nav">
          <Link to="/" className="top-nav-link active">
            Home
          </Link>
          <Link to="#" className="top-nav-link">
            Study
          </Link>
          <Link to="/Groups" className="top-nav-link">
            Groups
          </Link>
          <Link to="/Assignments" className="top-nav-link">
            Assignments
          </Link>
        </nav>

        <div className="nav-actions">
          <Link
            to="/Profile"
            className="profile-circle"
            aria-label="My profile"
          >
            👤
          </Link>
        </div>
      </header>

      <main className="home-main">
        {/* HERO SECTION */}
        <section className="hero">
          <div className="hero-content">
            <p className="hero-eyebrow">YOUR LEARNING SPACE</p>

            <h1>
              Learn better.
              <span> Together.</span>
            </h1>

            <p className="hero-description">
              Stay organized, connect with classmates, and make every study
              session count.
            </p>

            <div className="hero-actions">
              <Link to="/Groups" className="button button-dark">
                Explore study groups →
              </Link>

              <Link to="/Study" className="button button-light">
                Start studying
              </Link>
            </div>
          </div>

          <div className="hero-note" aria-hidden="true">
            <span className="note-arrow">↗</span>
            <p>Small steps,</p>
            <p>big achievements!</p>
          </div>
        </section>

        {/* QUICK ACTIONS */}
        <section className="quick-actions">
          <Link to="/Groups" className="quick-card">
            <span className="quick-icon icon-blue">👥</span>
            <span>
              <strong>Study Groups</strong>
              <small>Learn with classmates</small>
            </span>
            <span className="quick-arrow">→</span>
          </Link>

          <Link to="/Assignments" className="quick-card">
            <span className="quick-icon icon-coral">📝</span>
            <span>
              <strong>Assignments</strong>
              <small>Stay on top of deadlines</small>
            </span>
            <span className="quick-arrow">→</span>
          </Link>

          <Link to="/Study" className="quick-card">
            <span className="quick-icon icon-green">💡</span>
            <span>
              <strong>Study Tools</strong>
              <small>Build your knowledge</small>
            </span>
            <span className="quick-arrow">→</span>
          </Link>

          <Link to="/Profile" className="quick-card">
            <span className="quick-icon icon-purple">👤</span>
            <span>
              <strong>My Profile</strong>
              <small>View your account</small>
            </span>
            <span className="quick-arrow">→</span>
          </Link>
        </section>

        {/* DASHBOARD CARDS */}
        <section className="dashboard-grid">
          <div className="dashboard-card">
            <div className="card-heading">
              <div>
                <p className="card-kicker">STAY ORGANIZED</p>
                <h2>Upcoming Tasks</h2>
              </div>

              <Link to="/Assignments">View all →</Link>
            </div>

            <div className="empty-state">
              <span className="empty-icon icon-coral">📝</span>
              <div>
                <h3>Ready to get things done?</h3>
                <p>
                  Visit your assignments to review your tasks and deadlines.
                </p>
              </div>
            </div>

            <Link to="/Assignments" className="button button-dark">
              View assignments →
            </Link>
          </div>

          <div className="dashboard-card continue-card">
            <div className="card-heading">
              <div>
                <p className="card-kicker">KEEP LEARNING</p>
                <h2>Continue Studying</h2>
              </div>
            </div>

            <div className="study-preview">
              <span className="study-preview-icon">📖</span>
              <div>
                <h3>Your next study session</h3>
                <p>
                  Take a moment to review material and strengthen your
                  understanding.
                </p>
              </div>

              <Link
                to="/Study"
                className="play-button"
                aria-label="Start studying"
              >
                →
              </Link>
            </div>
          </div>

          <div className="dashboard-card">
            <div className="card-heading">
              <div>
                <p className="card-kicker">LEARN TOGETHER</p>
                <h2>Your Study Community</h2>
              </div>

              <Link to="/Groups">Explore →</Link>
            </div>

            <div className="empty-state">
              <span className="empty-icon icon-blue">👥</span>
              <div>
                <h3>Learning is better together</h3>
                <p>
                  Find a group, share ideas, and connect with other students.
                </p>
              </div>
            </div>

            <Link to="/Groups" className="button button-light">
              Explore groups →
            </Link>
          </div>
        </section>

        {/* BOTTOM SECTION */}
        <section className="bottom-grid">
          <div className="activity-card">
            <div className="card-heading">
              <div>
                <p className="card-kicker">YOUR PROGRESS</p>
                <h2>Recent Activity</h2>
              </div>
            </div>

            <div className="activity-empty">
              <span className="activity-dot"></span>
              <div>
                <h3>Your learning journey starts here</h3>
                <p>
                  Explore groups, work on assignments, and make progress toward
                  your goals.
                </p>
              </div>
            </div>
          </div>

          <div className="promo-card">
            <div className="promo-content">
              <p>YOUR NEXT CHAPTER</p>
              <h2>
                Make time
                <br />
                to grow.
              </h2>
              <span>
                Every study session is another step toward your goals.
              </span>
            </div>

            <Link to="/Study" className="promo-button">
              Start learning →
            </Link>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="home-footer">
          <p>
            <span>Course Connect</span> · Learn together, grow together.
          </p>
          <p>Keep showing up for yourself.</p>
        </footer>
      </main>
    </div>
  );
}
