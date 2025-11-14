import type { TimelineNodeProps } from "../types/timeline";
import { useState } from "react";

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
    const randDurationMs = 1000 + ((index * 100) % 500); // 700,03,

    return (
        <div className='flex flex-col items-center group'>
            {/* Year Label */}
            <div
                className={` mb-4 transition-translate animate-float ${
                    isHovered ? "scale-0" : "scale-100"
                }`}
                style={{
                    animationDelay: `${randDelayMs}ms`,
                    animationDuration: `${randDurationMs}ms`,
                    willChange: "transform",
                }}>
                <span className='bg-teal-500/80 text-indigo-100 px-3 py-1 rounded-full tags font-normal text-shadow-md text-shadow-indigo-900/30 shadow-lg shadow-indigo-900/30'>
                    {item.year}
                </span>
            </div>

            {/* Image Node */}

            <div className='relative w-fit h-fit cursor-pointer z-50'>
                {/* Click for full-size image dialog */}
                <button
                    type='button'
                    onClick={handleImageClick}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    className='block focus:outline-none focus:ring-4 focus:ring-teal-200/50 rounded-full cursor-pointer'>
                    <div
                        className={`
              relative rounded-full shadow-2xl
              ${
                  isHovered
                      ? "border-3 border-teal-200 shadow-xl"
                      : "border-2 border-teal-400"
              }
              
            `}>
                        <img
                            src={item.imageUrl}
                            alt={item.title}
                            className={`
                  rounded-full object-cover w-30 h-50
                  ${isHovered ? "scale-120 shadow-2xl shadow-black" : "sepia-80 grayscale-50"}
                  transition-all duration-300 ease-in-out
                `}
                        />
                    </div>
                </button>
            </div>

            {/* Instruction for click action */}
            <div
                className={`relative -bottom-10 left-0 transition-all duration-300 ${
                    isHovered ? "opacity-100 scale-100" : "opacity-0 scale-100"
                }`}>
                <span className='text-neutral-200 text-sm font-thin bg-black/20 px-3 py-1 rounded-e-full'>
                    Click for bigger image
                </span>
            </div>
        </div>
    );
}
