// src/components/MapOverlays.tsx

import React from "react";

/**
 * IMPRESSIONIST OVERLAY
 * Stvara osjećaj "treperave svjetlosti" pomoću mekih, animiranih krugova.
 * Koristi SVG filter za postizanje 'mrljastog' (soft-focus) efekta.
 */
export const ImpressionistOverlay: React.FC = () => (
    <svg
        className='absolute top-0 left-0 w-full h-full z-0 opacity-70 pointer-events-none mix-blend-multiply' // 'multiply' stvara lijep efekt stapanja
        xmlns='http://www.w3.org/2000/svg'
        preserveAspectRatio='xMidYMid slice'>
        {/* Definicija filtera za meki fokus (simulacija 'mrlje') */}
        <defs>
            <filter id='soft-focus-blur'>
                <feGaussianBlur in='SourceGraphic' stdDeviation='3' />
            </filter>
        </defs>

        {/* Grupa elemenata na koje primjenjujemo filter */}
        <g filter='url(#soft-focus-blur)'>
            {/* Ovo su naši "odbljesci svjetla" ili "pointilističke" mrlje.
        Koristimo Tailwind klase za boju (text-yellow-200, text-blue-300...)
        i 'animate-float-slow' za lagano lebdenje.
      */}
            <circle
                cx='15%'
                cy='20%'
                r='40'
                className='text-yellow-200 animate-float-slow'
                style={{ animationDelay: "0s" }}
                fill='currentColor'
                fillOpacity='0.5'
            />
            <circle
                cx='80%'
                cy='30%'
                r='50'
                className='text-blue-300 animate-float-slow'
                style={{ animationDelay: "2s" }}
                fill='currentColor'
                fillOpacity='0.4'
            />
            <circle
                cx='50%'
                cy='50%'
                r='30'
                className='text-green-200 animate-float-slow'
                style={{ animationDelay: "1s" }}
                fill='currentColor'
                fillOpacity='0.5'
            />
            <circle
                cx='20%'
                cy='75%'
                r='45'
                className='text-yellow-100 animate-float-slow'
                style={{ animationDelay: "4s" }}
                fill='currentColor'
                fillOpacity='0.6'
            />
            <circle
                cx='75%'
                cy='80%'
                r='35'
                className='text-blue-200 animate-float-slow'
                style={{ animationDelay: "3s" }}
                fill='currentColor'
                fillOpacity='0.5'
            />
        </g>
    </svg>
);

/**
 * EXPRESSIONIST OVERLAY
 * Stvara osjećaj "tjeskobe" koristeći oštre, tamne, geometrijske 'krhotine'.
 */
export const ExpressionistOverlay: React.FC = () => (
    <svg
        className='absolute top-0 left-0 w-full h-full z-0 opacity-[0.08] pointer-events-none mix-blend-overlay'
        xmlns='http://www.w3.org/2000/svg'
        preserveAspectRatio='xMidYMid slice'
        viewBox='0 0 100 100'>
        <path d='M0 0 L 40 0 L 10 50 Z' fill='#FF0000' />
        <path d='M100 0 L 70 0 L 90 40 Z' fill='#000000' />
        <path d='M0 100 L 40 100 L 10 50 Z' fill='#000000' />
        <path d='M100 100 L 70 100 L 90 60 Z' fill='#FF0000' />
        <path d='M 50 50 L 40 100 L 60 100 Z' fill='#000000' />
        <path d='M 50 50 L 40 0 L 60 0 Z' fill='#FF0000' />
    </svg>
);
