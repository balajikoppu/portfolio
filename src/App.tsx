import { useEffect, useState } from "react";

import HeroScene from "./three/scenes/HeroScene";
import { useScrollProgress } from "./hooks/useScrollProgress";
import { isMobileDevice } from "./lib/device";
import { supportsWebGL } from "./lib/webgl";
import SmoothScroll from "./components/smooth-scroll/SmoothScroll";
import SelectedWork from "./components/work/SelectedWork";
import Capabilities from "./components/capabilities/Capabilities";

import "./styles/global.css";

function App() {
  const { progress: scrollProgress, velocity: scrollVelocity } =
    useScrollProgress();

  const [mobile, setMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [webgl, setWebgl] = useState(true);

  useEffect(() => {
    setMobile(isMobileDevice());
    setWebgl(supportsWebGL());

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updateMotionPreference = () => {
      setReducedMotion(mediaQuery.matches);
    };

    updateMotionPreference();

    mediaQuery.addEventListener("change", updateMotionPreference);

    return () => {
      mediaQuery.removeEventListener("change", updateMotionPreference);
    };
  }, []);

  return (
    <SmoothScroll enabled={!reducedMotion}>
      <main className="site-shell">
        {/* ================================
          NAVIGATION
      ================================= */}

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

        {/* ================================
          HERO
      ================================= */}

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
              EXPERIENCES
              <span className="hero-period">.</span>
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

          {/* ================================
            3D HERO
        ================================= */}

          <div className="hero-object" aria-hidden="true">
            {webgl ? (
              <HeroScene
                scrollProgress={scrollProgress}
                scrollVelocity={scrollVelocity}
                reducedMotion={reducedMotion}
                mobile={mobile}
              />
            ) : (
              <div className="hero-fallback">
                <div className="fallback-core" />
              </div>
            )}
          </div>

          {/* ================================
            SCROLL INDICATOR
        ================================= */}

          <div className="scroll-indicator">
            <span>SCROLL</span>

            <span className="scroll-line" />

            <span>↓</span>
          </div>
        </section>

  
        <SelectedWork />

        <Capabilities />

        <section id="about" className="placeholder-section">
          <span>03</span>

          <h2>About</h2>
        </section>

        <section id="contact" className="placeholder-section">
          <span>04</span>

          <h2>Let's build.</h2>
        </section>
      </main>
    </SmoothScroll>
  );
}

export default App;
