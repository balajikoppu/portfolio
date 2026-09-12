import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";

const aboutText =
  "I build digital experiences where thoughtful design meets engineering, creating interfaces and intelligent systems that feel clear, purposeful, and alive.";

function AnimatedCharacter({
  character,
  progress,
  start,
  end,
}: {
  character: string;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  start: number;
  end: number;
}) {
  const opacity = useTransform(
    progress,
    [start, end],
    [0.2, 1],
  );

  return (
    <motion.span
      style={{ opacity }}
      className="inline"
    >
      {character === " " ? "\u00A0" : character}
    </motion.span>
  );
}

function AnimatedText() {
  const paragraphRef = useRef<HTMLParagraphElement>(null);

  const { scrollYProgress } = useScroll({
    target: paragraphRef,
    offset: ["start 0.8", "end 0.2"],
  });

  return (
    <p
      ref={paragraphRef}
      className="
        relative
        mx-auto
        max-w-[720px]

        text-center
        text-[clamp(1rem,2vw,1.4rem)]
        font-medium
        leading-relaxed
        tracking-[-0.015em]

        text-[#D7E2EA]
      "
    >
      <span
        className="invisible"
        aria-hidden="true"
      >
        {aboutText}
      </span>

      <span
        className="absolute inset-0"
        aria-hidden="true"
      >
        {Array.from(aboutText).map(
          (character, index) => {
            const start = index / aboutText.length;
            const end = Math.min(
              start + 0.08,
              1,
            );

            return (
              <AnimatedCharacter
                key={`${character}-${index}`}
                character={character}
                progress={scrollYProgress}
                start={start}
                end={end}
              />
            );
          },
        )}
      </span>

      <span className="sr-only">
        {aboutText}
      </span>
    </p>
  );
}

function FloatingMark({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.8,
      }}
      whileInView={{
        opacity: 1,
        scale: 1,
      }}
      viewport={{
        once: true,
        margin: "50px",
      }}
      transition={{
        duration: 0.9,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function About() {
  return (
    <section
      id="about"
      className="
        relative
        flex
        min-h-screen
        items-center
        overflow-hidden

        bg-[#0C0C0C]

        px-5
        py-16

        sm:px-8
        sm:py-20

        md:px-10
        md:py-24
      "
    >
      {/* GRID */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.025]

          [background-image:linear-gradient(rgba(215,226,234,0.4)_1px,transparent_1px),linear-gradient(90deg,rgba(215,226,234,0.4)_1px,transparent_1px)]
          [background-size:80px_80px]
        "
      />

      <div className="relative mx-auto w-full max-w-[1600px]">
        {/* TOP META */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            margin: "50px",
          }}
          transition={{
            duration: 0.7,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          className="
            mb-8
            flex
            items-center
            justify-center
            gap-3

            font-mono
            text-[8px]
            uppercase
            tracking-[0.18em]
            text-white/30
          "
        >
          <span className="text-[#c8ff3d]">
            04
          </span>

          <span>ABOUT</span>
        </motion.div>

        {/* LEFT MARK */}

        <FloatingMark
          className="
            pointer-events-none
            absolute
            left-0
            top-[2%]
            hidden
            lg:block
          "
        >
          <div className="relative h-32 w-32">
            <div
              className="
                absolute
                inset-0
                rounded-full
                border
                border-white/10
              "
            />

            <div
              className="
                absolute
                left-1/2
                top-1/2
                h-20
                w-20
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                border
                border-white/10
              "
            />

            <div
              className="
                absolute
                left-1/2
                top-1/2
                h-2
                w-2
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                bg-[#c8ff3d]
                shadow-[0_0_16px_rgba(200,255,61,0.7)]
              "
            />
          </div>
        </FloatingMark>

        {/* RIGHT MARK */}

        <FloatingMark
          className="
            pointer-events-none
            absolute
            right-0
            top-[4%]
            hidden
            lg:block
          "
        >
          <div
            className="
              flex
              h-24
              w-24
              items-center
              justify-center
              border
              border-white/10
            "
          >
            <div
              className="
                h-12
                w-12
                border
                border-dashed
                border-white/20
              "
            />
          </div>
        </FloatingMark>

        {/* HEADING */}

        <motion.div
          initial={{
            opacity: 0,
            y: 50,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            margin: "50px",
          }}
          transition={{
            duration: 0.8,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          className="overflow-hidden"
        >
          <h2
            className="
              bg-linear-to-b
              from-[#646973]
              to-[#BBCCD7]
              bg-clip-text

              text-center

              text-[clamp(4rem,12vw,10rem)]
              font-black
              uppercase
              leading-[0.8]
              tracking-[-0.075em]

              text-transparent
            "
          >
            ABOUT
            <span className="text-[#c8ff3d]">.</span>
          </h2>
        </motion.div>

        {/* PARAGRAPH */}

        <div
          className="
            mt-10

            sm:mt-12

            md:mt-14
          "
        >
          <AnimatedText />
        </div>

        {/* DETAILS */}

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            margin: "50px",
          }}
          transition={{
            duration: 0.8,
            delay: 0.2,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          className="
            mx-auto
            mt-12
            grid
            max-w-3xl
            grid-cols-2
            gap-y-8

            border-t
            border-white/10

            pt-6

            sm:mt-14
            sm:grid-cols-4
            sm:gap-y-0
          "
        >
          <div>
            <span className="font-mono text-[7px] uppercase tracking-[0.15em] text-white/25">
              FOCUS
            </span>

            <p className="mt-2 text-[11px] uppercase tracking-[0.02em] text-white/60">
              DIGITAL SYSTEMS
            </p>
          </div>

          <div>
            <span className="font-mono text-[7px] uppercase tracking-[0.15em] text-white/25">
              CORE
            </span>

            <p className="mt-2 text-[11px] uppercase tracking-[0.02em] text-white/60">
              ENGINEERING
            </p>
          </div>

          <div>
            <span className="font-mono text-[7px] uppercase tracking-[0.15em] text-white/25">
              EXPLORE
            </span>

            <p className="mt-2 text-[11px] uppercase tracking-[0.02em] text-white/60">
              AI / MOTION
            </p>
          </div>

          <div>
            <span className="font-mono text-[7px] uppercase tracking-[0.15em] text-white/25">
              BASE
            </span>

            <p className="mt-2 text-[11px] uppercase tracking-[0.02em] text-white/60">
              INDIA
            </p>
          </div>
        </motion.div>

        {/* BOTTOM STATEMENT */}

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            margin: "50px",
          }}
          transition={{
            duration: 0.8,
            delay: 0.35,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          className="
            mt-12
            flex
            flex-col
            items-center
            gap-4

            sm:mt-16
            sm:flex-row
            sm:justify-center
          "
        >
          <span className="h-px w-8 bg-white/20" />

          <span
            className="
              text-center
              font-mono
              text-[8px]
              uppercase
              tracking-[0.16em]
              text-white/25
            "
          >
            DESIGNING / ENGINEERING / EXPLORING
          </span>

          <span className="h-px w-8 bg-white/20" />
        </motion.div>
      </div>
    </section>
  );
}