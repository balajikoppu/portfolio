import { useEffect, useRef } from "react";

interface MagneticOptions {
  strength?: number;
  radius?: number;
}

export function useMagnetic<T extends HTMLElement>(
  options: MagneticOptions = {},
) {
  const {
    strength = 0.22,
    radius = 140,
  } = options;

  const elementRef =
    useRef<T | null>(null);

  useEffect(() => {
    const element =
      elementRef.current;

    if (!element) {
      return;
    }

    const mediaQuery =
      window.matchMedia(
        "(pointer: fine)",
      );

    if (!mediaQuery.matches) {
      return;
    }

    let frame = 0;

    let targetX = 0;
    let targetY = 0;

    let currentX = 0;
    let currentY = 0;

    const handlePointerMove = (
      event: PointerEvent,
    ) => {
      const rect =
        element.getBoundingClientRect();

      const centerX =
        rect.left + rect.width / 2;

      const centerY =
        rect.top + rect.height / 2;

      const distanceX =
        event.clientX - centerX;

      const distanceY =
        event.clientY - centerY;

      const distance =
        Math.sqrt(
          distanceX * distanceX +
            distanceY * distanceY,
        );

      if (distance > radius) {
        targetX = 0;
        targetY = 0;

        return;
      }

      const influence =
        1 - distance / radius;

      targetX =
        distanceX *
        strength *
        influence;

      targetY =
        distanceY *
        strength *
        influence;
    };

    const handlePointerLeave =
      () => {
        targetX = 0;
        targetY = 0;
      };

    const animate = () => {
      currentX +=
        (targetX - currentX) * 0.12;

      currentY +=
        (targetY - currentY) * 0.12;

      element.style.setProperty(
        "--magnetic-x",
        `${currentX}px`,
      );

      element.style.setProperty(
        "--magnetic-y",
        `${currentY}px`,
      );

      frame =
        requestAnimationFrame(
          animate,
        );
    };

    window.addEventListener(
      "pointermove",
      handlePointerMove,
      { passive: true },
    );

    element.addEventListener(
      "pointerleave",
      handlePointerLeave,
    );

    frame =
      requestAnimationFrame(animate);

    return () => {
      window.removeEventListener(
        "pointermove",
        handlePointerMove,
      );

      element.removeEventListener(
        "pointerleave",
        handlePointerLeave,
      );

      cancelAnimationFrame(frame);
    };
  }, [radius, strength]);

  return elementRef;
}