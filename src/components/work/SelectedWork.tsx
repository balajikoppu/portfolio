import { useEffect, useRef, useState } from "react";

import { projects } from "../../data/projects";
import ProjectPreview from "./ProjectPreview";
import ProjectUniverse from "./ProjectUniverse";
import Reveal from "../ui/Reveal";

export default function SelectedWork() {
  const sectionRef = useRef<HTMLElement>(null);

  const [activeProject, setActiveProject] = useState<string | null>(null);

  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      if (!previewRef.current) {
        return;
      }

      const x = event.clientX;
      const y = event.clientY;

      previewRef.current.style.transform = `translate3d(${x + 28}px, ${y - 180}px, 0)`;
    };

    window.addEventListener("pointermove", handlePointerMove);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

  const active = projects.find((project) => project.id === activeProject);

  return (
    <section ref={sectionRef} id="work" className="work-section">
      <Reveal>
        <div className="section-header">
          <span className="section-number">02</span>

          <span className="section-label">SELECTED WORK</span>
        </div>
      </Reveal>

      <div className="work-intro">
        <Reveal>
          <h2>
            BUILT TO
            <br />
            <span>MATTER.</span>
          </h2>
        </Reveal>

        <Reveal>
          <p>
            A selection of products, systems and experiments built across
            software, artificial intelligence and engineering.
          </p>
        </Reveal>
      </div>

      <ProjectUniverse />

      <div className="project-list">
        {projects.map((project, index) => (
          <Reveal key={project.id} delay={index * 90}>
            <article
              id={project.id}
              className="project-row"
              key={project.id}
              tabIndex={0}
              onPointerEnter={() => setActiveProject(project.id)}
              onPointerLeave={() => setActiveProject(null)}
              onFocus={() => setActiveProject(project.id)}
              onBlur={() => setActiveProject(null)}
            >
              <div className="project-number">{project.number}</div>

              <div className="project-main">
                <p className="project-category">{project.category}</p>

                <h3>{project.title}</h3>

                <p className="project-description">{project.description}</p>

                <div className="project-tech">
                  {project.technologies.map((technology) => (
                    <span key={technology}>{technology}</span>
                  ))}
                </div>
              </div>

              <div className="project-year">{project.year}</div>

              <div className="project-arrow" aria-hidden="true">
                ↗
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <div
        ref={previewRef}
        className={`project-preview-floating ${
          activeProject ? "is-visible" : ""
        }`}
      >
        {active && (
          <ProjectPreview
            type={active.visual.type}
            label={active.visual.label}
          />
        )}
      </div>
    </section>
  );
}
