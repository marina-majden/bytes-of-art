import { useRef } from "react";
import HeroSynesthesia from "~/pages/colors/HeroSynesthesia";
import ColorTheoryLab from "~/pages/colors/ColorTheoryLab";
import KandinskyTranslator from "~/pages/colors/KandinskyTranslator";
import BookCoverCreator from "~/pages/colors/BookCoverCreator";
import ColorCatalogue from "~/pages/colors/ColorCatalogue";

export default function ColorsLesson() {
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

            {/* 5. MODUL D: KATALOG */}
            <ColorCatalogue />
        </main>
    );
}
