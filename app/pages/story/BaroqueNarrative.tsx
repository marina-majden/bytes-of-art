import { useState } from "react";
import type { NarrativeState } from "../../types/story";
// Importi iz novog 'story' foldera
import NarrativeSelection from "./NarrativeSelection";
import SceneViewer from "./SceneViewer";
import Epilogue from "./Epilogue";

export default function StoryNarrative() {
    const [timePhase, setTimePhase] = useState(0);

    const [story, setStory] = useState<NarrativeState>({
        archetype: null,
        setup: null,
        bait: null,
        moralLesson: "",
    });

    const handleUpdateStory = (key: keyof NarrativeState, value: any) => {
        setStory((prev) => ({ ...prev, [key]: value }));
    };

    return (
        <div className='w-full min-h-screen bg-stone-900 p-6 md:p-8 text-stone-100 font-serif flex flex-col items-center'>
            <div className='w-full max-w-5xl'>
                <div className='text-center mb-8 border-b border-stone-700 pb-6'>
                    <h1 className='text-4xl md:text-5xl font-bold text-amber-600 mb-2 tracking-wider font-display'>
                        CIJENA NAIVNOSTI
                    </h1>
                    <h2 className='text-xl text-amber-500/80 italic font-serif'>
                        {timePhase === -1 && "ČIN I: PRIPREMA ŽRTVE"}
                        {timePhase === 0 && "ČIN II: KOREOGRAFIJA KRAĐE"}
                        {timePhase === 1 && "ČIN III: MORALNA POUKA"}
                    </h2>
                </div>

                <div className='relative min-h-[600px] bg-black rounded-lg border-4 border-stone-800 mb-8 overflow-hidden shadow-2xl'>
                    <NarrativeSelection
                        story={story}
                        onSelect={handleUpdateStory}
                        isVisible={timePhase === -1}
                    />

                    <SceneViewer isVisible={timePhase === 0} />

                    <Epilogue
                        story={story}
                        onWrite={(text) =>
                            handleUpdateStory("moralLesson", text)
                        }
                        isVisible={timePhase === 1}
                    />
                </div>

                <div className='relative px-8 pb-4 bg-stone-800/50 rounded-xl p-4 border border-stone-700'>
                    <input
                        type='range'
                        min='-1'
                        max='1'
                        step='1'
                        value={timePhase}
                        onChange={(e) => setTimePhase(parseInt(e.target.value))}
                        className='w-full h-2 bg-stone-700 rounded-lg appearance-none cursor-pointer accent-amber-600'
                    />

                    <div className='flex justify-between mt-4 text-xs font-mono uppercase tracking-widest text-stone-500'>
                        <button
                            onClick={() => setTimePhase(-1)}
                            className={`transition-colors hover:text-amber-400 ${timePhase === -1 ? "text-amber-500 font-bold" : ""}`}>
                            I. Uzrok
                        </button>
                        <button
                            onClick={() => setTimePhase(0)}
                            className={`transition-colors hover:text-amber-400 ${timePhase === 0 ? "text-amber-500 font-bold" : ""}`}>
                            II. Trenutak Krađe
                        </button>
                        <button
                            onClick={() => setTimePhase(1)}
                            className={`transition-colors hover:text-amber-400 ${timePhase === 1 ? "text-amber-500 font-bold" : ""}`}>
                            III. Otrježnjenje
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
