import type { TimelineItem as TimelineItemType } from "../types/timeline";
import { Link } from "react-router";
import { useState } from "react";

interface TimelineNodeProps {
    item: TimelineItemType;
    index: number;
    totalItems: number;
    onHover: (item: TimelineItemType | null) => void;
    onImageClick: (item: TimelineItemType) => void;
}

export default function TimelineNode({
    item,
    index,
    onHover,
    onImageClick,
}: TimelineNodeProps) {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
        onHover(item);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        onHover(null);
    };

    const handleImageClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        onImageClick(item);
    };
    const randDelayMs = (index * 137) % 700; // 0..699ms
    const randDurationMs = 300 + ((index * 71) % 5000); // 300..799ms

    return (
        <div className='flex flex-col items-center group'>
            {/* Year Label */}
            <div
                className={` mb-4 transition-transform duration-300 animate-float ${
                    isHovered ? "scale-0" : "scale-100"
                }`}
                style={{
                    animationDelay: `${randDelayMs}ms`,
                }}>
                <span className='bg-teal-500/80 text-indigo-100 px-3 py-1 rounded-full tags font-normal text-shadow-md text-shadow-indigo-900/30 shadow-lg shadow-indigo-900/30 backdrop-blur-sm'>
                    {item.year}
                </span>
            </div>

            {/* Image Node */}

            <div className='relative cursor-pointer'>
                {/* Click for full-size image dialog */}
                <button
                    onClick={handleImageClick}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    className='block focus:outline-none focus:ring-4 focus:ring-teal-200/50 rounded-full cursor-pointer'>
                    <div
                        className={`
              relative rounded-full shadow-2xl timeline-image
              ${
                  isHovered
                      ? "border-2 border-white scale-125 z-10 shadow-2xl"
                      : "border-3 border-teal-400  scale-125"
              }
              transition-all duration-300 ease-out
            `}
                        style={{
                            animationDelay: `${(randDelayMs + 120) % 800}ms`,
                            animationDuration: `${randDurationMs + 120}ms`,
                            willChange: "transform",
                        }}>
                        <img
                            src={item.imageUrl}
                            alt={item.title}
                            className={`
                  rounded-full object-cover bg-gray-200
                  ${isHovered ? "w-24 h-24 lg:w-32 lg:h-32" : "w-16 h-16 lg:w-20 lg:h-20"}
                  transition-all duration-300 ease-out
                `}
                        />
                    </div>
                </button>
            </div>

            {/* Instruction for click action */}
            <div
                className={`mt-6 transition-all duration-300 ${
                    isHovered ? "opacity-100 scale-100" : "opacity-0 scale-95"
                }`}>
                <span className='text-white text-sm font-thin bg-black/20 px-3 py-1 rounded-full backdrop-blur-sm'>
                    Click for bigger image
                </span>
            </div>
        </div>
    );
}
