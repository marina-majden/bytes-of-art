// src/components/LocationPage.tsx
import React, { useState } from "react";
import { useParams, Link } from "react-router"; // Ispravljen import
import { locations } from "../data/locationData";
import type { LocationData } from "../types/city";
import ImageViewer from "../components/ImageViewer";

import PerceptionToggle from "../components/PerceptionToggle";
import {
    ImpressionistOverlay,
    ExpressionistOverlay,
} from "../components/MapOverlays";

type Theme = "impressionism" | "expressionism";

const City: React.FC = () => {
    const [currentTheme, setCurrentTheme] = useState<Theme>("impressionism");
    const { locationId } = useParams<{ locationId: string }>();

    if (!locationId || !locations[locationId]) {
        return (
            <div className='flex items-center justify-center min-h-screen'>
                Lokacija nije pronađena.{" "}
                <Link to='/city' className='ml-2 font-display underline'>
                    Povratak na mapu
                </Link>
            </div>
        );
    }

    const location: LocationData = locations[locationId];
    const data = location[currentTheme];

    // --- AŽURIRANA PEDAGOŠKA STILIZACIJA ---
    const impressionismStyles = {
        // Svijetla, prozračna pozadina
        gradient:
            "bg-gradient-to-br from-orange-300 via-stone-300 to-amber-300",
        textColor: "text-gray-900",
        cardBg: "bg-white/40 border-white/50 backdrop-blur-lg",
        animation: "", // Bez animacije
    };

    const expressionismStyles = {
        // Tamna, agresivna, animirana pozadina
        gradient: "bg-gradient-to-r from-black via-red-800 to-gray-900",
        textColor: "text-gray-100",
        // Tamni Glassmorphism s crvenim obrubom i sjenom
        cardBg: "bg-black/40 border-red-900/50 backdrop-blur-lg shadow-2xl shadow-red-900/30",
        // Klase za animaciju pozadine
        animation: "bg-400% animate-bg-pan",
    };
    const themeStyles =
        currentTheme === "impressionism"
            ? impressionismStyles
            : expressionismStyles;

    const [isTextVisible, setIsTextVisible] = useState(false);
    const toggleTextVisibility = () => {
        setIsTextVisible(!isTextVisible);
    };

    return (
        <div
            className={`relative w-full h-screen p-6 transition-all duration-1000 overflow-hidden ${themeStyles.gradient} ${themeStyles.textColor} ${themeStyles.animation}`}>
            {currentTheme === "impressionism" && <ImpressionistOverlay />}
            {currentTheme === "expressionism" && <ExpressionistOverlay />}

            <div className='relative max-w-6xl mx-auto h-full flex flex-col justify-center pb-4 z-10'>
                <div className='flex justify-between items-center mb-4'>
                    <Link
                        to='/'
                        className={`text-sm hover:underline ${themeStyles.textColor}/80 hover:${themeStyles.textColor}`}>
                        &larr; Povratak na mapu
                    </Link>
                    <PerceptionToggle
                        theme={currentTheme}
                        onToggle={() =>
                            setCurrentTheme(
                                currentTheme === "impressionism"
                                    ? "expressionism"
                                    : "impressionism"
                            )
                        }
                    />
                </div>

                <h1 className='text-3xl font-bold mb-2'>{location.name}</h1>
                <h2 className='text-xl italic mb-6'>{data.themeName}</h2>
                <div className='flex flex-col md:flex-row align-top justify-center items-start gap-6 p-0'>
                    {/* 1. Likovni kontekst (Glassmorphism) */}
                    <section
                        // AŽURIRANO: Dinamičke klase za karticu
                        className={`md:w-2/3 h-fit p-4 sm:p-6 rounded-2xl border transition-all duration-500 ${themeStyles.cardBg}`}>
                        <h3 className='font-bold text-lg mb-2'>
                            Grad kroz slikarsko platno
                        </h3>
                        <ImageViewer
                            imageSrc={data.imageSrc}
                            artist={data.imageArtist}
                            analysisPoints={data.analysisPoints}
                        />
                    </section>

                    {/* 2. Književni kontekst (Glassmorphism) */}
                    <article
                        // AŽURIRANO: Dinamičke klase za karticu
                        className={`md:w-1/3 h-fit p-4 sm:p-6 rounded-2xl border transition-all duration-500 ${themeStyles.cardBg}`}>
                        <button
                            type='button'
                            onClick={toggleTextVisibility}
                            className='flex justify-between items-center w-full font-bold text-lg mb-2 focus:outline-none'>
                            <span>Grad iz pera književnika</span>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                viewBox='0 0 20 20'
                                fill='currentColor'
                                className={`w-5 h-5 transition-transform duration-300 ${
                                    isTextVisible ? "rotate-180" : "rotate-0"
                                }`}>
                                <path
                                    fillRule='evenodd'
                                    d='M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.23 8.29a.75.75 0 01.02-1.06z'
                                    clipRule='evenodd'
                                />
                            </svg>
                        </button>
                        <div
                            className={`
                              transition-all duration-500 ease-in-out overflow-hidden
                              ${isTextVisible ? "max-h-[1000px] opacity-100 pt-4" : "max-h-0 opacity-0"}
                            `}>
                            <blockquote className='italic text-lg border-l-4 border-current/50 pl-4 mb-2'>
                                {data.text}
                            </blockquote>
                            <p className='text-right font-medium opacity-90'>
                                &mdash; {data.textAuthor}
                            </p>
                        </div>
                    </article>
                </div>
            </div>
        </div>
    );
};

export default City;
