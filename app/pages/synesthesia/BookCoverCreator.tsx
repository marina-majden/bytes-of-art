import { useState } from "react";
import { synesthesiaColors } from "~/data/synesthesiaData";
import { Book, Check } from "lucide-react";

export default function BookCoverCreator() {
    const [title, setTitle] = useState("Pjesme");
    const [bgColor, setBgColor] = useState(synesthesiaColors[3]); // White
    const [shapeType, setShapeType] = useState<"krug" | "kvadrat" | "trokut">(
        "krug"
    );
    const [shapeColor, setShapeColor] = useState(synesthesiaColors[2]); // Red
    const [titleColor, setTitleColor] = useState(synesthesiaColors[0]); // default title color
    const [currentTask, setCurrentTask] = useState<number>(0);
    const [feedback, setFeedback] = useState<string | null>(null);

    const tasks = [
        {
            id: "a",
            title: "Task A — Book cover (war poems, anti-war, anonymous WW2 soldier)",
            // scoring: +1 per color that is black or red; +1 if triangle
            colorKeywords: ["black", "red"],
            shapeMatches: ["trokut"],
        },
        {
            id: "b",
            title: "Task B — App icon for a modern recipe app (fast, affordable)",
            // scoring: +1 per color that is yellow or red; +1 if circle
            colorKeywords: ["yellow", "red"],
            shapeMatches: ["krug"],
        },
        {
            id: "c",
            title: "Task C — Presentation by an adventurer (African savannas/jungles, conservation)",
            // scoring: +1 per color that is green or yellow; +1 if circle or square
            colorKeywords: ["green", "yellow"],
            shapeMatches: ["krug", "kvadrat"],
        },
    ];

    function evaluateCover() {
        const task = tasks[currentTask];
        if (!task) return;

        const keywords = task.colorKeywords;
        const shapeOk = task.shapeMatches;
        let points = 0;

        const checkColor = (c: any) => {
            const name = (c?.name || "").toLowerCase();
            for (const k of keywords) if (name.includes(k)) return 1;
            return 0;
        };

        points += checkColor(bgColor);
        points += checkColor(shapeColor);
        points += checkColor(titleColor);

        if (shapeOk.includes(shapeType)) points += 1;

        let grade = "";
        if (points >= 3) grade = "excellent";
        else if (points === 2) grade = "good";
        else if (points === 1) grade = "not bad, needs improvement";
        else grade = "bad";

        setFeedback(grade);
    }

    const defaultChoices = {
        title: "Pjesme",
        bg: synesthesiaColors[3],
        shapeType: "krug" as "krug" | "kvadrat" | "trokut",
        shapeColor: synesthesiaColors[2],
        titleColor: synesthesiaColors[0],
    };

    function resetChoices() {
        setTitle(defaultChoices.title);
        setBgColor(defaultChoices.bg);
        setShapeType(defaultChoices.shapeType);
        setShapeColor(defaultChoices.shapeColor);
        setTitleColor(defaultChoices.titleColor);
    }

    return (
        <section className='py-20 bg-neutral-900 text-white min-h-screen border-t border-neutral-800'>
            <div className='container mx-auto px-4'>
                <div className='max-w-4xl mx-auto text-center mb-16'>
                    <h2 className='text-4xl font-bold mb-6 font-display'>
                        MODUL C: DIZAJNIRAJ NASLOVNICU
                    </h2>
                    <p className='text-gray-400 text-lg'>
                        <strong>Zadatak:</strong> Zamisli da si dizajner. Dobio
                        si zbirku poezije pod nazivom <em>"Ratna lirika"</em>.
                        Koju ćeš pozadinu odabrati da privučeš kupca
                        (psihologija), a koji oblik da izraziš bol (Kandinsky)?
                    </p>
                </div>

                <div className='flex flex-col lg:flex-row gap-16 items-center justify-center'>
                    {/* BOOK PREVIEW */}
                    <div className='relative group perspective-1000'>
                        <div
                            className='relative w-[320px] h-[480px] shadow-2xl transition-all duration-500 transform rotate-y-12 group-hover:rotate-0 origin-left rounded-r-md overflow-hidden'
                            style={{ backgroundColor: bgColor.hex }}>
                            {/* Spine shadow */}
                            <div className='absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black/40 to-transparent z-20 pointer-events-none'></div>

                            {/* Abstract Shape rendered as SVG so colors remain opaque and we can add a shadow */}
                            <div className='absolute inset-0 flex items-center justify-center'>
                                <svg
                                    width={220}
                                    height={220}
                                    viewBox='0 0 220 220'
                                    className='transition-transform duration-500'
                                    style={{
                                        filter: "drop-shadow(0 12px 24px rgba(0,0,0,0.35))",
                                    }}
                                    aria-hidden>
                                    {shapeType === "krug" && (
                                        <circle
                                            cx='110'
                                            cy='110'
                                            r='110'
                                            fill={shapeColor.hex}
                                        />
                                    )}
                                    {shapeType === "kvadrat" && (
                                        <rect
                                            x='0'
                                            y='0'
                                            width='220'
                                            height='220'
                                            fill={shapeColor.hex}
                                        />
                                    )}
                                    {shapeType === "trokut" && (
                                        <polygon
                                            points='110,0 220,220 0,220'
                                            fill={shapeColor.hex}
                                        />
                                    )}
                                </svg>
                            </div>

                            {/* Text Layer */}
                            <div className='absolute inset-0 p-8 flex flex-col justify-between z-30'>
                                <h1
                                    className='text-5xl font-black uppercase break-words leading-[0.9]'
                                    style={{
                                        fontFamily: "serif",
                                        color: titleColor.hex,
                                        textShadow:
                                            "0 3px 8px rgba(128,128,128,0.65)",
                                    }}>
                                    {title}
                                </h1>
                            </div>

                            {/* Texture overlay */}
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/paper.png')] opacity-30 pointer-events-none mix-blend-overlay"></div>
                        </div>

                        {/* Reflection */}
                        <div className='absolute -bottom-8 left-0 right-0 h-8 bg-gradient-to-b from-white/10 to-transparent transform scale-y-[-1] opacity-30 blur-sm rounded-[50%]'></div>
                    </div>

                    {/* CONTROLS */}
                    <div className='w-full max-w-md space-y-8'>
                        {/* Current Task Header */}
                        <div className='space-y-2'>
                            <label className='text-xs font-bold text-gray-500 uppercase tracking-wider'>
                                Current Task
                            </label>
                            <div className='bg-neutral-800 p-3 rounded-md text-left'>
                                <div className='text-sm font-semibold'>
                                    {tasks[currentTask]?.title}
                                </div>
                                <div className='text-xs text-gray-400 mt-1'>
                                    Task {currentTask + 1} of {tasks.length}
                                </div>
                            </div>
                            <p className='text-sm text-gray-400'>
                                Complete the choices below, then press Done to
                                receive a grade. The grade is shown as text
                                only; press OK to continue to the next task.
                            </p>
                        </div>
                        <div className='space-y-2'>
                            <label className='text-xs font-bold text-gray-500 uppercase tracking-wider'>
                                1. Naslov Zbirke
                            </label>
                            <input
                                type='text'
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className='w-full bg-neutral-800 border border-neutral-700 rounded-lg p-4 text-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all'
                            />

                            {/* Title color selector */}
                            <div className='mt-3 flex items-center gap-3 flex-wrap'>
                                <span className='text-xs text-gray-400 uppercase'>
                                    Title color:
                                </span>
                                {synesthesiaColors.map((c) => (
                                    <button
                                        key={c.id}
                                        onClick={() => setTitleColor(c)}
                                        className={`w-8 h-8 rounded-full border-2 transition-transform ${titleColor.id === c.id ? "border-white scale-110" : "border-transparent hover:scale-105"}`}
                                        style={{ backgroundColor: c.hex }}
                                        aria-label={`Set title color to ${c.name}`}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className='space-y-3'>
                            <label className='text-xs font-bold text-gray-500 uppercase tracking-wider flex justify-between'>
                                <span>2. Boja Pozadine (Marketing)</span>
                                <span className='text-blue-400'>
                                    {bgColor.name}
                                </span>
                            </label>
                            <div className='flex gap-2 flex-wrap'>
                                {synesthesiaColors.map((c) => (
                                    <button
                                        key={c.id}
                                        onClick={() => setBgColor(c)}
                                        className={`w-10 h-10 rounded-full border-2 transition-transform ${bgColor.id === c.id ? "border-white scale-110" : "border-transparent hover:scale-105"}`}
                                        style={{ backgroundColor: c.hex }}
                                    />
                                ))}
                            </div>
                            <p className='text-sm text-gray-400 bg-neutral-800 p-3 rounded-lg border-l-2 border-blue-500'>
                                <span className='font-bold text-white'>
                                    Efekt na kupca:
                                </span>{" "}
                                {bgColor.psychology.marketing}
                            </p>
                        </div>

                        <div className='space-y-3'>
                            <label className='text-xs font-bold text-gray-500 uppercase tracking-wider flex justify-between'>
                                <span>3. Oblik & Boja (Sadržaj/Kandinsky)</span>
                                <span className='text-red-400'>
                                    {shapeColor.name} {shapeType}
                                </span>
                            </label>

                            {/* Shape Selector */}
                            <div className='flex gap-2 mb-4'>
                                {["krug", "kvadrat", "trokut"].map((s) => (
                                    <button
                                        key={s}
                                        onClick={() => setShapeType(s as any)}
                                        className={`flex-1 py-2 rounded border text-sm font-medium uppercase transition-colors ${shapeType === s ? "bg-white text-black border-white" : "border-neutral-700 text-gray-500 hover:border-gray-500"}`}>
                                        {s}
                                    </button>
                                ))}
                            </div>

                            {/* Color Selector for Shape */}
                            <div className='flex gap-2 flex-wrap'>
                                {synesthesiaColors.map((c) => (
                                    <button
                                        key={c.id}
                                        onClick={() => setShapeColor(c)}
                                        className={`w-8 h-8 rounded sm transition-transform ${shapeColor.id === c.id ? "ring-2 ring-white scale-110" : "opacity-50 hover:opacity-100"}`}
                                        style={{ backgroundColor: c.hex }}
                                    />
                                ))}
                            </div>

                            <p className='text-sm text-gray-400 bg-neutral-800 p-3 rounded-lg border-l-2 border-red-500'>
                                <span className='font-bold text-white'>
                                    Unutarnji zvuk:
                                </span>{" "}
                                {shapeColor.kandinsky.sound}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className='pt-4'>
                {!feedback ? (
                    <button
                        onClick={evaluateCover}
                        className='w-full px-4 py-3 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition'>
                        Done
                    </button>
                ) : (
                    <div className='space-y-3'>
                        <div className='p-3 rounded-md bg-neutral-800 text-gray-200'>
                            <strong>Feedback:</strong>
                            <p className='mt-2'>{feedback}</p>
                        </div>
                        <div className='flex gap-2'>
                            {currentTask < tasks.length - 1 ? (
                                <button
                                    onClick={() => {
                                        resetChoices();
                                        setCurrentTask((t) => t + 1);
                                        setFeedback(null);
                                    }}
                                    className='px-4 py-2 bg-green-600 text-white rounded-md'>
                                    OK
                                </button>
                            ) : (
                                <button
                                    onClick={() => {
                                        resetChoices();
                                        setFeedback(null);
                                        setCurrentTask(0);
                                    }}
                                    className='px-4 py-2 bg-green-600 text-white rounded-md'>
                                    Finish
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
