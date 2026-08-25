import { createContext, useContext } from "react";

import type { ExperienceQuality } from "./experienceConfig";

type ExperienceContextValue = {
  mobile: boolean;
  finePointer: boolean;
  reducedMotion: boolean;
  webgl: boolean;
  quality: ExperienceQuality;
  experimental: boolean;
  setExperimental: (enabled: boolean) => void;
  scrollProgress: React.MutableRefObject<number>;
  scrollVelocity: React.MutableRefObject<number>;
};

export const ExperienceContext = createContext<ExperienceContextValue | null>(null);

export function useExperience() {
  const context = useContext(ExperienceContext);

  if (!context) {
    throw new Error("useExperience must be used within ExperienceProvider");
  }

  return context;
}
