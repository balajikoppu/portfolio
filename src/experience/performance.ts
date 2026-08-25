import type { ExperienceQuality } from "./experienceConfig";

export function getExperienceQuality({
  mobile,
  finePointer,
  reducedMotion,
  webgl,
  hardwareConcurrency,
}: {
  mobile: boolean;
  finePointer: boolean;
  reducedMotion: boolean;
  webgl: boolean;
  hardwareConcurrency: number;
}): ExperienceQuality {
  if (reducedMotion || !webgl) {
    return "low";
  }

  if (mobile || !finePointer || hardwareConcurrency <= 4) {
    return "medium";
  }

  return "high";
}
