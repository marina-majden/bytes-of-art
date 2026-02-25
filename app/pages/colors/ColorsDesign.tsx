import React, { useState } from "react";
import {
    LayoutTemplate,
    Briefcase,
    CheckCircle,
    AlertTriangle,
    Target,
    MonitorSmartphone,
    MousePointerClick,
    RefreshCw,
    Sparkles,
} from "lucide-react";

const apiKey = ""; // API ključ će biti automatski dodijeljen u runtime okruženju

// Inicijalna baza klijenata (Briefovi)
const initialClients = [
    {
        id: "eco-resort",
        name: "Aurora Eco-Retreat",
        industry: "Luksuzni turizam i ekologija",
        brief: "Otvaramo ekskluzivni, ekološki održiv resort u šumi. Želimo da aplikacija odiše mirom, prirodom, ali i vrhunskim luksuzom. Treba nam osjećaj stabilnosti i prestiža.",
        targetEmotions: ["priroda", "luksuz", "mir"],
    },
    {
        id: "fintech",
        name: "KriptoPay",
        industry: "Financijska tehnologija (FinTech)",
        brief: 'Naša aplikacija služi za brze novčane transakcije i kriptovalute. Korisnici moraju osjećati apsolutnu sigurnost i povjerenje, ali glavni gumb za "Kupi" mora iskakati i tjerati na akciju!',
        targetEmotions: ["povjerenje", "sigurnost", "akcija"],
    },
    {
        id: "health",
        name: "ZenMind",
        industry: "Zdravlje i Meditacija",
        brief: "Aplikacija za mentalno zdravlje i vođene meditacije. Cilj nam je usporiti korisnika, sniziti mu puls i smanjiti anksioznost čim otvori aplikaciju.",
        targetEmotions: ["opuštanje", "čistoća", "zdravlje"],
    },
];

// Paleta ponuđenih boja s njihovim psihološkim značenjima
const colorPalette = [
    {
        hex: "#ef4444",
        name: "Agresivna crvena",
        textColor: "white",
        meaning:
            "Podiže puls, stvara osjećaj hitnosti, stimulira apetit. Odlična za akciju, loša za opuštanje.",
    },
    {
        hex: "#f97316",
        name: "Energična narančasta",
        textColor: "white",
        meaning:
            "Poziv na akciju (Call to Action), mladenačka energija, entuzijazam i impulzivnost.",
    },
    {
        hex: "#fbbf24",
        name: "Zlatno žuta",
        textColor: "black",
        meaning:
            "Optimizam, zlato, luksuz, ali u prevelikim količinama može izazvati anksioznost očiju.",
    },
    {
        hex: "#064e3b",
        name: "Šumska zelena",
        textColor: "white",
        meaning:
            "Priroda, rast, stabilnost i bogatstvo (boja novca). Odmara oči.",
    },
    {
        hex: "#f0fdf4",
        name: "Mint zelena",
        textColor: "black",
        meaning: "Svježina, zdravlje, čistoća i obnova. Vrlo umirujuća.",
    },
    {
        hex: "#1e3a8a",
        name: "Korporativna plava",
        textColor: "white",
        meaning:
            "Najkorištenija boja u biznisu. Ulijeva povjerenje, sigurnost i lojalnost. Smiruje živčani sustav.",
    },
    {
        hex: "#e0f2fe",
        name: "Nebesko plava",
        textColor: "black",
        meaning: "Mir, tišina, sloboda i jasnoća. Povezana s meditacijom.",
    },
    {
        hex: "#8b5cf6",
        name: "Kraljevska ljubičasta",
        textColor: "white",
        meaning:
            "Kroz povijest boja careva. Danas simbolizira luksuz, duhovnost, mudrost i misterij.",
    },
    {
        hex: "#0f172a",
        name: "Ponoćna tamna",
        textColor: "white",
        meaning:
            'Autoritet, elegancija, moć. Koristi se za premium i "dark mode" proizvode.',
    },
    {
        hex: "#f8fafc",
        name: "Minimalistička bijela",
        textColor: "black",
        meaning:
            "Prazan prostor, sterilnost, savršenstvo. Omogućuje drugim bojama da dišu.",
    },
];

const DizajnerskiIzazov = () => {
    const [clients, setClients] = useState(initialClients);
    const [activeClient, setActiveClient] = useState(clients[0]);
    const [primaryColor, setPrimaryColor] = useState(colorPalette[8]);
    const [surfaceColor, setSurfaceColor] = useState(colorPalette[9]);
    const [accentColor, setAccentColor] = useState(colorPalette[1]);

    const [isEvaluating, setIsEvaluating] = useState(false);
    const [isGeneratingClient, setIsGeneratingClient] = useState(false);
    const [report, setReport] = useState<any>(null);
    const [apiError, setApiError] = useState<string | null>(null);

    // Pomoćna funkcija za sigurne API pozive prema Geminiju uz exponential backoff
    const callGeminiAPI = async (prompt: string) => {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
        const payload = {
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { responseMimeType: "application/json" },
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
                const textResponse =
                    data.candidates?.[0]?.content?.parts?.[0]?.text;

                if (!textResponse)
                    throw new Error("Neispravan odgovor od AI modela.");

                return JSON.parse(textResponse);
            } catch (error) {
                if (i === 4) {
                    throw new Error(
                        "Povezivanje s AI asistentom nije uspjelo nakon više pokušaja. Molimo pokušajte ponovno.",
                    );
                }
                await new Promise((res) => setTimeout(res, delay));
                delay *= 2; // Eksponencijalno povećanje vremena čekanja
            }
        }
    };

    // 1. ✨ Generiranje novog klijenta pomoću AI-a
    const generateNewClient = async () => {
        setIsGeneratingClient(true);
        setApiError(null);

        const prompt = `
      Generiraj novog, zanimljivog i neočekivanog klijenta za zadatak iz UI/UX dizajna na hrvatskom jeziku.
      Vrati isključivo JSON format sa sljedećim poljima:
      - id: (kratki string bez razmaka, npr. 'tech-startup')
      - name: (kreativno ime tvrtke)
      - industry: (zanimljiva industrija, npr. Svemirska putovanja, Virtualni muzeji, Aplikacija za učenje telepatije)
      - brief: (2-3 rečenice o tome što tvrtka želi postići s dizajnom i kakav osjećaj žele izazvati kod korisnika)
      - targetEmotions: (niz od 3 stringa koji opisuju emocije, npr. ["inovacija", "misterij", "uzbuđenje"])
    `;

        try {
            const newClient = await callGeminiAPI(prompt);
            setClients((prev) => [...prev, newClient]);
            setActiveClient(newClient);
            setReport(null);
        } catch (err: any) {
            setApiError(
                err instanceof Error
                    ? err.message
                    : "An unknown error occurred",
            );
        } finally {
            setIsGeneratingClient(false);
        }
    };

    // 2. ✨ Evaluacija dizajna pomoću AI-a
    const evaluateDesign = async () => {
        setIsEvaluating(true);
        setApiError(null);

        const prompt = `
      Ti si senior Art Director i ekspert za psihologiju boja u UX/UI dizajnu.
      Analiziraj korisnikov odabir boja za klijenta i daj svoju stručnu kritiku na hrvatskom jeziku. Odgovaraj ISKLJUČIVO u JSON formatu.

      Klijent: ${activeClient.name}
      Industrija: ${activeClient.industry}
      Brief: ${activeClient.brief}
      Tražene emocije klijenta: ${activeClient.targetEmotions.join(", ")}

      Korisnikov odabir boja:
      1. Glavna pozadina: ${primaryColor.name} (Značenje: ${primaryColor.meaning})
      2. Površine (kartice): ${surfaceColor.name}
      3. Naglašena boja za gumb (CTA): ${accentColor.name}

      Ocijeni dizajn na temelju:
      - Koliko glavna pozadina odgovara traženim emocijama klijenta?
      - Je li gumb (naglašena boja) dovoljno uočljiv i stvara li kontrast (Von Restorffov efekt)?
      - Jesu li boje općenito skladne i vizualno privlačne?

      Vrati JSON sa sljedećim poljima:
      - score: broj od 0 do 100 (tvoja ocjena dizajna)
      - feedback: niz od 3 objekta, svaki sa:
          - 'type': string ('success', 'warning' ili 'error')
          - 'text': string (tvoja opširna i stručna objašnjenja i kritika s psihološkog/dizajnerskog stajališta)
    `;

        try {
            const evaluation = await callGeminiAPI(prompt);
            setReport(evaluation);
        } catch (err: any) {
            setApiError(
                err instanceof Error
                    ? err.message
                    : "An unknown error occurred",
            );
        } finally {
            setIsEvaluating(false);
        }
    };

    const resetChallenge = () => {
        setReport(null);
    };

    return (
        <div className='min-h-screen bg-slate-950 text-slate-200 font-sans p-4 md:p-8 selection:bg-indigo-500/30 selection:text-indigo-200'>
            {/* Header */}
            <header className='max-w-6xl mx-auto mb-12 text-center animate-in fade-in slide-in-from-top-4 duration-700'>
                <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 border border-slate-700 text-sm font-medium mb-4 text-indigo-400'>
                    <LayoutTemplate size={16} />
                    Marketinški Laboratorij
                </div>
                <h1 className='text-4xl md:text-5xl font-black mb-4'>
                    Dizajnerski Izazov
                </h1>
                <p className='text-slate-400 max-w-2xl mx-auto'>
                    Ovdje vi preuzimate kontrolu. Odaberite klijenta (ili
                    zamolite AI da izmisli novog), pročitajte njihov zahtjev i
                    dizajnirajte sučelje koje prodaje.
                </p>
            </header>

            <div className='max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8'>
                {/* Lijeva kolona: Alati za dizajn */}
                <div className='lg:col-span-7 space-y-6 flex flex-col'>
                    {apiError && (
                        <div className='bg-red-900/40 border border-red-500 rounded-xl p-4 flex items-start gap-3 text-red-200'>
                            <AlertTriangle
                                size={20}
                                className='flex-shrink-0 mt-0.5'
                            />
                            <p>{apiError}</p>
                        </div>
                    )}

                    {/* Odabir Klijenta */}
                    <div className='bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden'>
                        <div className='absolute top-0 left-0 w-1 h-full bg-indigo-500'></div>
                        <div className='flex justify-between items-center mb-4'>
                            <h3 className='text-sm font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2'>
                                <Briefcase size={16} /> 1. Klijent
                            </h3>
                            <button
                                onClick={generateNewClient}
                                disabled={isGeneratingClient}
                                className='flex items-center gap-2 text-xs font-bold bg-indigo-600/20 text-indigo-300 hover:bg-indigo-600/40 px-3 py-1.5 rounded-lg transition-colors'>
                                {isGeneratingClient ? (
                                    <RefreshCw
                                        size={14}
                                        className='animate-spin'
                                    />
                                ) : (
                                    <Sparkles size={14} />
                                )}
                                ✨ Novi klijent
                            </button>
                        </div>

                        <div className='flex flex-wrap gap-2 mb-4'>
                            {clients.map((client) => (
                                <button
                                    key={client.id}
                                    onClick={() => {
                                        setActiveClient(client);
                                        resetChallenge();
                                    }}
                                    className={`px-3 py-1.5 rounded-lg text-sm font-bold transition-all ${activeClient.id === client.id ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20" : "bg-slate-800 text-slate-400 hover:bg-slate-700"}`}>
                                    {client.name}
                                </button>
                            ))}
                        </div>
                        <div className='bg-slate-950 p-4 rounded-xl border border-slate-800'>
                            <span className='text-xs text-indigo-400 font-bold uppercase tracking-wider block mb-1'>
                                {activeClient.industry}
                            </span>
                            <p className='text-slate-300 text-sm leading-relaxed mb-3'>
                                "{activeClient.brief}"
                            </p>
                            <div className='flex flex-wrap gap-2'>
                                {activeClient.targetEmotions.map(
                                    (emotion, idx) => (
                                        <span
                                            key={idx}
                                            className='text-[10px] bg-slate-800 text-slate-400 px-2 py-1 rounded-full uppercase'>
                                            #{emotion}
                                        </span>
                                    ),
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Odabir Boja */}
                    <div className='bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex-grow'>
                        <h3 className='text-sm font-bold uppercase tracking-widest text-slate-500 mb-6 flex items-center gap-2'>
                            <Target size={16} /> 2. Kreirajte Paletu
                        </h3>

                        <div className='space-y-8'>
                            <div>
                                <label className='block text-sm font-bold text-white mb-2'>
                                    Glavna pozadina (Brand Color)
                                </label>
                                <div className='flex flex-wrap gap-2'>
                                    {colorPalette.map((color) => (
                                        <button
                                            key={`bg-${color.hex}`}
                                            onClick={() =>
                                                setPrimaryColor(color)
                                            }
                                            className={`w-10 h-10 rounded-full transition-transform border-2 ${primaryColor.hex === color.hex ? "scale-125 border-white shadow-[0_0_15px_rgba(255,255,255,0.3)]" : "border-transparent hover:scale-110"}`}
                                            style={{
                                                backgroundColor: color.hex,
                                            }}
                                            title={color.name}
                                        />
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className='block text-sm font-bold text-white mb-2'>
                                    Površine elemenata (Surface)
                                </label>
                                <div className='flex flex-wrap gap-2'>
                                    {colorPalette.map((color) => (
                                        <button
                                            key={`surf-${color.hex}`}
                                            onClick={() =>
                                                setSurfaceColor(color)
                                            }
                                            className={`w-8 h-8 rounded-md transition-transform border-2 ${surfaceColor.hex === color.hex ? "scale-125 border-white" : "border-transparent hover:scale-110"}`}
                                            style={{
                                                backgroundColor: color.hex,
                                            }}
                                            title={color.name}
                                        />
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className='block text-sm font-bold text-white mb-2'>
                                    Naglašena boja (Accent / CTA)
                                </label>
                                <div className='flex flex-wrap gap-2'>
                                    {colorPalette.map((color) => (
                                        <button
                                            key={`acc-${color.hex}`}
                                            onClick={() =>
                                                setAccentColor(color)
                                            }
                                            className={`w-10 h-10 rounded-lg transition-transform border-2 ${accentColor.hex === color.hex ? "scale-125 border-white shadow-[0_0_15px_rgba(255,255,255,0.3)]" : "border-transparent hover:scale-110"}`}
                                            style={{
                                                backgroundColor: color.hex,
                                            }}
                                            title={color.name}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Akcijski Gumb */}
                        <div className='mt-10 pt-6 border-t border-slate-800'>
                            <button
                                onClick={evaluateDesign}
                                disabled={
                                    isEvaluating ||
                                    report !== null ||
                                    isGeneratingClient
                                }
                                className='w-full py-4 rounded-xl font-black text-lg text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-lg disabled:opacity-50 transition-all flex justify-center items-center gap-2 group'>
                                {isEvaluating ? (
                                    <>
                                        <RefreshCw className='animate-spin' />{" "}
                                        Umjetna inteligencija analizira
                                        dizajn...
                                    </>
                                ) : (
                                    <>
                                        <Sparkles className='group-hover:scale-125 transition-transform' />
                                        Zatraži AI Analizu
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Desna kolona: Live Preview Mockup & Report */}
                <div className='lg:col-span-5 flex flex-col gap-6'>
                    {/* Smartphone Mockup */}
                    <div className='bg-slate-900 border border-slate-800 rounded-3xl p-4 shadow-2xl flex justify-center items-center'>
                        <div className='w-[300px] h-[600px] bg-black rounded-[2.5rem] border-[8px] border-slate-800 relative overflow-hidden shadow-inner flex flex-col'>
                            <div className='absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-800 rounded-b-xl z-20'></div>

                            <div
                                className='flex-grow flex flex-col relative transition-colors duration-500'
                                style={{
                                    backgroundColor: primaryColor.hex,
                                    color: primaryColor.textColor,
                                }}>
                                <div className='pt-12 pb-6 px-6 relative z-10'>
                                    <h2 className='text-2xl font-black mb-2'>
                                        {activeClient.name}
                                    </h2>
                                    <p className='text-sm opacity-80 leading-relaxed'>
                                        Otkrijte novo iskustvo skrojeno po vašoj
                                        mjeri.
                                    </p>
                                </div>

                                <div className='flex-grow px-4 pb-4 z-10 flex flex-col justify-end'>
                                    <div
                                        className='rounded-2xl p-5 transition-colors duration-500 shadow-xl'
                                        style={{
                                            backgroundColor: surfaceColor.hex,
                                            color: surfaceColor.textColor,
                                        }}>
                                        <div
                                            className='w-10 h-10 rounded-full mb-4 flex items-center justify-center'
                                            style={{
                                                backgroundColor: `${accentColor.hex}30`,
                                                color: accentColor.hex,
                                            }}>
                                            <MonitorSmartphone size={20} />
                                        </div>
                                        <h3 className='font-bold text-lg mb-2'>
                                            Pristupite portalu
                                        </h3>
                                        <p className='text-sm opacity-70 mb-6 line-clamp-3'>
                                            Sve značajke koje trebate kako biste
                                            ostvarili svoje ciljeve. Brzo,
                                            sigurno i učinkovito.
                                        </p>

                                        <button
                                            className='w-full py-3 rounded-xl font-bold flex justify-center items-center gap-2 transition-all duration-300 transform active:scale-95 shadow-md'
                                            style={{
                                                backgroundColor:
                                                    accentColor.hex,
                                                color: accentColor.textColor,
                                            }}>
                                            <MousePointerClick size={18} />
                                            Započni odmah
                                        </button>
                                    </div>
                                </div>

                                <div className='absolute top-0 right-0 w-48 h-48 bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2'></div>
                            </div>
                        </div>
                    </div>

                    {/* Feedback Report */}
                    {report && (
                        <div className='bg-slate-900 border border-purple-500/50 rounded-2xl p-6 shadow-[0_0_30px_rgba(168,85,247,0.15)] animate-in slide-in-from-bottom-8 duration-500 relative overflow-hidden'>
                            <div className='absolute top-0 right-0 w-32 h-32 bg-purple-500/10 blur-3xl rounded-full'></div>

                            <h3 className='text-xl font-black text-white mb-4 flex items-center justify-between'>
                                <span className='flex items-center gap-2'>
                                    <Sparkles
                                        size={20}
                                        className='text-purple-400'
                                    />{" "}
                                    AI Evaluacija
                                </span>
                                <span
                                    className={`px-3 py-1 rounded-full text-sm font-bold ${report.score >= 80 ? "bg-green-500/20 text-green-400" : report.score >= 50 ? "bg-yellow-500/20 text-yellow-400" : "bg-red-500/20 text-red-400"}`}>
                                    {report.score}/100
                                </span>
                            </h3>

                            <div className='space-y-4 mb-6 relative z-10'>
                                {report.feedback.map(
                                    (item: any, idx: number) => (
                                        <div
                                            key={idx}
                                            className={`p-4 rounded-xl border flex items-start gap-3 ${
                                                item.type === "success"
                                                    ? "bg-green-950/30 border-green-800/50 text-green-200"
                                                    : item.type === "warning"
                                                      ? "bg-yellow-950/30 border-yellow-800/50 text-yellow-200"
                                                      : "bg-red-950/30 border-red-800/50 text-red-200"
                                            }`}>
                                            <div className='mt-0.5'>
                                                {item.type === "success" && (
                                                    <CheckCircle
                                                        size={18}
                                                        className='text-green-500'
                                                    />
                                                )}
                                                {item.type === "warning" && (
                                                    <AlertTriangle
                                                        size={18}
                                                        className='text-yellow-500'
                                                    />
                                                )}
                                                {item.type === "error" && (
                                                    <AlertTriangle
                                                        size={18}
                                                        className='text-red-500'
                                                    />
                                                )}
                                            </div>
                                            <p className='text-sm leading-relaxed'>
                                                {item.text}
                                            </p>
                                        </div>
                                    ),
                                )}
                            </div>

                            <button
                                onClick={resetChallenge}
                                className='w-full py-3 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white transition-colors text-sm font-bold relative z-10'>
                                Pokušaj prilagoditi dizajn
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DizajnerskiIzazov;
