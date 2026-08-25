import { useEffect, useRef } from "react";

import { cursorLabels, type CursorState } from "../experienceConfig";

const cursorSelector = "[data-cursor]";

export default function GlobalCursor({ enabled }: { enabled: boolean }) {
  const cursorRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!enabled || !cursorRef.current || !labelRef.current) return;

    const cursor = cursorRef.current;
    const label = labelRef.current;
    let frame = 0;
    let targetX = -100;
    let targetY = -100;
    let currentX = targetX;
    let currentY = targetY;
    let state: CursorState = "default";

    const updateState = (nextState: CursorState) => {
      state = nextState;
      cursor.dataset.state = state;
      label.textContent = state === "default" ? "" : cursorLabels[state as Exclude<CursorState, "default">];
    };

    const handlePointerMove = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      const target = (event.target as Element | null)?.closest(cursorSelector);
      updateState((target?.getAttribute("data-cursor") as CursorState | null) ?? "default");
    };

    const animate = () => {
      currentX += (targetX - currentX) * 0.16;
      currentY += (targetY - currentY) * 0.16;
      cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      frame = requestAnimationFrame(animate);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    frame = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      cancelAnimationFrame(frame);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div ref={cursorRef} className="global-cursor" aria-hidden="true" data-state="default">
      <span ref={labelRef} />
    </div>
  );
}
