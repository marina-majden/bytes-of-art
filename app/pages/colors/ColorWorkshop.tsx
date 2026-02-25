import React, { useState, useMemo } from "react";
import {
    Feather,
    Sparkles,
    Edit3,
    Palette,
    Save,
    ArrowRight,
    Paintbrush,
    X,
} from "lucide-react";

// Baza umjetničkih djela s njihovim dominantnim paletama
const artworks = [
    {
        id: "krik",
        title: "Krik",
        artist: "Edvard Munch",
        year: "1893.",
        description:
            'Munch koristi agresivne, neprirodne boje kako bi prenio osjećaj egzistencijalne tjeskobe. "Nebo je postalo krvavo crveno", zapisao je u svom dnevniku.',
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Edvard_Munch%2C_1893%2C_The_Scream%2C_oil%2C_tempera_and_pastel_on_cardboard%2C_91_x_73_cm%2C_National_Gallery_of_Norway.jpg/800px-Edvard_Munch%2C_1893%2C_The_Scream%2C_oil%2C_tempera_and_pastel_on_cardboard%2C_91_x_73_cm%2C_National_Gallery_of_Norway.jpg",
        palette: [
            { hex: "#8B2318", name: "Krvavo crvena" },
            { hex: "#D97136", name: "Zagasita narančasta" },
            { hex: "#1C2938", name: "Tjeskobna modra" },
            { hex: "#7C8074", name: "Bolesna siva" },
        ],
    },
    {
        id: "zvjezdana",
        title: "Zvjezdana noć",
        artist: "Vincent van Gogh",
        year: "1889.",
        description:
            "Van Gogh koristi komplementarni kontrast žute i plave. Boje su nanesene pastozno (impasto), a plava ovdje nije smirujuća, već dinamična i turbulentna.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/800px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg",
        palette: [
            { hex: "#1B325F", name: "Duboka noćna" },
            { hex: "#4A71B1", name: "Nebesko plava" },
            { hex: "#E7C841", name: "Žuta svjetlost" },
            { hex: "#F1F1E6", name: "Mjesečeva bijela" },
        ],
    },
    {
        id: "poljubac",
        title: "Poljubac",
        artist: "Gustav Klimt",
        year: "1907.-1908.",
        description:
            'Vrhunac Klimtove "zlatne faze". Korištenje pravih listića zlata stvara transcendentalnu, gotovo sakralnu atmosferu, dok biljni motivi unose zelene i crvene naglaske.',
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/The_Kiss_-_Gustav_Klimt_-_Google_Cultural_Institute.jpg/800px-The_Kiss_-_Gustav_Klimt_-_Google_Cultural_Institute.jpg",
        palette: [
            { hex: "#D4AF37", name: "Apsolutno zlato" },
            { hex: "#524A32", name: "Brončana sjena" },
            { hex: "#6B8E23", name: "Maslinasto zelena" },
            { hex: "#800020", name: "Tamno crvena" },
        ],
    },
];

// Prošireni rječnik boja i osjeta
const colorDictionary = [
    {
        words: ["crven", "crvena", "crveno", "crveni", "krvav", "rumen"],
        color: "#ef4444",
    },
    {
        words: ["plav", "plava", "plavo", "plavi", "modar", "modro", "modra"],
        color: "#3b82f6",
    },
    {
        words: [
            "žut",
            "žuta",
            "žuto",
            "žuti",
            "zlatna",
            "zlato",
            "zlatni",
            "sjaj",
        ],
        color: "#eab308",
    },
    {
        words: ["zelen", "zelena", "zeleno", "zeleni", "maslinast", "smaragd"],
        color: "#22c55e",
    },
    {
        words: ["crn", "crna", "crno", "crni", "tamno", "tama", "mrak"],
        color: "#1e293b",
    },
    {
        words: ["bijel", "bijela", "bijelo", "bijeli", "blijedo", "svjetlost"],
        color: "#f8fafc",
    },
    {
        words: ["siv", "siva", "sivo", "sivi", "olovno", "pepeo"],
        color: "#64748b",
    },
    {
        words: ["srebrn", "srebrna", "metal", "metalni", "čelik"],
        color: "#cbd5e1",
    },
    { words: ["narančast", "narančasta", "narančasto"], color: "#f97316" },
    { words: ["ljubičast", "ljubičasta", "purpur"], color: "#a855f7" },
    // Apstraktni osjeti koji vraćaju paletu iz koje će se nasumično odabrati boja
    {
        words: ["toplo", "topl", "vrel", "vatra", "sunce", "gori"],
        color: ["#ef4444", "#f97316", "#eab308", "#dc2626"],
    },
    {
        words: ["hladno", "hladn", "leden", "zima", "mraz", "led"],
        color: ["#3b82f6", "#0ea5e9", "#06b6d4", "#e0f2fe"],
    },
];

// Deterministička funkcija za nasumične brojeve (kako oblici ne bi skakali dok tipkamo)
const seededRandom = (seed: number) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
};

const ColorWorkshop = () => {
    const [selectedArt, setSelectedArt] = useState(artworks[0]);
    const [poemText, setPoemText] = useState(
        "Krvavo nebo vrišti nad hladnim, mračnim morem.\nZlatni sjaj probija metalni olovni zrak,\ndok topla vatra gori u plavoj noći.",
    );
    const [isSaved, setIsSaved] = useState(false);

    // Generiranje oblika na temelju teksta i odabranog stila
    const generatedShapes = useMemo(() => {
        const tokens = poemText.split(/(\s+|\n)/);
        const shapes: any[] = [];
        let matchCount = 0;

        tokens.forEach((token) => {
            const cleanToken = token.toLowerCase().replace(/[^a-žčćđšž]/gi, "");
            if (!cleanToken) return;

            let matchedColor = null;
            for (const dict of colorDictionary) {
                if (dict.words.some((w) => cleanToken.includes(w))) {
                    matchedColor = dict.color;
                    break;
                }
            }

            if (matchedColor) {
                matchCount++;
                const seed = matchCount; // Fiksno sjeme za ovu riječ

                // Ako je boja niz (toplo/hladno), odaberi jednu na temelju sjemena
                const finalColor = Array.isArray(matchedColor)
                    ? matchedColor[
                          Math.floor(seededRandom(seed) * matchedColor.length)
                      ]
                    : matchedColor;

                // --- STILIZACIJA OVISNO O UMJETNIKU ---

                if (selectedArt.id === "poljubac") {
                    // KLIMT: Mekani krugovi, kvadratići, transparentno, mjestimice zlatni okviri
                    const isCircle = seededRandom(seed + 1) > 0.4;
                    const size = seededRandom(seed + 2) * 80 + 20;
                    shapes.push({
                        id: `shape-${matchCount}`,
                        left: `${seededRandom(seed + 3) * 90}%`,
                        top: `${seededRandom(seed + 4) * 90}%`,
                        width: `${size}px`,
                        height: `${size}px`,
                        backgroundColor: finalColor,
                        borderRadius: isCircle ? "50%" : "10%",
                        opacity: 0.6,
                        border:
                            seededRandom(seed + 5) > 0.7
                                ? "2px solid #D4AF37"
                                : "none",
                        transform: `rotate(${seededRandom(seed + 6) * 90}deg)`,
                        mixBlendMode: "screen",
                        transition: "all 0.5s ease",
                    });
                } else if (selectedArt.id === "krik") {
                    // MUNCH: Oštri, dugački valoviti oblici, snažan kontrast, oštri rubovi
                    const width = seededRandom(seed + 1) * 200 + 50;
                    const height = seededRandom(seed + 2) * 30 + 10;
                    shapes.push({
                        id: `shape-${matchCount}`,
                        left: `${seededRandom(seed + 3) * 80}%`,
                        top: `${seededRandom(seed + 4) * 80}%`,
                        width: `${width}px`,
                        height: `${height}px`,
                        backgroundColor: finalColor,
                        // Stvara oštar, organički "listasti" ili valoviti oblik
                        borderRadius:
                            seededRandom(seed + 5) > 0.5
                                ? "50% 0 50% 0"
                                : "0 100% 0 100%",
                        opacity: 0.85,
                        transform: `rotate(${seededRandom(seed + 6) * 60 - 30}deg)`, // Blago nakošeno
                        boxShadow: "0 4px 15px rgba(0,0,0,0.5)",
                        transition: "all 0.5s ease",
                    });
                } else if (selectedArt.id === "zvjezdana") {
                    // VAN GOGH: Crtkani potezi kistom. Za svaku riječ stvara 3-4 sitna poteza.
                    const strokes = Math.floor(seededRandom(seed) * 3) + 2;
                    for (let i = 0; i < strokes; i++) {
                        const subSeed = seed + i * 10;
                        shapes.push({
                            id: `shape-${matchCount}-${i}`,
                            left: `${seededRandom(subSeed + 1) * 90}%`,
                            top: `${seededRandom(subSeed + 2) * 90}%`,
                            width: `${seededRandom(subSeed + 3) * 40 + 15}px`,
                            height: `${seededRandom(subSeed + 4) * 8 + 4}px`,
                            backgroundColor: finalColor,
                            borderRadius: "40%",
                            opacity: 0.9,
                            transform: `rotate(${seededRandom(subSeed + 5) * 360}deg)`,
                            boxShadow: `0 0 8px ${finalColor}80`,
                            transition: "all 0.5s ease",
                        });
                    }
                }
            }
        });

        return shapes;
    }, [poemText, selectedArt]);

    const handleSave = () => {
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 3000);
    };

    return (
        <div className='min-h-screen bg-slate-950 text-slate-200 font-sans p-4 md:p-8 selection:bg-purple-500/30 selection:text-purple-200'>
            {/* Header */}
            <header className='max-w-6xl mx-auto mb-12 text-center animate-in fade-in slide-in-from-top-4 duration-700'>
                <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 border border-slate-700 text-sm font-medium mb-4 text-purple-400'>
                    <Paintbrush size={16} />
                    Generativna Ekfraza
                </div>
                <h1 className='text-4xl md:text-5xl font-black mb-4'>
                    Pjesnička radionica
                </h1>
                <p className='text-slate-400 max-w-2xl mx-auto'>
                    Riječi imaju oblik, težinu i boju. Upišite svoju pjesmu
                    ovisno o atmosferi odabranog djela. Pridjevi, osjeti
                    (toplo/hladno) i boje koje zapišete pretvorit će se u
                    apstraktno platno.
                </p>
            </header>

            {/* Navigacija umjetnina */}
            <div className='max-w-6xl mx-auto mb-12 grid grid-cols-1 md:grid-cols-3 gap-4'>
                {artworks.map((art) => (
                    <button
                        key={art.id}
                        onClick={() => setSelectedArt(art)}
                        className={`flex items-center gap-4 p-3 rounded-xl transition-all duration-300 border ${selectedArt.id === art.id ? "bg-slate-800 border-purple-500 shadow-lg shadow-purple-500/20" : "bg-slate-900/50 border-slate-800 hover:bg-slate-800 hover:border-slate-600"}`}>
                        <img
                            src={art.image}
                            alt={art.title}
                            className='w-12 h-12 rounded object-cover'
                        />
                        <div className='text-left'>
                            <h3 className='font-bold text-slate-200'>
                                {art.title}
                            </h3>
                            <p className='text-xs text-slate-400'>
                                {art.artist}
                            </p>
                        </div>
                    </button>
                ))}
            </div>

            {/* Main Workspace Layout */}
            <div className='max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8'>
                {/* Lijeva kolona: Slika i Analiza */}
                <div className='lg:col-span-5 space-y-6'>
                    <div className='bg-slate-900 p-4 rounded-2xl border border-slate-800 shadow-2xl relative group'>
                        <div className='absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-slate-700 rounded-b-lg'></div>

                        <img
                            src={selectedArt.image}
                            alt={selectedArt.title}
                            className='w-full h-auto max-h-[400px] object-cover rounded-xl mt-2 mb-4'
                        />

                        <div>
                            <h2 className='text-2xl font-black text-white flex justify-between items-end'>
                                {selectedArt.title}
                                <span className='text-sm font-normal text-slate-400'>
                                    {selectedArt.year}
                                </span>
                            </h2>
                            <p className='text-purple-400 font-medium mb-3'>
                                {selectedArt.artist}
                            </p>
                            <p className='text-sm text-slate-400 leading-relaxed italic'>
                                {selectedArt.description}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Desna kolona: Generativno Platno i Editor */}
                <div className='lg:col-span-7 flex flex-col gap-6'>
                    {/* Live Preview (Generativno platno) */}
                    <div className='bg-slate-900 rounded-2xl border border-slate-700 h-[350px] shadow-xl relative overflow-hidden flex-grow flex flex-col'>
                        <div className='absolute top-0 left-0 w-full p-4 bg-gradient-to-b from-slate-950/80 to-transparent z-10 flex justify-between items-start pointer-events-none'>
                            <h3 className='text-sm font-bold uppercase tracking-widest text-purple-400 flex items-center gap-2'>
                                <Sparkles size={16} /> Tvoja vizija (
                                {generatedShapes.length} poteza)
                            </h3>
                        </div>

                        {/* Ovdje iscrtavamo oblike */}
                        <div className='relative w-full h-full overflow-hidden bg-slate-950'>
                            {/* Pozadinska tekstura */}
                            <div className='absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-800 via-slate-950 to-slate-950'></div>

                            {generatedShapes.map((shape) => (
                                <div
                                    key={shape.id}
                                    className='absolute animate-in zoom-in duration-500'
                                    style={{
                                        left: shape.left,
                                        top: shape.top,
                                        width: shape.width,
                                        height: shape.height,
                                        backgroundColor: shape.backgroundColor,
                                        borderRadius: shape.borderRadius,
                                        opacity: shape.opacity,
                                        border: shape.border,
                                        transform: shape.transform,
                                        boxShadow: shape.boxShadow,
                                        mixBlendMode: shape.mixBlendMode,
                                        transition: shape.transition,
                                    }}
                                />
                            ))}

                            {generatedShapes.length === 0 && (
                                <div className='absolute inset-0 flex items-center justify-center text-slate-600 italic'>
                                    Počnite pisati kako bi se platno oslikalo...
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Text Editor */}
                    <div className='bg-slate-900 rounded-2xl border border-slate-700 overflow-hidden focus-within:border-purple-500 focus-within:ring-1 focus-within:ring-purple-500 transition-all'>
                        <div className='bg-slate-800/50 px-4 py-3 border-b border-slate-700 flex justify-between items-center'>
                            <span className='text-sm font-medium text-slate-400 flex items-center gap-2'>
                                <Edit3 size={16} /> Stihovi
                            </span>
                            <span className='text-xs text-slate-500 bg-slate-900 px-2 py-1 rounded'>
                                Prepoznaje: boje, 'toplo', 'hladno',
                                'metalni'...
                            </span>
                        </div>
                        <textarea
                            value={poemText}
                            onChange={(e) => setPoemText(e.target.value)}
                            placeholder='Napiši svoju pjesmu ovdje...'
                            className='w-full h-40 bg-transparent text-slate-300 p-4 outline-none resize-y custom-scrollbar font-serif text-lg leading-relaxed placeholder:text-slate-700'
                            spellCheck='false'
                        />
                    </div>

                    {/* Action Buttons */}
                    <div className='flex justify-end gap-4'>
                        <button
                            onClick={() => setPoemText("")}
                            className='px-6 py-3 rounded-xl font-bold text-slate-400 hover:text-white transition-colors'>
                            Očisti platno
                        </button>
                        <button
                            onClick={handleSave}
                            className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-white transition-all duration-300 transform active:scale-95 ${isSaved ? "bg-green-500 shadow-[0_0_20px_rgba(34,197,94,0.4)]" : "bg-purple-600 hover:bg-purple-500 shadow-lg"}`}>
                            {isSaved ? (
                                <>Generirano!</>
                            ) : (
                                <>
                                    <Save size={20} /> Spremi umjetničko djelo
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ColorWorkshop;
