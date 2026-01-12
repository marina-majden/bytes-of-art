import React, { useRef, useState } from "react";

interface Props {
    src: string;
    alt: string;
    className?: string;
    loading?: string;
}

const InteractiveImage: React.FC<Props> = ({ src, alt, className }) => {
    const imgRef = useRef<HTMLImageElement>(null);
    const [isZoomed, setIsZoomed] = useState(false);

    const handleClick = (e: React.MouseEvent<HTMLImageElement>) => {
        if (!imgRef.current) return;
        const rect = imgRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const xPercent = (x / imgRef.current.offsetWidth) * 100;
        const yPercent = (y / imgRef.current.offsetHeight) * 100;
        imgRef.current.style.setProperty("--x", xPercent.toFixed(2));
        imgRef.current.style.setProperty("--y", yPercent.toFixed(2));
        setIsZoomed((s) => !s);
        if (!isZoomed) {
            imgRef.current.style.setProperty("--x", xPercent.toFixed(2));
            imgRef.current.style.setProperty("--y", yPercent.toFixed(2));
        } else {
            imgRef.current.style.setProperty("--x", "50");
            imgRef.current.style.setProperty("--y", "50");
        }
    };

    const mergedClass = `${className ? className + " " : ""}interactive-zoom${isZoomed ? " zoomed" : ""}`;

    return (
        <img
            ref={imgRef}
            src={src}
            alt={alt}
            className={mergedClass}
            onClick={handleClick}
        />
    );
};

export default InteractiveImage;
