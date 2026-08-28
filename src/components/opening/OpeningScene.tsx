type OpeningSceneProps = {
  active: boolean;
  reducedMotion: boolean;
  onSkip: () => void;
};

export default function OpeningScene({ active, reducedMotion, onSkip }: OpeningSceneProps) {
  if (!active) {
    return null;
  }

  return (
    <div className={`opening-scene ${reducedMotion ? "is-reduced" : ""}`} role="presentation">
      <div className="opening-photograph" aria-hidden="true" />
      <div className="opening-photo-shade" aria-hidden="true" />

      <div className="opening-copy">
        <span>THE STORY BEGINS</span>
        <strong>JAI</strong>
        <small>SOFTWARE × AI × SYSTEMS</small>
        <p>BUILDING INTELLIGENT SOLUTIONS<br />FOR A BETTER FUTURE.</p>
      </div>

      <div className="opening-sphere-content" aria-hidden="true">
        <strong>Welcome</strong>
        
      </div>

      <div className="opening-exploring" aria-hidden="true">
        <span>EXPLORING</span>
        <strong>ADAS · SDV · ROBOTICS</strong>
      </div>

      <button className="opening-skip" type="button" onClick={onSkip}>
        SKIP <span aria-hidden="true">↗</span>
      </button>
    </div>
  );
}
