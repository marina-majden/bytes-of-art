// src/components/LocationPage.tsx
import React, { useState } from "react";
import { useParams, Link } from "react-router";
import { locations } from "../../data/locationData";
import type { LocationData } from "../../types/city";
import ImageViewer from "./ImageViewer";
import { ImpressionistOverlay, ExpressionistOverlay } from "./MapOverlays";
import CosmicToggle from "./CosmicToggle";
import ArrowButton from "~/components/ArrowButton";
import { ChevronLeft } from "lucide-react";

type Theme = "impressionism" | "expressionism";

const CurrentCity: React.FC = () => {
    const [currentTheme, setCurrentTheme] = useState<Theme>("impressionism");
    const { locationId } = useParams<{ locationId: string }>();

    if (!locationId || !locations[locationId]) {
        return (
            <div className='flex items-center justify-center min-h-screen'>
                Lokacija nije pronađena.{" "}
                <Link to='/city' className='ml-2 font-display underline'>
                    Povratak na kartu
                </Link>
            </div>
        );
    }

    const location: LocationData = locations[locationId];
    const data = location[currentTheme];

    const impressionismStyles = {
        // Svijetla, prozračna pozadina
        gradient:
            "bg-gradient-to-br from-orange-300 via-neutral-300 to-amber-300",
        textColor: "text-slate-900",
        cardBg: "bg-gradient-to-br from-amber-400/30 via-yellow-500/50 to-orange-400/30 border-amber-200/70 backdrop-blur-lg",
        animation: "bg-500% animate-bg-pan",
    };

    const expressionismStyles = {
        // Tamna, agresivna, animirana pozadina
        gradient:
            "bg-black bg-gradient-to-br from-blue-900/20 via-red-900/80 to-gray-900",
        textColor: "text-gray-100",
        // Tamni Glassmorphism s crvenim obrubom i sjenom
        cardBg: "bg-gradient-to-tr from-black/60 via-blue-900/50 to-stone-900/70 border-stone-900/50  drop-shadow-lg  backdrop-blur-lg shadow-2xl shadow-red-900/30",
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
            className={`relative w-screen min-h-max p-10 transition-all duration-1000 ${themeStyles.gradient} ${themeStyles.textColor} ${themeStyles.animation}`}>
            {currentTheme === "impressionism" && <ImpressionistOverlay />}
            {currentTheme === "expressionism" && <ExpressionistOverlay />}

            <div className='relative top-10 left-0 max-w-6xl mx-auto flex flex-col justify-center pb-4 z-50'>
                <div className='fixed top-2 left-4 right-4 p-2 mx-auto flex justify-between items-start'>
                    <Link to='/city'>
                        <ArrowButton
                            text='Povratak na kartu'
                            icon={ChevronLeft}
                        />
                    </Link>
                    <CosmicToggle
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

                <h1 className='text-3xl font-bold my-4'>{location.name}</h1>
                <h2 className='text-xl italic mb-6'>{data.themeName}</h2>
                <div className='flex flex-col md:flex-row align-top justify-center items-start gap-6 p-0'>
                    {/* 1. Likovni kontekst (Glassmorphism) */}
                    <section
                        // AŽURIRANO: Dinamičke klase za karticu
                        className={`md:flex-2 md:grow-2 sm:p-4 md:p-6 rounded-2xl border transition-all duration-500 ${themeStyles.cardBg}`}>
                        <h3 className='font-semibold font-sans text-lg mb-2'>
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
                        className={`md:flex-1 sm:p-4 md:p-6 rounded-2xl border transition-all duration-500 ${themeStyles.cardBg}`}>
                        <button
                            type='button'
                            onClick={toggleTextVisibility}
                            className='flex font-sans justify-between items-center w-full font-semibold text-lg mb-2 focus:outline-none'>
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
                            <blockquote className='italic font-serif text-lg border-l-4 border-current/50 pl-4 mb-2'>
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

export default CurrentCity;
