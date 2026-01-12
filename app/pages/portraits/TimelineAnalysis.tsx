import type { TimelineItem } from "../../types/timeline";
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
    const isPlaceholder = !displayItem;

    // Smooth transition between items
    useEffect(() => {
        setIsVisible(false);
        const timer = setTimeout(() => {
            setDisplayItem(activeItem);
            setIsVisible(true);
        }, 200);
        return () => clearTimeout(timer);
    }, [activeItem]);

    return (
        <div className='w-full max-w-6xl mx-auto px-8 py-6 bg-gray-900/30 backdrop-blur-xl backdrop-opacity-50 rounded-lg shadow-xl mt-6 mb-10 '>
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
                            <span className='tags bg-cyan-600/50 text-zinc-200 px-2 py-1 rounded-lg text-sm font-medium backdrop-blur-sm'>
                                {displayItem.year}
                            </span>
                            <span className='tags text-sm text-cyan-600/90 '>
                                {displayItem.period}
                            </span>
                        </div>
                    </div>
                )}

                {/* Analysis text */}
                <div className=' flex-1 min-w-0 w-4/5 mx-auto'>
                    <h3
                        className={`subtitle mb-2 transition-all duration-300 text-cyan-300 text-shadow-md text-shadow-black/30  italic ${
                            isPlaceholder
                                ? "font-headings font-extrabold text-6xl text-center mb-10 animate-float-circle" // style for "Explore the Timeline!"
                                : "font-bold text-2xl" // style for real item titles
                        }`}>
                        {displayItem
                            ? displayItem.title
                            : "Istraži vremensku crtu!"}
                    </h3>
                    <h4 className='description  mb-2 transition-all duration-300'>
                        {displayItem ? displayItem.description : ""}
                    </h4>

                    <p className='paragraph transition-all duration-300'>
                        {displayItem ? displayItem.analysis : defaultText}
                    </p>

                    {/* Additional context for active item */}
                    {displayItem && (
                        <div className='flex space-x-4 mt-3 text-sm text-cyan-600/80 font-sans transition-all duration-300'>
                            <span>
                                <strong className='text-zinc-300 tags text-sm  px-1'>
                                    Tehnika:
                                </strong>{" "}
                                {displayItem.medium}
                            </span>
                            <span>
                                <strong className='text-zinc-300 tags text-sm px-1'>
                                    Lokacija:
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
