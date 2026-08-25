import { projects } from "../../data/projects";

export default function ProjectUniverse() {
  return (
    <nav className="project-universe" aria-label="Project universe">
      <span className="universe-core">CREATIVE<br />TECHNOLOGY</span>
      {projects.map((project, index) => (
        <a
          key={project.id}
          href={`#${project.id}`}
          className={`universe-node universe-node-${index + 1}`}
          data-cursor="view"
        >
          <span>{project.number}</span>
          <strong>{project.title}</strong>
        </a>
      ))}
    </nav>
  );
}
