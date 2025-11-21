import { useState } from "react";
import {
    AlignCenter,
    AlignLeft,
    Type,
    Image as ImageIcon,
    Maximize,
} from "lucide-react";

export default function InstaPoetry() {
    const [font, setFont] = useState<"arial" | "courier" | "comic" | "serif">(
        "arial"
    );
    const [isUppercase, setIsUppercase] = useState(false);
    const [hasMargin, setHasMargin] = useState(false);
    const [alignment, setAlignment] = useState<"center" | "left">("left");
    const [showIllustration, setShowIllustration] = useState(false);
    const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

    const handleAction = (callback: () => void, tooltip: string) => {
        callback();
        setActiveTooltip(tooltip);
        setTimeout(() => setActiveTooltip(null), 5000);
    };

    const getFontClass = () => {
        switch (font) {
            case "courier":
                return "font-mono";
            case "serif":
                return "font-serif";
            case "comic":
                return "font-comic"; // Potreban custom font ili fallback
            default:
                return "font-sans";
        }
    };

    return (
        <section className='w-full min-h-screen bg-gray-100 text-black py-16 flex flex-col items-center justify-center'>
            <div className='container mx-auto px-4 mb-12 text-center'>
                <h2 className='text-4xl font-bold mb-2 font-serif italic'>
                    MODUL B: MREŽA
                </h2>
                <p className='text-gray-600 max-w-2xl mx-auto'>
                    Anatomija "Insta-poezije". Koristi kontrole desno kako bi
                    dekonstruirao/la pjesmu. Kako forma mijenja osjećaj?
                </p>
            </div>

            <div className='flex flex-col lg:flex-row gap-12 items-center justify-center w-full max-w-5xl'>
                {/* Phone Simulator */}
                <div className='relative w-[320px] h-[640px] bg-black rounded-[3rem] border-[12px] border-black shadow-2xl overflow-hidden shrink-0'>
                    <div
                        className={`w-full h-full bg-white flex flex-col relative transition-all duration-500 ${hasMargin ? "p-12" : "p-6"}`}>
                        {/* Fake Instagram Header */}
                        <div className='flex items-center justify-between mb-8 opacity-50 text-xs border-b pb-2'>
                            <span className='font-bold'>lit.art_poet</span>
                            <span>...</span>
                        </div>

                        {/* Content Container */}
                        <div
                            className={`flex-1 flex flex-col justify-center transition-all duration-300 ${alignment === "center" ? "items-center text-center" : "items-start text-left"}`}>
                            {showIllustration && (
                                <div className='mb-6 w-32 h-32 opacity-80 animate-in fade-in duration-700'>
                                    <svg
                                        viewBox='0 0 100 100'
                                        fill='none'
                                        stroke='black'
                                        strokeWidth='1.5'
                                        className='w-full h-full'>
                                        <path d='M20,50 Q50,20 80,50 T50,80' />
                                        <path
                                            d='M45,45 L55,55 M55,45 L45,55'
                                            strokeWidth='1'
                                        />
                                    </svg>
                                </div>
                            )}

                            <p
                                className={`text-lg leading-loose transition-all duration-300 ${getFontClass()} ${isUppercase ? "uppercase tracking-widest" : "lowercase"}`}>
                                htio sam ti reći
                                <br />
                                da su zidovi
                                <br />
                                samo
                                <br />
                                prešućeni
                                <br />
                                prozori.
                            </p>
                        </div>

                        {/* Fake Footer */}
                        <div className='mt-auto pt-4 border-t border-gray-100 flex justify-between text-2xl opacity-60'>
                            <div className='flex gap-4'>
                                <span>♡</span>
                                <span>💬</span>
                                <span>➢</span>
                            </div>
                            <span>⚑</span>
                        </div>
                    </div>
                </div>

                {/* Controls Panel */}
                <div className='flex flex-col gap-4 bg-white p-8 rounded-2xl shadow-xl relative w-full max-w-md'>
                    <h3 className='font-bold text-gray-400 mb-2 uppercase tracking-wider text-xs'>
                        Alati za dekonstrukciju
                    </h3>

                    {/* Tooltip Display */}
                    <div
                        className={`min-h-[80px] bg-blue-50 border border-blue-100 text-blue-800 p-4 rounded-lg mb-4 transition-all duration-300 flex items-center ${activeTooltip ? "opacity-100" : "opacity-0"}`}>
                        <p className='text-sm font-medium leading-relaxed'>
                            {activeTooltip}
                        </p>
                    </div>

                    <div className='space-y-3'>
                        <div className='grid grid-cols-2 gap-2'>
                            <button
                                type='button'
                                onClick={() =>
                                    handleAction(
                                        () => setFont("arial"),
                                        "Arial (Sans-serif) je 'default'. Djeluje moderno, ali hladno i informativno. Nedostaje mu osobnosti."
                                    )
                                }
                                className={`p-3 border rounded hover:bg-gray-50 text-sm ${font === "arial" ? "bg-black text-white" : ""}`}>
                                Arial
                            </button>
                            <button
                                type='button'
                                onClick={() =>
                                    handleAction(
                                        () => setFont("courier"),
                                        "Courier (Typewriter) je ključan za instapoeziju. Evocira nostalgiju, sirovost i intimnost, kao da čitamo nečiju privatnu poruku."
                                    )
                                }
                                className={`p-3 border rounded hover:bg-gray-50 text-sm font-mono ${font === "courier" ? "bg-black text-white" : ""}`}>
                                Courier
                            </button>
                            <button
                                type='button'
                                onClick={() =>
                                    handleAction(
                                        () => setFont("serif"),
                                        "Serif fontovi daju dojam književnog autoriteta, tradicije i 'ozbiljne' knjige."
                                    )
                                }
                                className={`p-3 border rounded hover:bg-gray-50 text-sm font-serif ${font === "serif" ? "bg-black text-white" : ""}`}>
                                Serif
                            </button>
                            <button
                                type='button'
                                onClick={() =>
                                    handleAction(
                                        () => setFont("comic"),
                                        "Comic Sans djeluje djetinjasto i neozbiljno. Odmah mijenja ton pjesme iz 'dubokog' u 'šaljiv'."
                                    )
                                }
                                className={`p-3 border rounded hover:bg-gray-50 text-sm ${font === "comic" ? "bg-black text-white" : ""}`}>
                                Comic Sans
                            </button>
                        </div>

                        <button
                            type='button'
                            onClick={() =>
                                handleAction(
                                    () => setIsUppercase(!isUppercase),
                                    isUppercase
                                        ? "Mala slova (lowercase) su zaštitni znak instapoezije. Djeluju tiho, skromno, ranjivo."
                                        : "Velika slova VIČU. Agresivna su i oduzimaju tekstu intimnost."
                                )
                            }
                            className='w-full flex items-center gap-3 p-4 border rounded-lg hover:bg-gray-50 text-left transition-colors'>
                            <Type size={20} className='text-gray-400' />
                            <span className='font-medium'>
                                {isUppercase
                                    ? "Prebaci na mala slova"
                                    : "Prebaci na VELIKA SLOVA"}
                            </span>
                        </button>

                        <button
                            type='button'
                            onClick={() =>
                                handleAction(
                                    () => setHasMargin(!hasMargin),
                                    "Bjelina (negativni prostor) je 'vizualna tišina'. Ona prisiljava oko da se fokusira na malo riječi i daje im težinu."
                                )
                            }
                            className='w-full flex items-center gap-3 p-4 border rounded-lg hover:bg-gray-50 text-left transition-colors'>
                            <Maximize size={20} className='text-gray-400' />
                            <span className='font-medium'>
                                {hasMargin
                                    ? "Ukloni marginu"
                                    : "Dodaj marginu (Bjelina)"}
                            </span>
                        </button>

                        <button
                            type='button'
                            onClick={() =>
                                handleAction(
                                    () =>
                                        setAlignment(
                                            alignment === "left"
                                                ? "center"
                                                : "left"
                                        ),
                                    alignment === "left"
                                        ? "Centriranje teksta daje osjećaj stabilnosti, spomenika i vizualne poetičnosti."
                                        : "Lijevo poravnanje djeluje kao običan govor ili proza, manje je 'uređeno'."
                                )
                            }
                            className='w-full flex items-center gap-3 p-4 border rounded-lg hover:bg-gray-50 text-left transition-colors'>
                            {alignment === "left" ? (
                                <AlignCenter
                                    size={20}
                                    className='text-gray-400'
                                />
                            ) : (
                                <AlignLeft
                                    size={20}
                                    className='text-gray-400'
                                />
                            )}
                            <span className='font-medium'>
                                {alignment === "left"
                                    ? "Centriraj tekst"
                                    : "Poravnaj lijevo"}
                            </span>
                        </button>

                        <button
                            type='button'
                            onClick={() =>
                                handleAction(
                                    () =>
                                        setShowIllustration(!showIllustration),
                                    "Linijska ilustracija (Line art) je minimalistička. Ne ilustrira tekst doslovno, već pojačava emociju bez da 'krade' pažnju riječima."
                                )
                            }
                            className='w-full flex items-center gap-3 p-4 border rounded-lg hover:bg-gray-50 text-left transition-colors'>
                            <ImageIcon size={20} className='text-gray-400' />
                            <span className='font-medium'>
                                {showIllustration
                                    ? "Ukloni ilustraciju"
                                    : "Dodaj ilustraciju"}
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
