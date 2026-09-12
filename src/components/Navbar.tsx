import { useEffect, useState } from "react";

const navigation = [
  {
    number: "01",
    label: "WORK",
    href: "#work",
  },
  {
    number: "02",
    label: "ABOUT",
    href: "#about",
  },
  {
    number: "03",
    label: "CONTACT",
    href: "#contact",
  },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`
        fixed inset-x-0 top-0 z-50
        px-4 md:px-6 lg:px-8

        transition-[padding] duration-700
        ease-[cubic-bezier(0.22,1,0.36,1)]

        ${isScrolled ? "py-3" : "py-5 md:py-7"}
      `}
    >
      <nav
        className={`
          mx-auto
          flex
          w-full
          max-w-[1600px]
          items-center
          justify-between

          transition-all
          duration-700
          ease-[cubic-bezier(0.22,1,0.36,1)]

          ${
            isScrolled
              ? `
                rounded-full
                border
                border-white/10
                bg-black/60
                px-4
                py-3
                backdrop-blur-xl
                md:px-5
              `
              : ""
          }
        `}
      >
        {/* =================================================
            LOGO
        ================================================= */}

        <a
          href="#hero"
          aria-label="JAY — Home"
          className="
            group
            flex
            items-center
            gap-2

            font-mono
            text-[10px]
            font-medium
            uppercase
            tracking-[0.16em]

            text-[#f2f0eb]
          "
        >
          <span
            className="
              relative
              flex
              h-2
              w-2
              items-center
              justify-center
            "
          >
            <span
              className="
                absolute
                h-2
                w-2
                rounded-full
                bg-[#f2f0eb]

                transition-transform
                duration-500
                ease-[cubic-bezier(0.16,1,0.3,1)]

                group-hover:scale-[1.7]
              "
            />

            <span
              className="
                absolute
                h-4
                w-4
                rounded-full
                border
                border-white/30

                scale-50
                opacity-0

                transition-all
                duration-500
                ease-[cubic-bezier(0.16,1,0.3,1)]

                group-hover:scale-100
                group-hover:opacity-100
              "
            />
          </span>

          <span>JAY</span>
        </a>

        {/* =================================================
            DESKTOP NAVIGATION
        ================================================= */}

        <div className="hidden items-center gap-7 md:flex lg:gap-9">
          {navigation.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="
                group
                relative
                flex
                items-center
                gap-2

                font-mono
                text-[9px]
                font-medium
                uppercase
                tracking-[0.16em]

                text-white/50

                transition-colors
                duration-300

                hover:text-[#f2f0eb]
              "
            >
              <span
                className="
                  text-[8px]
                  text-white/25

                  transition-colors
                  duration-300

                  group-hover:text-[#c8ff3d]
                "
              >
                {item.number}
              </span>

              <span>{item.label}</span>

              <span
                className="
                  absolute
                  -bottom-1.5
                  left-0
                  h-px
                  w-full

                  origin-left
                  scale-x-0

                  bg-[#f2f0eb]

                  transition-transform
                  duration-500
                  ease-[cubic-bezier(0.16,1,0.3,1)]

                  group-hover:scale-x-100
                "
              />
            </a>
          ))}
        </div>

        {/* =================================================
            AVAILABILITY
        ================================================= */}

        <div
          className="
            hidden
            items-center
            gap-2

            font-mono
            text-[9px]
            uppercase
            tracking-[0.14em]

            text-white/30

            lg:flex
          "
        >
          <span
            className="
              h-1.5
              w-1.5
              rounded-full

              bg-[#c8ff3d]

              shadow-[0_0_12px_rgba(200,255,61,0.45)]
            "
          />

          <span>AVAILABLE</span>
        </div>

        {/* =================================================
            MOBILE MENU
        ================================================= */}

        <button
          type="button"
          aria-label="Open navigation menu"
          className="
            group
            flex
            items-center
            gap-2

            font-mono
            text-[9px]
            font-medium
            uppercase
            tracking-[0.16em]

            text-white/50

            transition-colors
            duration-300

            hover:text-[#f2f0eb]

            md:hidden
          "
        >
          <span>MENU</span>

          <span
            className="
              relative
              flex
              h-3
              w-3
              items-center
              justify-center
            "
          >
            <span
              className="
                absolute
                h-px
                w-3
                bg-current

                -translate-y-1

                transition-transform
                duration-300

                group-hover:translate-y-0
                group-hover:rotate-45
              "
            />

            <span
              className="
                absolute
                h-px
                w-3
                bg-current

                translate-y-1

                transition-transform
                duration-300

                group-hover:translate-y-0
                group-hover:-rotate-45
              "
            />
          </span>
        </button>
      </nav>
    </header>
  );
}