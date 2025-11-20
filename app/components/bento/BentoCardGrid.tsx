import React from "react";
import { useGridLayout, type CardMeta } from "../../lib/hooks/useGridLayout";
import { useIsMobile } from "../../lib/hooks/useMedia";

interface BentoCardGridProps {
    children: React.ReactNode;
    gridRef?: React.RefObject<HTMLDivElement | null>;
    /**
     * Optional metadata for cards. If provided, BentoCardGrid will map children
     * to items by index and apply computed grid classes per item id.
     */
    items?: CardMeta[];
}

export const BentoCardGrid: React.FC<BentoCardGridProps> = ({
    children,
    gridRef,
    items,
}) => {
    const isMobile = useIsMobile();

    // If items provided, compute container and per-item classes
    const { containerClass, map } = useGridLayout(items ?? [], {
        gapClass: isMobile ? "gap-2" : "gap-4 lg:gap-6",
    });

    // If items and children array match, wrap each child with a div applying the class
    if (items && items.length > 0) {
        const childArray = React.Children.toArray(children);
        return (
            <div
                className={containerClass}
                style={{ fontSize: "clamp(1rem, 0.9rem + 0.5vw, 1.5rem)" }}
                ref={gridRef}>
                {items.map((meta, idx) => (
                    <div
                        key={meta.id}
                        className={map.get(meta.id) ?? "relative"}>
                        {childArray[idx] ?? null}
                    </div>
                ))}
            </div>
        );
    }

    // Fallback: previous simple layout
    return (
        <div
            className='bento-section grid gap-2 w-screen select-none relative'
            style={{ fontSize: "clamp(1rem, 0.9rem + 0.5vw, 1.5rem)" }}
            ref={gridRef}>
            {children}
        </div>
    );
};
