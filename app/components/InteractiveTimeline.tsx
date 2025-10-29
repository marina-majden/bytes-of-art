import type { TimelineData, TimelineItem } from "../types/timeline";
import TimelineNode from "./TimelineNode";
import TimelineAnalysis from "./TimelineAnalysis";
import ImageDialog from "./ImageDialog";
import { useState } from "react";

interface InteractiveTimelineProps {
    data: TimelineData;
}

export default function InteractiveTimeline({
    data,
}: InteractiveTimelineProps) {
    const [activeItem, setActiveItem] = useState<TimelineItem | null>(null);
    const [dialogItem, setDialogItem] = useState<TimelineItem | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    // Default text when no item is active
    const defaultAnalysis =
        "This timeline explores how leadership portraiture has evolved across centuries. Hover over any portrait to see its historical significance and analysis of how it represents power and authority in its cultural context.";

    const handleImageClick = (item: TimelineItem) => {
        setDialogItem(item);
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
        setTimeout(() => setDialogItem(null), 300);
    };

    return (
        <div className='w-screen h-screen bg-gradient-to-br from-blue-900 to-violet-950'>
            {/* Header */}
            <div className='text-center mb-12 px-4 pt-8'>
                <h1 className='maintitle mb-4'>{data.title}</h1>
                <p className='subtitle font-headings mx-auto'>
                    {data.description}
                </p>
            </div>

            {/* Timeline Container */}
            <div className='relative'>
                {/* Central Timeline Line */}
                <div className='absolute left-1/2 top-[40%] transform -translate-x-1/2 -translate-y-[40%] w-full h-1 bg-teal-500 z-0'></div>

                {/* Timeline Nodes Container */}
                <div className='relative z-10 overflow-x-auto hide-scrollbar'>
                    <div className='flex justify-center items-center min-w-max -translate-y-[5%] px-16 py-6'>
                        <div className='flex items-center space-x-4 lg:space-x-12'>
                            {data.items.map(
                                (item: TimelineItem, index: number) => (
                                    <TimelineNode
                                        key={item.id}
                                        item={item}
                                        index={index}
                                        totalItems={data.items.length}
                                        onHover={setActiveItem}
                                        onImageClick={handleImageClick}
                                    />
                                )
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Analysis Panel */}
            <TimelineAnalysis
                activeItem={activeItem}
                defaultText={defaultAnalysis}
            />

            {/* Image Dialog */}
            <ImageDialog
                item={dialogItem}
                isOpen={isDialogOpen}
                onClose={handleCloseDialog}
            />
        </div>
    );
}
