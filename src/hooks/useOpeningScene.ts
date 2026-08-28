import { useEffect, useState } from "react";

const openingSeenKey = "portfolio_intro_seen";
const openingDuration = 12000;
let openingRuntimeState: "idle" | "active" | "done" = "idle";

export function useOpeningScene(reducedMotion: boolean) {
  const [active, setActive] = useState(() => {
    if (typeof window === "undefined" || openingRuntimeState === "done") {
      return false;
    }

    if (openingRuntimeState === "active") {
      return true;
    }

    try {
      if (sessionStorage.getItem(openingSeenKey)) {
        return false;
      }

      sessionStorage.setItem(openingSeenKey, "true");
      openingRuntimeState = "active";
      return true;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    if (!active) {
      return;
    }

    const timeout = window.setTimeout(() => {
      openingRuntimeState = "done";
      setActive(false);
    }, reducedMotion ? 600 : openingDuration);

    return () => window.clearTimeout(timeout);
  }, [active, reducedMotion]);

  const skip = () => {
    openingRuntimeState = "done";
    setActive(false);
  };

  return { active, skip };
}
