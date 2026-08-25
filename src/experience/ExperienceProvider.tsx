import { useEffect, useState } from "react";

import { useScrollProgress } from "../hooks/useScrollProgress";
import { isMobileDevice } from "../lib/device";
import { supportsWebGL } from "../lib/webgl";
import { getExperienceQuality } from "./performance";
import { ExperienceContext } from "./useExperience";

function getInitialReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getInitialFinePointer() {
  return typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches;
}

export function ExperienceProvider({ children }: { children: React.ReactNode }) {
  const { progress: scrollProgress, velocity: scrollVelocity } = useScrollProgress();
  const [mobile] = useState(() => isMobileDevice());
  const [webgl] = useState(() => supportsWebGL());
  const [finePointer] = useState(() => getInitialFinePointer());
  const [reducedMotion, setReducedMotion] = useState(getInitialReducedMotion);
  const [experimental, setExperimental] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setReducedMotion(mediaQuery.matches);

    mediaQuery.addEventListener("change", updateMotionPreference);
    return () => mediaQuery.removeEventListener("change", updateMotionPreference);
  }, []);

  const quality = getExperienceQuality({
    mobile,
    finePointer,
    reducedMotion,
    webgl,
    hardwareConcurrency: navigator.hardwareConcurrency || 8,
  });

  return (
    <ExperienceContext.Provider
      value={{
        mobile,
        finePointer,
        reducedMotion,
        webgl,
        quality,
        experimental,
        setExperimental,
        scrollProgress,
        scrollVelocity,
      }}
    >
      {children}
    </ExperienceContext.Provider>
  );
}

