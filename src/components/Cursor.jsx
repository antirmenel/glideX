import React, { useEffect, useRef } from "react";

const Cursor = () => {
  const cursorRef = useRef(null);

  // Track mouse movement and update custom cursor position
  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const onMouseMove = (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    };

    window.addEventListener("mousemove", onMouseMove);

    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  return (
    <>
      {/* Hide default cursor on body and interactive elements */}
      <style>{`
        body, a, button, input, textarea, select {
          cursor: none !important;
        }
      `}</style>

      {/* Custom circular cursor with subtle radial gradient */}
      <div
        ref={cursorRef}
        style={{
          position: "fixed",
          pointerEvents: "none",
          width: 72,
          height: 72,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(124, 172, 249, 0.6) 0%, rgba(124, 172, 249, 0) 70%)",
          transform: "translate(-50%, -50%)",
          zIndex: 9999,
          top: 0,
          left: 0,
        }}
      />
    </>
  );
};

export default Cursor;
