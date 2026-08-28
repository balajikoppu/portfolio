import { Canvas } from "@react-three/fiber";
import { useEffect } from "react";

import { useReveal } from "../../hooks/useReveal";
import type { TransitionVariant } from "../../data/transitions";
import GenerativeField from "./GenerativeField";
import { story } from "../../data/story";
import StorybookMoment from "./StorybookMoment";
import ViewportPresence from "../ui/ViewportPresence";

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
  const { ref: revealRef, visible: revealVisible } = useReveal<HTMLElement>(0.05);
  const isGenerative = variant === "generative";

  useEffect(() => {
    if (!revealRef.current || variant !== "statement") {
      return;
    }

    let frame = 0;
    const element = revealRef.current;

    const update = () => {
      element.style.setProperty("--scroll-progress", `${scrollProgress.current}`);
      frame = requestAnimationFrame(update);
    };

    frame = requestAnimationFrame(update);

    return () => cancelAnimationFrame(frame);
  }, [revealRef, scrollProgress, variant]);

  return (
    <section
      ref={revealRef}
      id={id}
      className={`section-transition transition-${variant} ${revealVisible ? "is-visible" : ""}`}
      style={{ "--transition-height": height } as React.CSSProperties}
      aria-hidden="true"
    >
      {variant === "orb" && <div className="transition-orb"><span /></div>}

      {id === "hero-work" && (
        <StorybookMoment label="STORYBOOK / 01" title="THE FIRST BUILD" metadata="WEATHER APP / HTML / CSS / JAVASCRIPT">
          <p>It started small. A simple weather app.</p>
          <p>I was trying to understand how an idea could become something real.</p>
          <span className="storybook-note">FIRST QUESTION<br />How do I make this work?</span>
          <p>Then the question changed. How do I make this feel real?</p>
        </StorybookMoment>
      )}

      {isGenerative && webgl && (
        <div className="transition-canvas">
          <ViewportPresence>
            <Canvas dpr={[1, 1.2]} camera={{ position: [0, 0, 5], fov: 42 }} gl={{ antialias: false, alpha: true }} frameloop={reducedMotion ? "demand" : "always"}>
              <GenerativeField scrollProgress={scrollProgress} scrollVelocity={scrollVelocity} reducedMotion={reducedMotion} />
            </Canvas>
          </ViewportPresence>
        </div>
      )}

      {isGenerative && !webgl && <div className="transition-field-fallback" />}

      {id === "work-capabilities" && (
        <StorybookMoment label="STORYBOOK / 02" title="THE SCREEN WASN'T ENOUGH" metadata="REQUEST / RESPONSE / VALIDATION / DATABASE / FAILURE / ARCHITECTURE">
          <p>At first, I cared about what people could see.</p>
          <p>Then I became curious about everything happening behind it.</p>
          <span className="storybook-flow">UI → REQUEST → API → DATA → SERVICE → SYSTEM</span>
          <p>A button wasn&apos;t just a button anymore. I wanted to understand the machine behind the interface.</p>
        </StorybookMoment>
      )}

      {variant === "statement" && (
        <div className="transition-statement-wrap">
          <p className="transition-statement">{statement}</p>
        </div>
      )}

      {variant === "cinematic" && (
        <>
          <div className="cinematic-material" />
          <p className="cinematic-label">IF YOU HAVE SOMETHING WORTH BUILDING...</p>
          <p className="cinematic-label cinematic-label-secondary">{story.direction.identity}</p>
          <div className="cinematic-storybeats">
            <span>STORYBOOK / 04 — CAREER AI / STILL BUILDING</span>
            <p>Career AI pushed me further. I started thinking about the entire student journey.</p>
            <span>PROFILE → SKILLS → LEARNING → CAREER → PROGRESS</span>
            <p>There was another interest that never left me: cars, bikes, machines, engineering.</p>
            <strong>CODE → SYSTEM → AI → MACHINE</strong>
            <p>I&apos;m still learning. Still experimenting. Still asking better questions.</p>
          </div>
        </>
      )}
    </section>
  );
}
