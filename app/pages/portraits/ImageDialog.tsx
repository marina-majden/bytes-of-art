import type { TimelineItem } from "../../types/timeline";
import { useEffect, useRef } from "react";
import InteractiveImage from "../../components/ImageZoom";

interface ImageDialogProps {
    item: TimelineItem | null;
    isOpen: boolean;
    onClose: () => void;
}

export default function ImageDialog({
    item,
    isOpen,
    onClose,
}: ImageDialogProps) {
    const dialogRef = useRef<HTMLDivElement>(null);

    // Close on Escape key
    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener("keydown", handleEscape);
            document.body.style.overflow = "hidden"; // Prevent background scrolling
        }

        return () => {
            document.removeEventListener("keydown", handleEscape);
            document.body.style.overflow = "unset";
        };
    }, [isOpen, onClose]);

    // Close when clicking outside the image
    const handleBackdropClick = (event: React.MouseEvent) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };

    if (!isOpen || !item) return null;

    return (
        <div
            className='fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm transition-all duration-300'
            onClick={handleBackdropClick}>
            {/* Protection Overlay - prevents right-click and selection */}
            <div
                className='absolute inset-0'
                onContextMenu={(e) => e.preventDefault()}
                style={{
                    userSelect: "none",
                    WebkitUserSelect: "none",
                    MozUserSelect: "none",
                    msUserSelect: "none",
                }}></div>

            {/* Close Button */}
            <button
                onClick={onClose}
                className='absolute top-4 right-4 z-60 text-white hover:text-yellow-400 transition-colors duration-200 bg-black/50 rounded-full p-2 backdrop-blur-sm'
                aria-label='Close dialog'>
                <svg
                    className='w-8 h-8'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'>
                    <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M6 18L18 6M6 6l12 12'
                    />
                </svg>
            </button>

            {/* Image Container with Protection */}
            <div
                ref={dialogRef}
                className='relative max-w-4xl max-h-[98vh] mx-4'>
                {/* Protection Layer */}
                <div
                    className='absolute inset-0 z-10'
                    onContextMenu={(e) => e.preventDefault()}
                    onDragStart={(e) => e.preventDefault()}
                    style={{
                        pointerEvents: "none",
                        userSelect: "none",
                        WebkitUserSelect: "none",
                        MozUserSelect: "none",
                        msUserSelect: "none",
                    }}></div>

                {/* Image with protection attributes */}
                <InteractiveImage
                    src={item.imageUrl}
                    alt={item.title}
                    className='max-h-screen object-contain rounded-lg shadow-2xl interactive-zoom'
                    loading='lazy'
                />

                {/* Additional Protection: Transparent overlay div */}
                <div
                    className='absolute inset-0 z-20'
                    style={{
                        background: "transparent",
                        pointerEvents: "none",
                    }}></div>
            </div>

            {/* Instructional Text */}
            <details className='hidden md:inline-block absolute top-1 left-1 w-3/12 text-white/60 text-sm'>
                <summary className=' text-white/60 font-sans uppercase text-sm cursor-default'>
                    info
                </summary>{" "}
                {item.title} by {item.artist} ({item.year}/{item.period}),{" "}
                {item.medium}. {item.location}{" "}
            </details>
        </div>
    );
}
