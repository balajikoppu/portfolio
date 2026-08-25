export type TransitionVariant = "orb" | "generative" | "statement" | "cinematic";

export const transitions = [
  {
    id: "hero-work",
    variant: "orb" as const,
    height: "70vh",
  },
  {
    id: "work-capabilities",
    variant: "generative" as const,
    height: "50vh",
  },
  {
    id: "capabilities-about",
    variant: "statement" as const,
    height: "40vh",
    statement: "SYSTEMS BECOME EXPERIENCES.",
  },
  {
    id: "about-contact",
    variant: "cinematic" as const,
    height: "70vh",
  },
];
