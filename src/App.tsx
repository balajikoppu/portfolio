import { useState } from "react";

import HeroScene from "./three/scenes/HeroScene";
import { useExperience } from "./experience/useExperience";
import SmoothScroll from "./components/smooth-scroll/SmoothScroll";
import SelectedWork from "./components/work/SelectedWork";
import Capabilities from "./components/capabilities/Capabilities";
import AboutSection from "./components/about/AboutSection";
import ContactSection from "./components/contact/ContactSection";
import SectionTransition from "./components/transitions/SectionTransition";
import { transitions } from "./data/transitions";
import GlobalCursor from "./experience/cursor/GlobalCursor";
import CommandPalette from "./components/ui/CommandPalette";

import "./styles/global.css";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const {
    mobile,
    finePointer,
    reducedMotion,
    webgl,
    quality,
    experimental,
    scrollProgress,
    scrollVelocity,
  } = useExperience();
  const enhancedWebgl = webgl && quality !== "low";

  return (
    <SmoothScroll enabled={!reducedMotion}>
      <GlobalCursor enabled={finePointer && quality !== "low"} />
      <CommandPalette />
      <main id="top" className={`site-shell ${experimental ? "is-experimental" : ""}`}>
        {/* ================================
          NAVIGATION
      ================================= */}

        <nav className="navbar">
          <a href="/" className="brand" aria-label="Jai home">
            JAI<span className="brand-dot">.</span>
          </a>

          <div className={`nav-links ${menuOpen ? "is-open" : ""}`}>
            <a href="#work" onClick={() => setMenuOpen(false)}>WORK</a>
            <a href="#capabilities" onClick={() => setMenuOpen(false)}>CAPABILITIES</a>
            <a href="#about" onClick={() => setMenuOpen(false)}>ABOUT</a>
            <a href="#contact" onClick={() => setMenuOpen(false)}>CONTACT</a>
          </div>

          <button
            className="menu-button"
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((isOpen) => !isOpen)}
          >
            <span />
            <span />
          </button>
        </nav>

        {/* ================================
          HERO
      ================================= */}

        <section className="hero-preview">
          <div className="hero-meta">
            <span>01</span>
            <span>CREATIVE DEVELOPER / DIGITAL DESIGNER</span>
          </div>

          <div className="hero-content">
            <p className="eyebrow">01 — INTRODUCTION</p>

            <h1>
              BUILDING
              <br />
              <span>DIGITAL</span>
              <br />
              EXPERIENCES
              <span className="hero-period">.</span>
            </h1>

            <div className="hero-bottom">
              <p>
                I design and engineer systems that feel premium,
                <br />
                useful and unmistakably human.
              </p>

              <a href="#work" className="primary-link" data-cursor="explore">
                <span>Explore work</span>
                <span>↗</span>
              </a>
            </div>
          </div>

          {/* ================================
            3D HERO
        ================================= */}

          <div className="hero-object" aria-hidden="true">
              {enhancedWebgl ? (
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

        <SectionTransition
          {...transitions[0]}
          scrollProgress={scrollProgress}
          scrollVelocity={scrollVelocity}
          reducedMotion={reducedMotion}
          webgl={enhancedWebgl}
        />
  
        <SelectedWork />

        <SectionTransition
          {...transitions[1]}
          scrollProgress={scrollProgress}
          scrollVelocity={scrollVelocity}
          reducedMotion={reducedMotion}
          webgl={enhancedWebgl}
        />

        <Capabilities />

        <SectionTransition
          {...transitions[2]}
          scrollProgress={scrollProgress}
          scrollVelocity={scrollVelocity}
          reducedMotion={reducedMotion}
          webgl={enhancedWebgl}
        />

        <AboutSection
          scrollProgress={scrollProgress}
          scrollVelocity={scrollVelocity}
          reducedMotion={reducedMotion}
          webgl={enhancedWebgl}
        />

        <SectionTransition
          {...transitions[3]}
          scrollProgress={scrollProgress}
          scrollVelocity={scrollVelocity}
          reducedMotion={reducedMotion}
          webgl={enhancedWebgl}
        />

        <ContactSection
          scrollProgress={scrollProgress}
          scrollVelocity={scrollVelocity}
          reducedMotion={reducedMotion}
          webgl={enhancedWebgl}
        />
      </main>
    </SmoothScroll>
  );
}

export default App;
