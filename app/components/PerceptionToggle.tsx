// src/components/PerceptionToggle.tsx
import React from "react";

interface Props {
    theme: "impressionism" | "expressionism";
    onToggle: () => void;
}

const PerceptionToggle: React.FC<Props> = ({ theme, onToggle }) => {
    const isExpressionism = theme === "expressionism";

    return (
        <button
            type='button'
            onClick={onToggle}
            className='flex items-center justify-center w-48 p-1 bg-stone-950 rounded-full shadow-inner'>
            <span
                className={`px-4 py-1 rounded-full font-semibold transition-all ${!isExpressionism ? "bg-amber-200 text-stone-800 shadow" : "opacity-50"}`}>
                
            </span>
            <span
                className={`px-4 py-1 rounded-full font-semibold transition-all ${isExpressionism ? "bg-orange-700 text-stone-200 shadow" : "opacity-50"}`}>
                Tjeskoba
            </span>
        </button>
    );
};

export default PerceptionToggle;
