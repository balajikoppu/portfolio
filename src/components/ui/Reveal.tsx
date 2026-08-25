import type {
  CSSProperties,
  ReactNode,
} from "react";

import { useReveal } from "../../hooks/useReveal";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export default function Reveal({
  children,
  className = "",
  delay = 0,
}: RevealProps) {
  const { ref, visible } =
    useReveal<HTMLDivElement>();

  const revealStyle = {
    "--reveal-delay": `${delay}ms`,
  } as CSSProperties;

  return (
    <div
      ref={ref}
      className={`reveal ${
        visible ? "is-visible" : ""
      } ${className}`}
      style={revealStyle}
    >
      {children}
    </div>
  );
}