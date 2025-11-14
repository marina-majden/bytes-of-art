import type { TimelineData, TimelineItem } from "../types/timeline";
import TimelineNode from "../components/TimelineNode";
import TimelineAnalysis from "../components/TimelineAnalysis";
import ImageDialog from "../components/ImageDialog";
import { useState } from "react";
import { artTimelineData } from "~/data/artTimelineData";

interface InteractiveTimelineProps {
    data: TimelineData;
}

function Timeline({ data }: InteractiveTimelineProps) {
    const [activeItem, setActiveItem] = useState<TimelineItem | null>(null);
    const [dialogItem, setDialogItem] = useState<TimelineItem | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    // Default text when no item is active
    const defaultAnalysis =
        "This timeline explores how portraits of historical figures have evolved across time. Hover over any portrait to learn more!";

    const handleImageClick = (item: TimelineItem) => {
        setDialogItem(item);
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
        setTimeout(() => setDialogItem(null), 300);
    };

    return (
        <div className='w-screen h-screen'>
            {/* Header */}
            <div className='text-center px-4'>
                <h2 className='maintitle mb-4'>{data.title}</h2>
                <p className='subtitle mx-auto'>{data.description}</p>
            </div>

            {/* Timeline Nodes Container */}
            <div className='w-full flex flex-col justify-center items-center'>
                <div className='absolute w-screen h-1 bg-teal-500 shadow-xl shadow-gray-950 z-0'></div>
                <div className='w-full h-[380px] z-10 flex items-center justify-center'>
                    {data.items.map((item: TimelineItem, index: number) => (
                        <TimelineNode
                            key={item.id}
                            item={item}
                            index={index}
                            totalItems={data.items.length}
                            onHover={setActiveItem}
                            onImageClick={handleImageClick}
                        />
                    ))}
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

export default function Portraits() {
    return <Timeline data={artTimelineData} />;
}
