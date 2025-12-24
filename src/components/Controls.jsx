export default function Controls({
  playing,
  setPlaying,
  speed,
  setSpeed,
  fontSize,
  setFontSize,
  mirrored,
  setMirrored
}) {
  return (
    <div style={{
      position: "fixed",
      bottom: 20,
      left: 20,
      background: "#111",
      padding: 12
    }}>
      <button onClick={() => setPlaying(!playing)}>
        {playing ? "Pause" : "Play"}
      </button>

      <input
        type="range"
        min="10"
        max="200"
        value={speed}
        onChange={e => setSpeed(+e.target.value)}
      />

      <input
        type="range"
        min="24"
        max="90"
        value={fontSize}
        onChange={e => setFontSize(+e.target.value)}
      />

      <button onClick={() => setMirrored(!mirrored)}>
        Mirror
      </button>
    </div>
  );
}
