import React, { useState } from "react";
import {
    Beaker,
    Palette,
    BookOpen,
    ShoppingCart,
    Info,
    AlertTriangle,
    CheckCircle,
    XCircle,
    History,
    Feather,
    Sparkles,
    LayoutTemplate,
    ArrowRight,
} from "lucide-react";

const BojeKrozPovijest = () => {
    const [activeTab, setActiveTab] = useState("povijest");

    const tabs = [
        {
            id: "povijest",
            label: "Kulturološki Šok",
            icon: <BookOpen size={24} />,
            color: "text-pink-400",
            bg: "bg-pink-500/20",
            border: "border-pink-500",
        },
        {
            id: "kemija",
            label: "Pigmentni Alkemičar",
            icon: <Beaker size={24} />,
            color: "text-green-400",
            bg: "bg-green-500/20",
            border: "border-green-500",
        },
        {
            id: "marketing",
            label: "Psihologija Marketinga",
            icon: <ShoppingCart size={24} />,
            color: "text-yellow-400",
            bg: "bg-yellow-500/20",
            border: "border-yellow-500",
        },
        {
            id: "kandinski",
            label: "Fizika vs Umjetnost",
            icon: <Palette size={24} />,
            color: "text-cyan-400",
            bg: "bg-cyan-500/20",
            border: "border-cyan-500",
        },
    ];

    const activeTabData = tabs.find((t) => t.id === activeTab) || tabs[0];

    // Pozicije za 4 elementa na kružnici (12, 3, 6, 9 sati)
    const positions = [
        "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2", // Gore
        "top-1/2 right-0 translate-x-1/2 -translate-y-1/2", // Desno
        "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2", // Dolje
        "top-1/2 left-0 -translate-x-1/2 -translate-y-1/2", // Lijevo
    ];

    return (
        <div className='min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-pink-500 selection:text-white pb-12'>
            {/* Header */}
            <header className='bg-slate-800 border-b border-slate-700 p-6 shadow-lg'>
                <div className='max-w-6xl mx-auto'>
                    <h1 className='text-3xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent mb-2'>
                        Boje kroz povijest
                    </h1>
                    <p className='text-slate-400 text-sm md:text-base'>
                        Interdisciplinarno putovanje: percepcija, značenje,
                        kemijsko stvaranje i moderna uporaba.
                    </p>
                </div>
            </header>

            {/* Kružna Navigacija (Kotač) */}
            <div className='max-w-6xl mx-auto p-4 flex justify-center mt-12 mb-8'>
                <div className='relative w-64 h-64 md:w-80 md:h-80 rounded-full border border-slate-700/50 bg-slate-800/30 flex items-center justify-center shadow-xl'>
                    {/* Središnji Hub (Jezgra) */}
                    <div
                        className={`w-32 h-32 md:w-44 md:h-44 rounded-full flex flex-col items-center justify-center text-center p-4 transition-all duration-500 border-2 shadow-[0_0_30px_rgba(0,0,0,0.3)] z-10 ${activeTabData.bg} ${activeTabData.border}`}>
                        <div
                            className={`mb-2 ${activeTabData.color} animate-pulse`}>
                            {activeTabData.icon}
                        </div>
                        <span className='font-bold text-sm md:text-base leading-tight'>
                            {activeTabData.label}
                        </span>
                    </div>

                    {/* Plutajući Gumbovi (Orbita) */}
                    {tabs.map((tab, i) => {
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`absolute ${positions[i]} w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center transition-all duration-300 border-2 z-20
                  ${
                      isActive
                          ? `${tab.bg} ${tab.border} ${tab.color} scale-110 shadow-[0_0_20px_rgba(255,255,255,0.2)]`
                          : "bg-slate-800 border-slate-600 text-slate-400 hover:scale-110 hover:border-slate-400 hover:text-slate-200 shadow-md"
                  }
                `}
                                title={tab.label}>
                                {tab.icon}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Main Content Area */}
            <main className='max-w-6xl mx-auto p-4'>
                {activeTab === "povijest" && <KulturoloskiSok />}
                {activeTab === "kemija" && <PigmentniAlkemicar />}
                {activeTab === "marketing" && <MarketingModul />}
                {activeTab === "kandinski" && <KandinskiModul />}

                {/* Vertikalni povijesni pregled na dnu stranice */}
                <div className='mt-20 pt-10 border-t-2 border-slate-700/50'>
                    <PovijesniPregled />
                </div>

                {/* Sekcija za daljnje istraživanje (Linkovi na nove lekcije) */}
                <div className='mt-24 mb-12'>
                    <DaljnjeIstrazivanje />
                </div>
            </main>
        </div>
    );
};

// --- MODUL 1: KULTUROLOŠKI ŠOK (POVIJEST) ---
const KulturoloskiSok = () => {
    const [boyColor, setBoyColor] = useState<string | null>(null);
    const [girlColor, setGirlColor] = useState<string | null>(null);
    const [revealed, setRevealed] = useState(false);

    const checkAnswers = () => {
        setRevealed(true);
    };

    const isCorrect = boyColor === "pink" && girlColor === "blue";

    return (
        <div className='bg-slate-800 p-6 rounded-2xl border border-slate-700 animate-in fade-in zoom-in duration-500'>
            <h2 className='text-2xl font-bold mb-4 flex items-center gap-2'>
                <BookOpen className='text-pink-400' />
                Lekcija 1: Konstrukcija roda i boje
            </h2>
            <p className='text-slate-300 mb-6'>
                Dobrodošli u <strong>1918. godinu</strong>. Vlasnik ste tvornice
                dječje odjeće i morate donijeti odluku o novoj liniji proizvoda
                prema tadašnjim društvenim normama Zapadnog svijeta. Odaberite
                boje!
            </p>

            <div className='grid md:grid-cols-2 gap-8 mb-8'>
                {/* Odabir za dječaka */}
                <div className='bg-slate-900 p-6 rounded-xl border border-slate-700'>
                    <h3 className='text-xl font-semibold mb-4 text-center'>
                        Boja za dječake
                    </h3>
                    <div className='flex justify-center gap-4'>
                        <button
                            onClick={() => setBoyColor("blue")}
                            className={`w-20 h-20 rounded-full bg-blue-400 border-4 transition-transform hover:scale-110 ${boyColor === "blue" ? "border-white scale-110 shadow-[0_0_15px_rgba(96,165,250,0.5)]" : "border-transparent"}`}
                        />
                        <button
                            onClick={() => setBoyColor("pink")}
                            className={`w-20 h-20 rounded-full bg-pink-400 border-4 transition-transform hover:scale-110 ${boyColor === "pink" ? "border-white scale-110 shadow-[0_0_15px_rgba(244,114,182,0.5)]" : "border-transparent"}`}
                        />
                    </div>
                </div>

                {/* Odabir za djevojčicu */}
                <div className='bg-slate-900 p-6 rounded-xl border border-slate-700'>
                    <h3 className='text-xl font-semibold mb-4 text-center'>
                        Boja za djevojčice
                    </h3>
                    <div className='flex justify-center gap-4'>
                        <button
                            onClick={() => setGirlColor("blue")}
                            className={`w-20 h-20 rounded-full bg-blue-400 border-4 transition-transform hover:scale-110 ${girlColor === "blue" ? "border-white scale-110 shadow-[0_0_15px_rgba(96,165,250,0.5)]" : "border-transparent"}`}
                        />
                        <button
                            onClick={() => setGirlColor("pink")}
                            className={`w-20 h-20 rounded-full bg-pink-400 border-4 transition-transform hover:scale-110 ${girlColor === "pink" ? "border-white scale-110 shadow-[0_0_15px_rgba(244,114,182,0.5)]" : "border-transparent"}`}
                        />
                    </div>
                </div>
            </div>

            <div className='text-center'>
                <button
                    disabled={!boyColor || !girlColor}
                    onClick={checkAnswers}
                    className='bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white px-8 py-3 rounded-xl font-bold transition-colors'>
                    Potvrdi odabir
                </button>
            </div>

            {revealed && (
                <div
                    className={`mt-8 p-6 rounded-xl border ${isCorrect ? "bg-green-900/30 border-green-500" : "bg-red-900/30 border-red-500"} animate-in slide-in-from-bottom-4`}>
                    <div className='flex items-start gap-4'>
                        {isCorrect ? (
                            <CheckCircle
                                className='text-green-500 flex-shrink-0 mt-1'
                                size={28}
                            />
                        ) : (
                            <XCircle
                                className='text-red-500 flex-shrink-0 mt-1'
                                size={28}
                            />
                        )}
                        <div>
                            <h3 className='text-xl font-bold mb-2'>
                                {isCorrect
                                    ? "Nevjerojatno, ali točno!"
                                    : "Logičan pokušaj, ali povijesno netočno!"}
                            </h3>
                            <p className='text-slate-300 mb-4 leading-relaxed'>
                                Općeprihvaćeno pravilo početkom 20. stoljeća
                                bilo je:{" "}
                                <strong>
                                    roza za dječake, a plava za djevojčice.
                                </strong>
                            </p>
                            <div className='bg-slate-900 p-4 rounded-lg border border-slate-700 italic text-slate-400'>
                                "Razlog tome je što je roza, kao odlučnija i
                                snažnija boja (derivat crvene, boje krvi i
                                rata), prikladnija za dječaka, dok je plava,
                                koja je delikatnija i nježnija (povezana s
                                Bogorodicom), ljepša za djevojčicu."
                                <br />
                                <span className='text-sm font-semibold mt-2 block'>
                                    — Earnshaw's Infants' Department (Trgovačka
                                    publikacija), lipanj 1918.
                                </span>
                            </div>
                            <p className='mt-4 text-sm text-slate-400'>
                                <strong>Znanstveni kontekst:</strong> Biološki
                                ne postoji preferencija prema ružičastoj ili
                                plavoj ovisno o spolu. Značenje boja strogo je
                                kulturološki konstrukt koji se drastično
                                mijenjao pod utjecajem marketinga nakon Drugog
                                svjetskog rata.
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// --- MODUL 2: PIGMENTNI ALKEMIČAR (KEMIJA) ---
const PigmentniAlkemicar = () => {
    const [cauldron, setCauldron] = useState<string[]>([]);
    const [result, setResult] = useState<any>(null);

    const elements = [
        { id: "cu", name: "Bakar (Cu)", color: "bg-orange-600" },
        { id: "as", name: "Arsen (As)", color: "bg-slate-400" },
        { id: "si", name: "Pijesak (SiO2)", color: "bg-yellow-600" },
        { id: "ca", name: "Vapnenac (Ca)", color: "bg-stone-300" },
    ];

    const recipes = [
        {
            ingredients: ["cu", "as"],
            name: "Scheeleova Zelena",
            formula: "CuHAsO3",
            type: "Zloglasni pigment",
            color: "#4C9A2A",
            desc: "Bakarov arsenit. Izuzetno toksičan pigment popularan u 18. i 19. stoljeću. Korišten je u tapetama i tkaninama. Smatra se da su otrovna isparavanja ovog pigmenta iz tapeta doprinijela smrti Napoleona Bonapartea na Svetoj Heleni.",
        },
        {
            ingredients: ["cu", "si", "ca"],
            name: "Egipatsko Plava",
            formula: "CaCuSi4O10",
            type: "Prvi sintetički pigment",
            color: "#153A8B",
            desc: "Kuprorivait. Stvoren oko 2500. g. pr. Kr. u Egiptu. Stari Egipćani su ga sintetizirali jer plava boja (simbol neba i rijeke Nil) gotovo ne postoji u prirodi u obliku jednostavnog minerala koji se može mrviti.",
        },
    ];

    const addToCauldron = (id: string) => {
        if (!cauldron.includes(id)) {
            setCauldron([...cauldron, id]);
            setResult(null);
        }
    };

    const clearCauldron = () => {
        setCauldron([]);
        setResult(null);
    };

    const mix = () => {
        // Sort array to match recipe regardless of order
        const currentMix = [...cauldron].sort();
        const foundRecipe = recipes.find(
            (r) =>
                r.ingredients.slice().sort().join(",") === currentMix.join(","),
        );

        if (foundRecipe) {
            setResult(foundRecipe);
        } else {
            setResult({
                name: "Nepoznata mješavina",
                color: "#333333",
                desc: "Ova kombinacija elemenata ne daje poznati povijesni pigment. Kemija zahtijeva preciznost! Pokušajte ponovno.",
                isError: true,
            });
        }
    };

    return (
        <div className='bg-slate-800 p-6 rounded-2xl border border-slate-700 animate-in fade-in zoom-in duration-500'>
            <h2 className='text-2xl font-bold mb-4 flex items-center gap-2'>
                <Beaker className='text-green-400' />
                Lekcija 2: Kemija boja i pigmenti
            </h2>
            <p className='text-slate-300 mb-6'>
                U prapovijesti ljudi su koristili samo pigmente iz zemlje (oker,
                ugljik). Razvojem civilizacije, rođena je kemija. Pokušaj
                sintetizirati poznate pigmente spajanjem pravih elemenata.
            </p>

            <div className='grid md:grid-cols-2 gap-8'>
                <div>
                    <h3 className='text-lg font-semibold mb-3 text-slate-400'>
                        Dostupni elementi
                    </h3>
                    <div className='flex flex-wrap gap-3 mb-6'>
                        {elements.map((el) => (
                            <button
                                key={el.id}
                                onClick={() => addToCauldron(el.id)}
                                disabled={cauldron.includes(el.id)}
                                className={`px-4 py-2 rounded-lg font-medium transition-all ${el.color} ${cauldron.includes(el.id) ? "opacity-30 cursor-not-allowed" : "hover:-translate-y-1 hover:shadow-lg text-white"}`}>
                                {el.name}
                            </button>
                        ))}
                    </div>

                    <div className='bg-slate-900 p-6 rounded-xl border border-slate-700 min-h-[150px]'>
                        <h3 className='text-lg font-semibold mb-3'>
                            Tvoj kotao:
                        </h3>
                        <div className='flex gap-2 mb-4 flex-wrap'>
                            {cauldron.length === 0 && (
                                <span className='text-slate-500 italic'>
                                    Kotao je prazan...
                                </span>
                            )}
                            {cauldron.map((id) => {
                                const el = elements.find((e) => e.id === id);
                                if (!el) return null;
                                return (
                                    <span
                                        key={id}
                                        className={`${el.color} text-white px-3 py-1 rounded-full text-sm`}>
                                        {el.name}
                                    </span>
                                );
                            })}
                        </div>

                        <div className='flex gap-3'>
                            <button
                                onClick={mix}
                                disabled={cauldron.length === 0}
                                className='bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 text-white px-6 py-2 rounded-lg font-bold transition-colors'>
                                Sintetiziraj
                            </button>
                            <button
                                onClick={clearCauldron}
                                className='bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg font-medium transition-colors'>
                                Očisti
                            </button>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 className='text-lg font-semibold mb-3 text-slate-400'>
                        Rezultat sinteze
                    </h3>
                    <div
                        className={`h-full min-h-[250px] rounded-xl border-2 transition-all duration-700 p-6 flex flex-col justify-center items-center text-center ${result ? "border-transparent shadow-2xl" : "border-slate-700 border-dashed bg-slate-900"}`}
                        style={{ backgroundColor: result ? result.color : "" }}>
                        {!result && (
                            <div className='text-slate-500 flex flex-col items-center'>
                                <Beaker size={48} className='mb-4 opacity-50' />
                                <p>Očekujemo kemijsku reakciju...</p>
                            </div>
                        )}

                        {result && !result.isError && (
                            <div className='text-white animate-in zoom-in duration-500'>
                                <span className='text-xs uppercase tracking-widest opacity-80 mb-2 block'>
                                    {result.type}
                                </span>
                                <h2 className='text-3xl font-black mb-1 drop-shadow-md'>
                                    {result.name}
                                </h2>
                                <p className='font-mono text-lg mb-4 opacity-90 drop-shadow-sm'>
                                    {result.formula}
                                </p>
                                <div className='bg-black/30 p-4 rounded-lg text-sm leading-relaxed backdrop-blur-sm'>
                                    {result.desc}
                                </div>
                                {result.formula === "CuHAsO3" && (
                                    <div className='mt-4 flex items-center justify-center gap-2 text-red-300 font-bold bg-red-900/50 p-2 rounded'>
                                        <AlertTriangle size={18} /> OPREZ:
                                        Iznimno toksično!
                                    </div>
                                )}
                            </div>
                        )}

                        {result && result.isError && (
                            <div className='text-slate-300 animate-in shake duration-300'>
                                <XCircle
                                    size={48}
                                    className='mx-auto mb-4 text-red-500'
                                />
                                <h2 className='text-2xl font-bold mb-2'>
                                    {result.name}
                                </h2>
                                <p>{result.desc}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- MODUL 3: PSIHOLOGIJA MARKETINGA (EKONOMIJA/DIZAJN) ---
const MarketingModul = () => {
    const [btnColor, setBtnColor] = useState("gray");
    const [tested, setTested] = useState(false);

    // Uprošćena simulacija stope konverzije (CTR) bazirana na boji pozadine (plavi shop)
    const getCTR = (color: string) => {
        switch (color) {
            case "gray":
                return "1.2%";
            case "blue":
                return "2.1%"; // Ista kao tema (slabo uočljivo)
            case "red":
                return "12.8%"; // Von Restorff efekt (visoki kontrast)
            case "green":
                return "8.5%";
            default:
                return "0%";
        }
    };

    return (
        <div className='bg-slate-800 p-6 rounded-2xl border border-slate-700 animate-in fade-in zoom-in duration-500'>
            <h2 className='text-2xl font-bold mb-4 flex items-center gap-2'>
                <ShoppingCart className='text-yellow-400' />
                Lekcija 3: Boja kao alat manipulacije
            </h2>
            <p className='text-slate-300 mb-6'>
                Dizajnirate web trgovinu (s dominantno plavom temom). Boja
                glavnog gumba ("Call to Action") dokazano utječe na podsvijest
                potrošača i stopu klikova (CTR). Odaberite boju gumba i
                testirajte tržište.
            </p>

            <div className='grid md:grid-cols-2 gap-8'>
                {/* Mockup web shopa */}
                <div className='bg-slate-100 p-4 rounded-xl border-4 border-slate-700 text-slate-800 shadow-inner'>
                    <div className='bg-blue-600 h-12 rounded-t-lg mb-4 flex items-center px-4'>
                        <div className='text-white font-bold tracking-widest'>
                            ART SHOP
                        </div>
                    </div>
                    <div className='flex gap-4 mb-4'>
                        <div className='w-1/3 bg-slate-300 h-32 rounded-lg flex items-center justify-center'>
                            <div className='text-slate-500'>
                                <Palette size={40} />
                            </div>
                        </div>
                        <div className='w-2/3'>
                            <h3 className='text-xl font-bold text-slate-800 mb-2'>
                                Premium Set Pigmenata
                            </h3>
                            <p className='text-sm text-slate-600 mb-4'>
                                Savršeno za umjetnike koji žele povijesnu
                                autentičnost u svojim djelima.
                            </p>
                            <p className='text-2xl font-black text-slate-800 mb-4'>
                                49.99 €
                            </p>

                            <button
                                className={`w-full py-3 rounded-lg font-bold text-white shadow-md transition-all duration-300
                  ${btnColor === "gray" ? "bg-slate-500 hover:bg-slate-600" : ""}
                  ${btnColor === "blue" ? "bg-blue-600 hover:bg-blue-700" : ""}
                  ${btnColor === "red" ? "bg-red-600 hover:bg-red-700" : ""}
                  ${btnColor === "green" ? "bg-green-600 hover:bg-green-700" : ""}
                `}>
                                KUPI ODMAH
                            </button>
                        </div>
                    </div>
                </div>

                {/* Kontrole i analitika */}
                <div className='flex flex-col justify-center'>
                    <h3 className='text-lg font-semibold mb-3 text-slate-400'>
                        Paleta za A/B Testiranje
                    </h3>
                    <div className='flex gap-4 mb-8'>
                        <button
                            onClick={() => {
                                setBtnColor("blue");
                                setTested(true);
                            }}
                            className='w-12 h-12 rounded-full bg-blue-600 border-2 border-slate-700 hover:scale-110 transition-transform'
                        />
                        <button
                            onClick={() => {
                                setBtnColor("green");
                                setTested(true);
                            }}
                            className='w-12 h-12 rounded-full bg-green-600 border-2 border-slate-700 hover:scale-110 transition-transform'
                        />
                        <button
                            onClick={() => {
                                setBtnColor("red");
                                setTested(true);
                            }}
                            className='w-12 h-12 rounded-full bg-red-600 border-2 border-slate-700 hover:scale-110 transition-transform'
                        />
                    </div>

                    <div
                        className={`bg-slate-900 p-6 rounded-xl border border-slate-700 transition-opacity duration-500 ${tested ? "opacity-100" : "opacity-30"}`}>
                        <h3 className='text-sm font-bold text-slate-400 uppercase tracking-wider mb-2'>
                            Analitika Konverzije (CTR)
                        </h3>
                        <div className='text-5xl font-black text-white mb-4'>
                            {tested ? getCTR(btnColor) : "0.0%"}
                        </div>

                        {tested && btnColor === "red" && (
                            <p className='text-green-400 text-sm flex items-start gap-2'>
                                <Info
                                    size={18}
                                    className='flex-shrink-0 mt-0.5'
                                />
                                <strong>Odlično!</strong> Primijenili ste{" "}
                                <em>Von Restorffov efekt</em> (efekt izolacije).
                                Ljudsko oko odmah uočava ono što odskače od
                                okoline. U plavom okruženju, crvena
                                (komplementarna/kontrastna boja) podsvjesno
                                privlači pažnju i stvara osjećaj hitnosti.
                            </p>
                        )}
                        {tested && btnColor === "blue" && (
                            <p className='text-yellow-400 text-sm flex items-start gap-2'>
                                <Info
                                    size={18}
                                    className='flex-shrink-0 mt-0.5'
                                />
                                Gumb se previše stopio s bojom brenda (plavo na
                                plavom). Korisnici ga teško uočavaju. Estetski
                                je lijepo, ali ekonomski neisplativo.
                            </p>
                        )}
                        {tested && btnColor === "green" && (
                            <p className='text-blue-300 text-sm flex items-start gap-2'>
                                <Info
                                    size={18}
                                    className='flex-shrink-0 mt-0.5'
                                />
                                Zelena asocira na dopuštenje ("kreni",
                                "sigurno"), što donosi solidne rezultate, ali
                                nedostaje joj vizualni "udar" crvene boje u ovom
                                specifičnom plavom okruženju.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- MODUL 4: FIZIKA VS UMJETNOST (BIOLOGIJA/KANDINSKI) ---
const KandinskiModul = () => {
    return (
        <div className='bg-slate-800 p-6 rounded-2xl border border-slate-700 animate-in fade-in zoom-in duration-500'>
            <h2 className='text-2xl font-bold mb-4 flex items-center gap-2'>
                <Palette className='text-cyan-400' />
                Lekcija 4: Subjektivno protiv Objektivnog
            </h2>
            <p className='text-slate-300 leading-relaxed mb-6'>
                Znanost definira boju kao specifičnu valnu duljinu svjetlosti
                koja podražuje fotoreceptore u mrežnici oka. Znanstveno je
                dokazano da{" "}
                <strong>
                    crvena boja (dugih valnih duljina) doslovno povećava broj
                    otkucaja srca i pobuđuje autonomni živčani sustav
                </strong>
                , dok kratke valne duljine (plava) djeluju umirujuće.
                <br />
                <br />
                Vassily Kandinsky, začetnik apstrakcije, osjetio je to
                intuitivno prije moderne neuroznanosti. Ustvrdio je da boja ima
                izravan utjecaj na dušu te je bojama pridruživao zvukove i
                oblike.
            </p>

            <div className='grid md:grid-cols-3 gap-6'>
                <div className='bg-slate-900 p-6 rounded-xl text-center group cursor-pointer border border-slate-700 hover:border-yellow-500 transition-colors'>
                    <div className='w-0 h-0 border-l-[40px] border-l-transparent border-r-[40px] border-r-transparent border-b-[69.3px] border-b-yellow-400 mx-auto mb-4 group-hover:scale-110 transition-transform'></div>
                    <h3 className='text-yellow-400 font-bold text-xl mb-2'>
                        Žuta
                    </h3>
                    <p className='text-sm text-slate-400 italic mb-2'>
                        Oštar, ekscentričan zvuk.
                    </p>
                    <p className='text-xs text-slate-500 font-bold uppercase'>
                        Instrument: Truba
                    </p>
                </div>

                <div className='bg-slate-900 p-6 rounded-xl text-center group cursor-pointer border border-slate-700 hover:border-red-500 transition-colors'>
                    <div className='w-20 h-20 bg-red-500 mx-auto mb-4 group-hover:scale-110 transition-transform'></div>
                    <h3 className='text-red-500 font-bold text-xl mb-2'>
                        Crvena
                    </h3>
                    <p className='text-sm text-slate-400 italic mb-2'>
                        Nemirna, užarena snaga. (Biologija: Podiže puls)
                    </p>
                    <p className='text-xs text-slate-500 font-bold uppercase'>
                        Instrument: Bubanj / Fanfare
                    </p>
                </div>

                <div className='bg-slate-900 p-6 rounded-xl text-center group cursor-pointer border border-slate-700 hover:border-blue-500 transition-colors'>
                    <div className='w-20 h-20 bg-blue-500 rounded-full mx-auto mb-4 group-hover:scale-110 transition-transform'></div>
                    <h3 className='text-blue-500 font-bold text-xl mb-2'>
                        Plava
                    </h3>
                    <p className='text-sm text-slate-400 italic mb-2'>
                        Duboka smirenost i koncentracija.
                    </p>
                    <p className='text-xs text-slate-500 font-bold uppercase'>
                        Instrument: Violončelo / Orgulje
                    </p>
                </div>
            </div>
        </div>
    );
};

// --- MODUL 5: VERTIKALNA VREMENSKA CRTA ---
const PovijesniPregled = () => {
    const timelineData = [
        {
            period: "Prapovijest",
            pigments: {
                title: "Pigmenti iz zemlje i vatre",
                desc: "Prvi pigmenti bili su lako dostupni iz okoline: crveni i žuti oker (zemlja), hematit i crni ugljen (vatra). Nisu zahtijevali kemijsku sintezu, već samo mljevenje i miješanje s prirodnim vezivima poput vode, pljuvačke ili životinjske masti kako bi nastale špiljske slike.",
            },
            culture: {
                title: "Animističko shvaćanje boja",
                desc: "Boje su imale doslovno, magijsko značenje. Crvena je bila simbol krvi, vitalnosti i životne energije, dok je crna predstavljala tamu, podzemlje i nepoznato. Nije postojala ideja 'ljepote' boje, već njene moći.",
            },
        },
        {
            period: "Antički Egipat i Mezopotamija",
            pigments: {
                title: "Prvi sintetički pigmenti",
                desc: "Budući da plave boje gotovo nema u prirodi u upotrebljivom obliku (kao jednostavan mineral), Egipćani su oko 2500. g. pr. Kr. izumili 'Egipatsko plavo' složenim kemijskim zagrijavanjem bakra, pijeska i vapnenca.",
            },
            culture: {
                title: "Boje božanskog poretka",
                desc: "U 'Epu o Gilgamešu', lapis lazuli i boje koriste se za opisivanje bogatstva i božanskog prisustva. U Egiptu, plava simbolizira rijeku Nil i nebesko stvaranje, dok je zlatna boja doslovno smatrana 'mesom bogova'.",
            },
        },
        {
            period: "Antička Grčka i Rim",
            pigments: {
                title: "Ekstravagancija Tirskog purpura",
                desc: "Olovna bijela postaje standard za slikarstvo, ali najvažniji izum je 'Tirski purpur'. Ekstrahiran iz žlijezda morskih puževa (volaka), zahtijevao je desetke tisuća puževa za samo jedan gram pigmenta, stvarajući užasan smrad pri proizvodnji.",
            },
            culture: {
                title: "Svjetlost, tama i status u književnosti",
                desc: "Zanimljivo, Homer u 'Odiseji' opisuje more kao 'mračno kao vino' (wine-dark sea). Znanstvenik Gladstone je primijetio da Grci boje nisu percipirali prvenstveno kroz nijansu, već kroz kontrast svjetla i tame. U Rimu, purpur postaje rezerviran isključivo za careve (statusni simbol moći).",
            },
        },
        {
            period: "Srednji vijek",
            pigments: {
                title: "Ultramarin: Skuplji od zlata",
                desc: "Pojavljuje se 'Ultramarin' (boja 'preko mora'), dobiven mljevenjem poludragog kamena lapis lazulija dopremljenog iz rudnika u Afganistanu. Zbog cijene, naručitelji slika su ga umjetnicima davali na grame, odvojeno od ugovora za samu sliku.",
            },
            culture: {
                title: "Teologija boja: Biblija i Dante",
                desc: "U Bibliji, crvena simbolizira Kristovu krv, a bijela apsolutnu čistoću. Zbog cijene ultramarina, crkva odlučuje da se njime smije slikati isključivo plašt Djevice Marije. U književnosti, Dante u 'Paklu' Luciferu daje tri lica – crveno, blijedožuto i crno – kao stravičnu parodiju Svetog Trojstva.",
            },
        },
        {
            period: "Renesansa i Barok",
            pigments: {
                title: "Trijumf uljanih boja",
                desc: "Usavršavanje uljanog slikarstva omogućava nanošenje prozirnih slojeva (glazura). Pigmenti se sada miješaju s lanenim uljem, što bojama daje neviđenu dubinu, zasićenost i mogućnost realističnog prikaza svjetla (chiaroscuro).",
            },
            culture: {
                title: "Poezija strasti i metafora",
                desc: "Književnici koriste boje kao psihološke metafore. Shakespeare u poemi 'Venera i Adonis' maestralno plete kontrast crvene (strast, krv) i bijele (čednost, smrt). John Milton u 'Izgubljenom raju' opisuje pakao oksimoronom 'ne svjetlo, već tama vidljiva' (darkness visible).",
            },
        },
        {
            period: "18. i 19. stoljeće",
            pigments: {
                title: "Kemijska revolucija i toksičnost",
                desc: "Industrijska revolucija donosi umjetne boje. Sintetizira se 'Scheeleova zelena' na bazi arsena i Perkinsov 'Mauveine' (1856.), prva anilinska sintetička boja iz katrana kamenog ugljena, koja potpuno mijenja tekstilnu industriju.",
            },
            culture: {
                title: "Fatalna moda i Goetheova teorija",
                desc: "Viktorijanci zaluđeno oblače smrtonosne zelene haljine unatoč upozorenjima na arsen. J.W. von Goethe 1810. objavljuje 'Teoriju boja', oponirajući Newtonu. Goethe prvi detaljno razrađuje psihološki utjecaj boja na emocije čovjeka, što će kasnije snažno utjecati na slikarstvo (Kandinski, Turner).",
            },
        },
        {
            period: "20. stoljeće do danas",
            pigments: {
                title: "Digitalna RGB i CMYK era",
                desc: "Boje se emancipiraju od materije. Kroz standardizaciju tiska (Cyan, Magenta, Yellow, Key/Black) i zaslona (Red, Green, Blue), svaka nijansa ikad zamišljena postaje u sekundi dostupna svima bez upotrebe otrovnih minerala.",
            },
            culture: {
                title: "Marketing i rodni konstrukti",
                desc: "Boja postaje vrhunsko oružje marketinga. Kulturološki konstrukti doživljavaju vrhunac: tek nakon Drugog svjetskog rata kapitalizam strogo definira rozu kao žensku, a plavu kao mušku boju, što pokazuje kako su 'prirodna' značenja boja zapravo promjenjive društvene konvencije.",
            },
        },
    ];

    return (
        <div className='py-8 animate-in fade-in duration-1000'>
            <div className='text-center mb-16'>
                <h2 className='text-3xl font-black text-white flex items-center justify-center gap-3 mb-4'>
                    <History className='text-pink-400' size={32} />
                    Vremenska crta: Od pigmenata do poezije
                </h2>
                <p className='text-slate-400 max-w-2xl mx-auto'>
                    Interdisciplinarni pogled na dualnu prirodu boja: njihov
                    kemijsko-tehnološki razvoj na paletama umjetnika (lijevo) i
                    njihov snažan utjecaj na religiju, društvo i velika
                    književna djela (desno).
                </p>
            </div>

            <div className='relative max-w-5xl mx-auto px-4 md:px-0'>
                {/* Središnja vertikalna linija (vidljiva na desktopu) */}
                <div className='hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full border-l-2 border-dashed border-slate-600'></div>

                {timelineData.map((item, index) => (
                    <div
                        key={index}
                        className='mb-16 md:mb-24 flex flex-col md:flex-row justify-between items-center w-full relative'>
                        {/* Oznaka razdoblja (Bedž u sredini za desktop) */}
                        <div className='hidden md:flex absolute left-1/2 transform -translate-x-1/2 -top-6 bg-slate-900 border-2 border-slate-700 text-slate-200 px-6 py-2 rounded-full text-sm font-bold z-20 shadow-[0_0_15px_rgba(0,0,0,0.5)] whitespace-nowrap'>
                            {item.period}
                        </div>

                        {/* Lijeva Strana: Pigmenti (Tehnologija) */}
                        <div className='w-full md:w-5/12 mb-8 md:mb-0 relative'>
                            <div className='md:hidden inline-block bg-slate-800 border border-slate-600 text-slate-200 px-4 py-1 rounded-full text-xs font-bold mb-4'>
                                {item.period}
                            </div>
                            <div className='bg-slate-800/80 p-6 rounded-2xl border-l-4 border-l-green-500 border-y border-r border-slate-700 shadow-xl relative hover:-translate-y-1 transition-transform'>
                                <span className='text-green-400 font-bold text-xs uppercase tracking-widest block mb-2'>
                                    Pigmenti i Tehnologija
                                </span>
                                <h4 className='text-xl font-bold text-white mb-3'>
                                    {item.pigments.title}
                                </h4>
                                <p className='text-slate-300 text-sm leading-relaxed'>
                                    {item.pigments.desc}
                                </p>
                            </div>
                        </div>

                        {/* Centralna točkica na liniji */}
                        <div className='hidden md:block absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-slate-400 border-4 border-slate-900 z-10 mt-4'></div>

                        {/* Desna Strana: Značenje (Književnost i Kultura) */}
                        <div className='w-full md:w-5/12 relative'>
                            <div className='bg-slate-800/80 p-6 rounded-2xl border-r-4 border-r-pink-500 border-y border-l border-slate-700 shadow-xl relative hover:-translate-y-1 transition-transform'>
                                <span className='text-pink-400 font-bold text-xs uppercase tracking-widest block mb-2'>
                                    Značenje i Književnost
                                </span>
                                <h4 className='text-xl font-bold text-white mb-3'>
                                    {item.culture.title}
                                </h4>
                                <p className='text-slate-300 text-sm leading-relaxed'>
                                    {item.culture.desc}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// --- MODUL 6: NAVIGACIJA ZA DALJNJE ISTRAŽIVANJE ---
const DaljnjeIstrazivanje = () => {
    const cards = [
        {
            id: "poezija-slikarstvo",
            title: "Poezija i Platno",
            description:
                'Kako se boje pretaču iz stihova u slike? Uđite u kreativnu radionicu i napišite vlastitu "obojenu" pjesmu inspiriranu poznatim likovnim djelima.',
            icon: <Feather size={36} className='text-white' />,
            gradient: "from-fuchsia-600 to-pink-500",
            hoverGradient:
                "group-hover:from-fuchsia-500 group-hover:to-pink-400",
            shadow: "hover:shadow-[0_0_30px_rgba(232,121,249,0.4)]",
        },
        {
            id: "katalog-nijansi",
            title: "Katalog Neobičnih Nijansi",
            description:
                "Od najstarijih i najskupljih do onih koje su smislili sami umjetnici (poput Kleinove plave ili suvremenog Vantablacka). Otkrijte najfascinantnije boje svijeta.",
            icon: <Sparkles size={36} className='text-white' />,
            gradient: "from-blue-600 to-cyan-500",
            hoverGradient: "group-hover:from-blue-500 group-hover:to-cyan-400",
            shadow: "hover:shadow-[0_0_30px_rgba(34,211,238,0.4)]",
        },
        {
            id: "dizajnerski-izazov",
            title: "Dizajnerski Izazov",
            description:
                "Testirajte svoje znanje u praksi! Uđite u ulogu grafičkog dizajnera i riješite problemski zadatak korištenja boja u digitalnom marketingu i brendiranju.",
            icon: <LayoutTemplate size={36} className='text-white' />,
            gradient: "from-amber-600 to-orange-500",
            hoverGradient:
                "group-hover:from-amber-500 group-hover:to-orange-400",
            shadow: "hover:shadow-[0_0_30px_rgba(251,146,60,0.4)]",
        },
    ];

    return (
        <div className='animate-in slide-in-from-bottom-8 duration-1000'>
            <div className='text-center mb-10'>
                <h2 className='text-3xl font-black text-white mb-4'>
                    Spremni za više?
                </h2>
                <p className='text-slate-400 max-w-2xl mx-auto'>
                    Vaše putovanje kroz svijet boja ovdje ne završava. Odaberite
                    jedan od modula ispod i primijenite naučeno kroz kreativne i
                    problemske zadatke.
                </p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto'>
                {cards.map((card) => (
                    <a
                        key={card.id}
                        href={`#${card.id}`} // Ovo ćeš kasnije zamijeniti pravim React Router linkom (npr. <Link to="...">)
                        className={`group relative flex flex-col bg-slate-800 rounded-2xl p-1 overflow-hidden transition-all duration-500 hover:-translate-y-2 ${card.shadow}`}>
                        {/* Animirana pozadina kartice */}
                        <div
                            className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-80 transition-all duration-500 ${card.hoverGradient}`}></div>

                        {/* Unutarnji tamni sloj za kontrast teksta */}
                        <div className='relative flex flex-col h-full bg-slate-900/90 rounded-xl p-6 backdrop-blur-sm z-10 transition-colors duration-500 group-hover:bg-slate-900/70'>
                            <div
                                className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${card.gradient} flex items-center justify-center mb-6 shadow-lg transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                                {card.icon}
                            </div>

                            <h3 className='text-2xl font-bold text-white mb-3 leading-tight'>
                                {card.title}
                            </h3>

                            <p className='text-slate-300 text-sm leading-relaxed mb-8 flex-grow'>
                                {card.description}
                            </p>

                            <div className='flex items-center text-white font-bold text-sm mt-auto group/btn'>
                                <span className='relative'>
                                    Započni lekciju
                                    <span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full'></span>
                                </span>
                                <ArrowRight
                                    size={18}
                                    className='ml-2 transform transition-transform duration-300 group-hover:translate-x-2'
                                />
                            </div>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
};

export default BojeKrozPovijest;
