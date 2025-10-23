import type { TimelineItem } from "../types/timeline";
import { useState, useEffect } from "react";

interface TimelineAnalysisProps {
    activeItem: TimelineItem | null;
    defaultText: string;
}

export default function TimelineAnalysis({
    activeItem,
    defaultText,
}: TimelineAnalysisProps) {
    const [displayItem, setDisplayItem] = useState<TimelineItem | null>(
        activeItem
    );
    const [isVisible, setIsVisible] = useState(true);

    // Smooth transition between items
    useEffect(() => {
        if (activeItem !== displayItem) {
            setIsVisible(false);
            const timer = setTimeout(() => {
                setDisplayItem(activeItem);
                setIsVisible(true);
            }, 200);
            return () => clearTimeout(timer);
        }
    }, [activeItem, displayItem]);

    return (
        <div className='h-25vh z-30 max-w-6xl mx-auto px-6 py-6'>
            <div
                className={`flex items-start space-x-6 transition-all duration-300 ${
                    isVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-2"
                }`}>
                {/* Active item preview (if any) */}
                {displayItem && (
                    <div className='flex-shrink-0'>
                        <div className='flex items-center space-x-3 mb-2'>
                            <span className='bg-blue-500/90 text-white px-2 py-1 rounded text-sm font-medium backdrop-blur-sm'>
                                {displayItem.year}
                            </span>
                            <span className='text-sm text-teal-200/90'>
                                {displayItem.period}
                            </span>
                        </div>
                    </div>
                )}

                {/* Analysis text */}
                <div className='flex-1 min-w-0'>
                    <h3 className='text-lg font-semibold text-white mb-2 transition-all duration-300'>
                        {displayItem
                            ? `Historical Context: ${displayItem.title}`
                            : "Explore the Timeline"}
                    </h3>
                    <p className='text-blue-100/90 leading-relaxed text-sm transition-all duration-300'>
                        {displayItem ? displayItem.analysis : defaultText}
                    </p>

                    {/* Additional context for active item */}
                    {displayItem && (
                        <div className='flex space-x-4 mt-3 text-sm text-blue-200/80 transition-all duration-300'>
                            <span>
                                <strong className='text-white'>Medium:</strong>{" "}
                                {displayItem.medium}
                            </span>
                            <span>
                                <strong className='text-white'>
                                    Location:
                                </strong>{" "}
                                {displayItem.location}
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
