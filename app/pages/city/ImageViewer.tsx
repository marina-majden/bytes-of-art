// src/components/ImageViewer.tsx
import React, { useState, useEffect } from "react";
import type { AnalysisPoint } from "../../types/city";
import { Loader2 } from "lucide-react"; // Opcionalno: Ako želiš ikonu za učitavanje

interface Props {
    imageSrc: string;
    artist: string;
    analysisPoints: AnalysisPoint[];
}

const ImageViewer: React.FC<Props> = ({ imageSrc, artist, analysisPoints }) => {
    const [showAnalysis, setShowAnalysis] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Resetiraj stanje učitavanja kada se promijeni izvor slike (npr. promjena teme)
    useEffect(() => {
        setIsLoading(true);
    }, [imageSrc]);

    return (
        <div className='w-full h-full relative border-2 border-gray-800 rounded-lg shadow-xl bg-neutral-900 overflow-hidden min-h-[300px]'>
            {/* --- SKELETON LOADER --- */}
            {isLoading && (
                <div className='absolute inset-0 flex flex-col items-center justify-center bg-neutral-800 animate-pulse z-10'>
                    {/* Ovdje možeš staviti ikonu ili samo ostaviti sivu pozadinu */}
                    <Loader2 className='w-10 h-10 text-neutral-500 animate-spin mb-2' />
                    <span className='text-neutral-400 text-sm font-sans'>
                        Učitavanje umjetnine...
                    </span>
                </div>
            )}

            {/* --- SLIKA --- */}
            <img
                src={imageSrc}
                alt={artist}
                loading='lazy' // Native lazy loading
                onLoad={() => setIsLoading(false)} // Javlja nam kad je spremna
                className={`
                    w-full h-full object-contain transition-opacity duration-700 ease-in-out
                    ${isLoading ? "opacity-0" : "opacity-100"} 
                `}
            />

            {/* --- PODNOŽJE S IMENOM UMJETNIKA --- */}
            {/* Prikazujemo tek kad se slika učita da ne skače layout */}
            {!isLoading && (
                <p className='text-xs italic p-2 bg-black/60 backdrop-blur-sm text-neutral-100 absolute bottom-0 w-full animate-fade-in'>
                    {artist}
                </p>
            )}

            {/* --- GUMB ZA ANALIZU --- */}
            {/* Prikazujemo gumb tek kad je slika učitana */}
            {!isLoading && (
                <button
                    type='button'
                    onClick={() => setShowAnalysis(!showAnalysis)}
                    className='absolute top-2 right-2 bg-teal-500/90 hover:bg-teal-600 text-neutral-100 px-3 py-1 rounded-full text-sm font-bold shadow-lg transition-all backdrop-blur-sm border border-teal-400/50 z-20'>
                    {showAnalysis ? "Sakrij analizu" : "Prikaži analizu"}
                </button>
            )}

            {/* --- INTERAKTIVNE TOČKE --- */}
            {showAnalysis && !isLoading && (
                <div className='absolute top-0 left-0 w-full h-full'>
                    {analysisPoints.map((point, index) => (
                        <div
                            key={index}
                            className={`absolute transform -translate-x-1/2 -translate-y-1/2 group z-30 ${point.x} ${point.y}`}>
                            {/* Točka koja pulsira */}
                            <div className='w-5 h-5 bg-teal-400/80 border-2 border-white rounded-full cursor-pointer animate-ping absolute opacity-75'></div>
                            <div className='w-5 h-5 bg-teal-500 border-2 border-white rounded-full cursor-pointer relative shadow-lg'></div>

                            {/* Opis (Tooltip) */}
                            <div className='hidden group-hover:block absolute bottom-full left-1/2 -translate-x-1/2 w-64 p-3 bg-neutral-900/95 border border-neutral-700 text-neutral-100 text-sm rounded-lg shadow-2xl z-40 mb-3 backdrop-blur-md'>
                                {point.description}
                                {/* Strelica dolje na tooltipu */}
                                <div className='absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-neutral-900/95'></div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ImageViewer;
