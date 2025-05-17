"use client";
import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [pos, setPos] = useState<{ x: number; y: number }>({ x: -100, y: -100 });

  useEffect(() => {
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <img
      src="/mouse.png"
      alt="마우스"
      style={{
        position: "fixed",
        left: pos.x - 24,
        top: pos.y - 24,
        width: 48,
        height: 48,
        pointerEvents: "none",
        zIndex: 9999,
        transition: "left 0.08s cubic-bezier(.4,1,.7,1), top 0.08s cubic-bezier(.4,1,.7,1)",
        userSelect: "none",
      }}
    />
  );
} 