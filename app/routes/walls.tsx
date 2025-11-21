import React, { useRef } from "react";
import HeroSection from "~/components/walls/HeroSection";
import StreetArtGallery from "~/components/walls/StreetArtGallery";
import InstaPoetry from "~/components/walls/InstaPoetry";
import CreativeStudio from "~/components/walls/CreativeStudio";

export default function WallsLesson() {
    // Refs za glatko skrolanje između modula
    const galleryRef = useRef<HTMLDivElement>(null);
    const networkRef = useRef<HTMLDivElement>(null);
    const studioRef = useRef<HTMLDivElement>(null);

    const scrollToSection = (
        ref:
            | React.RefObject<HTMLDivElement>
            | React.MutableRefObject<HTMLDivElement | null>
    ) => {
        ref.current?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <main className='bg-white min-h-screen selection:bg-black selection:text-white'>
            {/* 1. HERO: Uvod */}
            <HeroSection onStart={() => scrollToSection(galleryRef)} />

            {/* 2. MODUL A: ULICA (Galerija) */}
            <div ref={galleryRef}>
                <StreetArtGallery onNext={() => scrollToSection(networkRef)} />
            </div>

            {/* 3. MODUL B: MREŽA (Dekonstrukcija) */}
            <div ref={networkRef}>
                <InstaPoetry />
            </div>

            {/* 4. MODUL C: KREATIVNI STUDIO & GALERIJA */}
            <div ref={studioRef}>
                <CreativeStudio />
            </div>
        </main>
    );
}
