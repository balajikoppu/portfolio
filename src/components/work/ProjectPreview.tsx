type ProjectPreviewProps = {
  type: "gradient" | "grid" | "orb";
  label: string;
};

export default function ProjectPreview({
  type,
  label,
}: ProjectPreviewProps) {
  return (
    <div
      className={`project-preview project-preview-${type}`}
      aria-hidden="true"
    >
      <div className="project-preview-noise" />

      {type === "orb" && (
        <div className="preview-orb">
          <div className="preview-orb-core" />
          <div className="preview-orb-ring" />
        </div>
      )}

      {type === "grid" && (
        <div className="preview-grid">
          {Array.from({ length: 36 }).map(
            (_, index) => (
              <span key={index} />
            ),
          )}
        </div>
      )}

      {type === "gradient" && (
        <div className="preview-gradient">
          <div />
          <div />
          <div />
        </div>
      )}

      <div className="preview-label">
        {label}
      </div>
    </div>
  );
}