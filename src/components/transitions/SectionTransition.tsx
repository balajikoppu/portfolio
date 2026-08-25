import { Canvas } from "@react-three/fiber";
import { useEffect } from "react";

import { useReveal } from "../../hooks/useReveal";
import type { TransitionVariant } from "../../data/transitions";
import GenerativeField from "./GenerativeField";

export type SectionTransitionProps = {
  id: string;
  variant: TransitionVariant;
  height: string;
  statement?: string;
  scrollProgress: React.MutableRefObject<number>;
  scrollVelocity: React.MutableRefObject<number>;
  reducedMotion?: boolean;
  webgl?: boolean;
};

export default function SectionTransition({ id, variant, height, statement, scrollProgress, scrollVelocity, reducedMotion = false, webgl = true }: SectionTransitionProps) {
  const reveal = useReveal<HTMLElement>(0.05);
  const isGenerative = variant === "generative";

  useEffect(() => {
    if (!reveal.ref.current || variant !== "statement") {
      return;
    }

    let frame = 0;
    const element = reveal.ref.current;

    const update = () => {
      element.style.setProperty("--scroll-progress", `${scrollProgress.current}`);
      frame = requestAnimationFrame(update);
    };

    frame = requestAnimationFrame(update);

    return () => cancelAnimationFrame(frame);
  }, [reveal.ref, scrollProgress, variant]);

  return (
    <section
      ref={reveal.ref}
      id={id}
      className={`section-transition transition-${variant} ${reveal.visible ? "is-visible" : ""}`}
      style={{ "--transition-height": height } as React.CSSProperties}
      aria-hidden="true"
    >
      {variant === "orb" && <div className="transition-orb"><span /></div>}

      {isGenerative && webgl && (
        <div className="transition-canvas">
          <Canvas dpr={[1, 1.2]} camera={{ position: [0, 0, 5], fov: 42 }} gl={{ antialias: false, alpha: true }} frameloop={reducedMotion ? "demand" : "always"}>
            <GenerativeField scrollProgress={scrollProgress} scrollVelocity={scrollVelocity} reducedMotion={reducedMotion} />
          </Canvas>
        </div>
      )}

      {isGenerative && !webgl && <div className="transition-field-fallback" />}

      {variant === "statement" && <p className="transition-statement">{statement}</p>}

      {variant === "cinematic" && (
        <>
          <div className="cinematic-material" />
          <p className="cinematic-label">IF YOU HAVE SOMETHING WORTH BUILDING...</p>
        </>
      )}
    </section>
  );
}
