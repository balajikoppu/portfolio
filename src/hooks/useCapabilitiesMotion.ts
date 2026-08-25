import {
  useEffect,
  useRef,
} from "react";

import { useScrollProgress } from "./useScrollProgress";

export function useCapabilitiesMotion() {
  const { progress, velocity } =
    useScrollProgress();

  const sectionRef =
    useRef<HTMLElement | null>(null);

  const wordsRef =
    useRef<HTMLSpanElement[]>([]);

  const rowsRef =
    useRef<HTMLButtonElement[]>([]);

  const detailRef =
    useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      const section =
        sectionRef.current;

      if (!section) {
        frame =
          requestAnimationFrame(update);

        return;
      }

      const rect =
        section.getBoundingClientRect();

      /*
       * Only animate while the section is
       * reasonably close to the viewport.
       */

      const viewportHeight =
        window.innerHeight;

      const visible =
        rect.bottom > -200 &&
        rect.top < viewportHeight + 200;

      if (visible) {
        const scroll =
          progress.current;

        const speed =
          Math.max(
            -15,
            Math.min(
              15,
              velocity.current,
            ),
          );

        /*
         * Large typography movement.
         */

        const wordOffsets = [
          -scroll * 18 + speed * 0.35,
          scroll * 13 - speed * 0.25,
          -scroll * 9 + speed * 0.18,
        ];

        wordsRef.current.forEach(
          (word, index) => {
            if (!word) {
              return;
            }

            const offset =
              wordOffsets[index] ?? 0;

            word.style.transform =
              `translate3d(${offset}px, 0, 0)`;
          },
        );

        /*
         * Capability rows get tiny
         * independent vertical movement.
         */

        rowsRef.current.forEach(
          (row, index) => {
            if (!row) {
              return;
            }

            const offset =
              Math.sin(
                scroll * 8 +
                  index * 0.9,
              ) * 2.5;

            row.style.setProperty(
              "--scroll-offset",
              `${offset}px`
            );
          },
        );

        /*
         * Detail panel responds subtly
         * to scroll velocity.
         */

        if (detailRef.current) {
          const panelY =
            Math.max(
              -4,
              Math.min(
                4,
                speed * 0.18,
              ),
            );

          detailRef.current.style.transform =
            `translate3d(0, ${panelY}px, 0)`;
        }
      }

      frame =
        requestAnimationFrame(update);
    };

    frame =
      requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(frame);
    };
  }, [progress, velocity]);

  return {
    sectionRef,
    wordsRef,
    rowsRef,
    detailRef,
  };
}