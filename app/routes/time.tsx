import React, { useState } from "react";
import InteractiveImage from "~/components/InteractiveImage";
import ImageViewer from "~/components/ImageViewer";

// Tipovi za naše narativne izbore
type Genre = "noir" | "romance" | "drama";
type Relationship = "strangers" | "secret_lovers" | "partners_in_crime";
type Conflict = "escape" | "waiting" | "breakup";

interface StoryState {
    genre: Genre | null;
    relationship: Relationship | null;
    conflict: Conflict | null;
    ending: string;
}

const TimeSlide: React.FC = () => {
    const [timePhase, setTimePhase] = useState(0); // -1, 0, 1

    // Stanje priče koje učenik gradi
    const [story, setStory] = useState<StoryState>({
        genre: null,
        relationship: null,
        conflict: null,
        ending: "",
    });

    // Pomoćna funkcija za odabir
    const handleSelect = (key: keyof StoryState, value: any) => {
        setStory((prev) => ({ ...prev, [key]: value }));
    };

    return (
        <div className='w-full max-w-5xl mx-auto bg-gray-900 p-6 md:p-8 rounded-xl shadow-2xl border border-gray-700 text-gray-100 transition-all duration-500'>
            {/* HEADER: Mijenja se ovisno o fazi */}
            <div className='text-center mb-8'>
                <h2 className='text-3xl font-bold text-amber-500 mb-2 font-display tracking-wider'>
                    {timePhase === -1 && "FAZA 1: REKONSTRUKCIJA PROŠLOSTI"}
                    {timePhase === 0 && "FAZA 2: ZAMRZNUTI TRENUTAK"}
                    {timePhase === 1 && "FAZA 3: PROJEKCIJA BUDUĆNOSTI"}
                </h2>
                <p className='text-lg text-gray-400'>
                    {timePhase === -1 &&
                        "Kao redatelj, odredite kontekst scene prije nego se kamera upalila."}
                    {timePhase === 0 &&
                        "Analizirajte govor tijela i svjetlo. Kako oni potvrđuju vaše odabire?"}
                    {timePhase === 1 &&
                        "Na temelju vaših odabira, napišite rasplet scene."}
                </p>
            </div>

            {/* MAIN CONTENT AREA */}
            <div className='relative min-h-[450px] bg-black/40 rounded-lg border border-gray-600 mb-8 overflow-hidden'>
                {/* --- FAZA -1: PROŠLOST (Interaktivni upitnik) --- */}
                <div
                    className={`absolute inset-0 p-8 flex flex-col justify-center transition-all duration-700 ${timePhase === -1 ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-full pointer-events-none"}`}>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                        {/* 1. Žanr */}
                        <div className='space-y-3'>
                            <h3 className='text-xl font-bold text-blue-400'>
                                1. Atmosfera (Žanr)
                            </h3>
                            <div className='flex flex-col gap-2'>
                                {[
                                    {
                                        id: "noir",
                                        label: "Film Noir (Kriminal, Tjeskoba)",
                                    },
                                    {
                                        id: "romance",
                                        label: "Melankolična Romansa",
                                    },
                                    {
                                        id: "drama",
                                        label: "Egzistencijalna Drama",
                                    },
                                ].map((opt) => (
                                    <button
                                        key={opt.id}
                                        onClick={() =>
                                            handleSelect("genre", opt.id)
                                        }
                                        className={`p-3 text-left rounded-md border transition-all ${story.genre === opt.id ? "bg-blue-900/50 border-blue-400 text-white" : "border-gray-600 hover:bg-gray-800 text-gray-400"}`}>
                                        {opt.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* 2. Odnosi */}
                        <div className='space-y-3'>
                            <h3 className='text-xl font-bold text-teal-400'>
                                2. Odnos Likova
                            </h3>
                            <div className='flex flex-col gap-2'>
                                {[
                                    {
                                        id: "strangers",
                                        label: "Potpuni stranci u noći",
                                    },
                                    {
                                        id: "secret_lovers",
                                        label: "Tajni ljubavnici",
                                    },
                                    {
                                        id: "partners_in_crime",
                                        label: "Suučesnici nakon zločina",
                                    },
                                ].map((opt) => (
                                    <button
                                        key={opt.id}
                                        onClick={() =>
                                            handleSelect("relationship", opt.id)
                                        }
                                        className={`p-3 text-left rounded-md border transition-all ${story.relationship === opt.id ? "bg-teal-900/50 border-teal-400 text-white" : "border-gray-600 hover:bg-gray-800 text-gray-400"}`}>
                                        {opt.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* 3. Sukob */}
                        <div className='space-y-3'>
                            <h3 className='text-xl font-bold text-red-400'>
                                3. Uzrok (Što se dogodilo?)
                            </h3>
                            <div className='flex flex-col gap-2'>
                                {[
                                    {
                                        id: "escape",
                                        label: "Bježe od nečega (ili nekoga)",
                                    },
                                    {
                                        id: "waiting",
                                        label: "Čekaju vijesti koje će im promijeniti život",
                                    },
                                    {
                                        id: "breakup",
                                        label: "Upravo su izrekli teške riječi",
                                    },
                                ].map((opt) => (
                                    <button
                                        key={opt.id}
                                        onClick={() =>
                                            handleSelect("conflict", opt.id)
                                        }
                                        className={`p-3 text-left rounded-md border transition-all ${story.conflict === opt.id ? "bg-red-900/50 border-red-400 text-white" : "border-gray-600 hover:bg-gray-800 text-gray-400"}`}>
                                        {opt.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- FAZA 0: SADAŠNJOST (Slika) --- */}
                <div
                    className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ${timePhase === 0 ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}>
                    <InteractiveImage
                        src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Nighthawks_by_Edward_Hopper_1942.jpg/1200px-Nighthawks_by_Edward_Hopper_1942.jpg'
                        alt='Nighthawks'
                        className='max-w-full max-h-full object-contain shadow-2xl'
                    />
                    {/* Ovdje bi mogli dodati i overlay s pitanjem: "Odabrali ste [ODNOS]. Vidite li to u njihovim rukama?" */}
                </div>

                {/* --- FAZA 1: BUDUĆNOST (Kreativno pisanje na temelju odabira) --- */}
                <div
                    className={`absolute inset-0 p-8 flex flex-col items-center justify-center transition-all duration-700 ${timePhase === 1 ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full pointer-events-none"}`}>
                    <div className='w-full max-w-2xl bg-gray-800 p-6 rounded-lg border border-gray-600'>
                        <h3 className='text-xl font-bold text-amber-400 mb-4'>
                            Vaš Scenarij: Finale
                        </h3>

                        <div className='text-lg text-gray-300 leading-relaxed space-y-2'>
                            <p>
                                <span className='text-gray-500 uppercase text-sm font-bold tracking-widest'>
                                    Scena:
                                </span>{" "}
                                PHILLIES BAR - NOĆ
                            </p>
                            <p>
                                <span className='text-gray-500 uppercase text-sm font-bold tracking-widest'>
                                    Likovi:
                                </span>{" "}
                                Muškarac i Žena.
                                {story.relationship === "strangers" &&
                                    " Ne poznaju se, ali ih veže ista samoća."}
                                {story.relationship === "secret_lovers" &&
                                    " Ljubavnici koji se moraju skrivati."}
                                {story.relationship === "partners_in_crime" &&
                                    " Partneri koji su upravo počinili nešto nepovratno."}
                            </p>
                            <p>
                                <span className='text-gray-500 uppercase text-sm font-bold tracking-widest'>
                                    Akcija:
                                </span>{" "}
                                Sjede u tišini jer
                                {story.conflict === "escape" &&
                                    " osluškuju sirene u daljini."}
                                {story.conflict === "waiting" &&
                                    " se boje onoga što dolazi."}
                                {story.conflict === "breakup" &&
                                    " više nema riječi koje bi popravile stvar."}
                            </p>

                            <div className='mt-6 pt-6 border-t border-gray-600'>
                                <label className='block text-sm font-bold text-white mb-2'>
                                    ŠTO SE DOGAĐA SLJEDEĆE? (Dopunite scenu)
                                </label>
                                <textarea
                                    value={story.ending}
                                    onChange={(e) =>
                                        handleSelect("ending", e.target.value)
                                    }
                                    className='w-full h-32 bg-black/30 border border-gray-500 rounded p-3 text-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all resize-none'
                                    placeholder='Napišite završne retke... Tko ustaje? Tko progovara? Gasi li se svjetlo?'
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* SLIDER CONTROL (Timeline) */}
            <div className='relative px-8 pb-4'>
                {/* Custom styled range input */}
                <input
                    type='range'
                    min='-1'
                    max='1'
                    step='1'
                    value={timePhase}
                    onChange={(e) => setTimePhase(parseInt(e.target.value))}
                    className='w-full h-3 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-amber-500 hover:accent-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50'
                />

                {/* Oznake ispod slidera */}
                <div className='flex justify-between mt-4 text-sm font-mono uppercase tracking-widest text-gray-400'>
                    <button
                        onClick={() => setTimePhase(-1)}
                        className={`hover:text-white transition-colors ${timePhase === -1 ? "text-amber-500 font-bold" : ""}`}>
                        I. Uzrok (Prije)
                    </button>
                    <button
                        onClick={() => setTimePhase(0)}
                        className={`hover:text-white transition-colors ${timePhase === 0 ? "text-amber-500 font-bold" : ""}`}>
                        II. Slika (Sada)
                    </button>
                    <button
                        onClick={() => setTimePhase(1)}
                        className={`hover:text-white transition-colors ${timePhase === 1 ? "text-amber-500 font-bold" : ""}`}>
                        III. Posljedica (Poslije)
                    </button>
                </div>
            </div>
        </div>
    );
};

interface StoryPhase {
    title: string;
    prompt: string;
    content?: React.ReactNode;
}

const TimeSlider: React.FC = () => {
    const [timePhase, setTimePhase] = useState(0);

    // Podaci za analizu slike (Hopper)
    const nighthawksAnalysisPoints = [
        {
            x: "left-[48%]",
            y: "top-[62%]",
            description:
                "Ruke: Zašto se ne dodiruju, iako su blizu? Je li to slučajnost ili znak emocionalne udaljenosti?",
        },
        {
            x: "left-[85%]",
            y: "top-[50%]",
            description:
                'Vrata: Gdje je izlaz? Hopper često skriva izlaze, stvarajući klaustrofobični osjećaj "akvarija".',
        },
        {
            x: "left-[25%]",
            y: "top-[35%]",
            description:
                "Atmosfera: Je li ovo početak ili kraj noći? Jesu li tek stigli ili nemaju kamo drugdje otići?",
        },
    ];

    const phases: Record<number, StoryPhase> = {
        [-1]: {
            title: "PRIJE (Uzrok)",
            prompt: "Vratite film 10 minuta unatrag. Gdje su ovi ljudi bili? Zašto su ušli u ovaj bar? Kakva je tišina vladala prije nego su naručili piće?",
        },
        0: {
            title: "SADA (Zamrznuti trenutak)",
            prompt: "Istražite sliku. Kliknite na označene točke kako biste otkrili ključna pitanja koja slika postavlja.",
        },
        1: {
            title: "POSLIJE (Posljedica)",
            prompt: "Pustite film naprijed. Tko će prvi progovoriti? Tko će prvi otići? Hoće li se nešto promijeniti ili će se vratiti u istu rutinu?",
        },
    };

    const currentPhase = phases[timePhase];

    return (
        <div className='w-full max-w-5xl mx-auto bg-gray-900 p-6 md:p-8 rounded-xl shadow-2xl border border-gray-700 text-gray-100'>
            {/* Header */}
            <div className='text-center mb-8'>
                <h2 className='text-3xl font-bold text-amber-500 mb-2 font-display tracking-wider'>
                    {currentPhase.title}
                </h2>
                <p className='text-lg text-gray-300 italic font-serif'>
                    {currentPhase.prompt}
                </p>
            </div>

            {/* Main Content Area */}
            <div className='min-h-[500px] bg-black/50 rounded-lg border border-gray-600 mb-8 flex items-center justify-center relative overflow-hidden'>
                {/* --- FAZA 0: SADAŠNJOST (Interaktivna Slika) --- */}
                <div
                    className={`absolute w-full h-full transition-all duration-700 ease-in-out flex items-center justify-center p-4
          ${timePhase === 0 ? "opacity-100 scale-100 z-10" : "opacity-0 scale-95 pointer-events-none z-0"}`}>
                    {/* Ovdje koristimo ImageViewer umjesto obične slike */}
                    <div className='w-full max-w-4xl'>
                        <ImageViewer
                            imageSrc='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Nighthawks_by_Edward_Hopper_1942.jpg/1200px-Nighthawks_by_Edward_Hopper_1942.jpg'
                            artist='Edward Hopper: Nighthawks (1942.)'
                            analysisPoints={nighthawksAnalysisPoints}
                        />
                    </div>
                </div>

                {/* --- FAZA -1 i 1: INPUT ZA PISANJE --- */}
                <div
                    className={`absolute w-full h-full p-8 transition-all duration-700 ease-in-out
          ${timePhase !== 0 ? "opacity-100 translate-x-0 z-10" : "opacity-0 translate-x-full pointer-events-none z-0"}`}>
                    <textarea
                        className='w-full h-full bg-transparent border-2 border-dashed border-gray-500 rounded-lg p-6 text-xl font-serif text-white placeholder-gray-600 focus:outline-none focus:border-amber-500 transition-colors resize-none leading-relaxed'
                        placeholder={
                            timePhase === -1
                                ? "Opišite scenu koja je prethodila ovom trenutku... (Tko su oni? Odakle dolaze?)"
                                : "Napišite rasplet... (Tko odlazi prvi? Što se događa s parom?)"
                        }
                    />
                </div>
            </div>

            {/* Slider Control */}
            <div className='relative px-8 pb-2'>
                <input
                    type='range'
                    min='-1'
                    max='1'
                    step='1'
                    value={timePhase}
                    onChange={(e) => setTimePhase(parseInt(e.target.value))}
                    className='w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-amber-500 hover:accent-amber-400'
                />
                <div className='flex justify-between mt-4 text-xs font-mono uppercase tracking-widest text-gray-500'>
                    <button
                        onClick={() => setTimePhase(-1)}
                        className={`hover:text-white transition-colors ${timePhase === -1 ? "text-amber-500 font-bold" : ""}`}>
                        I. Uzrok (Prije)
                    </button>
                    <button
                        onClick={() => setTimePhase(0)}
                        className={`hover:text-white transition-colors ${timePhase === 0 ? "text-amber-500 font-bold" : ""}`}>
                        II. Slika (Sada)
                    </button>
                    <button
                        onClick={() => setTimePhase(1)}
                        className={`hover:text-white transition-colors ${timePhase === 1 ? "text-amber-500 font-bold" : ""}`}>
                        III. Posljedica (Poslije)
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TimeSlider;
