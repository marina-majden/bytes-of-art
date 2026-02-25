import React, { useState, useEffect } from "react";
import {
    Sparkles,
    Skull,
    Crown,
    Microscope,
    Palette,
    ArrowRight,
    X,
    Info,
    Image as ImageIcon,
    Plus,
    MessageSquare,
    Loader2,
} from "lucide-react";

const apiKey = ""; // API ključ će biti automatski dodijeljen u runtime okruženju

// Baza podataka neobičnih boja (inicijalno stanje)
const initialColorCatalog = [
    {
        id: "tirski",
        name: "Tirski purpur",
        hex: "#66023C",
        category: "Statusna",
        era: "Antika",
        iconName: "Crown",
        subtitle: "Boja rimskih careva",
        description:
            "Jedna od najskupljih boja u povijesti. Ekstrahirala se iz sluzi morskih puževa (volaka) na obalama Fenicije (današnji Libanon). Za samo jedan gram pigmenta bilo je potrebno smrviti i ostaviti na suncu do 10.000 puževa, što je stvaralo nesnosan smrad.",
        funFact:
            "U Rimu je bilo zakonom zabranjeno (pod prijetnjom smrću) da itko osim cara nosi plašt potpuno obojen u tirski purpur.",
        artworks: [
            {
                title: "Car Justinijan i njegova pratnja",
                artist: "Bizantski mozaik (San Vitale)",
                year: "oko 547.",
                image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/San_Vitale_Mosaic_Justinian.jpg/800px-San_Vitale_Mosaic_Justinian.jpg",
            },
        ],
    },
    {
        id: "ultramarin",
        name: "Pravi Ultramarin",
        hex: "#120A8F",
        category: "Umjetnička",
        era: "Srednji vijek",
        iconName: "Palette",
        subtitle: "Skuplji od zlata",
        description:
            'Pigment dobiven mljevenjem poludragog kamena lapis lazulija koji se kopao isključivo u planinama sjeveroistočnog Afganistana. Zbog nevjerojatne cijene i dugog puta ("ultra marine" = preko mora), naručitelji su umjetnicima kupovali pigment na grame.',
        funFact:
            "Crkva je odredila da se ovaj najdragocjeniji pigment smije koristiti isključivo za slikanje plašta Djevice Marije.",
        artworks: [
            {
                title: "Djevica u molitvi",
                artist: "Sassoferrato",
                year: "1640-1650.",
                image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Sassoferrato_-_The_Virgin_in_Prayer_-_WGA20888.jpg/800px-Sassoferrato_-_The_Virgin_in_Prayer_-_WGA20888.jpg",
            },
            {
                title: "Djevojka s bisernom naušnicom",
                artist: "Johannes Vermeer",
                year: "1665.",
                image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/1665_Girl_with_a_Pearl_Earring.jpg/800px-1665_Girl_with_a_Pearl_Earring.jpg",
            },
        ],
    },
    {
        id: "mumija",
        name: "Mumija smeđa (Caput Mortuum)",
        hex: "#8F4B28",
        category: "Bizarna",
        era: "16. - 19. st.",
        iconName: "Skull",
        subtitle: "Slikanje mrtvima",
        description:
            "Boja s bogatom, toplom nijansom koja se masovno koristila u europskom slikarstvu (posebno kod Prerafaelita). Problem? Doslovno se proizvodila mljevenjem pravih, drevnih egipatskih mumija pomiješanih sa smolom i mirtom.",
        funFact:
            'Kada je slikar Edward Burne-Jones saznao od čega se boja zapravo radi, svečano je pokopao svoju tubu "Mumija smeđe" u vrtu.',
        artworks: [
            {
                title: "Unutrašnjost kuhinje",
                artist: "Martin Drolling",
                year: "1815.",
                image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Martin_Dr%C3%B6lling_-_Interior_of_a_Kitchen_-_WGA6689.jpg/800px-Martin_Dr%C3%B6lling_-_Interior_of_a_Kitchen_-_WGA6689.jpg",
            },
        ],
    },
    {
        id: "scheele",
        name: "Scheeleova zelena",
        hex: "#4C9A2A",
        category: "Otrovna",
        era: "18. stoljeće",
        iconName: "Skull",
        subtitle: "Smrtonosna moda",
        description:
            "Sintetizirana 1775. godine, ova briljantna smaragdna nijansa postala je hit u viktorijanskoj Engleskoj za haljine, dječje igračke i tapete. Nažalost, bila je puna arsena. U vlažnim uvjetima, tapete su ispuštale smrtonosni arsenov plin.",
        funFact:
            "Smatra se da su zelene tapete u sobi Napoleona Bonapartea na Svetoj Heleni znatno pridonijele njegovoj smrti.",
        artworks: [
            {
                title: 'Tapeta "Trellis"',
                artist: "William Morris",
                year: "1862.",
                image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/William_Morris_Trellis_wallpaper.jpg/800px-William_Morris_Trellis_wallpaper.jpg",
            },
        ],
    },
    {
        id: "vantablack",
        name: "Vantablack",
        hex: "#050505",
        category: "Znanstvena",
        era: "2014.",
        iconName: "Microscope",
        subtitle: "Crna rupa na Zemlji",
        description:
            "Nije zapravo boja, već premaz od ugljikovih nanocijevi koji apsorbira 99.965% vidljive svjetlosti. Kada se 3D objekt premaže Vantablackom, gubi sve konture i izgleda kao dvodimenzionalna praznina (crna rupa).",
        funFact:
            "Umjetnik Anish Kapoor otkupio je ekskluzivna prava na korištenje Vantablacka u umjetnosti, što je izazvalo bijes i bojkot cijele umjetničke zajednice.",
        artworks: [
            {
                title: "Dubina apsorpcije (koncept)",
                artist: "Laboratorijski uzorak Vantablacka",
                year: "2014.",
                image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
            },
        ],
    },
];

const ColorCatalogue = () => {
    const [colors, setColors] = useState(initialColorCatalog);
    const [selectedColor, setSelectedColor] = useState(initialColorCatalog[0]);
    const [isAnimating, setIsAnimating] = useState(false);
    const [hoveredColor, setHoveredColor] = useState<string | null>(null);

    // AI States
    const [isGeneratingStory, setIsGeneratingStory] = useState(false);
    const [aiStory, setAiStory] = useState("");
    const [isGeneratingColor, setIsGeneratingColor] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Funkcija za dohvaćanje ikone iz imena stringa
    const getIcon = (iconName: string) => {
        switch (iconName) {
            case "Crown":
                return <Crown size={20} />;
            case "Skull":
                return <Skull size={20} />;
            case "Microscope":
                return <Microscope size={20} />;
            case "Palette":
            default:
                return <Palette size={20} />;
        }
    };

    // Helper funkcija za Gemini API
    const callGeminiText = async (prompt: string, isJson = false) => {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
        const payload = {
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: isJson
                ? { responseMimeType: "application/json" }
                : {},
        };

        let delay = 1000;
        for (let i = 0; i < 5; i++) {
            try {
                const response = await fetch(url, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                });

                if (!response.ok)
                    throw new Error(`HTTP error! status: ${response.status}`);

                const data = await response.json();
                return data.candidates?.[0]?.content?.parts?.[0]?.text;
            } catch (err) {
                if (i === 4)
                    throw new Error(
                        "Povezivanje s umjetnom inteligencijom nije uspjelo.",
                    );
                await new Promise((res) => setTimeout(res, delay));
                delay *= 2;
            }
        }
    };

    // ✨ Značajka 1: AI Kustos (Priča o boji)
    const generateAiStory = async () => {
        if (!selectedColor) return;
        setIsGeneratingStory(true);
        setError(null);
        setAiStory("");

        const prompt = `Ti si strastveni i dramatični kustos u muzeju povijesti umjetnosti. 
    Ispričaj mi jednu nevjerojatnu, manje poznatu anegdotu ili mračnu tajnu iz povijesti o boji "${selectedColor.name}" (${selectedColor.subtitle}). 
    Priča mora biti dramatična, edukativna i duga najviše 3 do 4 rečenice. Jezik: Hrvatski.`;

        try {
            const responseText = await callGeminiText(prompt, false);
            setAiStory(responseText);
        } catch (err: any) {
            setError(
                err instanceof Error
                    ? err.message
                    : "An unknown error occurred",
            );
        } finally {
            setIsGeneratingStory(false);
        }
    };

    // ✨ Značajka 2: Pronađi novu boju
    const generateNewColor = async () => {
        setIsGeneratingColor(true);
        setError(null);

        const existingNames = colors.map((c) => c.name).join(", ");
        const prompt = `Ti si stručnjak za povijest umjetnosti i pigmente. 
    Predloži jednu istinitu, povijesno fascinantnu, neobičnu ili opasnu boju (npr. Zmajeva krv, Indijska žuta, Olovno bijela, Lapis Lazuli) koja NIJE na ovom popisu: ${existingNames}.
    
    Odgovori ISKLJUČIVO u JSON formatu sa sljedećom strukturom:
    {
      "id": "kratki-id-boje",
      "name": "Ime Boje",
      "hex": "#HEXKOD",
      "category": "Kategorija (npr. Otrovna, Statusna, Organska, Bizarna)",
      "era": "Razdoblje nastanka ili vrhunca korištenja",
      "iconName": "Odaberi jedno od: Crown, Skull, Microscope, Palette",
      "subtitle": "Kratki, privlačni podnaslov",
      "description": "Detaljan opis (2-3 rečenice o tome kako je nastala ili se koristila)",
      "funFact": "Neka šokantna ili vrlo zanimljiva činjenica",
      "artworks": []
    }`;

        try {
            const jsonResponse = await callGeminiText(prompt, true);
            const newColor = JSON.parse(jsonResponse);
            setColors((prev) => [...prev, newColor]);
            handleColorSelect(newColor); // Automatski prebaci na novu boju
        } catch (err) {
            setError(
                "Nismo uspjeli pronaći novu boju u arhivima. Pokušajte ponovno.",
            );
        } finally {
            setIsGeneratingColor(false);
        }
    };

    // Funkcija za glatku promjenu aktivne boje s fade-out/fade-in efektom
    const handleColorSelect = (color: {
        id: string;
        name: string;
        hex: string;
        category: string;
        era: string;
        iconName: string;
        subtitle: string;
        description: string;
        funFact: string;
        artworks: {
            title: string;
            artist: string;
            year: string;
            image: string;
        }[];
    }) => {
        if (color.id === selectedColor.id) return;
        setIsAnimating(true);
        setAiStory(""); // Resetiraj AI priču pri promjeni boje
        setError(null);
        setTimeout(() => {
            setSelectedColor(color);
            setIsAnimating(false);
        }, 300); // Trajanje izlazne animacije
    };

    const hexToRgba = (hex: string, alpha: number) => {
        // Basic safety check for generated hex codes
        if (!/^#([0-9A-Fa-f]{3}){1,2}$/i.test(hex)) hex = "#333333";
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    };

    return (
        <div className='min-h-screen bg-slate-950 text-slate-200 font-sans flex flex-col selection:bg-white selection:text-black'>
            {/* Hero Header */}
            <header className='py-12 px-6 text-center relative overflow-hidden border-b border-slate-800'>
                <div
                    className='absolute inset-0 opacity-20 transition-colors duration-1000'
                    style={{ backgroundColor: selectedColor.hex }}></div>
                <div className='relative z-10 max-w-4xl mx-auto'>
                    <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-sm font-medium mb-6 text-slate-400'>
                        <Sparkles size={16} className='text-yellow-400' />
                        Interdisciplinarni AI repozitorij
                    </div>
                    <h1 className='text-4xl md:text-6xl font-black mb-4 tracking-tight'>
                        Katalog neobičnih{" "}
                        <span
                            style={{ color: selectedColor.hex }}
                            className='transition-colors duration-1000 drop-shadow-lg'>
                            nijansi
                        </span>
                    </h1>
                    <p className='text-lg text-slate-400 max-w-2xl mx-auto'>
                        Boja nije samo svjetlost. Ona je povijest, otrov,
                        statusni simbol i ljudska opsesija. Istražite pigmente
                        uz pomoć AI kustosa.
                    </p>
                </div>
            </header>

            {/* Main Layout */}
            <main className='flex-grow flex flex-col md:flex-row max-w-7xl mx-auto w-full p-6 gap-8'>
                {/* Lijeva strana: Lista (Master) */}
                <div
                    className='w-full md:w-5/12 lg:w-1/3 flex flex-col gap-4 order-2 md:order-1 custom-scrollbar overflow-y-auto pr-2 pb-10'
                    style={{ maxHeight: "calc(100vh - 200px)" }}>
                    <h3 className='text-xs font-bold uppercase tracking-widest text-slate-500 mb-2 pl-2 flex justify-between items-center'>
                        Odaberite pigment
                        <span className='bg-slate-800 px-2 py-0.5 rounded text-slate-400'>
                            {colors.length} u arhivi
                        </span>
                    </h3>

                    {colors.map((color) => {
                        const isSelected = selectedColor.id === color.id;
                        return (
                            <button
                                key={color.id}
                                onClick={() => handleColorSelect(color)}
                                onMouseEnter={() => setHoveredColor(color.id)}
                                onMouseLeave={() => setHoveredColor(null)}
                                className={`group relative flex items-center p-4 rounded-2xl text-left transition-all duration-300 overflow-hidden
                  ${isSelected ? "bg-slate-900 border-slate-700 shadow-xl scale-[1.02]" : "bg-slate-900/40 border-slate-800 hover:bg-slate-800"}
                  border
                `}>
                                {/* Bočni indikator (Swatch) */}
                                <div
                                    className={`w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center transition-transform duration-500 shadow-inner
                    ${isSelected ? "scale-110 rotate-3" : "group-hover:scale-105 group-hover:-rotate-3"}
                  `}
                                    style={{ backgroundColor: color.hex }}>
                                    <div
                                        className={`text-white drop-shadow-md transition-opacity duration-300 ${isSelected || hoveredColor === color.id ? "opacity-100" : "opacity-0"}`}>
                                        {getIcon(color.iconName)}
                                    </div>
                                </div>

                                {/* Tekst navigacije */}
                                <div className='ml-4 flex-grow'>
                                    <h4
                                        className={`font-bold text-lg transition-colors ${isSelected ? "text-white" : "text-slate-300 group-hover:text-white"}`}>
                                        {color.name}
                                    </h4>
                                    <div className='flex items-center gap-2 mt-1'>
                                        <span className='text-xs font-medium px-2 py-0.5 rounded-full bg-slate-800 text-slate-400'>
                                            {color.era}
                                        </span>
                                    </div>
                                </div>

                                {/* Aktivna strelica */}
                                <div
                                    className={`absolute right-4 transition-all duration-300 ${isSelected ? "opacity-100 translate-x-0 text-white" : "opacity-0 -translate-x-4 text-slate-500"}`}>
                                    <ArrowRight size={20} />
                                </div>
                            </button>
                        );
                    })}

                    {/* ✨ AI Generator Gumb */}
                    <button
                        onClick={generateNewColor}
                        disabled={isGeneratingColor}
                        className='mt-4 group relative flex items-center justify-center gap-2 p-4 rounded-2xl border border-dashed border-slate-700 hover:border-purple-500 hover:bg-purple-900/10 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed'>
                        {isGeneratingColor ? (
                            <Loader2
                                size={20}
                                className='text-purple-400 animate-spin'
                            />
                        ) : (
                            <Sparkles
                                size={20}
                                className='text-purple-400 group-hover:scale-110 transition-transform'
                            />
                        )}
                        <span className='font-bold text-slate-300 group-hover:text-purple-300 transition-colors'>
                            {isGeneratingColor
                                ? "Pretraživanje arhiva..."
                                : "✨ Otkrij novu boju (AI)"}
                        </span>
                    </button>
                </div>

                {/* Desna strana: Detaljni prikaz (Detail) */}
                <div className='w-full md:w-7/12 lg:w-2/3 order-1 md:order-2'>
                    <div className='sticky top-6'>
                        <div
                            className={`bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 transform
                ${isAnimating ? "opacity-0 translate-y-4 scale-95" : "opacity-100 translate-y-0 scale-100"}
              `}>
                            {/* Zaglavlje detalja s mrljom boje */}
                            <div className='relative h-48 sm:h-64 flex items-end p-8 overflow-hidden'>
                                <div
                                    className='absolute -top-24 -right-24 w-96 h-96 rounded-full blur-3xl opacity-50 mix-blend-screen animate-pulse'
                                    style={{
                                        backgroundColor: selectedColor.hex,
                                    }}></div>

                                <div className='relative z-10 w-full flex justify-between items-end'>
                                    <div>
                                        <div className='flex items-center gap-2 mb-3'>
                                            <span className='flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-white border border-white/10'>
                                                {getIcon(
                                                    selectedColor.iconName,
                                                )}
                                                {selectedColor.category}
                                            </span>
                                        </div>
                                        <h2 className='text-4xl md:text-5xl font-black text-white drop-shadow-md'>
                                            {selectedColor.name}
                                        </h2>
                                    </div>
                                    <div className='hidden sm:block text-right'>
                                        <div className='text-sm text-white/70 font-bold uppercase tracking-widest mb-1'>
                                            Boja
                                        </div>
                                        <div className='text-2xl font-mono text-white bg-black/40 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10'>
                                            {selectedColor.hex}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Tekstualni sadržaj */}
                            <div className='p-8'>
                                <h3
                                    className='text-2xl font-semibold text-white mb-6 border-b border-slate-800 pb-4'
                                    style={{
                                        borderColor: hexToRgba(
                                            selectedColor.hex,
                                            0.3,
                                        ),
                                    }}>
                                    {selectedColor.subtitle}
                                </h3>

                                <p className='text-lg text-slate-300 leading-relaxed mb-8'>
                                    {selectedColor.description}
                                </p>

                                {error && (
                                    <div className='mb-6 p-4 bg-red-900/30 border border-red-500/50 rounded-xl text-red-200 text-sm'>
                                        ⚠️ {error}
                                    </div>
                                )}

                                <div className='grid grid-cols-1 gap-6 mb-8'>
                                    {/* Zanimljivost kutija */}
                                    <div
                                        className='relative p-6 rounded-2xl border overflow-hidden group'
                                        style={{
                                            backgroundColor: hexToRgba(
                                                selectedColor.hex,
                                                0.05,
                                            ),
                                            borderColor: hexToRgba(
                                                selectedColor.hex,
                                                0.2,
                                            ),
                                        }}>
                                        <div
                                            className='absolute top-0 left-0 w-1 h-full transition-all duration-500 group-hover:w-2'
                                            style={{
                                                backgroundColor:
                                                    selectedColor.hex,
                                            }}></div>
                                        <div className='flex items-start gap-4'>
                                            <div
                                                className='p-2 rounded-full mt-1 flex-shrink-0'
                                                style={{
                                                    backgroundColor: hexToRgba(
                                                        selectedColor.hex,
                                                        0.2,
                                                    ),
                                                    color: selectedColor.hex,
                                                }}>
                                                <Info size={24} />
                                            </div>
                                            <div>
                                                <h4
                                                    className='font-bold text-white mb-2 uppercase tracking-widest text-sm'
                                                    style={{
                                                        color: selectedColor.hex,
                                                    }}>
                                                    Jeste li znali?
                                                </h4>
                                                <p className='text-slate-300 italic text-sm leading-relaxed'>
                                                    "{selectedColor.funFact}"
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* ✨ AI Kustos (Dynamic Story Generation) */}
                                    <div className='bg-slate-800/50 border border-purple-500/30 rounded-2xl p-6 relative overflow-hidden'>
                                        <div className='absolute top-0 right-0 w-32 h-32 bg-purple-500/10 blur-3xl rounded-full'></div>
                                        <div className='flex justify-between items-start mb-4 relative z-10'>
                                            <h4 className='font-bold text-purple-400 uppercase tracking-widest text-sm flex items-center gap-2'>
                                                <MessageSquare size={16} /> AI
                                                Kustos
                                            </h4>
                                            {!aiStory && (
                                                <button
                                                    onClick={generateAiStory}
                                                    disabled={isGeneratingStory}
                                                    className='flex items-center gap-2 text-xs font-bold bg-purple-600/20 text-purple-300 hover:bg-purple-600/40 px-3 py-1.5 rounded-lg transition-colors'>
                                                    {isGeneratingStory ? (
                                                        <Loader2
                                                            size={14}
                                                            className='animate-spin'
                                                        />
                                                    ) : (
                                                        <Sparkles size={14} />
                                                    )}
                                                    ✨ Zatraži anegdotu
                                                </button>
                                            )}
                                        </div>
                                        <div className='relative z-10 text-slate-300 text-sm leading-relaxed'>
                                            {isGeneratingStory ? (
                                                <span className='animate-pulse opacity-70'>
                                                    Umjetna inteligencija
                                                    pretražuje povijesne
                                                    arhive...
                                                </span>
                                            ) : aiStory ? (
                                                <div className='bg-slate-950/50 p-4 rounded-xl border border-slate-700/50 font-serif italic'>
                                                    {aiStory}
                                                </div>
                                            ) : (
                                                <span className='opacity-70'>
                                                    Zanima vas više? Zatražite
                                                    od našeg AI kustosa da vam
                                                    ispriča dublju, skrivenu
                                                    priču o ovoj boji.
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Sekcija: Primjeri u umjetnosti (Renderira se samo ako postoje) */}
                                {selectedColor.artworks &&
                                    selectedColor.artworks.length > 0 && (
                                        <div className='animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200'>
                                            <h4
                                                className='flex items-center gap-2 font-bold text-white mb-6 uppercase tracking-widest text-sm'
                                                style={{
                                                    color: selectedColor.hex,
                                                }}>
                                                <ImageIcon size={18} />
                                                Primjeri u povijesti umjetnosti
                                            </h4>

                                            <div
                                                className={`grid gap-6 ${selectedColor.artworks.length > 1 ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"}`}>
                                                {selectedColor.artworks.map(
                                                    (art, idx) => (
                                                        <div
                                                            key={idx}
                                                            className='group relative rounded-2xl overflow-hidden border border-slate-700/50 cursor-pointer shadow-lg bg-slate-800'
                                                            style={{
                                                                height: "260px",
                                                            }}>
                                                            <img
                                                                src={art.image}
                                                                alt={`Slika umjetničkog djela: ${art.title}`}
                                                                className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-110'
                                                                onError={(
                                                                    e,
                                                                ) => {
                                                                    const target =
                                                                        e.target as HTMLImageElement;
                                                                    target.src =
                                                                        "https://images.unsplash.com/photo-1541961017774-22349e4a1262?q=80&w=800&auto=format&fit=crop";
                                                                }} // Fallback za AI generirane slike
                                                            />
                                                            <div className='absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/50 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300'></div>

                                                            <div className='absolute bottom-0 left-0 w-full p-5 transform transition-transform duration-300 translate-y-2 group-hover:translate-y-0'>
                                                                <p className='text-xs font-bold text-slate-400 mb-1'>
                                                                    {art.artist}{" "}
                                                                    ({art.year})
                                                                </p>
                                                                <h5 className='text-lg font-bold text-white leading-tight drop-shadow-md'>
                                                                    {art.title}
                                                                </h5>
                                                            </div>
                                                            <div
                                                                className='absolute inset-0 border-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none'
                                                                style={{
                                                                    borderColor:
                                                                        selectedColor.hex,
                                                                }}></div>
                                                        </div>
                                                    ),
                                                )}
                                            </div>
                                        </div>
                                    )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ColorCatalogue;
