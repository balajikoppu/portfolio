export type Capability = {
  id: string;
  number: string;
  title: string;
  shortTitle: string;
  description: string;
  skills: string[];
};

export const capabilities: Capability[] = [
  {
    id: "software",
    number: "01",
    title: "SOFTWARE",
    shortTitle: "SOFTWARE",
    description:
      "Designing and building reliable digital products from interface to backend architecture.",
    skills: [
      "React",
      "TypeScript",
      "Python",
      "FastAPI",
      "PostgreSQL",
      "REST APIs",
    ],
  },

  {
    id: "ai",
    number: "02",
    title: "ARTIFICIAL INTELLIGENCE",
    shortTitle: "AI",
    description:
      "Turning machine intelligence into practical products, automation systems and useful user experiences.",
    skills: [
      "Machine Learning",
      "Generative AI",
      "AI Automation",
      "Recommendation Systems",
      "Data Processing",
      "AI APIs",
    ],
  },

  {
    id: "automotive",
    number: "03",
    title: "AUTOMOTIVE SYSTEMS",
    shortTitle: "AUTOMOTIVE",
    description:
      "Exploring software-defined vehicle architecture, ECU communication and intelligent automotive systems.",
    skills: [
      "ADAS",
      "SDV",
      "CAN",
      "MQTT",
      "ECU Architecture",
      "Diagnostics",
    ],
  },

  {
    id: "product",
    number: "04",
    title: "PRODUCT ENGINEERING",
    shortTitle: "PRODUCT",
    description:
      "Combining engineering, interaction design and visual thinking to create products people remember.",
    skills: [
      "UX Thinking",
      "Product Design",
      "Prototyping",
      "Architecture",
      "Performance",
      "Deployment",
    ],
  },
];