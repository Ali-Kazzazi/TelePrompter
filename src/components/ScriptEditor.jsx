import { useRef, useState } from "react";

export default function ScriptEditor({ text, setText, visible }) {
  const [pos, setPos] = useState({ x: 20, y: 20 });
  const dragging = useRef(false);
  const last = useRef({ x: 0, y: 0 });

  if (!visible) return null;

  const onPointerDown = (e) => {
    dragging.current = true;
    last.current = { x: e.clientX, y: e.clientY };
    e.target.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e) => {
    if (!dragging.current) return;

    const dx = e.clientX - last.current.x;
    const dy = e.clientY - last.current.y;

    setPos(p => ({ x: p.x + dx, y: p.y + dy }));
    last.current = { x: e.clientX, y: e.clientY };
  };

  const onPointerUp = (e) => {
    dragging.current = false;
    e.target.releasePointerCapture(e.pointerId);
  };

  return (
    <div
      style={{
        position: "fixed",
        left: pos.x,
        top: pos.y,
        width: 360,
        height: 280,
        background: "#111",
        border: "1px solid #333",
        zIndex: 1000,
        display: "flex",
        flexDirection: "column"
      }}
    >
      {/* Drag Handle */}
      <div
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        style={{
          height: 32,
          background: "#1a1a1a",
          cursor: "move",
          padding: "6px 10px",
          userSelect: "none",
          touchAction: "none",
          borderBottom: "1px solid #333"
        }}
      >
        Script Editor
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{
          flex: 1,
          background: "#000",
          color: "#f1f1f1",
          border: "none",
          outline: "none",
          resize: "none",
          padding: 10,
          fontSize: 16
        }}
      />
    </div>
  );
}
