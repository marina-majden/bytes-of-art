import React from "react";

// uporaba: 
// Hex boja: <ScrollDownIcon color="#ff5733" />

interface ScrollDownIconProps {
    /** Boja ikone (npr. "skyblue", "#ff0000", "rgb(255, 255, 255)") */
    color?: string;
    className?: string;
}

const ScrollDownIcon: React.FC<ScrollDownIconProps> = ({
    color = "skyblue",
    className = "",
}) => {
    return (
        <div
            className={`relative inline-flex flex-col items-center ${className}`}
            // Postavljamo CSS varijablu --color koju ćemo koristiti u Tailwind klasama i stilovima
            style={{ "--color": color } as React.CSSProperties}>
            {/* Definiramo specifične Keyframes animacije */}
            <style>{`
        @keyframes scrolldown-anim {
          0% { opacity: 0; height: 6px; }
          40% { opacity: 1; height: 10px; }
          80% { transform: translate(0, 20px); height: 10px; opacity: 0; }
          100% { height: 3px; opacity: 0; }
        }
        @keyframes pulseChevron {
          from { opacity: 0; }
          to { opacity: 0.5; }
        }
      `}</style>

            {/* Glavni "Miš" okvir */}
            <div className='relative w-[30px] h-[50px] border-[3px] border-[var(--color)] rounded-[50px] box-border'>
                {/* Kotačić unutar miša (The Wheel) */}
                <div className='absolute bottom-[30px] left-1/2 -ml-[3px] w-[6px] h-[6px] bg-[var(--color)] rounded-full animate-[scrolldown-anim_2s_infinite] box-border shadow-[0px_-5px_3px_1px_rgba(42,84,112,0.4)]'></div>
            </div>

            {/* Strelice ispod miša (Chevrons) */}
            <div className='mt-[6px] w-[30px] flex flex-col items-center -ml-[3px]'>
                {/* Prva strelica */}
                <div className='relative w-[10px] h-[10px] border-r-[3px] border-b-[3px] border-[var(--color)] rotate-45 -mt-[6px] animate-[pulseChevron_500ms_ease_infinite_alternate]'></div>

                {/* Druga strelica (s odgodom) */}
                <div className='relative w-[10px] h-[10px] border-r-[3px] border-b-[3px] border-[var(--color)] rotate-45 -mt-[6px] animate-[pulseChevron_500ms_ease_infinite_alternate] [animation-delay:250ms]'></div>
            </div>
        </div>
    );
};

export default ScrollDownIcon;
