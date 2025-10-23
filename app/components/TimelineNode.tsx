import type { TimelineItem as TimelineItemType } from "../types/timeline";
import { Link } from "react-router";
import { useState } from "react";

interface TimelineNodeProps {
    item: TimelineItemType;
    index: number;
    totalItems: number;
    isFirst: boolean;
    isLast: boolean;
    onHover: (item: TimelineItemType | null) => void; // Add this prop
}

export default function TimelineNode({
    item,
    index,
    totalItems,
    onHover,
}: TimelineNodeProps) {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
        onHover(item); // Notify parent about hover
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        onHover(null); // Clear active item when not hovering
    };

    return (
        <div className='flex flex-col items-center group'>
            {/* Year Label */}
            <div
                className={`mb-4 transition-all duration-300 ${
                    isHovered ? "scale-110" : "scale-100"
                }`}>
                <span className='bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg'>
                    {item.year}
                </span>
            </div>

            {/* Image Node */}
            <div className='relative'>
                {/* Preview Card (appears on hover) */}
                {isHovered && (
                    <div className='absolute h-full bottom-full left-1/2 transform -translate-x-1/2 -translate-y-4 mb-4 z-20'>
                        <div className='bg-white rounded-lg shadow-2xl p-4 w-64 border border-blue-200'>
                            <h3 className='font-bold text-gray-900 text-sm mb-1'>
                                {item.title}
                            </h3>
                            <p className='text-gray-600 text-xs line-clamp-2'>
                                {item.description}
                            </p>
                            <div className='flex justify-between items-center mt-2 text-xs text-gray-500'>
                                <span>{item.period}</span>
                                <span className='bg-blue-100 text-blue-800 px-2 py-1 rounded'>
                                    Click to explore
                                </span>
                            </div>

                            {/* Arrow pointing to image */}
                            <div className='absolute top-full left-1/2 transform -translate-x-1/2 border-8 border-transparent border-t-white'></div>
                        </div>
                    </div>
                )}

                {/* Interactive Image */}
                <Link
                    to={`/artwork/${item.id}`}
                    className='block'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}>
                    <div
                        className={`
            relative rounded-full border-4 shadow-2xl timeline-image
            ${
                isHovered
                    ? "border-teal-400 scale-110 z-10 shadow-2xl"
                    : "border-white scale-100"
            }
            transition-all duration-300 ease-out
          `}>
                        <img
                            src={item.imageUrl}
                            alt={item.title}
                            className={`
                rounded-full object-cover bg-gray-200
                ${isHovered ? "w-24 h-24 lg:w-32 lg:h-32" : "w-16 h-16 lg:w-20 lg:h-20 absolute inset-0 rounded-full bg-gray-400/50"}
                transition-all duration-300 ease-out
              `}
                        />

                      
                    </div>
                </Link>
            </div>

            {/* Title (shown on hover) */}
            <div
                className={`mt-4 transition-all duration-300 ${
                    isHovered ? "opacity-100 scale-100" : "opacity-0 scale-95"
                }`}>
                <span className='text-white text-sm font-medium bg-black/50 px-3 py-1 rounded-full backdrop-blur-sm'>
                    {item.title}
                </span>
            </div>
        </div>
    );
}
