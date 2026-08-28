import { useEffect, useRef, useState } from "react";

type ViewportPresenceProps = {
  children: React.ReactNode;
  rootMargin?: string;
};

export default function ViewportPresence({
  children,
  rootMargin = "200px 0px",
}: ViewportPresenceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [present, setPresent] = useState(false);

  useEffect(() => {
    const element = containerRef.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => setPresent(entry.isIntersecting),
      { rootMargin },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [rootMargin]);

  return <div ref={containerRef}>{present ? children : null}</div>;
}
