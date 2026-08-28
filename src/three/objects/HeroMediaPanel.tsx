import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import type { IconType } from "react-icons";

import {
  SiDocker,
  SiFastapi,
  SiGit,
  SiHuggingface,
  SiMqtt,
  SiNodedotjs,
  SiPostgresql,
  SiPython,
  SiReact,
  SiTailwindcss,
  SiThreedotjs,
  SiTypescript,
} from "react-icons/si";

type TechIcon = {
  Icon: IconType;
  label: string;
  color: string;
  priority?: "primary" | "secondary" | "supporting";
};

type HeroMediaPanelProps = {
  /**
   * Looping animated media shown inside the hero sphere.
   * Default file should exist in `public/`.
   */
  gifSrc?: string;

  /**
   * Respect reduced-motion accessibility preference.
   */
  reducedMotion?: boolean;

  /**
   * Panel diameter in CSS pixels.
   */
  size?: number;
};

type RingConfig = {
  icons: TechIcon[];
  radiusPercent: number;
  phaseDeg: number;
  durationSec: number;
  reverse: boolean;
};

/*
 * ============================================================
 * HERO TECHNOLOGY SYSTEM
 * ============================================================
 *
 * The stack is intentionally divided into visual levels.
 *
 * PRIMARY:
 * React / TypeScript / Python / FastAPI / AI
 *
 * SECONDARY:
 * PostgreSQL / Node.js / Docker / Three.js
 *
 * SUPPORTING:
 * Git / Tailwind / MQTT
 *
 * This prevents the sphere from becoming a generic "skills cloud".
 */

const RINGS: RingConfig[] = [
  {
    icons: [
      {
        Icon: SiReact,
        label: "React",
        color: "#61dafb",
        priority: "primary",
      },
      {
        Icon: SiTypescript,
        label: "TypeScript",
        color: "#3178c6",
        priority: "primary",
      },
      {
        Icon: SiPython,
        label: "Python",
        color: "#ffd43b",
        priority: "primary",
      },
      {
        Icon: SiFastapi,
        label: "FastAPI",
        color: "#05998b",
        priority: "primary",
      },
      {
        Icon: SiPostgresql,
        label: "PostgreSQL",
        color: "#4169e1",
        priority: "secondary",
      },
      {
        Icon: SiNodedotjs,
        label: "Node.js",
        color: "#83cd29",
        priority: "secondary",
      },
    ],
    radiusPercent: 34,
    phaseDeg: 0,
    durationSec: 46,
    reverse: false,
  },
  {
    icons: [
      {
        Icon: SiThreedotjs,
        label: "Three.js",
        color: "#ffffff",
        priority: "secondary",
      },
      {
        Icon: SiHuggingface,
        label: "AI / ML",
        color: "#ffd21e",
        priority: "primary",
      },
      {
        Icon: SiMqtt,
        label: "MQTT",
        color: "#c084fc",
        priority: "supporting",
      },
      {
        Icon: SiDocker,
        label: "Docker",
        color: "#2496ed",
        priority: "secondary",
      },
    ],
    radiusPercent: 20,
    phaseDeg: 45,
    durationSec: 34,
    reverse: true,
  },
  {
    icons: [
      {
        Icon: SiGit,
        label: "Git",
        color: "#f05032",
        priority: "supporting",
      },
      {
        Icon: SiTailwindcss,
        label: "Tailwind CSS",
        color: "#38bdf8",
        priority: "supporting",
      },
    ],
    radiusPercent: 27,
    phaseDeg: 100,
    durationSec: 58,
    reverse: false,
  },
];

/*
 * ============================================================
 * ICON POSITIONING
 * ============================================================
 *
 * Every ring is centered on the exact center of the sphere.
 */
function iconOffsetStyle(
  index: number,
  count: number,
  radiusPercent: number,
  phaseDeg: number,
) {
  const angle = (index / count) * 360 + phaseDeg;
  const radians = (angle * Math.PI) / 180;

  const left = 50 + Math.cos(radians) * radiusPercent;
  const top = 50 + Math.sin(radians) * radiusPercent;

  return {
    position: "absolute" as const,
    left: `${left}%`,
    top: `${top}%`,
  };
}

/*
 * ============================================================
 * ICON CHIP
 * ============================================================
 *
 * Small glass technology node.
 *
 * Important:
 * These are intentionally NOT huge badges.
 * The sphere remains the hero.
 */
function IconChip({
  Icon,
  label,
  color,
  priority = "secondary",
}: TechIcon) {
  const size =
    priority === "primary"
      ? 34
      : priority === "secondary"
        ? 31
        : 28;

  const iconSize =
    priority === "primary"
      ? 17
      : priority === "secondary"
        ? 15
        : 14;

  const opacity =
    priority === "primary"
      ? 1
      : priority === "secondary"
        ? 0.9
        : 0.78;

  return (
    <div
      title={label}
      aria-label={label}
      style={{
        width: size,
        height: size,
        borderRadius: "50%",

        display: "flex",
        alignItems: "center",
        justifyContent: "center",

        position: "relative",

        background:
          "radial-gradient(circle at 35% 30%, rgba(255,255,255,0.10), rgba(10,7,24,0.72) 58%, rgba(4,3,10,0.9) 100%)",

        border:
          priority === "primary"
            ? "1px solid rgba(199,193,255,0.38)"
            : "1px solid rgba(199,193,255,0.24)",

        boxShadow:
          priority === "primary"
            ? "0 0 14px rgba(122,108,255,0.25), inset 0 0 8px rgba(255,255,255,0.04)"
            : "0 0 9px rgba(122,108,255,0.16), inset 0 0 7px rgba(255,255,255,0.03)",

        backdropFilter: "blur(7px)",
        WebkitBackdropFilter: "blur(7px)",

        opacity,

        transition:
          "border-color 300ms ease, box-shadow 300ms ease",
      }}
    >
      {/* Tiny inner highlight */}
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 2,
          borderRadius: "50%",
          border: "1px solid rgba(255,255,255,0.035)",
          pointerEvents: "none",
        }}
      />

      <Icon
        size={iconSize}
        color={color}
        style={{
          position: "relative",
          zIndex: 1,
          filter:
            priority === "primary"
              ? `drop-shadow(0 0 4px ${color}55)`
              : "none",
        }}
      />
    </div>
  );
}

/*
 * ============================================================
 * TECH RING
 * ============================================================
 *
 * The outer ring rotates slowly.
 *
 * Each icon counter-rotates so the actual icon remains upright.
 */
function TechRing({
  ring,
  reducedMotion,
  ringIndex,
}: {
  ring: RingConfig;
  reducedMotion: boolean;
  ringIndex: number;
}) {
  const ringAnimation = reducedMotion
    ? "none"
    : `hero-tech-orbit-${ringIndex} ${ring.durationSec}s linear infinite ${
        ring.reverse ? "reverse" : "normal"
      }`;

  const counterAnimation = reducedMotion
    ? "none"
    : `hero-tech-counter-${ringIndex} ${ring.durationSec}s linear infinite ${
        ring.reverse ? "normal" : "reverse"
      }`;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        animation: ringAnimation,
        transformOrigin: "50% 50%",
        pointerEvents: "none",
      }}
    >
      {ring.icons.map((tech, iconIndex) => (
        <div
          key={tech.label}
          style={iconOffsetStyle(
            iconIndex,
            ring.icons.length,
            ring.radiusPercent,
            ring.phaseDeg,
          )}
        >
          <div
            style={{
              transform: "translate(-50%, -50%)",
              animation: counterAnimation,
              transformOrigin: "50% 50%",
            }}
          >
            <IconChip {...tech} />
          </div>
        </div>
      ))}
    </div>
  );
}

/*
 * ============================================================
 * HERO MEDIA PANEL
 * ============================================================
 */
export default function HeroMediaPanel({
  gifSrc = "/hero-orb.gif",
  reducedMotion = false,
  size = 350,
}: HeroMediaPanelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  /*
   * Reusable vectors prevent unnecessary allocations inside
   * the render loop.
   */
  const targetPosition = useRef(new THREE.Vector3());

  useFrame((state) => {
    const group = groupRef.current;

    if (!group) return;

    const time = state.clock.elapsedTime;

    /*
     * --------------------------------------------------------
     * POINTER RESPONSE
     * --------------------------------------------------------
     *
     * Keep this extremely subtle.
     * The Hero should feel responsive, not like a game object.
     */
    const pointerX = THREE.MathUtils.clamp(
      state.pointer.x,
      -1,
      1,
    );

    const pointerY = THREE.MathUtils.clamp(
      state.pointer.y,
      -1,
      1,
    );

    /*
     * --------------------------------------------------------
     * AMBIENT MOTION
     * --------------------------------------------------------
     *
     * Tiny movement keeps the sphere alive.
     */
    const ambientX = Math.sin(time * 0.32) * 0.012;
    const ambientY = Math.cos(time * 0.42) * 0.015;

    /*
     * --------------------------------------------------------
     * TARGET POSITION
     * --------------------------------------------------------
     */
    targetPosition.current.set(
      pointerX * 0.045 + ambientX,
      pointerY * 0.028 + ambientY,
      0,
    );

    /*
     * --------------------------------------------------------
     * SMOOTH PARALLAX
     * --------------------------------------------------------
     */
    if (!reducedMotion) {
      group.position.lerp(
        targetPosition.current,
        0.035,
      );
    } else {
      group.position.lerp(
        new THREE.Vector3(0, 0, 0),
        0.08,
      );
    }

    /*
     * --------------------------------------------------------
     * MICRO BREATHING
     * --------------------------------------------------------
     *
     * Very subtle scale change.
     *
     * 1.0 → approximately 1.012 → 1.0
     */
    const breathe = reducedMotion
      ? 1
      : 1 + Math.sin(time * 0.55) * 0.008;

    if (wrapperRef.current) {
      wrapperRef.current.style.transform =
        `scale(${breathe})`;
    }
  });

  return (
    <group ref={groupRef}>
      <Html
        center
        occlude={false}
        style={{
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        <style>{`
          @keyframes hero-tech-orbit-0 {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }

          @keyframes hero-tech-counter-0 {
            from {
              transform: translate(-50%, -50%) rotate(0deg);
            }
            to {
              transform: translate(-50%, -50%) rotate(-360deg);
            }
          }

          @keyframes hero-tech-orbit-1 {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }

          @keyframes hero-tech-counter-1 {
            from {
              transform: translate(-50%, -50%) rotate(0deg);
            }
            to {
              transform: translate(-50%, -50%) rotate(-360deg);
            }
          }

          @keyframes hero-tech-orbit-2 {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }

          @keyframes hero-tech-counter-2 {
            from {
              transform: translate(-50%, -50%) rotate(0deg);
            }
            to {
              transform: translate(-50%, -50%) rotate(-360deg);
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .hero-tech-orbit,
            .hero-tech-counter {
              animation: none !important;
            }
          }
        `}</style>

        <div
          ref={wrapperRef}
          style={{
            position: "relative",

            width: size,
            height: size,

            transformOrigin: "50% 50%",

            willChange: "transform",
          }}
        >
          {/* ==================================================
              OUTER ATMOSPHERE
              ================================================== */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",

              inset: -size * 0.11,

              borderRadius: "50%",

              background:
                "radial-gradient(circle, rgba(122,108,255,0.20) 0%, rgba(122,108,255,0.10) 42%, rgba(122,108,255,0.035) 62%, rgba(122,108,255,0) 76%)",

              filter: "blur(10px)",

              pointerEvents: "none",
            }}
          />

          {/* ==================================================
              SECONDARY INNER GLOW
              ================================================== */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",

              inset: "-3%",

              borderRadius: "50%",

              background:
                "radial-gradient(circle, rgba(122,108,255,0.06) 0%, rgba(122,108,255,0) 68%)",

              filter: "blur(3px)",

              pointerEvents: "none",
            }}
          />

          {/* ==================================================
              MAIN MEDIA / SPHERE
              ================================================== */}
          <div
            style={{
              position: "absolute",

              inset: 0,

              borderRadius: "50%",

              overflow: "hidden",

              background: "#050308",

              border:
                "1px solid rgba(199,193,255,0.24)",

              boxShadow:
                "0 0 28px rgba(122,108,255,0.17), 0 0 70px rgba(122,108,255,0.08), inset 0 0 24px rgba(0,0,0,0.52)",

              isolation: "isolate",
            }}
          >
            <img
              src={gifSrc}
              alt=""
              draggable={false}
              style={{
                width: "100%",
                height: "100%",

                objectFit: "cover",

                display: "block",

                userSelect: "none",

                transform: "scale(1.015)",

                filter:
                  "contrast(1.03) saturate(0.96)",

                pointerEvents: "none",
              }}
            />

            {/* Dark edge vignette */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: 0,

                borderRadius: "50%",

                background:
                  "radial-gradient(circle at 50% 48%, rgba(0,0,0,0) 35%, rgba(0,0,0,0.16) 62%, rgba(0,0,0,0.58) 100%)",

                pointerEvents: "none",
              }}
            />

            {/* Very subtle glass sheen */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: 0,

                borderRadius: "50%",

                background:
                  "linear-gradient(132deg, rgba(255,255,255,0.075) 0%, rgba(255,255,255,0.015) 24%, rgba(255,255,255,0) 48%, rgba(255,255,255,0) 72%, rgba(255,255,255,0.035) 100%)",

                pointerEvents: "none",
              }}
            />

            {/* Soft lower atmospheric tint */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: 0,

                borderRadius: "50%",

                background:
                  "radial-gradient(circle at 50% 100%, rgba(122,108,255,0.10), transparent 48%)",

                pointerEvents: "none",
              }}
            />
          </div>

          {/* ==================================================
              TECHNOLOGY FIELD
              ================================================== */}

          {RINGS.map((ring, index) => (
            <TechRing
              key={`hero-tech-ring-${index}`}
              ring={ring}
              ringIndex={index}
              reducedMotion={reducedMotion}
            />
          ))}

          {/* ==================================================
              CENTER DEPTH / ATMOSPHERE
              ==================================================
              
              This does NOT cover the GIF.
              It gives the icon system a subtle central glow.
          */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",

              left: "50%",
              top: "50%",

              width: size * 0.28,
              height: size * 0.28,

              transform: "translate(-50%, -50%)",

              borderRadius: "50%",

              background:
                "radial-gradient(circle, rgba(122,108,255,0.045) 0%, rgba(122,108,255,0) 72%)",

              filter: "blur(8px)",

              pointerEvents: "none",
            }}
          />

          {/* ==================================================
              FINAL EDGE
              ================================================== */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,

              borderRadius: "50%",

              border:
                "1px solid rgba(255,255,255,0.035)",

              pointerEvents: "none",
            }}
          />
        </div>
      </Html>
    </group>
  );
}