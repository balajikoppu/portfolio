import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import {
  SiReact,
  SiTypescript,
  SiJavascript,
  SiPython,
  SiNodedotjs,
  SiOpenid,
  SiNextdotjs,
  SiGit,
} from "react-icons/si";

gsap.registerPlugin(ScrollTrigger);

const technologies = [
  {
    name: "React",
    icon: SiReact,
    x: "72%",
    y: "24%",
  },
  {
    name: "TypeScript",
    icon: SiTypescript,
    x: "54%",
    y: "13%",
  },
  {
    name: "JavaScript",
    icon: SiJavascript,
    x: "34%",
    y: "24%",
  },
  {
    name: "Python",
    icon: SiPython,
    x: "20%",
    y: "48%",
  },
  {
    name: "Node",
    icon: SiNodedotjs,
    x: "73%",
    y: "53%",
  },
  {
    name: "OpenAI",
    icon: SiOpenid,
    x: "48%",
    y: "67%",
  },
  {
    name: "Next",
    icon: SiNextdotjs,
    x: "30%",
    y: "72%",
  },
  {
    name: "Git",
    icon: SiGit,
    x: "64%",
    y: "76%",
  },
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const techRef = useRef<HTMLDivElement>(null);
  const subheadingRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const orb = orbRef.current;
    const tech = techRef.current;
    const subheading = subheadingRef.current;

    if (!section || !title || !orb || !tech || !subheading) {
      return;
    }

    const ctx = gsap.context(() => {
      const titleLines = gsap.utils.toArray<HTMLElement>(
        ".hero-title-line",
      );

      const techItems = gsap.utils.toArray<HTMLElement>(
        ".hero-tech-item",
      );

      /* ==============================================
         INITIAL STATES
      ============================================== */

      gsap.set(titleLines, {
        yPercent: 110,
        opacity: 0,
      });

      gsap.set(orb, {
        opacity: 0,
        scale: 0.78,
        x: 60,
      });

      gsap.set(tech, {
        opacity: 0,
        scale: 0.8,
      });

      gsap.set(techItems, {
        opacity: 0,
        scale: 0.45,
      });

      gsap.set(subheading, {
        opacity: 0,
        y: 25,
      });

      /* ==============================================
         ENTRANCE
      ============================================== */

      const intro = gsap.timeline({
        defaults: {
          ease: "power4.out",
        },
      });

      intro
        .to(titleLines, {
          yPercent: 0,
          opacity: 1,
          duration: 1.15,
          stagger: 0.08,
        })
        .to(
          orb,
          {
            opacity: 1,
            scale: 1,
            x: 0,
            duration: 1.35,
          },
          "-=0.9",
        )
        .to(
          tech,
          {
            opacity: 1,
            scale: 1,
            duration: 1,
          },
          "-=1",
        )
        .to(
          techItems,
          {
            opacity: 1,
            scale: 1,
            duration: 0.75,
            stagger: 0.05,
          },
          "-=0.8",
        )
        .to(
          subheading,
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
          },
          "-=0.45",
        );

      /* ==============================================
         ORB FLOAT
      ============================================== */

      gsap.to(orb, {
        y: -10,
        rotation: 1.5,
        duration: 4.5,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      /* ==============================================
         TECHNOLOGY ROTATION
      ============================================== */

      gsap.to(tech, {
        rotation: 360,
        duration: 30,
        repeat: -1,
        ease: "none",
      });

      gsap.to(techItems, {
        rotation: -360,
        duration: 30,
        repeat: -1,
        ease: "none",
      });

      techItems.forEach((item, index) => {
        gsap.to(item, {
          y: index % 2 === 0 ? -5 : 5,
          duration: 2.5 + index * 0.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      /* ==============================================
         SCROLL TRANSITION
      ============================================== */

      const scrollTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 1.15,
        },
      });

      scrollTimeline
        .to(
          title,
          {
            yPercent: -20,
            xPercent: -10,
            scale: 0.94,
            opacity: 0.12,
            ease: "none",
          },
          0,
        )
        .to(
          orb,
          {
            xPercent: 8,
            yPercent: -18,
            scale: 1.08,
            rotation: 10,
            ease: "none",
          },
          0,
        )
        .to(
          tech,
          {
            xPercent: 8,
            yPercent: -18,
            scale: 1.08,
            rotation: 55,
            ease: "none",
          },
          0,
        )
        .to(
          subheading,
          {
            yPercent: -70,
            opacity: 0,
            ease: "none",
          },
          0,
        );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="
        relative
        h-[96svh]
        min-h-[680px]
        overflow-hidden
        bg-[#0B0B0B]

        px-4

        sm:px-6
        lg:px-8
      "
    >
      {/* ================================================
          MAIN CONTAINER
      ================================================= */}

      <div
        className="
          relative
          mx-auto
          h-full
          max-w-[1600px]
        "
      >
        {/* ================================================
            TOP LABEL
        ================================================= */}

        <div
          className="
            absolute
            left-0
            top-28
            z-30

            font-mono
            text-[8px]
            uppercase
            tracking-[0.18em]
            text-white/30

            sm:top-32
            md:top-36
          "
        >
          <span className="text-[#c8ff3d]">
            01
          </span>

          <span className="ml-3">
            INTRODUCTION
          </span>
        </div>

        {/* ================================================
            HERO TITLE
        ================================================= */}

        <div
          ref={titleRef}
          className="
            absolute
            left-0
            top-1/2
            z-20
            w-full
            -translate-y-1/2

            select-none
          "
        >
          {/* BUILDING */}

          <div className="overflow-hidden">
            <h1
              className="
                hero-title-line

                whitespace-nowrap

                text-[clamp(4.3rem,12.2vw,11.5rem)]
                font-medium
                uppercase
                leading-[0.78]
                tracking-[-0.08em]

                text-[#f2f0eb]
              "
            >
              BUILDING
            </h1>
          </div>

          {/* DIGITAL */}

          <div className="overflow-hidden">
            <h1
              className="
                hero-title-line

                whitespace-nowrap

                pl-[4vw]

                text-[clamp(4.3rem,12.2vw,11.5rem)]
                font-medium
                uppercase
                leading-[0.78]
                tracking-[-0.08em]

                text-[#f2f0eb]

                md:pl-[7vw]
              "
            >
              DIGITAL
            </h1>
          </div>

          {/* SYSTEMS */}

          <div className="overflow-hidden">
            <h1
              className="
                hero-title-line

                whitespace-nowrap

                text-[clamp(4.3rem,12.2vw,11.5rem)]
                font-medium
                uppercase
                leading-[0.78]
                tracking-[-0.08em]

                text-[#f2f0eb]
              "
            >
              SYSTEMS
              <span className="text-[#c8ff3d]">
                .
              </span>
            </h1>
          </div>
        </div>

        {/* ================================================
            ORB
        ================================================= */}

        <div
          ref={orbRef}
          className="
            pointer-events-none
            absolute

            right-[-7vw]
            top-1/2

            z-10

            h-[min(66vw,76svh)]
            w-[min(66vw,76svh)]

            max-h-[760px]
            max-w-[760px]

            min-h-[420px]
            min-w-[420px]

            -translate-y-1/2

            md:right-[-4vw]
            lg:right-[0]
          "
        >
          <div
            className="
              absolute
              inset-[8%]
              rounded-full
              bg-[#28203d]/15
              blur-[90px]
            "
          />

          <img
            src="/hero-orb.gif"
            alt=""
            aria-hidden="true"
            className="
              relative
              h-full
              w-full
              object-contain
              mix-blend-screen
            "
          />
        </div>

        {/* ================================================
            TECHNOLOGY SYSTEM
        ================================================= */}

        <div
          ref={techRef}
          className="
            pointer-events-none
            absolute

            right-[-5vw]
            top-1/2

            z-20

            h-[min(66vw,76svh)]
            w-[min(66vw,76svh)]

            max-h-[760px]
            max-w-[760px]

            min-h-[420px]
            min-w-[420px]

            -translate-y-1/2

            md:right-[-2vw]
            lg:right-[2vw]
          "
        >
          {technologies.map((technology) => {
            const Icon = technology.icon;

            return (
              <div
                key={technology.name}
                className="
                  hero-tech-item

                  absolute

                  flex
                  h-10
                  w-10
                  items-center
                  justify-center

                  rounded-full

                  border
                  border-white/15

                  bg-[#070707]/75

                  shadow-[0_0_25px_rgba(255,255,255,0.06)]

                  backdrop-blur-sm

                  md:h-12
                  md:w-12

                  lg:h-14
                  lg:w-14
                "
                style={{
                  left: technology.x,
                  top: technology.y,
                }}
              >
                <Icon
                  className="
                    h-4
                    w-4
                    text-white/75

                    md:h-5
                    md:w-5
                  "
                />

                <span
                  className="
                    absolute
                    -right-1
                    -top-1

                    h-1.5
                    w-1.5

                    rounded-full

                    bg-[#c8ff3d]

                    shadow-[0_0_10px_rgba(200,255,61,0.6)]
                  "
                />
              </div>
            );
          })}
        </div>

        {/* ================================================
            SUBHEADING
        ================================================= */}

        <div
          ref={subheadingRef}
          className="
            absolute
            bottom-[7vh]
            left-0
            z-30

            max-w-[380px]

            sm:bottom-[8vh]
          "
        >
          <p
            className="
              text-[clamp(0.95rem,1.35vw,1.2rem)]
              font-light
              leading-[1.25]
              tracking-[-0.02em]

              text-white/55
            "
          >
            Designing interfaces and intelligent
            systems where technology meets
            meaningful experiences.
          </p>

          <div
            className="
              mt-4
              flex
              items-center
              gap-3

              font-mono
              text-[7px]
              uppercase
              tracking-[0.16em]
              text-white/25
            "
          >
            <span className="h-px w-7 bg-white/20" />

            <span>SCROLL TO EXPLORE</span>
          </div>
        </div>

        {/* ================================================
            BOTTOM META
        ================================================= */}

        <div
          className="
            absolute
            bottom-[7vh]
            right-0
            z-30

            hidden
            flex-col
            items-end
            gap-2

            font-mono
            text-[8px]
            uppercase
            tracking-[0.14em]
            text-white/20

            md:flex
          "
        >
          <span>INDIA</span>
          <span>2026 — PRESENT</span>
        </div>
      </div>

      {/* ================================================
          NEXT SECTION CUE
      ================================================= */}

      <div
        className="
          pointer-events-none
          absolute
          bottom-0
          left-0
          right-0
          h-8
          bg-linear-to-b
          from-transparent
          to-[#0C0C0C]/25
        "
      />
    </section>
  );
}