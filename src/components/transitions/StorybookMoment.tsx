import { useReveal } from "../../hooks/useReveal";

type StorybookMomentProps = {
  label: string;
  title?: string;
  children: React.ReactNode;
  metadata?: string;
  variant?: "default" | "diagram" | "archive";
};

export default function StorybookMoment({
  label,
  title,
  children,
  metadata,
  variant = "default",
}: StorybookMomentProps) {
  const { ref, visible } = useReveal<HTMLDivElement>(0.08);

  return (
    <div ref={ref} className={`storybook-moment storybook-${variant} ${visible ? "is-visible" : ""}`}>
      <div className="storybook-copy">
        <span className="storybook-label">{label}</span>
        {title && <h3>{title}</h3>}
        <div className="storybook-text">{children}</div>
        {metadata && <span className="storybook-metadata">{metadata}</span>}
      </div>
    </div>
  );
}
