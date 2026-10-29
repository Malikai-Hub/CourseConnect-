import { Link } from "react-router-dom";
import "../Pages/css/study.css";

export default function Study() {
  return (
    <div className="study-page">
      <header className="study-topbar">
        <Link to="/" className="study-logo" aria-label="Course Connect home">
          <span className="study-cc-logo" aria-hidden="true">
            <span className="study-cc-shape study-cc-purple"></span>
            <span className="study-cc-shape study-cc-orange"></span>
          </span>

          <span className="study-logo-text">
            Course <strong>Connect</strong>
          </span>
        </Link>

        <nav className="study-nav">
          <Link to="/" className="study-nav-link">
            Home
          </Link>

          <Link to="/Groups" className="study-nav-link">
            Groups
          </Link>

          <Link to="/Study" className="study-nav-link active">
            Study
          </Link>

          <Link to="/Assignments" className="study-nav-link">
            Assignments
          </Link>

          <Link to="/Profile" className="study-nav-link">
            Profile
          </Link>
        </nav>

        <div className="study-nav-actions">
          <div className="study-search-small">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="11" cy="11" r="6"></circle>
              <path d="m16 16 4 4"></path>
            </svg>

            <input
              type="search"
              placeholder="Search..."
              aria-label="Search Course Connect"
            />
          </div>

          <Link
            to="/Profile"
            className="study-profile-circle"
            aria-label="Profile"
          >
            M
          </Link>
        </div>
      </header>

      <main className="study-main">
        <section className="study-hero">
          <div className="study-hero-content">
            <p className="study-eyebrow">YOUR STUDY SPACE</p>

            <h1>
              Learn your way.
              <span>Remember more.</span>
            </h1>

            <p className="study-hero-description">
              Build study sets for your classes, organize what you're learning,
              and make review time easier.
            </p>
          </div>

          <div className="study-hero-decoration" aria-hidden="true">
            <div className="study-book-icon">
              <svg viewBox="0 0 24 24">
                <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H11v16H6.5A2.5 2.5 0 0 0 4 21.5z"></path>
                <path d="M20 5.5A2.5 2.5 0 0 0 17.5 3H13v16h4.5a2.5 2.5 0 0 1 2.5 2.5z"></path>
              </svg>
            </div>

            <p>
              Review.
              <br />
              Practice.
              <br />
              Grow.
            </p>
          </div>
        </section>

        <section className="study-tools">
          <div className="study-search-card">
            <div className="study-section-heading">
              <span className="study-heading-icon study-purple-icon">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="11" cy="11" r="6"></circle>
                  <path d="m16 16 4 4"></path>
                </svg>
              </span>

              <div>
                <p>FIND WHAT YOU NEED</p>
                <h2>Search Study Sets</h2>
              </div>
            </div>

            <form className="study-search-form">
              <input
                name="search"
                type="search"
                placeholder="Search for a study set..."
                aria-label="Search for study set"
              />

              <button type="button">Search</button>
            </form>
          </div>

          <div className="study-create-card">
            <div className="study-section-heading">
              <span className="study-heading-icon study-orange-icon">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 5v14M5 12h14"></path>
                </svg>
              </span>

              <div>
                <p>BUILD YOUR OWN</p>
                <h2>Create a Study Set</h2>
              </div>
            </div>

            <form className="study-create-form">
              <label>
                Study set name
                <input
                  name="name"
                  type="text"
                  placeholder="Example: Biology Chapter 5"
                  aria-label="Study set name"
                />
              </label>

              <label>
                Description
                <input
                  name="description"
                  type="text"
                  placeholder="What are you studying?"
                  aria-label="Study set description"
                />
              </label>

              <button type="button">
                Create Set
                <span>→</span>
              </button>
            </form>
          </div>
        </section>

        <section className="study-sets-section">
          <div className="study-sets-heading">
            <div>
              <p>KEEP LEARNING</p>
              <h2>My Study Sets</h2>
            </div>

            <span className="study-set-count">0 sets</span>
          </div>

          <div className="study-empty-state">
            <span className="study-empty-icon">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H11v16H6.5A2.5 2.5 0 0 0 4 21.5z"></path>
                <path d="M20 5.5A2.5 2.5 0 0 0 17.5 3H13v16h4.5a2.5 2.5 0 0 1 2.5 2.5z"></path>
              </svg>
            </span>

            <div>
              <h3>Your study sets will appear here</h3>
              <p>Create your first set and make studying a little easier.</p>
            </div>
          </div>
        </section>

        <section className="study-tip">
          <div className="study-tip-icon">✦</div>

          <div>
            <p>STUDY TIP</p>
            <h2>Small sessions add up.</h2>
            <span>
              Reviewing a little at a time can make big study sessions feel much
              more manageable.
            </span>
          </div>
        </section>

        <footer className="study-footer">
          <span>Course Connect</span>

          <p>Study • Plan • Connect • Succeed</p>
        </footer>
      </main>
    </div>
  );
}
