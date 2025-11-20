import { useMemo } from "react";

export type CardMeta = {
  id: string;
  colSpan?: number;
  rowSpan?: number;
  variant?: "large" | "medium" | "small";
};

type GridOptions = {
  gapClass?: string;
};

export function useGridLayout(items: CardMeta[], opts?: GridOptions) {
  const gapClass = opts?.gapClass ?? "gap-4";

  const containerClass = useMemo(() => {
    // default responsive columns (adjust to your design)
    return `grid grid-flow-row-dense ${gapClass} grid-cols-2 md:grid-cols-4 lg:grid-cols-12`;
  }, [gapClass]);

  const normalize = (meta: CardMeta) => {
    const col = meta.colSpan ?? (meta.variant === "large" ? 6 : meta.variant === "medium" ? 4 : 2);
    const row = meta.rowSpan ?? 1;
    const safeCol = Math.min(Math.max(Math.round(col), 1), 12);
    const colClass = `col-span-${safeCol}`;
    const rowClass = row > 1 ? `row-span-${row}` : "";
    return [colClass, rowClass].filter(Boolean).join(" ");
  };

  const map = useMemo(() => {
    const m = new Map<string, string>();
    for (const it of items) m.set(it.id, normalize(it));
    return m;
  }, [items]);

  return { containerClass, map };
}
