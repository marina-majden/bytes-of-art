import React, { useEffect, useRef, useState } from "react";

interface TypewriterProps {
  texts: string[];
  period?: number; // pause after full text (ms)
  className?: string;
  cursorStyle?: React.CSSProperties;
}

export default function Typewriter({ texts, period = 2000, className = "", cursorStyle }: TypewriterProps) {
  const [index, setIndex] = useState(0);
  const [display, setDisplay] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const mounted = useRef(true);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, []);

  useEffect(() => {
    const fullTxt = texts[index % texts.length] ?? "";

    const tick = () => {
      if (!mounted.current) return;

      setDisplay((prev) => {
        const next = isDeleting ? fullTxt.substring(0, prev.length - 1) : fullTxt.substring(0, prev.length + 1);
        return next;
      });

      let delta = 200 - Math.random() * 100;
      if (isDeleting) delta /= 2;

      // If finished typing
      if (!isDeleting && display === fullTxt) {
        // pause then start deleting
        timeoutRef.current = window.setTimeout(() => {
          if (!mounted.current) return;
          setIsDeleting(true);
        }, period);
        return;
      }

      // If finished deleting
      if (isDeleting && display === "") {
        setIsDeleting(false);
        setIndex((i) => i + 1);
        delta = 500;
      }

      timeoutRef.current = window.setTimeout(tick, delta);
    };

    // Start the tick loop — use a small timeout to let state settle
    timeoutRef.current = window.setTimeout(tick, 120);

    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, isDeleting, texts, period]);

  // cursor style fallback
  const defaultCursor: React.CSSProperties = { borderRight: "0.08em solid currentColor", display: "inline-block" };

  return (
    <span className={className} aria-live="polite">
      <span className="typewriter-wrap">{display}</span>
      <span className="typewriter-cursor" style={{ ...(cursorStyle ?? defaultCursor) }} aria-hidden>
        &nbsp;
      </span>
    </span>
  );
}
