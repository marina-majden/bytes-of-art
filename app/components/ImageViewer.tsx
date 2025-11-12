// src/components/ImageViewer.tsx
import React, { useState } from "react";
import type { AnalysisPoint } from "../types/city";

interface Props {
    imageSrc: string;
    artist: string;
    analysisPoints: AnalysisPoint[];
}

const ImageViewer: React.FC<Props> = ({ imageSrc, artist, analysisPoints }) => {
    const [showAnalysis, setShowAnalysis] = useState(false);

    return (
        <div className='w-full h-full relative border-2 border-gray-800 rounded-lg shadow-xl overflow-hidden'>
            <img
                src={imageSrc}
                alt={artist}
                className='object-contain h-full w-auto'
            />
            <p className='text-xs italic p-2 bg-black/50 text-neutral-100 absolute bottom-0 w-full'>
                {artist}
            </p>

            <button
                type='button'
                onClick={() => setShowAnalysis(!showAnalysis)}
                className='absolute top-2 right-2 bg-teal-500 text-neutral-100 px-3 py-1 rounded-full text-sm font-bold shadow-lg hover:bg-teal-700 transition-all'>
                {showAnalysis ? "Analiza - " : "Analiza +"}
            </button>

            {/* Interaktivne točke (Hotspots) */}
            {showAnalysis && (
                <div className='absolute top-0 left-0 w-full h-full'>
                    {analysisPoints.map((point, index) => (
                        <div
                            key={index}
                            className={`absolute transform -translate-x-1/2 -translate-y-1/2 group ${point.x} ${point.y}`}>
                            <div className='w-5 h-5 bg-teal-200 border-2 border-white rounded-full cursor-pointer animate-pulse'></div>
                            {/* Opis koji se pojavljuje na hover */}
                            <div className='hidden group-hover:block absolute bottom-full left-1/2 -translate-x-1/2 w-64 p-3 bg-black/80 text-white text-sm rounded-lg shadow-2xl z-10 mb-2'>
                                {point.description}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ImageViewer;
