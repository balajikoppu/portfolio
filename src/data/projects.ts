export type Project = {
  id: string;
  number: string;
  title: string;
  category: string;
  description: string;
  technologies: string[];
  year: string;
  featured?: boolean;
  visual: {
    type: "gradient" | "grid" | "orb";
    label: string;
  };
};

export const projects: Project[] = [
  {
    id: "sams",
    number: "01",
    title: "SAMS",
    category: "AI / EDUCATION / SOFTWARE",
    description:
      "A smart academic platform combining generative AI, predictive analytics and intelligent recommendations to improve student support.",
    technologies: [
      "Python",
      "FastAPI",
      "React",
      "PostgreSQL",
      "AI",
    ],
    year: "2026",
    featured: true,
    visual: {
      type: "orb",
      label: "INTELLIGENT ACADEMIC SYSTEM",
    },
  },

  {
    id: "sdv",
    number: "02",
    title: "SDV",
    category: "AUTOMOTIVE / SYSTEMS / ADAS",
    description:
      "A miniature Software Defined Vehicle architecture connecting automotive ECUs, communication layers, diagnostics and OTA capabilities.",
    technologies: [
      "Python",
      "Docker",
      "MQTT",
      "CAN",
      "Embedded",
    ],
    year: "2026",
    featured: true,
    visual: {
      type: "grid",
      label: "SOFTWARE DEFINED VEHICLE",
    },
  },

  {
    id: "career-ai",
    number: "03",
    title: "CAREER AI",
    category: "AI / RECOMMENDATION / PRODUCT",
    description:
      "An intelligent career recommendation experience connecting user skills with relevant jobs, courses and career paths.",
    technologies: [
      "React",
      "Python",
      "Flask",
      "Machine Learning",
    ],
    year: "2025",
    featured: true,
    visual: {
      type: "gradient",
      label: "AI CAREER INTELLIGENCE",
    },
  },
];