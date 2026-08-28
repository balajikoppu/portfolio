import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import * as THREE from "three";

import { useMagnetic } from "../../hooks/useMagnetic";
import { useReveal } from "../../hooks/useReveal";
import { story } from "../../data/story";
import ViewportPresence from "../ui/ViewportPresence";

type ContactSectionProps = {
  scrollProgress: React.MutableRefObject<number>;
  scrollVelocity: React.MutableRefObject<number>;
  reducedMotion?: boolean;
  webgl?: boolean;
};

function ContactArtifact({ scrollProgress, scrollVelocity, reducedMotion = false, active }: ContactSectionProps & { active: boolean }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;

    const time = state.clock.elapsedTime;
    const velocity = THREE.MathUtils.clamp(scrollVelocity.current * 0.0015, -0.08, 0.08);
    const speed = active ? 1.8 : 1;
    const intensity = reducedMotion ? 0.12 : 1;

    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, state.pointer.y * 0.2 + scrollProgress.current * 0.25, 0.035 * intensity);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, state.pointer.x * 0.3, 0.035 * intensity);
    groupRef.current.rotation.z += 0.002 * speed * intensity + velocity * 0.02;
    groupRef.current.scale.setScalar(1 + Math.sin(time * speed) * 0.025 * intensity);
  });

  return (
    <group ref={groupRef}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.15, 0.035, 12, 96]} />
        <meshBasicMaterial color="#c8c1ff" transparent opacity={active ? 0.85 : 0.5} />
      </mesh>
      <mesh rotation={[0.5, 0.8, 0]} scale={0.78}>
        <torusGeometry args={[1.15, 0.018, 8, 96]} />
        <meshBasicMaterial color="#8d7cff" transparent opacity={active ? 0.8 : 0.4} />
      </mesh>
      <mesh rotation={[0.2, 0.4, 0.8]} scale={0.58}>
        <torusGeometry args={[1.15, 0.012, 8, 96]} />
        <meshBasicMaterial color="#f4f4f0" transparent opacity={0.25} />
      </mesh>
    </group>
  );
}

export default function ContactSection({ scrollProgress, scrollVelocity, reducedMotion = false, webgl = true }: ContactSectionProps) {
  const [ctaActive, setCtaActive] = useState(false);
  const { ref: revealRef, visible: revealVisible } = useReveal<HTMLElement>(0.08);
  const ctaRef = useMagnetic<HTMLAnchorElement>({ strength: 0.22, radius: 220 });

  return (
    <section ref={revealRef} id="contact" className={`contact-section ${revealVisible ? "is-visible" : ""}`}>
      <div className="section-header">
        <span className="section-number">05</span>
        <span className="section-label">CONTACT</span>
      </div>

      <div className="contact-content">
        <p className="contact-kicker">NOW LET&apos;S MAKE IT REAL</p>
        <h2><span>LET&apos;S BUILD</span><br /><span>SOMETHING</span><br /><strong>MEMORABLE.</strong></h2>
        <div className="contact-story">
          <p>{story.contact.copy}</p>
          <p>{story.contact.invitation}</p>
        </div>
        <div className="contact-artifact" aria-hidden="true">
          {webgl ? <ViewportPresence><Canvas dpr={[1, 1.3]} camera={{ position: [0, 0, 4.8], fov: 40 }} gl={{ antialias: true, alpha: true }} frameloop={reducedMotion ? "demand" : "always"}><ContactArtifact scrollProgress={scrollProgress} scrollVelocity={scrollVelocity} reducedMotion={reducedMotion} webgl={webgl} active={ctaActive} /></Canvas></ViewportPresence> : <div className="contact-artifact-fallback" />}
        </div>
        <a ref={ctaRef} className="contact-cta" data-cursor="email" href="mailto:hello@jai.dev" onPointerEnter={() => setCtaActive(true)} onPointerLeave={() => setCtaActive(false)}>
          <span>START A CONVERSATION</span><span aria-hidden="true">↗</span>
        </a>
      </div>

      <div className="contact-links">
        <a href="mailto:hello@jai.dev" data-cursor="email"><span><b>EMAIL</b> hello@jai.dev</span><i aria-hidden="true">↗</i></a>
        <span><span><b>LOCATION</b> India</span></span>
      </div>

      <footer className="contact-footer">
        <div><strong>JAI<span className="brand-dot">.</span></strong><span>DIGITAL EXPERIENCES</span><span>© 2026</span></div>
        <a href="#top" className="back-to-top">↑ <span>BACK TO TOP</span></a>
        <span>BUILT WITH INTENTION.</span>
        <span>{story.contact.ending}</span>
      </footer>
    </section>
  );
}
