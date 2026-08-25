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
  if (reducedMotion || !webgl || !finePointer) {
    return "low";
  }

  if (mobile || hardwareConcurrency <= 4) {
    return "medium";
  }

  return "high";
}
