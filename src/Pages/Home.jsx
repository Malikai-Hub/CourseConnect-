import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
  return (
    <div className="dashboard">
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-icon">🎓</span>
          <h2>Course Connect</h2>
        </div>

        <p className="menu-label">MENU</p>

        <nav className="sidebar-nav">
          <Link to="/" className="nav-link active">
            🏠 Dashboard
          </Link>
          <Link to="/Study" className="nav-link">
            📚 Study
          </Link>
          <Link to="/Groups" className="nav-link">
            👥 Groups
          </Link>
          <Link to="/Assignments" className="nav-link">
            📝 Assignments
          </Link>
          <Link to="/Profile" className="nav-link">
            👤 Profile
          </Link>
        </nav>

        <div className="sidebar-bottom">
          <p>Ready to learn something new?</p>
          <Link to="/Study" className="study-button">
            Start studying →
          </Link>
        </div>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-header">
          <div>
            <p className="eyebrow">YOUR LEARNING SPACE</p>
            <h1>Welcome to Course Connect!</h1>
            <p className="subtitle">
              Stay organized, study smarter, and learn together.
            </p>
          </div>
          <Link to="/Profile" className="profile-button">
            My Profile →
          </Link>
        </header>

        <section className="welcome-card">
          <div>
            <p className="welcome-label">YOUR JOURNEY STARTS HERE</p>
            <h2>Small steps lead to big achievements.</h2>
            <p>Make today a great day to learn something new.</p>
            <Link to="/Study" className="primary-button">
              Explore Study Tools →
            </Link>
          </div>
          <div className="welcome-emoji" aria-hidden="true">
            📖
          </div>
        </section>

        <section className="dashboard-section">
          <div className="section-heading">
            <div>
              <h2>Your Learning Hub</h2>
              <p>Quick access to your study activities.</p>
            </div>
          </div>

          <div className="feature-grid">
            <Link to="/Assignments" className="feature-card">
              <span className="feature-icon purple">📝</span>
              <h3>Upcoming Tasks</h3>
              <p>Keep track of your assignments and deadlines.</p>
              <span className="card-link">View assignments →</span>
            </Link>

            <Link to="/Groups" className="feature-card">
              <span className="feature-icon green">👥</span>
              <h3>Study Sessions</h3>
              <p>Connect with classmates and learn together.</p>
              <span className="card-link">Explore groups →</span>
            </Link>

            <Link to="/Study" className="feature-card">
              <span className="feature-icon orange">💡</span>
              <h3>Recent Study Sets</h3>
              <p>Find study materials and review what you've learned.</p>
              <span className="card-link">Start reviewing →</span>
            </Link>

            <Link to="/Groups" className="feature-card">
              <span className="feature-icon blue">💬</span>
              <h3>Recent Post Replies</h3>
              <p>Continue conversations with your study community.</p>
              <span className="card-link">Visit groups →</span>
            </Link>
          </div>
        </section>

        <footer className="dashboard-footer">
          <p>Course Connect · Learn together, grow together.</p>
        </footer>
      </main>
    </div>
  );
}
