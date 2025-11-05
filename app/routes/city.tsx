// src/components/LocationPage.tsx
import React, { useState } from "react";
import { useParams, Link } from "react-router";
import { locations } from "../data/locationData";
import type { LocationData } from "../types/city";
import ImageViewer from "../components/ImageViewer";
import Switch from "../components/Switch";
import PerceptionToggle from "../components/PerceptionToggle";

type Theme = "impressionism" | "expressionism";

const City: React.FC = () => {
    const [currentTheme, setCurrentTheme] = useState<Theme>("impressionism");
    const { locationId } = useParams<{ locationId: string }>();

    if (!locationId || !locations[locationId]) {
        return (
            <div>
                Lokacija nije pronađena. <Link to='/'>Povratak na mapu</Link>
            </div>
        );
    }

    const location: LocationData = locations[locationId];
    const data = location[currentTheme];

    const themeClasses = data.themeColor || "bg-amber-500";

    const [isTextVisible, setIsTextVisible] = useState(false);
    const toggleTextVisibility = () => {
        setIsTextVisible(!isTextVisible);
    };

    return (
        <div
            className={`w-full min-h-screen p-4 md:p-8 text-gray-500 transition-all duration-500 ${themeClasses}`}>
            <div className='max-w-6xl mx-auto'>
                {/* Kontrole: Povratak i Prekidač */}
                <div className='flex justify-between items-center mb-4'>
                    <Link to='/city' className='text-sm hover:underline'>
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
                    <Switch />
                </div>

                <h1 className='text-3xl font-bold mb-2'>{location.name}</h1>
                <h2 className='text-xl italic mb-6'>{data.themeName}</h2>

                {/* Glavni sadržaj: Tekst i Slika */}
                <div className='w-screen max-h-screen flex flex-col md:flex-row align-top justify-center items-center gap-2 p-6 mx-auto my-2'>
                    {/* 1. Likovni kontekst */}
                    <section className='md:w-2/3 md:h-fit bg-blue-950/50 p-6 rounded-lg shadow-md'>
                        <h3 className='font-bold text-lg mb-2'>
                            Slikarska percepcija
                        </h3>
                        <ImageViewer
                            imageSrc={data.imageSrc}
                            artist={data.imageArtist}
                            analysisPoints={data.analysisPoints}
                        />
                    </section>
                    {/* 2. Književni kontekst */}
                    <article className='md:w-1/3 md:h-fit bg-blue-950/50 p-6 rounded-lg shadow-md backdrop-blur-sm'>
                        <button
                            type='button'
                            onClick={toggleTextVisibility}
                            className='flex justify-between items-center w-full font-bold text-lg mb-2 text-gray-100 hover:text-white focus:outline-none'>
                            <span>Književni kontekst</span>
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
                            <blockquote className='italic text-lg border-l-4 border-gray-400 pl-4 mb-2 text-gray-100'>
                                {data.text}
                            </blockquote>
                            <p className='text-right font-medium text-gray-200'>
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
