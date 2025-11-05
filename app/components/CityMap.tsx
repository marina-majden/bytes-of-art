// src/components/CityMap.tsx

import React from "react";
import { Link } from "react-router";
import { locations } from "../data/locationData"; // Naša "baza podataka"

/**
 * Pomoćna komponenta za prikaz interaktivne točke na mapi.
 * Koristi Tailwind 'group' i 'group-hover' za elegantan prikaz opisa.
 */
interface PointProps {
    to: string;
    label: string;
    position: string; // Tailwind klase (npr. "top-[50%] left-[30%]")
}

const InteractivePoint: React.FC<PointProps> = ({ to, label, position }) => {
    return (
        <Link
            to={to}
            // Postavljamo točku na mapu koristeći Tailwind klase
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 ${position} group`}
            aria-label={`Odi na lokaciju: ${label}`}>
            <div className='relative flex items-center justify-center'>
                {/* 1. Pulsirajući vanjski krug (privlači pažnju) */}
                <div className='absolute w-6 h-6 bg-blue-500 rounded-full animate-ping opacity-75 group-hover:opacity-100 transition-opacity'></div>
                {/* 2. Središnji krug */}
                <div className='relative w-5 h-5 bg-blue-600 border-2 border-white rounded-full shadow-md'></div>

                {/* 3. Tooltip (oblačić) koji se pojavljuje na hover */}
                <div className='absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 px-4 py-2 bg-gray-800 text-white text-sm font-semibold rounded-lg shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none'>
                    {label}
                    {/* Mali trokut za tooltip */}
                    <div className='absolute top-full left-1/2 w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-gray-800 transform -translate-x-1/2'></div>
                </div>
            </div>
        </Link>
    );
};

/**
 * Glavna komponenta mape grada.
 */
const CityMap: React.FC = () => {
    // Dohvaćamo nazive lokacija iz naših podataka
    const kavanaLabel = locations["kavana"]?.name || "Kavana / Krčma";

    // Placeholder nazivi (dok ne dodamo podatke)
    const ulicaLabel = "Ulica / Bulevar";
    const domLabel = "Dom / Interijer";

    return (
        <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 md:p-8'>
            <header className='text-center mb-12'>
                <h1 className='text-4xl md:text-5xl font-bold text-gray-800 mb-3'>
                    Portret grada: suprotne percepcije
                </h1>
                <p className='text-lg md:text-xl text-gray-600 italic'>
                    Istražite grad kretanjem po njegovim najpoznatijim
                    dijelovima!
                </p>
            </header>

            {/* Kontejner za Mapu */}
            <div className='relative w-full max-w-4xl h-[60vh] bg-gray-800 rounded-xl shadow-2xl border-4 border-gray-900 overflow-hidden'>
                {/* Estetski elementi - stilizirane ulice */}
                <div className='absolute top-1/2 left-0 w-full h-2 bg-gray-600 transform -translate-y-1/2 opacity-50'></div>
                <div className='absolute top-0 left-1/3 w-2 h-full bg-gray-600 transform -translate-x-1/2 opacity-50'></div>
                <div className='absolute top-1/4 left-1/3 w-2/3 h-2 bg-gray-600 opacity-50'></div>

                {/* --- Interaktivne Točke --- */}

                {/* 1. Kavana (Lokacija koju imamo) */}
                <InteractivePoint
                    to='/city/kavana'
                    label={kavanaLabel}
                    position='top-[50%] left-[33%]' // Središnje raskrižje
                />

                {/* 2. Ulica (Placeholder) */}
                <InteractivePoint
                    to='/city/ulica'
                    label={ulicaLabel}
                    position='top-[25%] left-[70%]' // Gore desno
                />

                {/* 3. Dom (Placeholder) */}
                <InteractivePoint
                    to='/city/dom'
                    label={domLabel}
                    position='top-[75%] left-[15%]' // Dolje lijevo
                />
            </div>
        </div>
    );
};

export default CityMap;
