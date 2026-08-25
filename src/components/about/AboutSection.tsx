import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

import { useMagnetic } from "../../hooks/useMagnetic";
import { useReveal } from "../../hooks/useReveal";

type AboutSectionProps = {
  scrollProgress: React.MutableRefObject<number>;
  scrollVelocity: React.MutableRefObject<number>;
  reducedMotion?: boolean;
  webgl?: boolean;
};

type AboutArtifactProps = Pick<AboutSectionProps, "scrollProgress" | "scrollVelocity" | "reducedMotion">;

function AboutArtifact({ scrollProgress, scrollVelocity, reducedMotion = false }: AboutArtifactProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;

    const time = state.clock.elapsedTime;
    const scroll = scrollProgress.current;
    const velocity = THREE.MathUtils.clamp(scrollVelocity.current * 0.0015, -0.08, 0.08);
    const pointer = state.pointer;
    const intensity = reducedMotion ? 0.15 : 1;

    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, pointer.y * 0.18 + scroll * 0.35, 0.04 * intensity);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, pointer.x * 0.25 - scroll * 0.55, 0.04 * intensity);
    groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, velocity, 0.08 * intensity);
    groupRef.current.position.y = Math.sin(time * 0.7) * 0.08 * intensity;
  });

  return (
    <group ref={groupRef}>
      <mesh rotation={[Math.PI / 2, 0.2, 0]}>
        <torusGeometry args={[1.05, 0.025, 8, 72]} />
        <meshBasicMaterial color="#aaa0ff" transparent opacity={0.7} />
      </mesh>
      <mesh rotation={[0.3, Math.PI / 2, 0.5]} scale={0.72}>
        <torusGeometry args={[1.05, 0.02, 8, 72]} />
        <meshBasicMaterial color="#f4f4f0" transparent opacity={0.35} />
      </mesh>
      <mesh scale={0.45}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial color="#8d7cff" wireframe transparent opacity={0.85} />
      </mesh>
    </group>
  );
}

function PhilosophyRow({ number, children }: { number: string; children: string }) {
  const magneticRef = useMagnetic<HTMLButtonElement>({ strength: 0.08, radius: 150 });

  return (
    <button ref={magneticRef} type="button" className="philosophy-row">
      <span className="philosophy-number">{number}</span>
      <span className="philosophy-title">{children}</span>
      <span className="philosophy-indicator" aria-hidden="true">↗</span>
    </button>
  );
}

export default function AboutSection({ scrollProgress, scrollVelocity, reducedMotion = false, webgl = true }: AboutSectionProps) {
  const sectionReveal = useReveal<HTMLElement>(0.08);
  const statementReveal = useReveal<HTMLDivElement>(0.12);

  return (
    <section ref={sectionReveal.ref} id="about" className={`about-section ${sectionReveal.visible ? "is-visible" : ""}`}>
      <div className="section-header">
        <span className="section-number">04</span>
        <span className="section-label">ABOUT</span>
      </div>

      <div className="about-grid">
        <div ref={statementReveal.ref} className={`about-statement ${statementReveal.visible ? "is-visible" : ""}`}>
          <h2>
            <span>I BUILD</span>
            <span className="about-outline">DIGITAL</span>
            <span>EXPERIENCES.</span>
          </h2>
          <div className="about-artifact" aria-hidden="true">
            {webgl ? (
              <Canvas dpr={[1, 1.3]} camera={{ position: [0, 0, 4.5], fov: 38 }} gl={{ antialias: true, alpha: true }} frameloop={reducedMotion ? "demand" : "always"}>
                <AboutArtifact scrollProgress={scrollProgress} scrollVelocity={scrollVelocity} reducedMotion={reducedMotion} />
              </Canvas>
            ) : <div className="about-artifact-fallback" />}
          </div>
        </div>

        <div className="about-narrative">
          <div className="about-copy-block"><span>01 — WHO</span><p>I am Jai, a creative developer building at the meeting point of software, intelligence and considered interaction.</p></div>
          <div className="about-copy-block"><span>02 — HOW</span><p>I move from design to systems to engineering, then iterate until the idea feels simple, useful and exact.</p></div>
          <div className="about-copy-block"><span>03 — WHY</span><p>Because good technology should disappear into the experience while leaving a clear impression behind.</p></div>

          <div className="about-philosophy">
            <p className="about-subhead">WORKING PHILOSOPHY</p>
            <PhilosophyRow number="01">CLARITY OVER COMPLEXITY</PhilosophyRow>
            <PhilosophyRow number="02">DETAILS CREATE DIFFERENCE</PhilosophyRow>
            <PhilosophyRow number="03">TECHNOLOGY SHOULD FEEL HUMAN</PhilosophyRow>
            <PhilosophyRow number="04">EVERY INTERACTION HAS A PURPOSE</PhilosophyRow>
          </div>
        </div>
      </div>

      <div className="about-metadata">
        <span><b>BASED IN</b> INDIA</span>
        <span><b>FOCUS</b> DIGITAL PRODUCTS / CREATIVE TECHNOLOGY</span>
        <span><b>CURRENTLY</b> BUILDING / EXPERIMENTING</span>
      </div>
    </section>
  );
}
