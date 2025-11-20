import React from "react";

interface Props {
    theme: "impressionism" | "expressionism";
    onToggle: () => void;
}

const ThemeToggleButton: React.FC<Props> = ({ theme, onToggle }) => {
    const isExpressionism = theme === "expressionism";

    return (
        <button
            type='button'
            onClick={onToggle}
            className='flex items-center justify-center w-38 h-16 p-4 bg-stone-950 rounded-md shadow-inner'>
            <span
                className={`px-4 py-1 rounded-full font-semibold transition-all ${!isExpressionism ? "bg-amber-400 text-stone-500 shadow" : "opacity-50"}`}>
                Doživi drugačiji grad!
            </span>
            <span
                className={`px-4 py-1 rounded-full font-semibold transition-all ${isExpressionism ? "bg-orange-500 text-stone-200 shadow" : "opacity-50"}`}>
                Vrati stari doživljaj!
            </span>
        </button>
    );
};

export default ThemeToggleButton;
