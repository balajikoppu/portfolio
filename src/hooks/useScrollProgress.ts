import { useEffect, useRef } from "react";

export function useScrollProgress() {
  const progress = useRef(0);
  const velocity = useRef(0);
  const lastScroll = useRef(0);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      const maxScroll =
        document.documentElement.scrollHeight -
        window.innerHeight;

      const currentScroll = window.scrollY;

      progress.current =
        maxScroll > 0
          ? currentScroll / maxScroll
          : 0;

      velocity.current =
        currentScroll -
        lastScroll.current;

      lastScroll.current =
        currentScroll;

      frame =
        requestAnimationFrame(update);
    };

    frame =
      requestAnimationFrame(update);

    return () =>
      cancelAnimationFrame(frame);
  }, []);

  return {
    progress,
    velocity,
  };
}