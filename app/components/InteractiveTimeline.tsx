import type { TimelineData, TimelineItem } from "../types/timeline";
import TimelineNode from "./TimelineNode";
import TimelineAnalysis from "./TimelineAnalysis";
import { useState } from "react";

interface InteractiveTimelineProps {
    data: TimelineData;
}

export default function InteractiveTimeline({
    data,
}: InteractiveTimelineProps) {
    const [activeItem, setActiveItem] = useState<TimelineItem | null>(null);

    // Default text when no item is active
    const defaultAnalysis =
        "This timeline explores how leadership portraiture has evolved across centuries. Hover over any portrait to see its historical significance and analysis of how it represents power and authority in its cultural context.";

    return (
        <div className='timeline bg-gradient-to-br from-gray-900 to-blue-900'>
            {/* Header */}
            <div className='w-full h-10vh text-center mb-12 px-4 pt-8'>
                <h1 className='text-4xl font-bold text-white mb-4'>
                    {data.title}
                </h1>
                <p className='text-xl text-blue-200 max-w-2xl mx-auto'>
                    {data.description}
                </p>
            </div>

            {/* Timeline Container */}
            <div className='relative min-h-60vh h-[450px]'>
                {/* Central Timeline Line */}
                <div className='absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-1 bg-blue-400/30 z-0'></div>
                {/* Timeline Nodes Container */}

                <div className='z-10 overflow-x-auto hide-scrollbar'>
                    <div className='flex justify-center items-center min-w-max px-16 py-12'>
                        <div className='flex items-center space-x-4 lg:space-x-12'>
                            {data.items.map((item, index) => (
                                <TimelineNode
                                    key={item.id}
                                    item={item}
                                    index={index}
                                    isFirst={index === 0}
                                    isLast={index === data.items.length - 1}
                                    totalItems={data.items.length}
                                    onHover={setActiveItem} // Pass the hover handler
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Analysis Panel - Fixed at bottom */}
            <TimelineAnalysis
                activeItem={activeItem}
                defaultText={defaultAnalysis}
            />
        </div>
    );
}
