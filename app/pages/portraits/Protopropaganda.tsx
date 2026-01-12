import React, { useState, useEffect, useRef } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement,
    RadialLinearScale,
    ArcElement,
    Filler,
    type ChartData,
    type ChartOptions,
    BubbleController,
} from "chart.js";
import { Bar, Doughnut, Bubble, Line, Radar } from "react-chartjs-2";
import {
    Menu,
    BarChart3,
    Landmark,
    BrainCircuit,
    ScrollText,
    Sparkles,
    Send,
    RefreshCw,
    X,
} from "lucide-react";

// --- Registracija Chart.js komponenti ---
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    RadialLinearScale,
    ArcElement,
    BubbleController,
    Filler,
    Title,
    Tooltip,
    Legend
);

// --- Tipovi ---
type TabType = "overview" | "visual" | "psychology" | "text" | "ai-lab";

interface ChatMessage {
    role: "user" | "model";
    text: string;
}

// --- Boje ---
const colors = {
    clay: "#7E61FF",
    blue: "#3D83FF",
    green: "#2ADDAA",
    cyan: "#2EADFF",
    gray: "#515151",
    teal: "#14B0A6",
};

const ProtoPropaganda: React.FC = () => {
    const [activeTab, setActiveTab] = useState<TabType>("overview");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // State za detalje interakcije
    const [romanDetail, setRomanDetail] = useState<string>(
        "<em>Kliknite na segment proračuna kako biste vidjeli njegovu funkciju.</em>"
    );
    const [psychDetail, setPsychDetail] = useState<{
        title: string;
        desc: string;
        x: number;
        y: number;
    } | null>(null);

    // AI State
    const [transInput, setTransInput] = useState("");
    const [transStyle, setTransStyle] = useState("Roman Emperor");
    const [transOutput, setTransOutput] = useState("");
    const [isTransLoading, setIsTransLoading] = useState(false);

    const [chatInput, setChatInput] = useState("");
    const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
    const [isChatLoading, setIsChatLoading] = useState(false);

    const chatEndRef = useRef<HTMLDivElement>(null);
    const plotlyRef = useRef<HTMLDivElement>(null);

    const apiKey = ""; // API ključ se ubacuje iz okoline

    // --- Scroll do dna chata ---
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chatHistory]);

    // --- Plotly 3D Chart (CDN Loading Hook) ---
    useEffect(() => {
        if (activeTab === "overview" && plotlyRef.current) {
            // Dinamičko učitavanje Plotly-ja samo ako nije učitan
            if (!(window as any).Plotly) {
                const script = document.createElement("script");
                script.src = "https://cdn.plot.ly/plotly-2.27.0.min.js";
                script.async = true;
                script.onload = renderPlotly;
                document.body.appendChild(script);
            } else {
                renderPlotly();
            }
        }
    }, [activeTab]);

    const renderPlotly = () => {
        if (!plotlyRef.current || !(window as any).Plotly) return;

        const trace3d = {
            x: [10, 80, 40, 90, 20], // Gustoća
            y: [1, 5, 20, 50, 2], // Brzina
            z: [100, 5, 80, 1, 90], // Trajnost
            mode: "markers",
            marker: {
                size: 10,
                color: [
                    colors.clay,
                    colors.blue,
                    colors.green,
                    colors.cyan,
                    colors.teal,
                ],
            },
            text: ["Piramide", "Kovanice", "Knjige", "Glasine", "Kipovi"],
            type: "scatter3d",
        };

        const layout3d = {
            margin: { l: 0, r: 0, b: 0, t: 0 },
            paper_bgcolor: "rgba(0,0,0,0)",
            scene: {
                xaxis: { title: "Gustoća" },
                yaxis: { title: "Brzina" },
                zaxis: { title: "Trajnost" },
            },
            height: 350, // Fiksna visina za Plotly
        };

        (window as any).Plotly.newPlot(plotlyRef.current, [trace3d], layout3d, {
            displayModeBar: false,
            responsive: true,
        });
    };

    // --- AI HANDLERS ---

    const handleTranslate = async () => {
        if (!transInput.trim()) return;
        setIsTransLoading(true);
        setTransOutput("");

        const prompt = `Prepiši sljedeću pritužbu: "${transInput}" u stilu povijesne ličnosti: ${transStyle}. Odgovori samo prepisanim tekstom na hrvatskom jeziku.`;

        try {
            const response = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        contents: [{ parts: [{ text: prompt }] }],
                    }),
                }
            );
            const data = await response.json();
            setTransOutput(
                data.candidates?.[0]?.content?.parts?.[0]?.text ||
                    "Greška u prijevodu."
            );
        } catch (e) {
            setTransOutput("Došlo je do greške u komunikaciji s API-jem.");
        } finally {
            setIsTransLoading(false);
        }
    };

    const handleChat = async () => {
        if (!chatInput.trim()) return;
        const userMsg = chatInput;
        setChatHistory((prev) => [...prev, { role: "user", text: userMsg }]);
        setChatInput("");
        setIsChatLoading(true);

        const prompt = `Ti si Niccolò Machiavelli. Odgovori na pitanje korisnika iz perspektive renesansne realpolitike i manipulacije masama. Pitanje: "${userMsg}". Odgovori kratko i jezgrovito na hrvatskom.`;

        try {
            const response = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        contents: [{ parts: [{ text: prompt }] }],
                    }),
                }
            );
            const data = await response.json();
            const botReply =
                data.candidates?.[0]?.content?.parts?.[0]?.text ||
                "Eterične smetnje.";
            setChatHistory((prev) => [
                ...prev,
                { role: "model", text: botReply },
            ]);
        } catch (e) {
            setChatHistory((prev) => [
                ...prev,
                { role: "model", text: "Greška u vezi." },
            ]);
        } finally {
            setIsChatLoading(false);
        }
    };

    // --- PODACI ZA GRAFIKONE ---

    const archData: ChartData<"bar"> = {
        labels: [
            ["Pisani", "edikti"],
            ["Kraljevske", "procesije"],
            ["Ikonografija", "kovanica"],
            ["Monumentalna", "arhitektura"],
        ],
        datasets: [
            {
                label: "Doseg (% populacije)",
                data: [1, 25, 80, 100],
                backgroundColor: [
                    colors.cyan,
                    colors.teal,
                    colors.green,
                    colors.clay,
                ],
                borderRadius: 4,
            },
        ],
    };

    const romanData: ChartData<"doughnut"> = {
        labels: [
            "Vojska",
            "Administracija",
            "Podjela žita",
            "Igre/Cirkusi",
            "Javni radovi",
        ],
        datasets: [
            {
                data: [45, 15, 20, 15, 5],
                backgroundColor: [
                    colors.clay,
                    colors.cyan,
                    colors.green,
                    colors.teal,
                    "#E5E7EB",
                ],
                borderWidth: 0,
            },
        ],
    };

    const bubbleData: ChartData<"bubble"> = {
        datasets: [
            {
                label: "Metode",
                data: [
                    {
                        x: 90,
                        y: 90,
                        r: 15,
                        label: "Javna smaknuća",
                        desc: "Visok strah, Visok doseg. Demonstrira cijenu otpora.",
                    },
                    {
                        x: 100,
                        y: 10,
                        r: 30,
                        label: "Kovani novac",
                        desc: "Maks. doseg, Niska emocija. Podsvjesni podsjetnik na autoritet.",
                    },
                    {
                        x: 40,
                        y: 70,
                        r: 40,
                        label: "Trijumfi",
                        desc: "Srednji doseg, Visoko strahopoštovanje. Skupi spektakli pobjede.",
                    },
                    {
                        x: 20,
                        y: 40,
                        r: 25,
                        label: "Portreti",
                        desc: "Nizak doseg, Srednje strahopoštovanje. Kipovi na gradskim trgovima.",
                    },
                    {
                        x: 60,
                        y: 80,
                        r: 10,
                        label: "Vjerski dekreti",
                        desc: "Srednji doseg, Visok strah/nada. Iskorištavanje zagrobnog života.",
                    },
                ] as any, // Type cast zbog custom properties
                backgroundColor: colors.clay + "99",
                borderColor: colors.clay,
            },
        ],
    };

    const lineData: ChartData<"line"> = {
        labels: ["1500", "1550", "1600", "1650", "1700", "1750", "1789"],
        datasets: [
            {
                label: "Pamfleti (Tisuće)",
                data: [5, 20, 45, 120, 300, 800, 4500],
                borderColor: colors.clay,
                backgroundColor: colors.clay + "20",
                fill: true,
                tension: 0.4,
            },
        ],
    };

    const radarData: ChartData<"radar"> = {
        labels: [
            "Vizualni utjecaj",
            "Brzina",
            "Trajnost",
            "Dostupnost",
            "Državna kontrola",
        ],
        datasets: [
            {
                label: "Arhitektura",
                data: [10, 1, 10, 10, 9],
                borderColor: colors.clay,
                backgroundColor: "transparent",
            },
            {
                label: "Pamfleti",
                data: [3, 8, 4, 6, 2],
                borderColor: colors.clay,
                backgroundColor: colors.clay + "40",
            },
        ],
    };

    // --- OPCIJE ZA GRAFIKONE ---
    const romanOptions: ChartOptions<"doughnut"> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: "right", labels: { boxWidth: 12 } } },
        onClick: (e, elements) => {
            if (elements.length > 0) {
                const index = elements[0].index;
                const descriptions = [
                    "<strong>Vojska:</strong> Ultimativna batina. Održavanje Pax Romane zahtijevalo je masivne legije.",
                    "<strong>Administracija:</strong> Birokracija za prikupljanje poreza i upravljanje provincijama.",
                    "<strong>Podjela žita:</strong> 200.000 građana primalo je besplatno žito svakodnevno. Glad uzrokuje nerede.",
                    "<strong>Igre/Cirkusi:</strong> Odvraćanje pažnje i emocionalno rasterećenje. Car se ovdje povezivao sa svjetinom.",
                    "<strong>Javni radovi:</strong> Kupke i akvadukti za pokazivanje dobročiniteljstva države.",
                ];
                setRomanDetail(descriptions[index]);
            }
        },
    };

    const bubbleOptions: ChartOptions<"bubble"> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: { callbacks: { label: (ctx: any) => ctx.raw.label } },
        },
        scales: {
            x: {
                title: { display: true, text: "Doseg publike (%)" },
                min: 0,
                max: 110,
            },
            y: {
                title: {
                    display: true,
                    text: "Intenzitet (Strah/Strahopoštovanje)",
                },
                min: 0,
                max: 100,
            },
        },
        onClick: (e, elements) => {
            if (elements.length > 0) {
                const raw = bubbleData.datasets[0].data[
                    elements[0].index
                ] as any;
                setPsychDetail({
                    title: raw.label,
                    desc: raw.desc,
                    x: raw.x,
                    y: raw.y,
                });
            }
        },
    };

    return (
        <div className='flex h-screen flex-col overflow-hidden bg-slate-800 font-sans md:flex-row'>
            {/* Mobile Header */}
            <header className='z-20 flex items-center justify-between border-b bg-slate-900 p-4 md:hidden'>
                <h1 className='font-display text-xl font-bold text-cyan-400'>
                    Protopropaganda
                </h1>
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className='text-cyan-600 focus:outline-none'>
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </header>

            {/* Sidebar */}
            <nav
                className={`absolute z-10 flex h-full w-full flex-shrink-0 flex-col border-r border-cyan-800 bg-slate-900 transition-transform duration-300 md:relative md:w-64 md:translate-x-0 ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"} shadow-lg md:shadow-none`}>
                <div className='hidden border-b border-cyan-600 p-6 md:block'>
                    <h1 className='serif-font text-2xl font-bold text-cyan-600'>
                        Proto-propaganda
                    </h1>
                    <p className='mt-1 text-xs text-gray-500'>
                        do Francuske revolucije <br />
                        (2500. pr. Kr. - 1789. g.)
                    </p>
                </div>

                <div className='flex-grow space-y-1 py-4'>
                    {[
                        {
                            id: "overview",
                            label: "Pregled",
                            icon: <BarChart3 size={18} />,
                        },
                        {
                            id: "visual",
                            label: "Vizualna dominacija",
                            icon: <Landmark size={18} />,
                        },
                        {
                            id: "psychology",
                            label: "Psihologija",
                            icon: <BrainCircuit size={18} />,
                        },
                        {
                            id: "text",
                            label: "Tekstualna revolucija",
                            icon: <ScrollText size={18} />,
                        },
                        {
                            id: "ai-lab",
                            label: "AI Povjesničar",
                            icon: <Sparkles size={18} />,
                            color: "text-indigo-800",
                        },
                    ].map((item) => (
                        <div
                            key={item.id}
                            onClick={() => {
                                setActiveTab(item.id as TabType);
                                setIsMobileMenuOpen(false);
                            }}
                            className={`flex cursor-pointer items-center px-6 py-3 text-sm font-medium transition-all duration-300 ${activeTab === item.id ? "border-l-4 border-cyan-600 bg-slate-900 text-white" : `hover:bg-slate-700 ${item.color || "text-gray-200"}`}`}>
                            <span className='mr-3'>{item.icon}</span>{" "}
                            {item.label}
                        </div>
                    ))}
                </div>

                <div className='border-t border-slate-900 p-4'>
                    <div className='rounded bg-slate-800 p-3 text-xs text-gray-300'>
                        <p className='mb-1 font-bold'>Izvorni izvještaj:</p>
                        "Propaganda u politici prije glavnostrujaških medija"
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className='relative flex-1 overflow-y-auto bg-slate-950 p-4 md:p-8'>
                {/* TAB: OVERVIEW */}
                {activeTab === "overview" && (
                    <div className='mx-auto max-w-4xl animate-fade-in'>
                        <div className='mb-8'>
                            <h2 className='serif-font mb-2 text-3xl font-bold text-gray-300'>
                                Arhitektura kontrole
                            </h2>
                            <p className='text-lg leading-relaxed text-gray-200'>
                                Prije masovnih medija, moć se nije emitirala;
                                ona se gradila, kovala i ritualizirala. Vladari
                                su koristili sofisticiranu "medijsku matricu"
                                kako bi održali legitimitet u eri gotovo nulte
                                pismenosti.
                            </p>
                        </div>

                        <div className='mb-10 grid grid-cols-1 gap-6 md:grid-cols-3'>
                            <div className='rounded-lg border-t-4 border-indigo-900 bg-indigo-800 p-6 shadow-sm'>
                                <h3 className='text-sm font-bold uppercase tracking-wider text-gray-00'>
                                    Povijesna pismenost
                                </h3>
                                <div className='mt-2 text-4xl font-bold text-gray-800'>
                                    &lt; 1%
                                </div>
                                <p className='mt-2 text-sm text-gray-500'>
                                    Postotak populacije koja zna čitati u starom
                                    Egiptu/Mezopotamiji.
                                </p>
                            </div>
                            <div className='rounded-lg border-t-4 border-cyan-500 bg-slate-800 p-6 shadow-sm'>
                                <h3 className='text-sm font-bold uppercase tracking-wider text-gray-400'>
                                    Primarni kanal
                                </h3>
                                <div className='mt-2 text-2xl font-bold text-gray-800'>
                                    Monumentalno
                                </div>
                                <p className='mt-2 text-sm text-gray-500'>
                                    Fizička prisutnost (kipovi, hramovi) bila je
                                    jedini dostupni "masovni medij".
                                </p>
                            </div>
                            <div className='rounded-lg border-t-4 border-gray-600 bg-slate-800 p-6 shadow-sm'>
                                <h3 className='text-sm font-bold uppercase tracking-wider text-gray-400'>
                                    Prekretnica
                                </h3>
                                <div className='mt-2 text-2xl font-bold text-gray-800'>
                                    1440. g.
                                </div>
                                <p className='mt-2 text-sm text-gray-500'>
                                    Izum Gutenbergova tiskarskog stroja,
                                    premještanje moći sa Sliki na Riječ.
                                </p>
                            </div>
                        </div>

                        <div className='mb-6 rounded-lg bg-slate-800 p-6 shadow-sm'>
                            <h3 className='serif-font mb-4 text-xl font-bold text-gray-800'>
                                Dimenzije diseminacije
                            </h3>
                            <p className='mb-4 text-sm text-gray-600'>
                                Interaktivno istraživanje kako su trajnost
                                medija i brzina evoluirali.
                            </p>
                            <div
                                ref={plotlyRef}
                                className='h-[350px] w-full rounded border border-gray-100 bg-gray-50'></div>
                        </div>
                    </div>
                )}

                {/* TAB: VISUAL */}
                {activeTab === "visual" && (
                    <div className='mx-auto max-w-5xl animate-fade-in'>
                        <h2 className='serif-font mb-4 text-3xl font-bold text-gray-800'>
                            Valuta strahopoštovanja
                        </h2>
                        <p className='mb-8 max-w-3xl text-gray-600'>
                            U nedostatku Twittera, rimski carevi i faraoni
                            koristili su fizički svijet kao svoje platno.
                            Spomenici su projicirali vječnu stabilnost, dok su
                            kovanice služile kao prvi "viralni" sadržaj.
                        </p>

                        <div className='grid grid-cols-1 gap-8 lg:grid-cols-2'>
                            <div className='rounded-lg bg-slate-800 p-6 shadow-sm'>
                                <h3 className='mb-2 text-lg font-bold text-indigo-800'>
                                    Vizualni doseg naspram tekstualnog
                                </h3>
                                <p className='mb-4 text-xs text-gray-500'>
                                    Zašto su vladari gradili piramide umjesto
                                    pisanja manifesta.
                                </p>
                                <div className='h-[300px] w-full'>
                                    <Bar
                                        data={archData}
                                        options={{
                                            responsive: true,
                                            maintainAspectRatio: false,
                                            scales: {
                                                y: {
                                                    beginAtZero: true,
                                                    grid: { display: false },
                                                },
                                                x: { grid: { display: false } },
                                            },
                                            plugins: {
                                                legend: { display: false },
                                            },
                                        }}
                                    />
                                </div>
                                <div className='mt-4 rounded border-l-4 border-indigo-800 bg-slate-600 p-3 text-sm text-gray-200'>
                                    <strong>Uvid:</strong> Spomenik se obraća
                                    100% populacije, bez obzira na jezik ili
                                    obrazovanje.
                                </div>
                            </div>

                            <div className='rounded-lg bg-slate-800 p-6 shadow-sm'>
                                <h3 className='mb-2 text-lg font-bold text-cyan-500'>
                                    Cijena mira: Rimski proračun
                                </h3>
                                <p className='mb-4 text-xs text-gray-500'>
                                    Financiranje "Kruha i igara" (Panem et
                                    Circenses).
                                </p>
                                <div className='h-[300px] w-full'>
                                    <Doughnut
                                        data={romanData}
                                        options={romanOptions}
                                    />
                                </div>
                                <div
                                    className='mt-4 h-24 overflow-y-auto rounded bg-slate-600 p-3 text-sm text-gray-200'
                                    dangerouslySetInnerHTML={{
                                        __html: romanDetail,
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* TAB: PSYCHOLOGY */}
                {activeTab === "psychology" && (
                    <div className='mx-auto flex h-full max-w-6xl flex-col animate-fade-in'>
                        <div className='mb-6'>
                            <h2 className='serif-font text-3xl font-bold text-gray-800'>
                                Psihologija vladavine
                            </h2>
                            <p className='mt-2 text-gray-600'>
                                Propaganda nije samo informacija; ona je
                                emocija. Predmoderni vladari balansirali su tri
                                poluge: Strah, Strahopoštovanje i
                                Dobročiniteljstvo.
                            </p>
                        </div>

                        <div className='flex flex-1 flex-col gap-6 lg:flex-row'>
                            <div className='flex-1 rounded-lg bg-slate-800 p-6 shadow-sm'>
                                <div className='mb-4 flex items-center justify-between'>
                                    <h3 className='text-lg font-bold text-gray-700'>
                                        Mapiranje metoda manipulacije
                                    </h3>
                                    <span className='rounded bg-slate-600 px-2 py-1 text-xs text-gray-200'>
                                        X: Doseg | Y: Intenzitet | Veličina:
                                        Trošak
                                    </span>
                                </div>
                                <div className='h-[400px] w-full'>
                                    <Bubble
                                        data={bubbleData}
                                        options={bubbleOptions}
                                    />
                                </div>
                            </div>

                            <div className='w-full flex-shrink-0 rounded-lg border-l-4 border-indigo-800 bg-white p-6 shadow-sm lg:w-80'>
                                <h3 className='mb-4 text-xl font-bold text-indigo-800'>
                                    Detalji mehanizma
                                </h3>
                                {psychDetail ? (
                                    <div className='animate-fade-in-up'>
                                        <h4 className='text-lg font-bold text-gray-800'>
                                            {psychDetail.title}
                                        </h4>
                                        <div className='mt-2 text-sm text-gray-600'>
                                            {psychDetail.desc}
                                        </div>
                                        <div className='mt-4 grid grid-cols-2 gap-2 text-xs text-gray-500'>
                                            <div>
                                                Doseg:{" "}
                                                <strong>
                                                    {psychDetail.x}%
                                                </strong>
                                            </div>
                                            <div>
                                                Intenzitet:{" "}
                                                <strong>
                                                    {psychDetail.y}/100
                                                </strong>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <p className='text-sm italic text-gray-500'>
                                        Odaberite mjehurić na grafikonu za
                                        analizu.
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* TAB: TEXT */}
                {activeTab === "text" && (
                    <div className='mx-auto max-w-5xl animate-fade-in'>
                        <h2 className='serif-font mb-4 text-3xl font-bold text-gray-800'>
                            Od monolita do pamfleta
                        </h2>
                        <p className='mb-8 max-w-3xl text-gray-600'>
                            Izum tiskarskog stroja demokratizirao je propagandu.
                            Postala je jeftina, prenosiva i nemoguća za potpunu
                            cenzuru.
                        </p>

                        <div className='mb-8 grid grid-cols-1 gap-8 md:grid-cols-2'>
                            <div className='col-span-1 rounded-lg bg-slate-800 p-6 shadow-sm md:col-span-2'>
                                <h3 className='text-lg font-bold text-indigo-800'>
                                    Eksplozija otpora (1500.-1789.)
                                </h3>
                                <p className='mb-4 text-sm text-gray-500'>
                                    Procijenjena naklada političkih pamfleta
                                    (Tisuće).
                                </p>
                                <div className='h-[300px] w-full'>
                                    <Line
                                        data={lineData}
                                        options={{
                                            responsive: true,
                                            maintainAspectRatio: false,
                                            scales: {
                                                y: { beginAtZero: true },
                                            },
                                        }}
                                    />
                                </div>
                            </div>

                            <div className='rounded-lg bg-slate-800 p-6 shadow-sm'>
                                <h3 className='text-lg font-bold text-gray-800'>
                                    Usporedba medijskih kanala
                                </h3>
                                <p className='mb-4 text-xs text-gray-500'>
                                    Usporedba atributa antičkih naspram
                                    ranomodernih medija.
                                </p>
                                <div className='h-[300px] w-full'>
                                    <Radar
                                        data={radarData}
                                        options={{
                                            responsive: true,
                                            maintainAspectRatio: false,
                                            scales: { r: { min: 0, max: 10 } },
                                        }}
                                    />
                                </div>
                            </div>

                            <div className='flex flex-col justify-center rounded-lg bg-slate-800  p-6 shadow-sm'>
                                <h3 className='mb-4 text-lg font-bold text-cyan-500'>
                                    Pomak
                                </h3>
                                <ul className='space-y-4'>
                                    <li className='flex items-start'>
                                        <span className='mr-3 text-2xl'>
                                            🏛️
                                        </span>
                                        <div>
                                            <strong className='block text-gray-700'>
                                                Antički model
                                            </strong>
                                            <span className='text-sm text-gray-500'>
                                                Odozgo-prema-dolje, Skupo,
                                                Stacionarno. Dizajnirano da
                                                uguši misao kroz
                                                strahopoštovanje.
                                            </span>
                                        </div>
                                    </li>
                                    <li className='flex items-start'>
                                        <span className='mr-3 text-2xl'>
                                            📜
                                        </span>
                                        <div>
                                            <strong className='block text-gray-700'>
                                                Model pamfleta
                                            </strong>
                                            <span className='text-sm text-gray-500'>
                                                Lateralno, Jeftino, Prenosivo.
                                                Dizajnirano da potakne raspravu
                                                i bijes.
                                            </span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                )}

                {/* TAB: AI LAB */}
                {activeTab === "ai-lab" && (
                    <div className='mx-auto max-w-4xl animate-fade-in'>
                        <div className='overflow-hidden rounded-xl border border-cyan-500 bg-slate-900 shadow-lg'>
                            <div className='bg-[#374151] p-6 text-white'>
                                <h2 className='flex items-center text-2xl font-bold'>
                                    <span className='mr-2 text-cyan-500'>
                                        <Sparkles size={24} />
                                    </span>{" "}
                                    AI Povjesničar Laboratorij
                                </h2>
                                <p className='mt-1 text-sm text-gray-300'>
                                    Eksperimentalni API alati za istraživanje
                                    povijesne retorike.
                                </p>
                            </div>

                            <div className='grid grid-cols-1 gap-8 p-6 md:grid-cols-2'>
                                {/* Translator */}
                                <div className='rounded-lg border border-gray-200 bg-gray-50 p-4'>
                                    <h3 className='mb-2 font-bold text-indigo-800'>
                                        📜 Retorički prepisivač
                                    </h3>
                                    <p className='mb-4 text-xs text-gray-500'>
                                        Prepišite moderne pritužbe u stilovima
                                        povijesne propagande.
                                    </p>

                                    <textarea
                                        value={transInput}
                                        onChange={(e) =>
                                            setTransInput(e.target.value)
                                        }
                                        className='mb-3 w-full rounded border p-3 text-sm focus:border-cyan-500 focus:outline-none'
                                        rows={3}
                                        placeholder='npr., Ceste su pune rupa.'
                                    />

                                    <select
                                        value={transStyle}
                                        onChange={(e) =>
                                            setTransStyle(e.target.value)
                                        }
                                        className='mb-3 w-full rounded border bg-white p-2 text-sm'>
                                        <option value='Roman Emperor'>
                                            Rimski car (Autoritativno)
                                        </option>
                                        <option value='Medieval Pope'>
                                            Srednjovjekovni papa (Religijski)
                                        </option>
                                        <option value='French Revolutionary'>
                                            Francuski revolucionar (Vatreno)
                                        </option>
                                    </select>

                                    <button
                                        onClick={handleTranslate}
                                        disabled={isTransLoading}
                                        className='flex w-full items-center justify-center rounded bg-indigo-800 py-2 text-sm font-bold text-white transition hover:bg-cyan-500 disabled:opacity-50'>
                                        {isTransLoading ? (
                                            <RefreshCw
                                                className='mr-2 animate-spin'
                                                size={16}
                                            />
                                        ) : (
                                            <RefreshCw
                                                className='mr-2'
                                                size={16}
                                            />
                                        )}
                                        Prepiši tekst
                                    </button>

                                    {transOutput && (
                                        <div className='mt-4 animate-fade-in rounded border-l-4 border-indigo-800 bg-white p-3 text-sm italic text-gray-700'>
                                            "{transOutput}"
                                        </div>
                                    )}
                                </div>

                                {/* Chatbot */}
                                <div className='flex h-[400px] flex-col rounded-lg border border-gray-200 bg-gray-50 p-4'>
                                    <h3 className='mb-2 font-bold text-cyan-500'>
                                        🏛️ Machiavelli Bot
                                    </h3>
                                    <p className='mb-2 text-xs text-gray-500'>
                                        Pitajte o povijesnim strategijama.
                                    </p>

                                    <div className='mb-3 flex-grow overflow-y-auto rounded border bg-white p-3 text-sm'>
                                        {chatHistory.length === 0 && (
                                            <div className='text-center text-xs italic text-gray-400'>
                                                Sustav spreman. Postavite
                                                pitanje.
                                            </div>
                                        )}
                                        {chatHistory.map((msg, idx) => (
                                            <div
                                                key={idx}
                                                className={`mb-2 rounded p-2 ${msg.role === "user" ? "bg-gray-100 text-right" : "bg-slate-200 border-l-2 border-indigo-800"}`}>
                                                <strong className='block text-xs text-gray-500'>
                                                    {msg.role === "user"
                                                        ? "Vi"
                                                        : "Machiavelli"}
                                                </strong>
                                                {msg.text}
                                            </div>
                                        ))}
                                        <div ref={chatEndRef} />
                                    </div>

                                    <div className='flex gap-2'>
                                        <input
                                            type='text'
                                            value={chatInput}
                                            onChange={(e) =>
                                                setChatInput(e.target.value)
                                            }
                                            onKeyDown={(e) =>
                                                e.key === "Enter" &&
                                                handleChat()
                                            }
                                            className='flex-grow rounded border p-2 text-sm focus:border-cyan-500 focus:outline-none'
                                            placeholder='Pitanje...'
                                        />
                                        <button
                                            onClick={handleChat}
                                            disabled={isChatLoading}
                                            className='flex items-center rounded bg-cyan-500 px-4 text-white transition hover:bg-yellow-700 disabled:opacity-50'>
                                            {isChatLoading ? (
                                                <RefreshCw
                                                    className='animate-spin'
                                                    size={16}
                                                />
                                            ) : (
                                                <Send size={16} />
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default ProtoPropaganda;
