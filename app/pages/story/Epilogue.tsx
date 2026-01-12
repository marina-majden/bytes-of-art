import type { NarrativeState } from "../../types/story"; // Promijenjen import
import { getLabel } from "../../data/storyData"; // Promijenjen import

interface Props {
    story: NarrativeState;
    onWrite: (text: string) => void;
    isVisible: boolean;
}

export default function Epilogue({ story, onWrite, isVisible }: Props) {
    if (!isVisible) return null;

    const archetypeText = getLabel("archetypes", story.archetype)
        ?.split("(")[0]
        .trim()
        .toLowerCase();
    const setupText = getLabel("setups", story.setup)?.split("(")[0].trim();
    const baitText = getLabel("baits", story.bait);

    return (
        <div className='absolute inset-0 p-4 md:p-8 flex flex-col items-center justify-center animate-fade-in'>
            <div className='w-full max-w-2xl bg-stone-800 p-8 rounded-lg border border-stone-600 shadow-2xl'>
                <h3 className='text-2xl font-bold text-amber-500 mb-6 text-center font-display'>
                    Epilog
                </h3>

                <div className='text-lg text-stone-300 leading-relaxed space-y-4 mb-6 font-serif'>
                    <p>
                        Mladić, kojeg ste opisali kao{" "}
                        <span className='text-white font-bold'>
                            {archetypeText || "..."}
                        </span>
                        , upravo sluša laži o{" "}
                        <span className='text-white font-bold'>
                            {baitText ? baitText.toLowerCase() : "..."}
                        </span>
                        .
                    </p>
                    <p>
                        Ne osjeća ruku u džepu. Ne čuje zvuk škara koje režu
                        zlato.
                        <span className='text-white font-bold'>
                            {" "}
                            {setupText ? setupText : "..."}{" "}
                        </span>
                        je savršeno uspjela.
                    </p>
                </div>

                <div className='pt-6 border-t border-stone-600'>
                    <label className='block text-sm font-bold text-amber-500 mb-2 uppercase tracking-widest'>
                        Napišite Moralnu Pouku
                    </label>
                    <textarea
                        value={story.moralLesson}
                        onChange={(e) => onWrite(e.target.value)}
                        className='w-full h-32 bg-stone-900/50 border border-stone-500 rounded p-3 text-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all resize-none font-serif italic placeholder:text-stone-600'
                        placeholder="Npr. 'Tko visoko leti, nisko pada...' ili 'Oholost je najskuplji slijepac...'"
                    />
                </div>
            </div>
        </div>
    );
}
