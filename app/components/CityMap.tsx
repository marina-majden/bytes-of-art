import React from "react";
import { Link } from "react-router";
import { locations } from "../data/locationData";
import Stack from "~/components/Stack";

interface PointProps {
    to: string;
    label: string;
    position: string;
    color?: string;
}

const InteractivePoint: React.FC<PointProps> = ({
    to,
    label,
    position,
    color,
}) => {
    return (
        <Link
            to={to}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 ${position} group z-20`}
            aria-label={`Odi na lokaciju: ${label}`}>
            <div className='relative flex items-center justify-center'>
                <div
                    className={`absolute w-6 h-6 ${color} rounded-full animate-ping opacity-75 group-hover:opacity-100 transition-opacity`}></div>
                <div
                    className={`relative w-5 h-5 ${color} border-2 border-white rounded-full shadow-md`}></div>
                <div className='absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 px-4 py-2 bg-gray-800 text-white text-sm font-semibold rounded-lg shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none'>
                    {label}
                    <div className='absolute top-full left-1/2 w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-gray-800 transform -translate-x-1/2'></div>
                </div>
            </div>
        </Link>
    );
};

// Glavna komponenta mape
const CityMap: React.FC = () => {
    const kavanaLabel = locations["kavana"]?.name || "Kavana";
    const ulicaLabel = locations["ulica"]?.name || "Ulica";
    const domLabel = locations["dom"]?.name || "Dom";
    const parkLabel = locations["park"]?.name || "Park";
    const kolodvorLabel = locations["kolodvor"]?.name || "Kolodvor";

    return (
        <div className='flex flex-col items-center justify-center p-4 md:p-8'>
            <header className='text-center mb-12'>
                <h2 className='text-4xl md:text-5xl font-bold text-neutral-100 mb-3'>
                    Grad »{" "}
                    <span className='font-alter text-teal-400'>
                        {" "}
                        dvostruka ekspozicija
                    </span>
                </h2>
                <p className='max-w-2xl mx-auto text-lg md:text-xl text-neutral-200 italic'>
                    Prošetajte po zamišljenom europskom modernističkom gradu
                    kako biste pronašli dojmove književnika, boema i umjetnika!
                </p>
            </header>

            {/* AŽURIRANI KONTEJNER ZA MAPU */}
            <div className='relative w-[60vw] h-[70vh] max-w-6xl rounded-lg shadow-2xl border-2 border-gray-700 overflow-hidden mb-6 bg-neutral-300'>
                {/* --- AŽURIRANA SVG MAPA POZADINE (z-index 0) --- */}
                <svg
                    className='absolute top-0 left-0 w-full h-full z-0 opacity-100'
                    xmlns='http://www.w3.org/2000/svg'
                    preserveAspectRatio='xMidYMid slice'
                    viewBox='0 0 400 300'>
                    {/* Glavne ceste (Bijele) */}
                    <path
                        d='M 0 50 L 400 100'
                        stroke='#ffffff'
                        strokeWidth='3'
                        strokeDasharray='10 5' // Isprekidana linija
                    />
                    <path
                        d='M 0 110 L 400 108'
                        stroke='#ffffff'
                        strokeWidth='2'
                    />
                    {/* Manje ulice (Sive) - Stare */}
                    <path
                        d='M 110 50 L 300 60'
                        stroke='#ffffff'
                        strokeWidth='1'
                    />
                    <path
                        d='M 110 200 L 250 250'
                        stroke='#ffffff'
                        strokeWidth='1'
                    />
                    {/* NOVE Ortogonalne Manje ulice */}
                    <path
                        d='M 150 0 L 155 108'
                        stroke='#ffffff'
                        strokeWidth='1'
                    />{" "}
                    {/* Vertikalna */}
                    <path
                        d='M 0 250 L 120 240'
                        stroke='#e4f'
                        strokeWidth='1'
                    />{" "}
                    {/* Horizontalna */}
                    <path
                        d='M 200 110 L 200 300'
                        stroke='#f1f1f1'
                        strokeWidth='1'
                        strokeOpacity={0.6}
                    />{" "}
                    {/* Vertikalna */}
                    <path
                        d='M 300 0 L 300 110'
                        stroke='#ffffff'
                        strokeWidth='1'
                    />{" "}
                    {/* Vertikalna */}
                    <path
                        d='M 350 20 L 350 108'
                        stroke='#ffffff'
                        strokeWidth='1'
                    />{" "}
                    <rect x='220' y='0' width='20' height='35' fill='#9096a2' />
                    <rect x='235' y='5' width='20' height='35' fill='#9096a2' />
                    <rect
                        x='250'
                        y='10'
                        width='50'
                        height='35'
                        fill='#9096a2'
                    />
                    <rect
                        x='220'
                        y='110'
                        width='40'
                        height='20'
                        fill='#9096a2'
                    />
                    {/* Blok zgrada (Industrija) - Tamnija boja */}
                    <rect x='20' y='10' width='60' height='30' fill='#6b7280' />
                    <rect x='30' y='45' width='40' height='20' fill='#6b7280' />
                    <rect
                        x='130'
                        y='10'
                        width='20'
                        height='30'
                        fill='#6b7280'
                    />
                    <path
                        className='-z-10'
                        d='M -50 150 C 100 100, 200 200, 450 150 L 450 300 L -50 300 Z'
                        fill='#aaccf0' // Svijetlo plava
                    />
                    <path
                        d='M 100 0 L 120 300'
                        stroke='#ffffff' // Bijela
                        strokeWidth='5'
                    />
                    {/* Park (Priroda) */}
                    <circle cx='280' cy='220' r='40' fill='#bbf7d0' />{" "}
                </svg>

                {/* --- Interaktivne Točke (z-index 20) --- */}

                <InteractivePoint
                    to='/city/kavana'
                    label={kavanaLabel}
                    position='top-[45%] left-[33%]'
                    color='bg-purple-600'
                />
                <InteractivePoint
                    to='/city/ulica'
                    label={ulicaLabel}
                    position='top-[30%] left-[70%]'
                    color='bg-blue-500'
                />
                <InteractivePoint
                    to='/city/kolodvor'
                    label={kolodvorLabel}
                    position='top-[20%] left-[10%]'
                    color='bg-gray-700'
                />
                <InteractivePoint
                    to='/city/park'
                    label={parkLabel}
                    position='top-[73%] left-[70%]'
                    color='bg-green-600'
                />
                <InteractivePoint
                    to='/city/dom'
                    label={domLabel}
                    position='top-[35%] left-[15%]'
                    color='bg-yellow-600'
                />
            </div>
            {/* Task for students; there is a stack of cards with paintings on them and they have to swipe them left and right (Tinder style), based if the painting is impressionist or expressionist, they have to swipe accordingly */}
            <div className='container flex flex-col items-center'>
                <h3 className='font-alter text-4xl font-bold text-center text-teal-500 my-4 p-4'>
                    Impressionism or expressionism?
                </h3>
                <p className='font-italic text-right mb-2 p-2'>
                    Depending if they are one or the other, carefully look at
                    the paintings and swipe them accordingly!
                </p>
                <Stack />
            </div>
        </div>
    );
};

export default CityMap;
