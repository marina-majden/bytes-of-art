import React, { useState, useEffect, useMemo } from "react";
import {
    PaintBucket,
    Droplet,
    Check,
    RefreshCcw,
    ArrowRight,
    Info,
    Beaker,
} from "lucide-react";

// --- TIPOVI PODATAKA ---
interface BaseColor {
    name: string;
    label: string;
    css: string;
    rgb: [number, number, number];
}

interface RecipeItem {
    name: string;
    count: number;
}

interface Order {
    name: string;
    hint: string;
    level: "Lako" | "Srednje" | "Teško";
    recipe: RecipeItem[];
    target?: [number, number, number];
}

// --- KONSTANTE I BAZA BOJA ---
const BASE_COLORS: BaseColor[] = [
    { name: "Red", label: "Crvena", css: "#ef4444", rgb: [255, 0, 0] },
    { name: "Yellow", label: "Žuta", css: "#eab308", rgb: [255, 255, 0] },
    { name: "Blue", label: "Plava", css: "#3b82f6", rgb: [0, 0, 255] },
    { name: "White", label: "Bijela", css: "#f8fafc", rgb: [255, 255, 255] },
    { name: "Black", label: "Crna", css: "#0f172a", rgb: [0, 0, 0] },
    { name: "Green", label: "Zelena", css: "#22c55e", rgb: [0, 128, 0] },
    { name: "Crimson", label: "Grimizna", css: "#be123c", rgb: [220, 20, 60] },
    { name: "Orange", label: "Narančasta", css: "#f97316", rgb: [255, 165, 0] },
    { name: "Cyan", label: "Cijan", css: "#06b6d4", rgb: [0, 255, 255] },
    { name: "Magenta", label: "Magenta", css: "#d946ef", rgb: [255, 0, 255] },
    { name: "Coral", label: "Koraljna", css: "#f43f5e", rgb: [255, 127, 80] },
    { name: "Teal", label: "Tirkizna", css: "#14b8a6", rgb: [0, 128, 128] },
];

// Pomoćna funkcija za izračun ciljane RGB vrijednosti iz recepta
const computeTarget = (recipe: RecipeItem[]): [number, number, number] => {
    let r = 0,
        g = 0,
        b = 0,
        total = 0;
    recipe.forEach(({ name, count }) => {
        const c = BASE_COLORS.find((x) => x.name === name);
        if (c) {
            r += c.rgb[0] * count;
            g += c.rgb[1] * count;
            b += c.rgb[2] * count;
            total += count;
        }
    });
    return [
        Math.round(r / total),
        Math.round(g / total),
        Math.round(b / total),
    ];
};

// Pomoćna funkcija za pretvaranje RGB polja u HEX string
const rgbToHex = (rgb: [number, number, number] | null) => {
    if (!rgb) return "transparent";
    return (
        "#" +
        rgb
            .map((v) =>
                Math.min(255, Math.max(0, v)).toString(16).padStart(2, "0"),
            )
            .join("")
    );
};

// Pomoćna funkcija za računanje udaljenosti boja (točnosti)
const colorAccuracy = (
    a: [number, number, number],
    b: [number, number, number],
) => {
    const dist = Math.sqrt(
        Math.pow(a[0] - b[0], 2) +
            Math.pow(a[1] - b[1], 2) +
            Math.pow(a[2] - b[2], 2),
    );
    const maxDist = Math.sqrt(3 * 255 * 255);
    return Math.max(0, 1 - dist / maxDist);
};

// Generiranje narudžbi
const RAW_ORDERS: Order[] = [
    {
        name: "Izlazak Sunca",
        hint: "Crvena i Žuta u jednakom omjeru",
        level: "Lako",
        recipe: [
            { name: "Red", count: 1 },
            { name: "Yellow", count: 1 },
        ],
    },
    {
        name: "Šećerna Vuna",
        hint: "Bijela s poljupcem Magente",
        level: "Lako",
        recipe: [
            { name: "White", count: 3 },
            { name: "Magenta", count: 1 },
        ],
    },
    {
        name: "Ledeno Plava",
        hint: "Cijan snažno posvijetljen Bijelom",
        level: "Lako",
        recipe: [
            { name: "Cyan", count: 1 },
            { name: "White", count: 3 },
        ],
    },
    {
        name: "Sorbet od Limete",
        hint: "Žuta i Zelena, posvijetljene Bijelom",
        level: "Lako",
        recipe: [
            { name: "Yellow", count: 2 },
            { name: "Green", count: 1 },
            { name: "White", count: 1 },
        ],
    },
    {
        name: "Rumenilo Ruže",
        hint: "Koraljna omekšana Bijelom",
        level: "Lako",
        recipe: [
            { name: "Coral", count: 1 },
            { name: "White", count: 2 },
        ],
    },
    {
        name: "Prašnjavo Ljubičasta",
        hint: "Magenta, Bijela i dodir Crne",
        level: "Srednje",
        recipe: [
            { name: "Magenta", count: 1 },
            { name: "White", count: 3 },
            { name: "Black", count: 1 },
        ],
    },
    {
        name: "Vojnički Zelena",
        hint: "Zelena, Žuta i Crna",
        level: "Srednje",
        recipe: [
            { name: "Green", count: 2 },
            { name: "Yellow", count: 1 },
            { name: "Black", count: 1 },
        ],
    },
    {
        name: "Olujni Oblak",
        hint: "Crna, Bijela i Plava",
        level: "Srednje",
        recipe: [
            { name: "Black", count: 1 },
            { name: "White", count: 3 },
            { name: "Blue", count: 1 },
        ],
    },
    {
        name: "Izgorjeli Jantar",
        hint: "Narančasta, Grimizna i prstohvat Crne",
        level: "Srednje",
        recipe: [
            { name: "Orange", count: 2 },
            { name: "Crimson", count: 1 },
            { name: "Black", count: 1 },
        ],
    },
    {
        name: "Morsko Staklo",
        hint: "Tirkizna, Bijela i Cijan",
        level: "Srednje",
        recipe: [
            { name: "Teal", count: 1 },
            { name: "White", count: 2 },
            { name: "Cyan", count: 1 },
        ],
    },
    {
        name: "Stari Pergament",
        hint: "Bijela, Narančasta, Žuta i samo kap Crne",
        level: "Teško",
        recipe: [
            { name: "White", count: 4 },
            { name: "Orange", count: 1 },
            { name: "Yellow", count: 1 },
            { name: "Black", count: 1 },
        ],
    },
    {
        name: "Duboka Šljiva",
        hint: "Magenta, Plava, Crna i malo Crvene",
        level: "Teško",
        recipe: [
            { name: "Magenta", count: 2 },
            { name: "Blue", count: 2 },
            { name: "Black", count: 2 },
            { name: "Red", count: 1 },
        ],
    },
    {
        name: "Krošnja Džungle",
        hint: "Zelena, Tirkizna, Žuta i Crna",
        level: "Teško",
        recipe: [
            { name: "Green", count: 2 },
            { name: "Teal", count: 1 },
            { name: "Yellow", count: 1 },
            { name: "Black", count: 2 },
        ],
    },
];

const ORDERS = RAW_ORDERS.map((o) => ({
    ...o,
    target: computeTarget(o.recipe),
}));

const ColorGame = () => {
    // --- STATE ---
    const [orderNum, setOrderNum] = useState(1);
    const [score, setScore] = useState(0);
    const [bestScore, setBestScore] = useState(0);
    const [currentOrder, setCurrentOrder] = useState<Order>(ORDERS[0]);
    const [pours, setPours] = useState<Record<string, number>>({});
    const [totalPours, setTotalPours] = useState(0);

    const [showResult, setShowResult] = useState(false);
    const [resultData, setResultData] = useState<{
        accuracy: number;
        msg: string;
        stars: string;
        earned: number;
    } | null>(null);

    const [toast, setToast] = useState<string | null>(null);

    // Miješanje reda narudžbi pri prvom renderiranju
    useEffect(() => {
        loadNextOrder(1);
    }, []);

    // Toast Timer
    useEffect(() => {
        if (toast) {
            const timer = setTimeout(() => setToast(null), 2000);
            return () => clearTimeout(timer);
        }
    }, [toast]);

    const loadNextOrder = (newOrderNum: number) => {
        const shuffled = [...ORDERS].sort(() => Math.random() - 0.5);
        const idx = (newOrderNum - 1) % ORDERS.length;
        setCurrentOrder(shuffled[idx] || ORDERS[idx]);
        setOrderNum(newOrderNum);
    };

    const pourColor = (colorName: string, colorLabel: string) => {
        setPours((prev) => ({
            ...prev,
            [colorName]: (prev[colorName] || 0) + 1,
        }));
        setTotalPours((prev) => prev + 1);
        setToast(`+1 kap: ${colorLabel}`);
    };

    const clearBowl = () => {
        setPours({});
        setTotalPours(0);
    };

    const mixedRGB = useMemo(() => {
        if (totalPours === 0) return null;
        let r = 0,
            g = 0,
            b = 0;
        BASE_COLORS.forEach((c) => {
            const count = pours[c.name] || 0;
            if (count > 0) {
                r += c.rgb[0] * count;
                g += c.rgb[1] * count;
                b += c.rgb[2] * count;
            }
        });
        return [
            Math.round(r / totalPours),
            Math.round(g / totalPours),
            Math.round(b / totalPours),
        ] as [number, number, number];
    }, [pours, totalPours]);

    const mixedHex = rgbToHex(mixedRGB);
    const targetHex = rgbToHex(currentOrder.target || [0, 0, 0]);

    const serveIt = () => {
        if (totalPours === 0) {
            setToast("Prvo ulijte neku boju!");
            return;
        }

        if (!mixedRGB || !currentOrder.target) return;

        const accuracy = colorAccuracy(mixedRGB, currentOrder.target);
        const earned = Math.round(accuracy * 100);

        let newScore = score + earned;
        setScore(newScore);
        if (newScore > bestScore) setBestScore(newScore);

        const stars =
            accuracy >= 0.92 ? "⭐⭐⭐" : accuracy >= 0.75 ? "⭐⭐" : "⭐";
        const msg =
            accuracy >= 0.92
                ? "Savršen spoj!"
                : accuracy >= 0.75
                  ? "Vrlo blizu!"
                  : accuracy >= 0.5
                    ? "Treba još vježbe..."
                    : "Potpuni promašaj!";

        setResultData({ accuracy, msg, stars, earned });
        setShowResult(true);
    };

    const handleNextOrder = () => {
        setShowResult(false);
        clearBowl();
        loadNextOrder(orderNum + 1);
    };

    // Pomoć za određivanje boje teksta (crno/bijelo) na temelju svjetline pozadine
    const getContrastText = (rgb: [number, number, number]) => {
        const brightness = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000;
        return brightness > 125 ? "text-slate-900" : "text-white";
    };

    return (
        <div className='min-h-screen bg-slate-950 text-slate-200 font-sans p-4 md:p-8 relative selection:bg-purple-500/30'>
            {/* Toast Notifikacija */}
            <div
                className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-slate-800 border border-slate-700 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-2 transition-all duration-300 ${toast ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"}`}>
                <Droplet size={18} className='text-blue-400' />
                <span className='font-bold'>{toast}</span>
            </div>

            <header className='max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 mb-10 bg-slate-900/50 p-6 rounded-3xl border border-slate-800'>
                <div>
                    <h1 className='text-3xl md:text-4xl font-black flex items-center gap-3 text-white'>
                        <PaintBucket className='text-purple-500' size={36} />
                        Savrše spoj za boja boj!
                    </h1>
                    <p className='text-slate-400 mt-2'>
                        Izmiksaj savršenu nijansu prema narudžbi!
                    </p>
                </div>

                <div className='flex gap-6 bg-slate-900 p-4 rounded-2xl border border-slate-800'>
                    <div className='text-center px-4 border-r border-slate-700'>
                        <div className='text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1'>
                            Rezultat
                        </div>
                        <div className='text-2xl font-black text-purple-400'>
                            {score}
                        </div>
                    </div>
                    <div className='text-center px-4 border-r border-slate-700'>
                        <div className='text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1'>
                            Narudžba
                        </div>
                        <div className='text-2xl font-black text-blue-400'>
                            #{orderNum}
                        </div>
                    </div>
                    <div className='text-center px-4'>
                        <div className='text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1'>
                            Najbolje
                        </div>
                        <div className='text-2xl font-black text-slate-300'>
                            {bestScore}
                        </div>
                    </div>
                </div>
            </header>

            <main className='max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 relative'>
                {/* --- LIJEVI PANEL: Narudžba --- */}
                <div className='bg-slate-900 rounded-3xl border border-slate-800 p-6 shadow-xl flex flex-col gap-6'>
                    <h2 className='text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2'>
                        <Check size={16} /> Današnja narudžba
                    </h2>

                    <div className='bg-slate-950 rounded-2xl border border-slate-800 p-5 relative overflow-hidden group'>
                        {/* Bedž narudžbe */}
                        <div className='absolute top-0 left-4 bg-purple-600 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-b-lg z-10 shadow-lg'>
                            Narudžba #{orderNum}
                        </div>

                        {/* Ciljana boja */}
                        <div
                            className='w-full h-32 md:h-40 rounded-xl mt-6 mb-5 flex items-center justify-center shadow-inner border border-white/10 transition-colors duration-500 relative'
                            style={{ backgroundColor: targetHex }}>
                            <div className='absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl'></div>
                            <span className='font-mono text-sm bg-black/40 backdrop-blur-md px-3 py-1 rounded-lg text-white font-bold opacity-0 group-hover:opacity-100 transition-opacity z-10 border border-white/20'>
                                {targetHex.toUpperCase()}
                            </span>
                        </div>

                        <div className='flex justify-between items-end'>
                            <div>
                                <h3 className='text-2xl font-black text-white mb-1'>
                                    {currentOrder.name}
                                </h3>
                                <details className='text-sm text-slate-300 italic cursor-pointer'>
                                    <summary>
                                        Hint <Info size={14} />{" "}
                                    </summary>

                                    {currentOrder.hint}
                                </details>
                            </div>
                            <span
                                className={`text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg border ${
                                    currentOrder.level === "Lako"
                                        ? "bg-green-950/50 text-green-400 border-green-900/50"
                                        : currentOrder.level === "Srednje"
                                          ? "bg-yellow-950/50 text-yellow-400 border-yellow-900/50"
                                          : "bg-red-950/50 text-red-400 border-red-900/50"
                                }`}>
                                {currentOrder.level}
                            </span>
                        </div>
                    </div>

                    <div className='bg-slate-800/30 rounded-2xl p-5 border border-slate-800 flex-grow'>
                        <h3 className='text-xs font-bold uppercase tracking-widest text-slate-500 mb-4'>
                            Tvoj omjer miješanja
                        </h3>
                        <div className='flex flex-col gap-3'>
                            {Object.keys(pours).length === 0 ? (
                                <p className='text-sm text-slate-600 italic'>
                                    Još nije dodana boja.
                                </p>
                            ) : (
                                Object.entries(pours).map(([name, count]) => {
                                    const colorInfo = BASE_COLORS.find(
                                        (c) => c.name === name,
                                    );
                                    if (!colorInfo || count === 0) return null;
                                    const pct = Math.round(
                                        (count / totalPours) * 100,
                                    );

                                    return (
                                        <div
                                            key={name}
                                            className='flex items-center gap-4 text-sm font-medium'>
                                            <span className='w-20 text-slate-300'>
                                                {colorInfo.label}
                                            </span>
                                            <div className='flex-grow h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800'>
                                                <div
                                                    className='h-full transition-all duration-300 rounded-full'
                                                    style={{
                                                        width: `${pct}%`,
                                                        backgroundColor:
                                                            colorInfo.css,
                                                    }}></div>
                                            </div>
                                            <span className='w-10 text-right text-slate-400 font-mono'>
                                                {pct}%
                                            </span>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </div>
                </div>

                {/* --- DESNI PANEL: Posuda i Sastojci --- */}
                <div className='bg-slate-900 rounded-3xl border border-slate-800 p-6 shadow-xl flex flex-col gap-6'>
                    <h2 className='text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2'>
                        <Beaker size={16} /> Posuda za miješanje
                    </h2>

                    <div
                        className={`w-full h-32 md:h-40 rounded-2xl flex items-center justify-center border-2 transition-all duration-300 shadow-inner overflow-hidden relative ${totalPours === 0 ? "bg-slate-950 border-slate-800" : "border-transparent"}`}
                        style={{
                            backgroundColor:
                                totalPours > 0 ? mixedHex : undefined,
                        }}>
                        {/* Tekstura tekućine ako ima boje */}
                        {totalPours > 0 && (
                            <div className='absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent mix-blend-overlay'></div>
                        )}

                        {totalPours === 0 ? (
                            <span className='text-sm text-slate-600 italic'>
                                Počnite s ulijevanjem boja &rarr;
                            </span>
                        ) : (
                            <span
                                className={`font-mono text-lg font-bold z-10 drop-shadow-md ${mixedRGB ? getContrastText(mixedRGB) : ""}`}>
                                {mixedHex.toUpperCase()}
                            </span>
                        )}
                    </div>

                    <div>
                        <h2 className='text-xs font-bold uppercase tracking-widest text-slate-500 mb-4 flex items-center gap-2'>
                            Sastojci (klikni za dodavanje)
                        </h2>
                        <div className='grid grid-cols-3 sm:grid-cols-4 gap-2'>
                            {BASE_COLORS.map((c) => (
                                <button
                                    key={c.name}
                                    onClick={() => pourColor(c.name, c.label)}
                                    className='flex flex-col items-center gap-2 p-3 rounded-xl transition-all duration-200 transform hover:-translate-y-1 active:scale-95 border border-slate-800 shadow-sm'
                                    style={{
                                        backgroundColor: c.css,
                                        color: getContrastText(c.rgb),
                                        boxShadow: `inset 0 -4px 0 rgba(0,0,0,0.2)`,
                                    }}>
                                    <Droplet
                                        size={20}
                                        className='drop-shadow-sm opacity-80'
                                    />
                                    <span className='text-[10px] sm:text-xs font-bold tracking-wider drop-shadow-md'>
                                        {c.label}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className='flex gap-3 mt-auto pt-4 border-t border-slate-800'>
                        <button
                            onClick={clearBowl}
                            className='flex-1 py-3 rounded-xl font-bold text-slate-300 bg-slate-800 hover:bg-slate-700 transition-colors flex justify-center items-center gap-2'>
                            <RefreshCcw size={18} /> Očisti
                        </button>
                        <button
                            onClick={serveIt}
                            className='flex-[2] py-3 rounded-xl font-black text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-lg hover:shadow-purple-500/25 transition-all flex justify-center items-center gap-2'>
                            <PaintBucket size={20} /> Predaj svoju boju
                        </button>
                    </div>
                </div>

                {/* --- REZULTAT (OVERLAY) --- */}
                {showResult && resultData && (
                    <div className='absolute inset-0 z-40 bg-slate-950/80 backdrop-blur-md rounded-3xl flex items-center justify-center p-6 animate-in fade-in zoom-in duration-300'>
                        <div className='bg-slate-900 border border-slate-700 p-8 rounded-3xl shadow-2xl max-w-md w-full text-center flex flex-col items-center'>
                            <div className='text-4xl mb-4 tracking-widest'>
                                {resultData.stars}
                            </div>
                            <h2 className='text-6xl font-black text-purple-400 mb-2'>
                                {Math.round(resultData.accuracy * 100)}%
                            </h2>
                            <p className='text-xl font-bold text-white mb-8'>
                                {resultData.msg}
                            </p>

                            <div className='flex justify-center items-center gap-6 mb-8 w-full'>
                                <div className='flex flex-col items-center'>
                                    <div
                                        className='w-20 h-20 rounded-2xl shadow-inner border border-white/10 mb-2'
                                        style={{
                                            backgroundColor: targetHex,
                                        }}></div>
                                    <span className='text-xs text-slate-400 font-bold uppercase tracking-wider'>
                                        Cilj
                                    </span>
                                </div>
                                <div className='text-slate-600 font-black'>
                                    VS
                                </div>
                                <div className='flex flex-col items-center'>
                                    <div
                                        className='w-20 h-20 rounded-2xl shadow-inner border border-white/10 mb-2'
                                        style={{
                                            backgroundColor: mixedHex,
                                        }}></div>
                                    <span className='text-xs text-slate-400 font-bold uppercase tracking-wider'>
                                        Tvoje
                                    </span>
                                </div>
                            </div>

                            <div className='text-sm text-slate-400 mb-8 border-t border-slate-800 pt-4 w-full'>
                                Osvojeno bodova:{" "}
                                <strong className='text-white'>
                                    +{resultData.earned}
                                </strong>
                            </div>

                            <button
                                onClick={handleNextOrder}
                                className='w-full py-4 rounded-xl font-black text-white bg-blue-600 hover:bg-blue-500 transition-colors flex justify-center items-center gap-2 shadow-lg hover:shadow-blue-500/25'>
                                Sljedeća narudžba <ArrowRight size={18} />
                            </button>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default ColorGame;
