import {
    ArrowRight,
    ArrowRightCircle,
    ArrowRightCircleIcon,
} from "lucide-react";
import React, { useState, useEffect } from "react";

// Definiramo tipove za props
interface CosmicToggleProps {
    theme?: "impressionism" | "expressionism";
    onToggle?: () => void;
}

const CosmicToggle: React.FC<CosmicToggleProps> = ({
    theme = "impressionism",
    onToggle,
}) => {
    // Koristimo unutarnje stanje kako bi komponenta reagirala na klik odmah
    const [currentTheme, setCurrentTheme] = useState<
        "impressionism" | "expressionism"
    >(theme);

    // Ako se vanjski prop 'theme' promijeni, ažuriraj i unutarnje stanje
    useEffect(() => {
        setCurrentTheme(theme);
    }, [theme]);

    const handleToggle = () => {
        // Promijeni lokalno stanje
        const newTheme =
            currentTheme === "impressionism"
                ? "expressionism"
                : "impressionism";
        setCurrentTheme(newTheme);

        // Pozovi vanjsku funkciju ako postoji
        if (onToggle) {
            onToggle();
        }
    };

    const isExpressionism = currentTheme === "expressionism";
    const isChecked = isExpressionism;

    return (
        <div className='flex flex-row-reverse items-center justify-center px-5 py-1 min-h-[200px] gap-4'>
            {/* Stilovi za animacije */}
            <style>{`
        @keyframes ringPulse {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.1); opacity: 0.6; }
        }
        @keyframes patternRotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes energyFlow {
          0% { transform: scaleX(0) translateX(0); opacity: 0; }
          50% { transform: scaleX(1) translateX(50%); opacity: 1; }
          100% { transform: scaleX(0) translateX(100%); opacity: 0; }
        }
        @keyframes particleBurst {
          0% { transform: translate(0, 0) scale(1); opacity: 1; }
          100% { 
            transform: translate(
              calc(cos(var(--angle)) * 50px),
              calc(sin(var(--angle)) * 50px)
            ) scale(0);
            opacity: 0;
          }
        }
        @keyframes cosmosPan {
          0% { background-position: 0% 0%; }
          100% { background-position: 200% 200%; }
        }
        @keyframes glowFollow {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.5; }
        }
      `}</style>

            {/* Glavni Label Wrapper */}
            <label
                className='relative w-[140px] h-[70px] cursor-pointer group'
                style={{ perspective: "500px", transformStyle: "preserve-3d" }}>
                <input
                    type='checkbox'
                    className='sr-only'
                    checked={isChecked}
                    onChange={handleToggle} // Sada koristimo lokalni handler koji mijenja stanje
                />

                {/* Slider pozadina */}
                <div
                    className={`
            absolute inset-0 rounded-[35px] overflow-hidden transition-all duration-500
            shadow-[0_0_20px_rgba(0,0,0,0.5),inset_0_0_15px_rgba(255,255,255,0.05)]
            group-hover:[transform:rotateX(10deg)_rotateY(10deg)]
            ${
                isChecked
                    ? "bg-gradient-to-tr from-[#16213e] to-[#1a1a2e]"
                    : "bg-gradient-to-tr from-[#1a1a2e] to-[#16213e]"
            }
          `}
                    style={{ transformStyle: "preserve-3d" }}>
                    {/* Cosmos (Zvijezde u pozadini) */}
                    <div
                        className={`absolute inset-0 transition-opacity duration-500 bg-contain opacity-10 group-hover:opacity-20 group-hover:[animation:cosmosPan_20s_linear_infinite]`}
                        style={{
                            backgroundImage: `
                radial-gradient(1px 1px at 10% 10%, #fff 100%, transparent),
                radial-gradient(1px 1px at 20% 20%, #fff 100%, transparent),
                radial-gradient(2px 2px at 30% 30%, #fff 100%, transparent),
                radial-gradient(1px 1px at 40% 40%, #fff 100%, transparent),
                radial-gradient(2px 2px at 50% 50%, #fff 100%, transparent),
                radial-gradient(1px 1px at 60% 60%, #fff 100%, transparent),
                radial-gradient(2px 2px at 70% 70%, #fff 100%, transparent),
                radial-gradient(1px 1px at 80% 80%, #fff 100%, transparent),
                radial-gradient(1px 1px at 90% 90%, #fff 100%, transparent)
              `,
                            backgroundSize: "200% 200%",
                        }}></div>

                    {/* Energetske linije */}
                    {[
                        { top: "20%", rotate: "15deg" },
                        { top: "50%", rotate: "0deg" },
                        { top: "80%", rotate: "-15deg" },
                    ].map((style, index) => (
                        <div
                            key={index}
                            className={`absolute w-full h-[2px] origin-left transition-opacity duration-500 ${isChecked ? "opacity-100 animate-[energyFlow_2s_linear_infinite]" : "opacity-0"}`}
                            style={{
                                top: style.top,
                                transform: `rotate(${style.rotate})`,
                                background:
                                    "linear-gradient(90deg, transparent, rgba(78, 205, 196, 0.5), transparent)",
                            }}></div>
                    ))}

                    {/* Glavna Kugla (Orb) */}
                    <div
                        className={`
              absolute h-[62px] w-[62px] left-[4px] bottom-[4px] rounded-full z-10
              transition-all duration-[0.6s] ease-[cubic-bezier(0.68,-0.55,0.265,1.55)]
              group-hover:brightness-125 group-hover:shadow-[0_0_20px_rgba(78,205,196,0.5),0_0_40px_rgba(78,205,196,0.3)]
              group-hover:[transform:translateZ(10px)]
              active:scale-95
            `}
                        style={{
                            background: isChecked
                                ? "linear-gradient(145deg, #4ecdc4, #45b7af)"
                                : "linear-gradient(145deg, #ff6b6b, #4ecdc4)",
                            transform: isChecked
                                ? "translateX(70px) rotate(360deg)"
                                : "translateX(0px) rotate(0deg)",
                            transformStyle: "preserve-3d",
                        }}>
                        {/* Unutarnja kugla */}
                        <div
                            className={`absolute inset-[5px] rounded-full overflow-hidden transition-all duration-500`}
                            style={{
                                background: isChecked
                                    ? "linear-gradient(145deg, #45b7af, #3da89f)"
                                    : "linear-gradient(145deg, #fff, #e6e6e6)",
                                transform: isChecked
                                    ? "scale(0.9)"
                                    : "scale(1)",
                            }}>
                            {/* Rotirajući uzorak unutar kugle */}
                            <div
                                className='absolute inset-0 animate-[patternRotate_10s_linear_infinite]'
                                style={{
                                    background:
                                        "repeating-conic-gradient(from 0deg, transparent 0deg, rgba(0, 0, 0, 0.1) 10deg, transparent 20deg)",
                                }}></div>
                        </div>

                        {/* Prsten oko kugle */}
                        <div
                            className={`absolute inset-[-3px] border-2 rounded-full transition-all duration-500 ${isChecked ? "animate-[ringPulse_2s_infinite]" : ""}`}
                            style={{
                                borderColor: isChecked
                                    ? "rgba(78, 205, 196, 0.3)"
                                    : "rgba(255, 255, 255, 0.1)",
                            }}></div>
                    </div>

                    {/* Čestice (Particles) */}
                    <div className='absolute w-full h-full pointer-events-none'>
                        {[
                            { angle: "30deg", delay: "0s", left: "20%" },
                            { angle: "60deg", delay: "0.2s", left: "40%" },
                            { angle: "90deg", delay: "0.4s", left: "60%" },
                            { angle: "120deg", delay: "0.6s", left: "80%" },
                            { angle: "150deg", delay: "0.8s", left: "30%" },
                            { angle: "180deg", delay: "1s", left: "70%" },
                        ].map((p, i) => (
                            <div
                                key={i}
                                className={`absolute w-[4px] h-[4px] bg-[#4ecdc4] rounded-full opacity-0 ${isChecked ? "animate-[particleBurst_1s_ease-out_infinite]" : ""}`}
                                style={
                                    {
                                        // FIX: Dodan 'as React.CSSProperties' da TypeScript prihvati --angle varijablu
                                        "--angle": p.angle,
                                        "left": p.left,
                                        "animationDelay": p.delay,
                                        "top": "50%",
                                    } as React.CSSProperties
                                }></div>
                        ))}
                    </div>

                    {/* Shadow glow effect when checked */}
                    {isChecked && (
                        <div
                            className='absolute inset-0 animate-[glowFollow_2s_linear_infinite]'
                            style={{
                                background:
                                    "radial-gradient(circle at 50% 50%, rgba(78, 205, 196, 0.2), transparent 50%)",
                            }}></div>
                    )}
                </div>
            </label>

            {/* Tekstualna povratna informacija (Integracija logike iz snippeta) */}
            <div className='text-center font-semibold text-6xl font-display tracking-wide transition-colors duration-300'>
                {!isExpressionism ? (
                    <span className='text-slate-800 drop-shadow-[0_0_1px_rgba(251,191,36,0.5)]'>
                        Doživi drugačiji grad{" "}
                        <ArrowRight className='inline font-bold text-6xl' />
                    </span>
                ) : (
                    <span className='text-gray-200 drop-shadow-[0_0_1px_rgba(78,205,196,0.5)]'>
                        Vrati stari doživljaj!{" "}
                        <ArrowRight className='inline font-bold text-6xl' />
                    </span>
                )}
            </div>
        </div>
    );
};

export default CosmicToggle;
