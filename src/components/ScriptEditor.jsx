import { useRef, useState } from "react";

export default function ScriptEditor({ text, setText, visible }) {
  const [pos, setPos] = useState({ x: 20, y: 20 });
  const dragging = useRef(false);
  const last = useRef({ x: 0, y: 0 });

  if (!visible) return null;

  const onMouseDown = (e) => {
    dragging.current = true;
    last.current = { x: e.clientX, y: e.clientY };
  };

  const onMouseMove = (e) => {
    if (!dragging.current) return;

    const dx = e.clientX - last.current.x;
    const dy = e.clientY - last.current.y;

    setPos(p => ({ x: p.x + dx, y: p.y + dy }));
    last.current = { x: e.clientX, y: e.clientY };
  };

  const stopDrag = () => {
    dragging.current = false;
  };

  return (
    <div
      onMouseMove={onMouseMove}
      onMouseUp={stopDrag}
      onMouseLeave={stopDrag}
      style={{
        position: "fixed",
        left: pos.x,
        top: pos.y,
        width: 420,
        height: 320,
        background: "#111",
        border: "1px solid #333",
        zIndex: 1000,
        display: "flex",
        flexDirection: "column"
      }}
    >
      {/* Header (Drag Handle) */}
      <div
        onMouseDown={onMouseDown}
        style={{
          height: 32,
          background: "#1a1a1a",
          cursor: "move",
          padding: "6px 10px",
          fontSize: 14,
          userSelect: "none",
          borderBottom: "1px solid #333",
        }}
      >
        Script Editor
      </div>

      {/* Text Area */}
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste your script here..."
        style={{
          flex: 1,
          background: "#000",
          color: "#f1f1f1",
          fontSize: 16,
          resize: "none",
          border: "none",
          outline: "none",
          padding: 10
        }}
      />
    </div>
  );
}
