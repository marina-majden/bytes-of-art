import { useRef } from "react";
import HeroSynesthesia from "~/pages/synesthesia/HeroSynesthesia";
import ColorTheoryLab from "~/pages/synesthesia/ColorTheoryLab";
import KandinskyTranslator from "~/pages/synesthesia/KandinskyTranslator";
import BookCoverCreator from "~/pages/synesthesia/BookCoverCreator";

export default function SynesthesiaLesson() {
    const theoryRef = useRef<HTMLDivElement>(null);

    const scrollToStart = () => {
        theoryRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <main className='bg-white min-h-screen font-sans selection:bg-yellow-200 selection:text-black'>
            {/* 1. HERO */}
            <HeroSynesthesia onStart={scrollToStart} />

            {/* 2. MODUL A: TEORIJA */}
            <div ref={theoryRef}>
                <ColorTheoryLab />
            </div>

            {/* 3. MODUL B: PREVODITELJ */}
            <KandinskyTranslator />

            {/* 4. MODUL C: DIZAJN */}
            <BookCoverCreator />
        </main>
    );
}
