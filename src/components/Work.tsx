import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";

type Project = {
  number: string;
  name: string;
  category: string;
  description: string;
  stack: string;
};

const featuredProjects: Project[] = [
  {
    number: "01",
    name: "Career AI",
    category: "INTELLIGENT SYSTEM",
    description:
      "An AI-driven platform focused on understanding skills, opportunities, and career direction through intelligent digital experiences.",
    stack: "AI / PYTHON / FULLSTACK",
  },
  {
    number: "02",
    name: "SAMS",
    category: "DIGITAL SYSTEM",
    description:
      "A structured digital platform designed around workflows, data, automation, and operational intelligence.",
    stack: "FULLSTACK / AUTOMATION / DATA",
  },
  {
    number: "03",
    name: "Bulk Email",
    category: "INFRASTRUCTURE",
    description:
      "A scalable communication system for automated messaging, delivery management, and efficient email workflows.",
    stack: "PYTHON / BACKEND / AUTOMATION",
  },
];

const archivedProjects: Project[] = [
  {
    number: "04",
    name: "LMS",
    category: "PRODUCT",
    description:
      "A learning ecosystem connecting users, content, progress, and structured digital learning experiences.",
    stack: "FULLSTACK / PYTHON / PLATFORM",
  },
  {
    number: "05",
    name: "SDV",
    category: "INTELLIGENT SYSTEM",
    description:
      "Exploring software-defined vehicles and the role of software, data, and intelligence in modern mobility systems.",
    stack: "SYSTEMS / SOFTWARE / AI",
  },
];

/* =========================================================
   ABSTRACT PROJECT VISUAL
   ========================================================= */

function ProjectVisual({ index }: { index: number }) {
  const nodeSets = [
    [
      { left: "18%", top: "25%" },
      { left: "76%", top: "28%" },
      { left: "24%", top: "72%" },
      { left: "70%", top: "68%" },
    ],
    [
      { left: "27%", top: "17%" },
      { left: "77%", top: "32%" },
      { left: "17%", top: "58%" },
      { left: "67%", top: "78%" },
    ],
    [
      { left: "20%", top: "32%" },
      { left: "78%", top: "20%" },
      { left: "31%", top: "76%" },
      { left: "73%", top: "61%" },
    ],
  ];

  const nodes = nodeSets[index] ?? nodeSets[0];

  return (
    <div
      className="
        relative
        h-full
        w-full
        overflow-hidden
        rounded-[28px]
        bg-[#080808]

        sm:rounded-[36px]
        md:rounded-[44px]
      "
    >
      {/* GRID */}

      <div
        className="
          absolute
          inset-0
          opacity-[0.055]

          [background-image:linear-gradient(rgba(215,226,234,0.4)_1px,transparent_1px),linear-gradient(90deg,rgba(215,226,234,0.4)_1px,transparent_1px)]
          [background-size:42px_42px]
        "
      />

      {/* ATMOSPHERE */}

      <div
        className="
          absolute
          left-1/2
          top-1/2
          h-[65%]
          w-[65%]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-[#c8ff3d]/[0.025]
          blur-[80px]
        "
      />

      {/* OUTER RING */}

      <motion.div
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "linear",
        }}
        className="
          absolute
          left-1/2
          top-1/2
          aspect-square
          w-[72%]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          border
          border-[#D7E2EA]/10
        "
      >
        <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c8ff3d]" />

        <span className="absolute bottom-0 left-1/2 h-1.5 w-1.5 -translate-x-1/2 translate-y-1/2 rounded-full bg-[#D7E2EA]/40" />
      </motion.div>

      {/* INNER RING */}

      <motion.div
        animate={{
          rotate: -360,
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="
          absolute
          left-1/2
          top-1/2
          aspect-square
          w-[47%]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          border
          border-[#D7E2EA]/10
        "
      >
        <span className="absolute right-0 top-1/2 h-2 w-2 -translate-y-1/2 translate-x-1/2 rounded-full bg-[#D7E2EA]/50" />
      </motion.div>

      {/* CONNECTIONS */}

      <div className="absolute inset-0">
        <span className="absolute left-[20%] top-[28%] h-px w-[30%] rotate-[23deg] bg-[#D7E2EA]/10" />

        <span className="absolute left-[49%] top-[49%] h-px w-[29%] rotate-[-25deg] bg-[#D7E2EA]/10" />

        <span className="absolute left-[25%] top-[68%] h-px w-[30%] rotate-[-22deg] bg-[#D7E2EA]/10" />

        <span className="absolute left-[48%] top-[37%] h-[30%] w-px rotate-[18deg] bg-[#D7E2EA]/10" />
      </div>

      {/* NODES */}

      {nodes.map((node, nodeIndex) => (
        <motion.div
          key={`${index}-${nodeIndex}`}
          animate={{
            scale: [0.9, 1.15, 0.9],
            opacity: [0.45, 1, 0.45],
          }}
          transition={{
            duration: 2.4 + nodeIndex * 0.35,
            repeat: Infinity,
            ease: "easeInOut",
            delay: nodeIndex * 0.2,
          }}
          className="
            absolute
            flex
            h-4
            w-4
            -translate-x-1/2
            -translate-y-1/2
            items-center
            justify-center
            rounded-full
            border
            border-[#D7E2EA]/30
            bg-[#080808]
          "
          style={{
            left: node.left,
            top: node.top,
          }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#D7E2EA]/60" />

          <span className="absolute inset-[-5px] rounded-full border border-[#D7E2EA]/5" />
        </motion.div>
      ))}

      {/* CORE */}

      <motion.div
        animate={{
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 3.2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          left-1/2
          top-1/2
          flex
          h-20
          w-20
          -translate-x-1/2
          -translate-y-1/2
          items-center
          justify-center
          rounded-full
          border
          border-[#D7E2EA]/20
          bg-[#0C0C0C]/80
          shadow-[0_0_50px_rgba(200,255,61,0.04)]
          backdrop-blur-md

          sm:h-24
          sm:w-24

          md:h-28
          md:w-28
        "
      >
        <span className="h-3 w-3 rounded-full bg-[#c8ff3d] shadow-[0_0_24px_rgba(200,255,61,0.7)]" />
      </motion.div>

      {/* PULSE */}

      <motion.div
        animate={{
          scale: [1, 2.2],
          opacity: [0.35, 0],
        }}
        transition={{
          duration: 2.8,
          repeat: Infinity,
          ease: "easeOut",
        }}
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
          border-[#c8ff3d]/30
        "
      />

      {/* LABELS */}

      <div
        className="
          absolute
          left-5
          top-5
          font-mono
          text-[7px]
          uppercase
          tracking-[0.16em]
          text-[#D7E2EA]/25

          sm:left-7
          sm:top-7
        "
      >
        SYSTEM / 0{index + 1}
      </div>

      <div
        className="
          absolute
          right-5
          top-5
          font-mono
          text-[7px]
          uppercase
          tracking-[0.16em]
          text-[#D7E2EA]/20

          sm:right-7
          sm:top-7
        "
      >
        ACTIVE
      </div>

      <div
        className="
          absolute
          bottom-5
          left-5
          font-mono
          text-[7px]
          uppercase
          tracking-[0.16em]
          text-[#c8ff3d]/45

          sm:bottom-7
          sm:left-7
        "
      >
        ● ONLINE
      </div>

      <div
        className="
          absolute
          bottom-5
          right-5
          font-mono
          text-[7px]
          uppercase
          tracking-[0.16em]
          text-[#D7E2EA]/20

          sm:bottom-7
          sm:right-7
        "
      >
        0{index + 1} / 03
      </div>
    </div>
  );
}

/* =========================================================
   FEATURED PROJECT CARD
   ========================================================= */

function ProjectCard({
  project,
  index,
  totalCards,
}: {
  project: Project;
  index: number;
  totalCards: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "start start"],
  });

  const targetScale =
    1 - (totalCards - 1 - index) * 0.03;

  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    [1, targetScale],
  );

  return (
    <div
      ref={cardRef}
      className="
        relative
        h-[calc(85vh+28px)]

        md:h-[calc(90vh+28px)]
      "
    >
      <motion.article
        style={{
          scale,
          top: `${index * 28}px`,
        }}
        className="
          sticky
          top-24

          mx-auto
          flex
          h-[calc(85vh-24px)]
          w-full
          max-w-6xl

          flex-col
          overflow-hidden

          rounded-[40px]
          border-2
          border-[#D7E2EA]

          bg-[#0C0C0C]

          p-4

          sm:top-28
          sm:h-[calc(85vh-28px)]
          sm:rounded-[50px]
          sm:p-6

          md:top-32
          md:h-[calc(90vh-32px)]
          md:rounded-[60px]
          md:p-8

          will-change-transform
        "
      >
        {/* HEADER */}

        <div
          className="
            flex
            shrink-0
            items-start
            gap-4
          "
        >
          <span
            className="
              shrink-0
              text-[clamp(3rem,8vw,8rem)]
              font-black
              leading-[0.72]
              tracking-[-0.075em]
              text-[#D7E2EA]
            "
          >
            {project.number}
          </span>

          <div className="min-w-0 flex-1 pt-1 sm:pt-2">
            <span
              className="
                block
                font-mono
                text-[7px]
                uppercase
                tracking-[0.16em]
                text-[#D7E2EA]/40

                sm:text-[8px]
                md:text-[9px]
              "
            >
              {project.category}
            </span>

            <h3
              className="
                mt-1.5
                truncate
                text-[clamp(1.5rem,4vw,4rem)]
                font-black
                uppercase
                leading-[0.85]
                tracking-[-0.06em]
                text-[#D7E2EA]

                sm:mt-2
              "
            >
              {project.name}
              <span className="text-[#c8ff3d]">.</span>
            </h3>
          </div>

          <a
            href="#contact"
            className="
              group
              hidden
              shrink-0
              items-center
              gap-2
              rounded-full
              border-2
              border-[#D7E2EA]
              px-5
              py-2.5
              font-mono
              text-[8px]
              uppercase
              tracking-[0.16em]
              text-[#D7E2EA]
              transition-colors
              duration-300
              hover:bg-[#D7E2EA]/10

              sm:flex
              sm:px-6
              sm:py-3
              sm:text-[9px]
            "
          >
            <span>LIVE PROJECT</span>

            <ArrowUpRight
              size={13}
              className="
                transition-transform
                duration-300
                group-hover:-translate-y-0.5
                group-hover:translate-x-0.5
              "
            />
          </a>
        </div>

        {/* DESCRIPTION */}

        <div
          className="
            mt-4
            max-w-lg
            shrink-0

            sm:mt-5
            md:mt-6
          "
        >
          <p
            className="
              text-[11px]
              leading-[1.45]
              text-[#D7E2EA]/45

              sm:text-[12px]
              md:text-[14px]
            "
          >
            {project.description}
          </p>

          <span
            className="
              mt-3
              block
              font-mono
              text-[7px]
              uppercase
              tracking-[0.15em]
              text-[#D7E2EA]/30

              sm:text-[8px]
            "
          >
            {project.stack}
          </span>
        </div>

        {/* VISUAL */}

        <div
          className="
            mt-5
            min-h-0
            flex-1

            sm:mt-6
            md:mt-8
          "
        >
          <ProjectVisual index={index} />
        </div>

        {/* MOBILE */}

        <a
          href="#contact"
          className="
            mt-4
            flex
            shrink-0
            items-center
            justify-center
            gap-2
            rounded-full
            border-2
            border-[#D7E2EA]
            px-6
            py-2.5
            font-mono
            text-[8px]
            uppercase
            tracking-[0.16em]
            text-[#D7E2EA]
            transition-colors
            duration-300
            hover:bg-[#D7E2EA]/10

            sm:hidden
          "
        >
          LIVE PROJECT

          <ArrowUpRight size={12} />
        </a>
      </motion.article>
    </div>
  );
}

/* =========================================================
   WORK
   ========================================================= */

export default function Work() {
  return (
    <section
      id="work"
      className="
        relative
        z-10
        -mt-10

        rounded-t-[40px]

        bg-[#0C0C0C]

        px-5
        pb-20
        pt-20

        sm:-mt-12
        sm:rounded-t-[50px]
        sm:px-8
        sm:pb-24
        sm:pt-24

        md:-mt-14
        md:rounded-t-[60px]
        md:px-10
        md:pb-28
        md:pt-32
      "
    >
      <div className="mx-auto max-w-[1600px]">
        {/* HEADING */}

        <div
          className="
            mb-16

            sm:mb-20
            md:mb-28
          "
        >
          <motion.div
            initial={{
              opacity: 0,
              y: 60,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0,
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
                leading-none
                tracking-[-0.075em]

                text-transparent
              "
            >
              Project
              <span className="text-[#c8ff3d]">.</span>
            </h2>
          </motion.div>
        </div>

        {/* FEATURED */}

        <div className="relative">
          {featuredProjects.map((project, index) => (
            <ProjectCard
              key={project.number}
              project={project}
              index={index}
              totalCards={featuredProjects.length}
            />
          ))}
        </div>

        {/* ARCHIVE */}

        <section
          className="
            mt-12
            border-t
            border-white/10
            pt-8

            sm:mt-16
            sm:pt-10

            md:mt-20
            md:pt-12
          "
        >
          <div
            className="
              mb-8
              flex
              items-end
              justify-between
              gap-6

              sm:mb-10
            "
          >
            <div>
              <span
                className="
                  font-mono
                  text-[8px]
                  uppercase
                  tracking-[0.18em]
                  text-white/30
                "
              >
                ARCHIVE
              </span>

              <h3
                className="
                  mt-3
                  text-[clamp(2.5rem,7vw,6rem)]
                  font-black
                  uppercase
                  leading-[0.8]
                  tracking-[-0.07em]
                  text-[#D7E2EA]
                "
              >
                ARCHIVED
                <span className="text-[#c8ff3d]">.</span>
              </h3>
            </div>

            <span
              className="
                font-mono
                text-[8px]
                uppercase
                tracking-[0.15em]
                text-white/25
              "
            >
              02 PROJECTS
            </span>
          </div>

          <div
            className="
              mx-auto
              max-w-5xl
              border-t
              border-white/10
            "
          >
            {archivedProjects.map((project) => (
              <a
                key={project.number}
                href="#contact"
                className="
                  group
                  flex
                  items-center
                  justify-between
                  gap-6

                  border-b
                  border-white/10

                  py-6

                  transition-all
                  duration-500

                  hover:px-3
                "
              >
                <div
                  className="
                    flex
                    min-w-0
                    items-center
                    gap-6
                  "
                >
                  <span
                    className="
                      shrink-0
                      font-mono
                      text-[8px]
                      tracking-[0.15em]
                      text-white/25
                    "
                  >
                    {project.number}
                  </span>

                  <div className="min-w-0">
                    <h4
                      className="
                        truncate
                        text-[clamp(1.4rem,3vw,2.5rem)]
                        font-black
                        uppercase
                        leading-none
                        tracking-[-0.05em]
                        text-[#D7E2EA]
                        transition-colors
                        duration-300
                        group-hover:text-[#c8ff3d]
                      "
                    >
                      {project.name}
                    </h4>

                    <span
                      className="
                        mt-2
                        block
                        font-mono
                        text-[7px]
                        uppercase
                        tracking-[0.15em]
                        text-white/25
                      "
                    >
                      {project.category}
                    </span>
                  </div>
                </div>

                <ArrowUpRight
                  size={18}
                  className="
                    shrink-0
                    text-white/30

                    transition-all
                    duration-500

                    group-hover:-translate-y-1
                    group-hover:translate-x-1
                    group-hover:text-[#c8ff3d]
                  "
                />
              </a>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}