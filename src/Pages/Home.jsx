import { Link } from "react-router-dom";
import "../Pages/css/Home.css";

export default function Home() {
  return (
    <div className="home-page">
      <header className="topbar">
        <Link to="/" className="logo" aria-label="Course Connect home">
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
          <Link to="/Groups" className="top-nav-link">
            Groups
          </Link>
          <Link to="/Study" className="top-nav-link">
            Study
          </Link>
          <Link to="/Assignments" className="top-nav-link">
            Assignments
          </Link>
        </nav>

        <div className="nav-actions">
          <Link
            to="/Profile"
            className="profile-circle"
            aria-label="View profile"
          >
            👤
          </Link>
        </div>
      </header>

      <main className="home-main">
        <section className="hero">
          <div className="hero-glow hero-glow-blue"></div>
          <div className="hero-glow hero-glow-coral"></div>

          <div className="hero-content">
            <p className="hero-eyebrow">GOOD TO SEE YOU</p>

            <h1>
              Study together.
              <span>Go further.</span>
            </h1>

            <p className="hero-description">
              Your classes. Your people. A more connected way to learn.
            </p>

            <div className="hero-actions">
              <Link to="/Groups" className="button button-dark">
                Join a Study Group <span>→</span>
              </Link>

              <Link to="/Study" className="button button-light">
                Create Study Set
              </Link>
            </div>
          </div>

          <div className="hero-note" aria-hidden="true">
            <span className="note-arrow">↗</span>
            <p>
              Same classes.
              <br />
              Brighter brains.
            </p>
          </div>
        </section>

        <section className="quick-actions" aria-label="Quick actions">
          <Link to="/Groups" className="quick-card">
            <span className="quick-icon icon-blue">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="9" cy="8" r="3"></circle>
                <circle cx="17" cy="9" r="2"></circle>
                <path d="M3 19c0-3 2.7-5 6-5s6 2 6 5"></path>
                <path d="M15 14c3 0 5 1.7 5 4"></path>
              </svg>
            </span>
            <span>
              <strong>Find a Group</strong>
              <small>Connect with classmates</small>
            </span>
            <span className="quick-arrow">→</span>
          </Link>

          <Link to="/Study" className="quick-card">
            <span className="quick-icon icon-coral">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M4 5.5c3-1 5-.5 8 1.5v12c-3-2-5-2.5-8-1.5z"></path>
                <path d="M20 5.5c-3-1-5-.5-8 1.5v12c3-2 5-2.5 8-1.5z"></path>
              </svg>
            </span>
            <span>
              <strong>Create a Study Set</strong>
              <small>Build your study materials</small>
            </span>
            <span className="quick-arrow">→</span>
          </Link>

          <Link to="/Assignments" className="quick-card">
            <span className="quick-icon icon-green">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <rect x="4" y="5" width="16" height="15" rx="2"></rect>
                <path d="M8 3v4M16 3v4M4 10h16"></path>
              </svg>
            </span>
            <span>
              <strong>View Assignments</strong>
              <small>Stay on top of due dates</small>
            </span>
            <span className="quick-arrow">→</span>
          </Link>

          <Link to="/Profile" className="quick-card">
            <span className="quick-icon icon-purple">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="12" cy="8" r="3"></circle>
                <path d="M5 20c0-4 3-6 7-6s7 2 7 6"></path>
              </svg>
            </span>
            <span>
              <strong>My Profile</strong>
              <small>View your account</small>
            </span>
            <span className="quick-arrow">→</span>
          </Link>
        </section>

        <section className="dashboard-grid">
          <article className="dashboard-card">
            <div className="card-heading">
              <div>
                <p className="card-kicker">STAY ON TRACK</p>
                <h2>Upcoming Assignments</h2>
              </div>
              <Link to="/Assignments">View all →</Link>
            </div>

            <div className="empty-state">
              <span className="empty-icon icon-green">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M7 3h7l4 4v14H7z"></path>
                  <path d="M14 3v5h5M10 13h5M10 17h5"></path>
                </svg>
              </span>
              <div>
                <h3>Your assignments will appear here</h3>
                <p>Keep track of upcoming work and deadlines.</p>
              </div>
            </div>

            <Link to="/Assignments" className="button button-dark">
              View assignments →
            </Link>
          </article>

          <article className="dashboard-card">
            <div className="card-heading">
              <div>
                <p className="card-kicker">LEARN TOGETHER</p>
                <h2>Your Groups</h2>
              </div>
              <Link to="/Groups">View all →</Link>
            </div>

            <div className="empty-state">
              <span className="empty-icon icon-coral">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="9" cy="8" r="3"></circle>
                  <circle cx="17" cy="9" r="2"></circle>
                  <path d="M3 19c0-3 2.7-5 6-5s6 2 6 5"></path>
                  <path d="M15 14c3 0 5 1.7 5 4"></path>
                </svg>
              </span>
              <div>
                <h3>Your study groups will appear here</h3>
                <p>Join a group and start learning with classmates.</p>
              </div>
            </div>

            <Link to="/Groups" className="button button-light">
              Explore groups →
            </Link>
          </article>

          <article className="dashboard-card continue-card">
            <div className="card-heading">
              <div>
                <p className="card-kicker">KEEP GOING</p>
                <h2>Continue Studying</h2>
              </div>
              <Link to="/Study">View all →</Link>
            </div>

            <div className="study-preview">
              <span className="study-preview-icon">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M5 4h14v16H5z"></path>
                  <path d="M8 8h8M8 12h6M8 16h5"></path>
                </svg>
              </span>
              <div className="study-preview-text">
                <h3>Ready when you are.</h3>
                <p>Your recent study sets will appear here.</p>
              </div>
              <Link
                to="/Study"
                className="play-button"
                aria-label="Start studying"
              >
                →
              </Link>
            </div>
          </article>
        </section>

        <section className="bottom-grid">
          <article className="activity-card">
            <div className="card-heading">
              <div>
                <p className="card-kicker">YOUR COMMUNITY</p>
                <h2>Recent Activity</h2>
              </div>
              <Link to="/Groups">Explore →</Link>
            </div>

            <div className="activity-empty">
              <span className="activity-dot"></span>
              <div>
                <h3>Nothing new yet</h3>
                <p>
                  Group posts, replies, and study activity will show up here.
                </p>
              </div>
            </div>
          </article>

          <article className="promo-card">
            <div className="promo-glow"></div>
            <div className="promo-content">
              <p>BETTER TOGETHER</p>
              <h2>
                Connect.
                <br />
                Study.
                <br />
                Grow.
              </h2>
              <span>Learning is better with your people.</span>
            </div>
            <Link to="/Groups" className="promo-button">
              Explore Groups →
            </Link>
          </article>
        </section>

        <footer className="home-footer">
          <span>Course Connect</span>
          <p>Learn together. Go further.</p>
        </footer>
      </main>
    </div>
  );
}
