"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { motion, useMotionValue } from "framer-motion";

export default function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [selecting, setSelecting] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);
  const mouseDown = useRef(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!visible) setVisible(true);
      if (mouseDown.current) {
        const selection = window.getSelection();
        setSelecting(!!selection && selection.toString().length > 0);
      }
    },
    [cursorX, cursorY, visible]
  );

  useEffect(() => {
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    setIsTouchDevice(!hasFinePointer);
  }, []);

  useEffect(() => {
    if (isTouchDevice) return;

    window.addEventListener("mousemove", handleMouseMove);

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    const onMouseDown = () => { mouseDown.current = true; };
    const onMouseUp = () => {
      mouseDown.current = false;
      setTimeout(() => setSelecting(false), 100);
    };
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);

    const handleHoverStart = () => setHovering(true);
    const handleHoverEnd = () => setHovering(false);

    const interactiveSelector =
      "a, button, input, textarea, select, [role='button'], label";

    const attachListeners = () => {
      document.querySelectorAll(interactiveSelector).forEach((el) => {
        el.removeEventListener("mouseenter", handleHoverStart);
        el.removeEventListener("mouseleave", handleHoverEnd);
        el.addEventListener("mouseenter", handleHoverStart);
        el.addEventListener("mouseleave", handleHoverEnd);
      });
    };

    attachListeners();
    const observer = new MutationObserver(attachListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      observer.disconnect();
    };
  }, [isTouchDevice, handleMouseMove]);

  if (isTouchDevice) return null;

  return (
    <>
      <style jsx global>{`
        * {
          cursor: none !important;
        }
      `}</style>

      <motion.div
        className="pointer-events-none fixed z-[9999]"
        style={{
          x: cursorX,
          y: cursorY,
        }}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.15 }}
      >
        {selecting ? (
          /* Text select / I-beam cursor */
          <motion.svg
            width="20"
            height="28"
            viewBox="0 0 20 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 1,
              scale: 1,
              filter:
                "drop-shadow(0 0 6px rgba(255, 23, 68, 0.8)) drop-shadow(0 0 14px rgba(255, 23, 68, 0.4))",
            }}
            style={{ marginLeft: -10, marginTop: -14 }}
            transition={{ duration: 0.15 }}
          >
            <path
              d="M6 2H14M6 26H14M10 2V26"
              stroke="#ff1744"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </motion.svg>
        ) : hovering ? (
          /* Clickable pointer — standard pointer hand */
          <motion.svg
            width="28"
            height="28"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
            style={{ marginLeft: -8, marginTop: -2 }}
            initial={{ scale: 0.9 }}
            animate={{
              scale: 1,
              filter:
                "drop-shadow(0 0 8px rgba(255, 23, 68, 0.9)) drop-shadow(0 0 20px rgba(255, 23, 68, 0.5))",
            }}
            transition={{ duration: 0.2 }}
          >
            <path
              d="M6.75 1a.75.75 0 0 1 .75.75V8a.5.5 0 0 0 1 0V5.467l.086-.004a.868.868 0 0 1 .938.864V8a.5.5 0 0 0 1 0V6.867l.086-.004a.868.868 0 0 1 .938.864V8a.5.5 0 0 0 1 0v-.2a.868.868 0 0 1 1.024-.86V12.5a3.5 3.5 0 0 1-3.5 3.5h-1.57a3.5 3.5 0 0 1-2.623-1.187l-2.092-2.393a1.182 1.182 0 0 1 .862-1.935c.31 0 .612.126.83.349L6 12V1.75A.75.75 0 0 1 6.75 1z"
              fill="rgba(255, 23, 68, 0.2)"
              stroke="#ff1744"
              strokeWidth="0.6"
              strokeLinejoin="round"
            />
          </motion.svg>
        ) : (
          /* Default pointer arrow */
          <motion.svg
            width="24"
            height="28"
            viewBox="0 0 24 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            animate={{
              filter:
                "drop-shadow(0 0 4px rgba(255, 23, 68, 0.6)) drop-shadow(0 0 10px rgba(255, 23, 68, 0.25))",
            }}
            transition={{ duration: 0.2 }}
          >
            <path
              d="M1 1L1 21L6.5 16L12 26L15 24.5L9.5 14.5L17 13L1 1Z"
              fill="rgba(255, 23, 68, 0.15)"
              stroke="#ff1744"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <path
              d="M3 4L3 18L7.5 14L12.5 23L14 22.3L9 13L15 12L3 4Z"
              fill="rgba(255, 23, 68, 0.25)"
            />
          </motion.svg>
        )}
      </motion.div>
    </>
  );
}
