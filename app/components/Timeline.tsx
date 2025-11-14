import type { TimelineData } from "../types/timeline";
import TimelineItem from "./TimelineItem";

interface TimelineProps {
    data: TimelineData;
}

export default function Timeline({ data }: TimelineProps) {
    return (
        <div className='w-full'>
            <div className='text-center mb-8'>
                <h1 className='text-4xl font-bold text-gray-900'>
                    {data.title}
                </h1>
                <p className='text-xl text-gray-600 mt-2'>{data.description}</p>
            </div>

            <div className='flex overflow-x-auto pb-8 hide-scrollbar'>
                <div className='flex space-x-8 min-w-max px-8'>
                    {data.items.map((item, index) => (
                        <TimelineItem
                            key={item.id}
                            item={item}
                            isFirst={index === 0}
                            isLast={index === data.items.length - 1}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
