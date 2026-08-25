import { useEffect, useState } from "react";

import { useExperience } from "../../experience/useExperience";

const actions = [
  { label: "Selected Work", href: "#work" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
  { label: "Back to top", href: "#top" },
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { experimental, setExperimental } = useExperience();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((isOpen) => !isOpen);
      }

      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const visibleActions = actions.filter((action) =>
    action.label.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <>
      <button className="palette-trigger" data-cursor="open" type="button" onClick={() => setOpen(true)} aria-label="Open command palette">
        <span>⌘K</span>
      </button>

      {open && (
        <div className="palette-backdrop" role="presentation" onMouseDown={() => setOpen(false)}>
          <section className="command-palette" role="dialog" aria-modal="true" aria-label="Search the experience" onMouseDown={(event) => event.stopPropagation()}>
            <div className="palette-header">
              <span>SEARCH THE EXPERIENCE...</span>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close command palette">ESC</button>
            </div>
            <input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Find a destination" aria-label="Search destinations" />
            <div className="palette-actions">
              {visibleActions.map((action) => (
                <a key={action.href} href={action.href} onClick={() => setOpen(false)}>{action.label}<span aria-hidden="true">↗</span></a>
              ))}
              <button type="button" className={experimental ? "is-active" : ""} onClick={() => setExperimental(!experimental)}>
                Experimental Mode<span aria-hidden="true">{experimental ? "ON" : "OFF"}</span>
              </button>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
