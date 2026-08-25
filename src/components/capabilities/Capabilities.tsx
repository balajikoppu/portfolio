import { useState } from "react";

import { capabilities } from "../../data/capabilities";
import { useCapabilitiesMotion } from "../../hooks/useCapabilitiesMotion";
import { useMagnetic } from "../../hooks/useMagnetic";

interface CapabilityRowProps {
  capability: (typeof capabilities)[number];
  active: boolean;
  onActivate: () => void;
  rowRef: (
    element: HTMLButtonElement | null,
  ) => void;
}

function CapabilityRow({
  capability,
  active,
  onActivate,
  rowRef,
}: CapabilityRowProps) {
  const magneticRef =
    useMagnetic<HTMLButtonElement>({
      strength: 0.16,
      radius: 180,
    });

  return (
    <button
      ref={(element) => {
        magneticRef.current = element;
        rowRef(element);
      }}
      type="button"
      className={`capability-item ${
        active ? "is-active" : ""
      }`}
      onMouseEnter={onActivate}
      onFocus={onActivate}
      onClick={onActivate}
    >
      <span className="capability-number">
        {capability.number}
      </span>

      <span className="capability-title">
        {capability.title}
      </span>

      <span
        className="capability-symbol"
        aria-hidden="true"
      >
        ↗
      </span>
    </button>
  );
}

export default function Capabilities() {
  const [activeId, setActiveId] =
    useState(capabilities[0].id);

  const {
    sectionRef,
    wordsRef,
    rowsRef,
    detailRef,
  } = useCapabilitiesMotion();

  const activeCapability =
    capabilities.find(
      (item) => item.id === activeId,
    ) ?? capabilities[0];

  return (
    <section
      ref={sectionRef}
      id="capabilities"
      className="capabilities-section"
    >
      <div className="capabilities-header">
        <span className="section-number">
          03
        </span>

        <span className="section-label">
          CAPABILITIES
        </span>
      </div>

      <div className="capabilities-intro">
        <p className="capabilities-kicker">
          WHAT I BUILD
        </p>

        <h2>
          <span
            ref={(element) => {
              if (element) {
                wordsRef.current[0] =
                  element;
              }
            }}
            className="capability-word capability-word-one"
          >
            IDEAS
          </span>

          <br />

          <span
            ref={(element) => {
              if (element) {
                wordsRef.current[1] =
                  element;
              }
            }}
            className="capability-word capability-word-two"
          >
            INTO
          </span>

          <br />

          <span
            ref={(element) => {
              if (element) {
                wordsRef.current[2] =
                  element;
              }
            }}
            className="capability-word capability-word-three"
          >
            SYSTEMS.
          </span>
        </h2>
      </div>

      <div className="capabilities-stage">
        <div className="capabilities-list">
          {capabilities.map(
            (capability, index) => (
              <CapabilityRow
                key={capability.id}
                capability={capability}
                active={
                  activeId === capability.id
                }
                onActivate={() =>
                  setActiveId(
                    capability.id,
                  )
                }
                rowRef={(element) => {
                  if (element) {
                    rowsRef.current[index] =
                      element;
                  }
                }}
              />
            ),
          )}
        </div>

        <div
          ref={detailRef}
          className="capability-detail"
        >
          <div className="capability-detail-number">
            {activeCapability.number}
          </div>

          <p>
            {activeCapability.description}
          </p>

          <div className="capability-skills">
            {activeCapability.skills.map(
              (skill) => (
                <span key={skill}>
                  {skill}
                </span>
              ),
            )}
          </div>
        </div>
      </div>

      <div className="capabilities-footer">
        <span>
          SOFTWARE × INTELLIGENCE × SYSTEMS
        </span>

        <span>2026</span>
      </div>
    </section>
  );
}