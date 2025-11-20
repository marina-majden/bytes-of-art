import type { TimelineItem as TimelineItemType } from "../types/timeline";
import { Link } from "react-router";

interface TimelineItemProps {
    item: TimelineItemType;
    isFirst: boolean;
    isLast: boolean;
}

export default function TimelineItem({
    item,
    isFirst,
    isLast,
}: TimelineItemProps) {
    return (
        <div className='flex flex-col items-center'>
            {/* Timeline connector */}
            {!isFirst && (
                <div className='w-16 h-1 bg-cyan-500 -mr-8 self-center'></div>
            )}

            <div className='flex flex-col items-center'>
                {/* Year marker */}
                <div className='bg-cyan-600 text-white px-4 py-2 rounded-full mb-4 shadow-lg'>
                    {item.year}
                </div>

                {/* Content card */}
                <Link
                    to={`/artwork/${item.id}`}
                    className='z-50 w-80 bg-white rounded-xl shadow-md overflow-visible hover:shadow-xl hover:rounded-sm transition-all duration-300'
                    aria-label={`Open artwork ${item.title}`}>
                    <img
                        src={item.imageUrl}
                        alt={item.title || "Artwork image"}
                        loading='lazy'
                        className='w-full h-full object-cover'
                    />
                    <div className='p-4'>
                        <h3 className='text-xl font-bold text-zinc-900 mb-2'>
                            {item.title}
                        </h3>
                        <p className='text-zinc-600 text-sm line-clamp-2'>
                            {item.description}
                        </p>
                        <div className='mt-3 flex justify-between text-xs text-zinc-500'>
                            <span>{item.period}</span>
                            <span>{item.medium}</span>
                        </div>
                    </div>
                </Link>
            </div>

            {!isLast && (
                <div className='w-16 h-1 bg-cyan-500 -ml-8 self-center'></div>
            )}
        </div>
    );
}
