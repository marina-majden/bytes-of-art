import React from "react";
// Definiramo tip za Lucide ikone ili bilo koju drugu React komponentu
type IconType = React.ElementType;

interface ArrowButtonProps {
    text?: string;
    onClick?: () => void;
    className?: string;
    /**
     * Opcionalna ikona. Ako se ne pošalje, prikazuje se zadana CSS strelica.
     * Možeš poslati Lucide ikonu, npr. `icon={ArrowRight}`
     */
    icon?: IconType;
}

const ArrowButton: React.FC<ArrowButtonProps> = ({
    text = "Learn More",
    onClick,
    className = "",
    icon: Icon,
}) => {
    return (
        <button
            onClick={onClick}
            className={`relative inline-block cursor-pointer outline-none border-0 align-middle bg-transparent  p-0 w-56 min-w-max h-auto group ${className}`}>
            {/* Krug koji se širi */}
            <span
                className='relative block m-0 w-12 h-12 bg-gradient-to-tr from-[#1a1a2e] to-[#16213e] shadow-[0_0_20px_rgba(0,0,0,0.5),inset_0_0_15px_rgba(255,255,255,0.05)] rounded-[1.625rem] transition-all duration-[450ms] ease-[cubic-bezier(0.65,0,0.076,1)] group-hover:w-full'
                aria-hidden='true'>
                {/* Logika za ikonu: Custom ikona ili Default CSS strelica */}
                {Icon ? (
                    <span
                        className={`
              absolute inset-0 left-0 top-0 m-auto w-fit h-fit flex items-start justify-self-start
              text-white hover:translate-x-2  hover:scale-105 transition-all duration-[450ms] ease-[cubic-bezier(0.65,0,0.076,1)]
              
            `}>
                        <Icon size={20} strokeWidth={3} />
                    </span>
                ) : (
                    /* Zadana CSS Strelica */
                    <span
                        className={`
              absolute top-0 bottom-0 left-[0.625rem] m-auto 
              w-[1.125rem] h-[0.125rem] bg-none 
              transition-all duration-[450ms] ease-[cubic-bezier(0.65,0,0.076,1)] group-hover:translate-x-4 group-hover:bg-white
            `}>
                        <span className='absolute top-[-0.29rem] right-[0.0625rem] w-[0.625rem] h-[0.625rem] border-t-[0.125rem] border-r-[0.125rem] border-white rotate-45'></span>
                    </span>
                )}
            </span>

            {/* Tekst gumba */}
            <span
                className={`
          absolute inset-0 py-2 text-md ml-12
          text-[#282936] font-bold font-sans uppercase leading-[1.8] text-right
          transition-all duration-[450ms] ease-[cubic-bezier(0.65,0,0.076,1)]
          group-hover:opacity-0
        `}>
                {text}
            </span>
        </button>
    );
};

export default ArrowButton;
