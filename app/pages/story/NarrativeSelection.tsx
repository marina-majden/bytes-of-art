import React from "react";
import type { NarrativeState, OptionItem } from "../../types/story"; //
import { storyData } from "../../data/storyData";

interface Props {
    story: NarrativeState;
    onSelect: (key: keyof NarrativeState, value: any) => void;
    isVisible: boolean;
}

export default function NarrativeSelection({
    story,
    onSelect,
    isVisible,
}: Props) {
    if (!isVisible) return null;

    const renderOptions = <T extends string>(
        title: string,
        items: OptionItem<T>[],
        stateKey: keyof NarrativeState,
        currentValue: T | null,
        colorClass: string
    ) => (
        <div className='space-y-3'>
            <h3
                className={`text-lg font-bold ${colorClass} border-b border-stone-600 pb-1`}>
                {title}
            </h3>
            <div className='flex flex-col gap-2'>
                {items.map((opt) => (
                    <button
                        key={opt.id}
                        onClick={() => onSelect(stateKey, opt.id)}
                        className={`p-3 text-left text-sm rounded border transition-all duration-200 
              ${
                  currentValue === opt.id
                      ? "bg-amber-900/60 border-amber-500 text-amber-100 shadow-lg scale-[1.02]"
                      : "border-stone-700 hover:bg-stone-800 text-stone-400 hover:text-stone-200"
              }`}>
                        {opt.label}
                    </button>
                ))}
            </div>
        </div>
    );

    return (
        <div className='absolute inset-0 p-4 md:p-8 flex flex-col justify-center animate-fade-in'>
            <p className='text-center text-stone-400 mb-8 italic'>
                Tko je ovaj mladić? Kako je upao u ovu zamku? Vi određujete
                njegovu sudbinu.
            </p>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                {/* Koristimo storyData umjesto baroqueData */}
                {renderOptions(
                    "1. Tko je on?",
                    storyData.archetypes,
                    "archetype",
                    story.archetype,
                    "text-amber-600"
                )}
                {renderOptions(
                    "2. Početak?",
                    storyData.setups,
                    "setup",
                    story.setup,
                    "text-amber-600"
                )}
                {renderOptions(
                    "3. Mamac?",
                    storyData.baits,
                    "bait",
                    story.bait,
                    "text-amber-600"
                )}
            </div>
        </div>
    );
}
