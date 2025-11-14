// app/components/bento/index.tsx
import React, { useRef } from "react";
import { Link } from "react-router";
import { gsap } from "gsap";
import type { BentoProps } from "./bento.types";
import { bentoCardData } from "./bento.data";
import { useMobileDetection } from "./useMobileDetection";
import {
    DEFAULT_SPOTLIGHT_RADIUS,
    DEFAULT_PARTICLE_COUNT,
    DEFAULT_GLOW_COLOR,
} from "./bento.helpers";
import { BentoStyles } from "./BentoStyles";
import { BentoCardGrid } from "./BentoCardGrid";
import { GlobalSpotlight } from "./GlobalSpotlight";
import ParticleCard from "./ParticleCard";

// Glavna "pametna" komponenta
const MagicBento: React.FC<BentoProps> = ({
    textAutoHide = true,
    enableStars = true,
    enableSpotlight = true,
    enableBorderGlow = true,
    disableAnimations = false,
    spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
    particleCount = DEFAULT_PARTICLE_COUNT,
    enableTilt = false,
    glowColor = DEFAULT_GLOW_COLOR,
    clickEffect = true,
    enableMagnetism = true,
}) => {
    const gridRef = useRef<HTMLDivElement>(null);
    const isMobile = useMobileDetection();
    const shouldDisableAnimations = disableAnimations || isMobile;

    return (
        <>
            {/* 1. Komponenta za stilove */}
            <BentoStyles glowColor={glowColor} />

            {/* 2. Komponenta za globalni spotlight */}
            {enableSpotlight && (
                <GlobalSpotlight
                    gridRef={gridRef}
                    disableAnimations={shouldDisableAnimations}
                    enabled={enableSpotlight}
                    spotlightRadius={spotlightRadius}
                    glowColor={glowColor}
                />
            )}

            {/* 3. Komponenta za grid */}
            <BentoCardGrid gridRef={gridRef}>
                <div className='card-responsive grid gap-2'>
                    {bentoCardData.map((card, index) => {
                        const isBreakoutCard = !!card.breakout;
                        const baseClassName = `card flex flex-col justify-between relative aspect-[4/3] min-h-[200px] w-full max-w-full rounded-[20px] border border-solid font-light cursor-pointer transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(0,0,0,0.15)] ${card.image ? "p-0" : "p-5"} ${
                            enableBorderGlow && !isBreakoutCard
                                ? "card--border-glow"
                                : "" // Bez 'glow' ruba za breakout
                        } ${
                            // OVO JE KLJUČNO:
                            isBreakoutCard
                                ? "overflow-visible hover:z-20"
                                : "overflow-hidden  backdrop-blur-xs hover:backdrop-blur-md"
                        } ${card.className || ""}`;

                        const cardStyle = {
                            "backgroundColor":
                                card.color || "var(--background-dark)",
                            "borderColor":
                                card.border === false || isBreakoutCard // Bez bordera za breakout
                                    ? "transparent"
                                    : "var(--border-color)",

                            "color": "var(--white)",
                            "--glow-x": "50%",
                            "--glow-y": "50%",
                            "--glow-intensity": "0",
                            "--glow-radius": "200px",
                        } as React.CSSProperties;

                        // Funkcionalnost za "običnu" karticu (bez zvjezdica)
                        const simpleCardRef = (el: HTMLDivElement | null) => {
                            if (!el || shouldDisableAnimations || enableStars)
                                return;

                            const handleMouseMove = (e: MouseEvent) => {
                                if (shouldDisableAnimations) return;

                                const rect = el.getBoundingClientRect();
                                const x = e.clientX - rect.left;
                                const y = e.clientY - rect.top;
                                const centerX = rect.width / 2;
                                const centerY = rect.height / 2;

                                if (enableTilt) {
                                    const rotateX =
                                        ((y - centerY) / centerY) * -10;
                                    const rotateY =
                                        ((x - centerX) / centerX) * 10;

                                    gsap.to(el, {
                                        rotateX,
                                        rotateY,
                                        duration: 0.1,
                                        ease: "power2.out",
                                        transformPerspective: 1000,
                                    });
                                }

                                if (enableMagnetism) {
                                    const magnetX = (x - centerX) * 0.05;
                                    const magnetY = (y - centerY) * 0.05;

                                    gsap.to(el, {
                                        x: magnetX,
                                        y: magnetY,
                                        duration: 0.3,
                                        ease: "power2.out",
                                    });
                                }
                            };

                            const handleMouseLeave = () => {
                                if (shouldDisableAnimations) return;

                                if (enableTilt) {
                                    gsap.to(el, {
                                        rotateX: 0,
                                        rotateY: 0,
                                        duration: 0.3,
                                        ease: "power2.out",
                                    });
                                }

                                if (enableMagnetism) {
                                    gsap.to(el, {
                                        x: 0,
                                        y: 0,
                                        duration: 0.3,
                                        ease: "power2.out",
                                    });
                                }
                            };

                            const handleClick = (e: MouseEvent) => {
                                if (!clickEffect || shouldDisableAnimations)
                                    return;

                                const rect = el.getBoundingClientRect();
                                const x = e.clientX - rect.left;
                                const y = e.clientY - rect.top;

                                const maxDistance = Math.max(
                                    Math.hypot(x, y),
                                    Math.hypot(x - rect.width, y),
                                    Math.hypot(x, y - rect.height),
                                    Math.hypot(x - rect.width, y - rect.height)
                                );

                                const ripple = document.createElement("div");
                                ripple.style.cssText = `
                      position: absolute;
                      width: ${maxDistance * 2}px;
                      height: ${maxDistance * 2}px;
                      border-radius: 50%;
                      background: radial-gradient(circle, rgba(${glowColor}, 0.4) 0%, rgba(${glowColor}, 0.2) 30%, transparent 70%);
                      left: ${x - maxDistance}px;
                      top: ${y - maxDistance}px;
                      pointer-events: none;
                      z-index: 1000;
                    `;

                                el.appendChild(ripple);

                                gsap.fromTo(
                                    ripple,
                                    {
                                        scale: 0,
                                        opacity: 1,
                                    },
                                    {
                                        scale: 1,
                                        opacity: 0,
                                        duration: 0.8,
                                        ease: "power2.out",
                                        onComplete: () => ripple.remove(),
                                    }
                                );
                            };

                            el.addEventListener("mousemove", handleMouseMove);
                            el.addEventListener("mouseleave", handleMouseLeave);
                            el.addEventListener("click", handleClick);
                        };

                        // Sadržaj kartice
                        const cardContent = card.image ? (
                            <div className='group relative w-full h-full'>
                                <img
                                    src={card.image}
                                    alt={card.ariaLabel}
                                    className={`absolute inset-0 w-full h-full transition-all duration-500 ease-in-out ${
                                        // Duža tranzicija
                                        isBreakoutCard
                                            ? "object-contain group-hover:scale-[1.75]"
                                            : "object-cover group-hover:scale-110"
                                    }`}
                                />
                            </div>
                        ) : (
                            <>
                                <div className='card__header flex justify-between gap-3 relative text-white'>
                                    <Link
                                        to={card.href || "#"}
                                        aria-label={card.ariaLabel}>
                                        <span className='card__label font-headings'>
                                            {card.label}
                                        </span>
                                    </Link>
                                </div>
                                <div className='card__content flex flex-col relative text-white'>
                                    <h3 className={`...`}>{card.label}</h3>
                                    <p className={`...`}>{card.description}</p>
                                </div>
                            </>
                        );

                        if (enableStars && !isBreakoutCard) {
                            return (
                                <ParticleCard
                                    key={index}
                                    className={baseClassName}
                                    style={cardStyle}
                                    disableAnimations={shouldDisableAnimations}
                                    particleCount={particleCount}
                                    glowColor={glowColor}
                                    enableTilt={enableTilt}
                                    clickEffect={clickEffect}
                                    enableMagnetism={enableMagnetism}>
                                    {cardContent}
                                </ParticleCard>
                            );
                        }

                        // Fallback na "običnu" karticu ako su zvjezdice isključene
                        return (
                            <div
                                key={index}
                                className={baseClassName}
                                style={cardStyle}
                                ref={simpleCardRef}>
                                {cardContent}
                            </div>
                        );
                    })}
                </div>
            </BentoCardGrid>
        </>
    );
};

export default MagicBento;
