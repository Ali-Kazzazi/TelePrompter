import { useEffect, useRef } from "react";

export default function Teleprompter({
  text,
  playing,
  speed,
  fontSize,
  mirrored,
  offsetY,
  setOffsetY
}) {
  const containerRef = useRef(null);

  const scrollRef = useRef(0);
  const lastTimeRef = useRef(null);
  const rafIdRef = useRef(null);

  const dragging = useRef(false);
  const lastY = useRef(0);

  /* ---------- AUTO SCROLL ---------- */
  useEffect(() => {
    if (!playing) {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
      lastTimeRef.current = null;
      return;
    }

    const loop = (time) => {
      if (!lastTimeRef.current) lastTimeRef.current = time;

      const delta = time - lastTimeRef.current;
      scrollRef.current += (speed * delta) / 1000;
      containerRef.current.scrollTop = scrollRef.current;

      lastTimeRef.current = time;
      rafIdRef.current = requestAnimationFrame(loop);
    };

    rafIdRef.current = requestAnimationFrame(loop);

    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
      lastTimeRef.current = null;
    };
  }, [playing, speed]);

  /* ---------- POINTER DRAG (MOUSE + TOUCH) ---------- */
  const onPointerDown = (e) => {
    if (playing) return;

    dragging.current = true;
    lastY.current = e.clientY;
    e.target.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e) => {
    if (!dragging.current) return;

    const delta = e.clientY - lastY.current;
    setOffsetY(y => y + delta);
    lastY.current = e.clientY;
  };

  const onPointerUp = (e) => {
    dragging.current = false;
    e.target.releasePointerCapture(e.pointerId);
  };

  /* ---------- ARROW KEYS (DESKTOP ONLY) ---------- */
  useEffect(() => {
    const onKey = (e) => {
      if (playing) return;
      if (e.key === "ArrowUp") setOffsetY(y => y + 10);
      if (e.key === "ArrowDown") setOffsetY(y => y - 10);
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [playing, setOffsetY]);

  return (
    <div
      ref={containerRef}
      style={{
        height: "100vh",
        overflow: "hidden",
        touchAction: "none", // IMPORTANT for mobile
        transform: mirrored ? "scaleX(-1)" : "none"
      }}
    >
      <div
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        style={{
          padding: "40vh 10vw",
          fontSize,
          lineHeight: 1.7,
          transform: `translateY(${offsetY}px)`,
          cursor: playing ? "default" : "grab"
        }}
      >
        {text}
      </div>
    </div>
  );
}
