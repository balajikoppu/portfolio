import { motion } from "framer-motion";
import { ArrowUpRight, Mail } from "lucide-react";

const socialLinks = [
  {
    label: "GITHUB",
    href: "#",
  },
  {
    label: "LINKEDIN",
    href: "#",
  },
  {
    label: "EMAIL",
    href: "mailto:hello@example.com",
    isEmail: true,
  },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="
        relative
        min-h-screen
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

          [background-image:linear-gradient(rgba(215,226,234,0.35)_1px,transparent_1px),linear-gradient(90deg,rgba(215,226,234,0.35)_1px,transparent_1px)]
          [background-size:80px_80px]
        "
      />

      {/* GLOW */}

      <motion.div
        animate={{
          scale: [1, 1.12, 1],
          opacity: [0.08, 0.16, 0.08],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-[35vw]
          w-[35vw]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-[#c8ff3d]/[0.03]
          blur-[120px]
        "
      />

      <div
        className="
          relative
          mx-auto
          flex
          min-h-[calc(100vh-8rem)]
          max-w-[1600px]
          flex-col
          justify-between
        "
      >
        {/* TOP */}

        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 0.8,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          className="
            flex
            items-center
            justify-between
            border-b
            border-white/10
            pb-5
          "
        >
          <div
            className="
              flex
              items-center
              gap-3
              font-mono
              text-[8px]
              uppercase
              tracking-[0.18em]
              text-white/30
            "
          >
            <span className="text-[#c8ff3d]">
              05
            </span>

            <span>CONTACT</span>
          </div>

          <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-white/25">
            LET&apos;S CONNECT
          </span>
        </motion.div>

        {/* MAIN */}

        <div className="relative flex flex-1 items-center">
          <div className="w-full">
            <motion.p
              initial={{
                opacity: 0,
                y: 25,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.2,
              }}
              transition={{
                duration: 0.7,
                delay: 0.1,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="
                mb-8
                font-mono
                text-[8px]
                uppercase
                tracking-[0.16em]
                text-white/30

                sm:mb-10
              "
            >
              HAVE AN IDEA?
            </motion.p>

            <div className="overflow-hidden">
              <motion.h2
                initial={{
                  y: 100,
                  opacity: 0,
                }}
                whileInView={{
                  y: 0,
                  opacity: 1,
                }}
                viewport={{
                  once: true,
                  amount: 0.2,
                }}
                transition={{
                  duration: 1,
                  delay: 0.15,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                className="
                  bg-linear-to-b
                  from-[#646973]
                  to-[#BBCCD7]
                  bg-clip-text

                  text-[clamp(4.5rem,14vw,13rem)]
                  font-black
                  uppercase
                  leading-[0.76]
                  tracking-[-0.085em]

                  text-transparent
                "
              >
                LET&apos;S
              </motion.h2>
            </div>

            <div className="overflow-hidden">
              <motion.h2
                initial={{
                  y: 100,
                  opacity: 0,
                }}
                whileInView={{
                  y: 0,
                  opacity: 1,
                }}
                viewport={{
                  once: true,
                  amount: 0.2,
                }}
                transition={{
                  duration: 1,
                  delay: 0.22,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                className="
                  bg-linear-to-b
                  from-[#646973]
                  to-[#BBCCD7]
                  bg-clip-text

                  pl-[7vw]

                  text-[clamp(4.5rem,14vw,13rem)]
                  font-black
                  uppercase
                  leading-[0.76]
                  tracking-[-0.085em]

                  text-transparent
                "
              >
                BUILD
              </motion.h2>
            </div>

            <div className="overflow-hidden">
              <motion.h2
                initial={{
                  y: 100,
                  opacity: 0,
                }}
                whileInView={{
                  y: 0,
                  opacity: 1,
                }}
                viewport={{
                  once: true,
                  amount: 0.2,
                }}
                transition={{
                  duration: 1,
                  delay: 0.29,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                className="
                  bg-linear-to-b
                  from-[#646973]
                  to-[#BBCCD7]
                  bg-clip-text

                  text-[clamp(4.5rem,14vw,13rem)]
                  font-black
                  uppercase
                  leading-[0.76]
                  tracking-[-0.085em]

                  text-transparent
                "
              >
                SOMETHING
                <span className="text-[#c8ff3d]">.</span>
              </motion.h2>
            </div>

            {/* EMAIL */}

            <motion.a
              href="mailto:hello@example.com"
              initial={{
                opacity: 0,
                y: 25,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.2,
              }}
              transition={{
                duration: 0.7,
                delay: 0.45,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="
                group
                mt-10
                inline-flex
                items-center
                gap-4

                rounded-full
                border
                border-white/20

                px-6
                py-3

                font-mono
                text-[9px]
                uppercase
                tracking-[0.16em]
                text-[#D7E2EA]

                transition-all
                duration-300

                hover:border-[#c8ff3d]/50
                hover:bg-[#c8ff3d]/5

                sm:mt-12
                sm:px-7
                sm:py-3.5
              "
            >
              <Mail
                size={14}
                className="
                  text-white/40
                  transition-colors
                  duration-300
                  group-hover:text-[#c8ff3d]
                "
              />

              <span>hello@example.com</span>

              <ArrowUpRight
                size={15}
                className="
                  transition-transform
                  duration-500
                  group-hover:-translate-y-1
                  group-hover:translate-x-1
                "
              />
            </motion.a>
          </div>
        </div>

        {/* FOOTER */}

        <motion.footer
          initial={{
            opacity: 0,
            y: 25,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 0.7,
            delay: 0.2,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          className="
            flex
            flex-col
            gap-8

            border-t
            border-white/10
            pt-6

            sm:flex-row
            sm:items-end
            sm:justify-between
          "
        >
          {/* COPYRIGHT */}

          <div className="font-mono text-[8px] uppercase tracking-[0.15em] text-white/25">
            © 2026 BALAJI
          </div>

          {/* SOCIALS */}

          <div className="flex flex-wrap items-center gap-5">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target={
                  social.href.startsWith("#")
                    ? undefined
                    : "_blank"
                }
                rel={
                  social.href.startsWith("#")
                    ? undefined
                    : "noreferrer"
                }
                className="
                  group
                  flex
                  items-center
                  gap-2

                  font-mono
                  text-[8px]
                  uppercase
                  tracking-[0.14em]

                  text-white/30

                  transition-colors
                  duration-300

                  hover:text-[#D7E2EA]
                "
              >
                {social.isEmail && (
                  <Mail
                    size={12}
                    className="
                      text-white/25
                      transition-colors
                      duration-300

                      group-hover:text-[#c8ff3d]
                    "
                  />
                )}

                <span>{social.label}</span>

                <ArrowUpRight
                  size={11}
                  className="
                    text-white/20

                    transition-all
                    duration-300

                    group-hover:-translate-y-0.5
                    group-hover:translate-x-0.5
                    group-hover:text-[#c8ff3d]
                  "
                />
              </a>
            ))}
          </div>

          {/* TOP */}

          <a
            href="#hero"
            className="
              group
              flex
              items-center
              gap-2

              font-mono
              text-[8px]
              uppercase
              tracking-[0.14em]

              text-white/30

              transition-colors
              duration-300

              hover:text-[#D7E2EA]
            "
          >
            <span>BACK TO TOP</span>

            <span className="transition-transform duration-300 group-hover:-translate-y-1">
              ↑
            </span>
          </a>
        </motion.footer>
      </div>
    </section>
  );
}