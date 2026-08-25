export type ExperienceQuality = "high" | "medium" | "low";

export type CursorState = "default" | "view" | "explore" | "drag" | "open" | "email";

export const cursorLabels: Record<Exclude<CursorState, "default">, string> = {
  view: "VIEW\nPROJECT",
  explore: "EXPLORE\n↗",
  drag: "DRAG",
  open: "OPEN",
  email: "EMAIL\n↗",
};
