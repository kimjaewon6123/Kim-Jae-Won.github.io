"use client";
import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLImageElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const rafId = useRef<number>();

  useEffect(() => {
    const move = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (!rafId.current) {
        rafId.current = requestAnimationFrame(() => {
          if (cursorRef.current) {
            cursorRef.current.style.left = `${pos.current.x - 24}px`;
            cursorRef.current.style.top = `${pos.current.y - 24}px`;
          }
          rafId.current = undefined;
        });
      }
    };
    window.addEventListener("mousemove", move);
    return () => {
      window.removeEventListener("mousemove", move);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <img
      ref={cursorRef}
      src="/mouse.png"
      alt="마우스"
      style={{
        position: "fixed",
        left: -100,
        top: -100,
        width: 48,
        height: 48,
        pointerEvents: "none",
        zIndex: 9999,
        userSelect: "none",
        transition: "left 0.08s cubic-bezier(.4,1,.7,1), top 0.08s cubic-bezier(.4,1,.7,1)",
      }}
    />
  );
} 