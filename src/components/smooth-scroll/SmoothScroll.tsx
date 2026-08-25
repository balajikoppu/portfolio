import { useEffect } from "react";
import Lenis from "lenis";

type SmoothScrollProps = {
  children: React.ReactNode;
  enabled?: boolean;
};

export default function SmoothScroll({
  children,
  enabled = true,
}: SmoothScrollProps) {
  useEffect(() => {
    if (!enabled) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      touchMultiplier: 1.2,
    });

    let animationFrame = 0;

    const raf = (time: number) => {
      lenis.raf(time);

      animationFrame =
        requestAnimationFrame(raf);
    };

    animationFrame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrame);
      lenis.destroy();
    };
  }, [enabled]);

  return <>{children}</>;
}