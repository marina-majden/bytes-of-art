import { motion } from "framer-motion";
import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { FiMoon, FiSun } from "react-icons/fi";

const TOGGLE_CLASSES =
    "text-sm font-medium flex items-center gap-2 px-3 md:pl-3 md:pr-3.5 py-3 md:py-1.5 transition-colors relative z-10";

type ToggleOptionsType = "impressionism" | "expressionism";

const Toggle = () => {
    const [selected, setSelected] =
        useState<ToggleOptionsType>("impressionism");
    return (
        <div
            className={`grid h-[200px] place-content-center px-4 transition-colors ${
                selected === "impressionism" ? "bg-white" : "bg-slate-900"
            }`}>
            <SliderToggle selected={selected} setSelected={setSelected} />
        </div>
    );
};

const SliderToggle = ({
    selected,
    setSelected,
}: {
    selected: ToggleOptionsType;
    setSelected: Dispatch<SetStateAction<ToggleOptionsType>>;
}) => {
    return (
        <div className='relative flex w-fit items-center rounded-full'>
            <button
                type='button'
                className={`${TOGGLE_CLASSES} ${
                    selected === "impressionism"
                        ? "text-white"
                        : "text-slate-300"
                }`}
                onClick={() => {
                    setSelected("impressionism");
                }}>
                <FiMoon className='relative z-10 text-lg md:text-sm' />
                <span className='relative z-10'>Impresionizam</span>
            </button>
            <button
                type='button'
                className={`${TOGGLE_CLASSES} ${
                    selected === "expressionism"
                        ? "text-white"
                        : "text-slate-800"
                }`}
                onClick={() => {
                    setSelected("expressionism");
                }}>
                <FiSun className='relative z-10 text-lg md:text-sm' />
                <span className='relative z-10'>Ekspresionizam</span>
            </button>
            <div
                className={`absolute inset-0 z-0 flex ${
                    selected === "expressionism"
                        ? "justify-end"
                        : "justify-start"
                }`}>
                <motion.span
                    layout
                    transition={{ type: "spring", damping: 15, stiffness: 250 }}
                    className='h-full w-1/2 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600'
                />
            </div>
        </div>
    );
};

export default Toggle;
