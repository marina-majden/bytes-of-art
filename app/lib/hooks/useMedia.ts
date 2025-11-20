import { useEffect, useState } from "react";

function isClient() {
  return typeof window !== "undefined" && typeof window.matchMedia !== "undefined";
}

export function useMatchMedia(query: string, defaultState = false) {
  const client = isClient();
  const [matches, setMatches] = useState<boolean>(() => {
    if (!client) return defaultState;
    try {
      return window.matchMedia(query).matches;
    } catch {
      return defaultState;
    }
  });

  useEffect(() => {
    if (!client) return;
    const mq = window.matchMedia(query);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    // subscribe
    if (mq.addEventListener) mq.addEventListener("change", handler);
    else mq.addListener(handler as any);
    // sync
    setMatches(mq.matches);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", handler);
      else mq.removeListener(handler as any);
    };
  }, [query, client]);

  return matches;
}

export function useIsMobile(breakpointPx = 768) {
  return useMatchMedia(`(max-width: ${breakpointPx - 1}px)`, false);
}

export function usePrefersReducedMotion() {
  return useMatchMedia("(prefers-reduced-motion: reduce)", false);
}
