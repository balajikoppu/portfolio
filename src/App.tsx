import "./styles/global.css";

function App() {
  return (
    <main className="site-shell">
      <nav className="navbar">
        <a href="/" className="brand" aria-label="Jai home">
          JAI<span className="brand-dot">.</span>
        </a>

        <div className="nav-links">
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>

        <button className="menu-button" type="button" aria-label="Open menu">
          <span />
          <span />
        </button>
      </nav>

      <section className="hero-preview">
        <div className="hero-meta">
          <span>SOFTWARE DEVELOPER</span>
          <span>AI × DIGITAL EXPERIENCES</span>
        </div>

        <div className="hero-content">
          <p className="eyebrow">01 — INTRODUCTION</p>

          <h1>
            I BUILD
            <br />
            <span>DIGITAL</span>
            <br />
            EXPERIENCES<span className="hero-period">.</span>
          </h1>

          <div className="hero-bottom">
            <p>
              Software, AI and engineering
              <br />
              shaped into meaningful products.
            </p>

            <a href="#work" className="primary-link">
              <span>Explore work</span>
              <span>↗</span>
            </a>
          </div>
        </div>

        <div className="hero-object" aria-hidden="true">
          <div className="object-core">
            <div className="object-ring object-ring-one" />
            <div className="object-ring object-ring-two" />
            <div className="object-center" />
          </div>
        </div>

        <div className="scroll-indicator">
          <span>SCROLL</span>
          <span className="scroll-line" />
          <span>↓</span>
        </div>
      </section>

      <section id="work" className="placeholder-section">
        <span>02</span>
        <h2>Selected Work</h2>
      </section>

      <section id="about" className="placeholder-section">
        <span>03</span>
        <h2>About</h2>
      </section>

      <section id="contact" className="placeholder-section">
        <span>04</span>
        <h2>Let's build.</h2>
      </section>
    </main>
  );
}

export default App;