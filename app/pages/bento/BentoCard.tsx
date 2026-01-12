import React, { useRef, useState } from "react";
import { Link } from "react-router";
import type { BentoCard as BentoCardType } from "./bento.types";

interface BentoCardProps {
    card: BentoCardType;
    enableTilt?: boolean; // Ovo je globalni default (npr. true)
}

export const BentoCard: React.FC<BentoCardProps> = ({
    card,
    enableTilt = true,
}) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [transform, setTransform] = useState("");

    // LOGIKA ODLUČIVANJA:
    // Prioritet: 1. Postavka na samoj kartici -> 2. Globalna postavka
    const shouldTilt =
        card.enableTilt !== undefined ? card.enableTilt : enableTilt;

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;

        const { left, top, width, height } =
            cardRef.current.getBoundingClientRect();
        const x = e.clientX - left;
        const y = e.clientY - top;

        // 1. OVO UVIJEK RADIMO (za Spotlight efekt)
        cardRef.current.style.setProperty("--mouse-x", `${x}px`);
        cardRef.current.style.setProperty("--mouse-y", `${y}px`);

        // 2. TILT RADIMO SAMO AKO JE UKLJUČEN
        if (shouldTilt) {
            const relativeX = x / width;
            const relativeY = y / height;
            const tiltX = (relativeY - 0.5) * 5;
            const tiltY = (relativeX - 0.5) * -5;
            setTransform(
                `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.01, 1.01, 1.01)`
            );
        }
    };

    const handleMouseLeave = () => {
        // Resetiramo transformaciju samo ako je tilt bio uključen
        if (shouldTilt) {
            setTransform(
                "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)"
            );
        }
    };

    // ... (ostatak koda za renderiranje sadržaja ostaje isti) ...
    const isBreakout = !!card.breakout;

    const cardStyle: React.CSSProperties = {
        transform, // Ovo će biti prazan string ako je tilt isključen
        backgroundColor: card.color || "#060010",
        backgroundImage: card.backgroundImage
            ? `url(${card.backgroundImage})`
            : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
    };

    // ... (Content varijabla i return statement su isti kao prije) ...
    const Content = (
        // ... (sadržaj kartice)
        <>
            {card.image && (
                <div className='absolute inset-0 w-full h-full transition-transform duration-700 group-hover:scale-105'>
                    <img
                        src={card.image}
                        alt={card.ariaLabel}
                        className={`w-full h-full ${isBreakout ? "object-contain" : "object-cover"}`}
                    />
                </div>
            )}

            {card.backgroundImage && (
                <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-0' />
            )}

            <div className='relative z-10 p-5 h-full flex flex-col justify-end pointer-events-none'>
                {card.label && (
                    <h3 className='text-xl font-bold text-white mb-1 drop-shadow-md'>
                        {card.label}
                    </h3>
                )}
                {card.description && (
                    <p className='text-sm text-gray-300 drop-shadow-md'>
                        {card.description}
                    </p>
                )}
            </div>
        </>
    );

    return (
        <div
            ref={cardRef}
            className={`bento-card group flex flex-col justify-between rounded-2xl ${card.className || ""} ${isBreakout ? "overflow-visible z-20" : "overflow-hidden"}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={cardStyle}>
            {card.href ? (
                <Link
                    to={card.href}
                    aria-label={card.ariaLabel}
                    className='block w-full h-full'>
                    {Content}
                </Link>
            ) : (
                Content
            )}
        </div>
    );
};
