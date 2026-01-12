import { useState } from "react";
import { Save, SprayCan, PenTool } from "lucide-react";
import type { UserCreation, ArtStyleType } from "~/types/walls";

export default function CreativeStudio() {
    const [activeTab, setActiveTab] = useState<ArtStyleType>("graffiti");
    const [text, setText] = useState("");
    const [author, setAuthor] = useState("");
    const [color, setColor] = useState("#ef4444");

    const [gallery, setGallery] = useState<UserCreation[]>([
        {
            id: 1,
            type: "graffiti",
            text: "BUNT",
            author: "Marko",
            style: { font: "impact", color: "#ef4444", align: "center" },
            timestamp: Date.now(),
        },
        {
            id: 2,
            type: "insta",
            text: "grad spava\na ja\nbudna sanjam",
            author: "Ana",
            style: { font: "courier", color: "#000000", align: "left" },
            timestamp: Date.now(),
        },
        {
            id: 3,
            type: "graffiti",
            text: "NADA",
            author: "Iva",
            style: { font: "impact", color: "#3b82f6", align: "center" },
            timestamp: Date.now(),
        },
        {
            id: 4,
            type: "insta",
            text: "beton\nima\npamćenje",
            author: "Ivan",
            style: { font: "courier", color: "#000000", align: "center" },
            timestamp: Date.now(),
        },
        {
            id: 5,
            type: "graffiti",
            text: "LJUBAV",
            author: "Petra",
            style: { font: "impact", color: "#ec4899", align: "center" },
            timestamp: Date.now(),
        },
    ]);

    const handlePublish = () => {
        if (!text || !author) return;

        const newCreation: UserCreation = {
            id: Date.now(),
            type: activeTab,
            text,
            author,
            style: {
                font: activeTab === "graffiti" ? "impact" : "courier",
                color: color,
                align: "center",
            },
            timestamp: Date.now(),
        };

        setGallery([newCreation, ...gallery]);
        setText("");
        setAuthor("");
    };

    return (
        <section className='w-full py-16 bg-white text-black min-h-screen'>
            <div className='container mx-auto px-4'>
                <h2 className='text-4xl font-bold mb-8 text-center font-display'>
                    MODUL C: TVOJ IZRAZ
                </h2>

                {/* EDITOR */}
                <div className='max-w-5xl mx-auto bg-neutral-100 rounded-3xl shadow-2xl overflow-hidden mb-20 border border-gray-200'>
                    <div className='flex border-b border-gray-300'>
                        <button
                            type='button'
                            onClick={() => setActiveTab("graffiti")}
                            className={`flex-1 py-6 font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors ${activeTab === "graffiti" ? "bg-neutral-900 text-white" : "bg-white text-gray-400 hover:text-black"}`}>
                            <SprayCan size={20} /> GRAFFITI (Zid)
                        </button>
                        <button
                            type='button'
                            onClick={() => setActiveTab("insta")}
                            className={`flex-1 py-6 font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors ${activeTab === "insta" ? "bg-neutral-900 text-white" : "bg-white text-gray-400 hover:text-black"}`}>
                            <PenTool size={20} /> POEZIJA (Mreža)
                        </button>
                    </div>

                    <div className='flex flex-col md:flex-row'>
                        {/* Canvas */}
                        <div
                            className={`w-full md:w-2/3 h-[400px] flex items-center justify-center relative overflow-hidden transition-colors duration-500 ${
                                activeTab === "graffiti"
                                    ? "bg-[url('https://www.transparenttextures.com/patterns/brick-wall.png')] bg-stone-800"
                                    : "bg-white border-r border-gray-200"
                            }`}>
                            <div
                                className={`max-w-[80%] break-words whitespace-pre-wrap text-center p-8 transition-all duration-300
                  ${
                      activeTab === "graffiti"
                          ? "font-black text-7xl drop-shadow-[0_5px_0px_rgba(0,0,0,1)] tracking-tighter rotate-[-2deg] uppercase"
                          : "font-mono text-xl leading-relaxed lowercase"
                  }`}
                                style={{
                                    color:
                                        activeTab === "graffiti"
                                            ? color
                                            : "#000",
                                }}>
                                {text ||
                                    (activeTab === "graffiti"
                                        ? "TVOJA RIJEČ"
                                        : "tvoja\npoezija\novdje...")}
                            </div>
                        </div>

                        {/* Controls */}
                        <div className='w-full md:w-1/3 p-8 flex flex-col gap-6 bg-white'>
                            <div>
                                <label className='block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wide'>
                                    Sadržaj
                                </label>
                                <textarea
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                    className='w-full border-2 border-gray-200 rounded-xl p-4 focus:border-black focus:ring-0 outline-none resize-none font-medium bg-gray-50'
                                    rows={4}
                                    placeholder={
                                        activeTab === "graffiti"
                                            ? "Jedna moćna riječ..."
                                            : "Kratki stihovi..."
                                    }
                                />
                            </div>

                            {activeTab === "graffiti" && (
                                <div>
                                    <label className='block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wide'>
                                        Boja Spreja
                                    </label>
                                    <div className='flex gap-3 flex-wrap'>
                                        {[
                                            "#ef4444",
                                            "#3b82f6",
                                            "#eab308",
                                            "#22c55e",
                                            "#a855f7",
                                            "#ffffff",
                                        ].map((c) => (
                                            <button
                                                type='button'
                                                key={c}
                                                onClick={() => setColor(c)}
                                                className={`w-10 h-10 rounded-full border-4 transition-transform hover:scale-110 ${color === c ? "border-black scale-110 shadow-lg" : "border-transparent"}`}
                                                style={{ backgroundColor: c }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className='mt-auto'>
                                <label className='block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wide'>
                                    Potpis
                                </label>
                                <input
                                    type='text'
                                    value={author}
                                    onChange={(e) => setAuthor(e.target.value)}
                                    className='w-full border-2 border-gray-200 rounded-xl p-3 mb-4 focus:border-black outline-none font-medium'
                                    placeholder='Tvoje ime ili tag...'
                                />
                                <button
                                    type='button'
                                    onClick={handlePublish}
                                    disabled={!text || !author}
                                    className='w-full bg-black text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-neutral-800 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all hover:shadow-lg transform active:scale-95'>
                                    <Save size={20} /> Objavi Rad
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* MASONRY GALLERY */}
                <h3 className='text-2xl font-bold mb-8 border-b-2 border-black pb-4 inline-block'>
                    GALERIJA RADOVA
                </h3>

                <div className='columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6'>
                    {gallery.map((item) => (
                        <div
                            key={item.id}
                            className='break-inside-avoid relative group cursor-default'>
                            <div
                                className={`
                rounded-2xl overflow-hidden shadow-md transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-2
                ${
                    item.type === "graffiti"
                        ? "bg-stone-800 text-center py-16 px-6 bg-[url('https://www.transparenttextures.com/patterns/brick-wall.png')]"
                        : "bg-white border border-gray-200 p-10 text-center"
                }
              `}>
                                <div
                                    className={`whitespace-pre-wrap break-words
                    ${
                        item.type === "graffiti"
                            ? "font-black text-5xl drop-shadow-xl tracking-tighter uppercase rotate-[-1deg]"
                            : "font-mono text-sm leading-loose lowercase"
                    }`}
                                    style={{
                                        color:
                                            item.type === "graffiti"
                                                ? item.style.color
                                                : "#000",
                                    }}>
                                    {item.text}
                                </div>
                            </div>

                            {/* Hover Overlay */}
                            <div className='absolute inset-0 bg-black/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center rounded-2xl backdrop-blur-sm'>
                                <span className='text-xs text-gray-400 uppercase tracking-widest mb-2'>
                                    {item.type === "graffiti"
                                        ? "Ulična Umjetnost"
                                        : "Digitalna Poezija"}
                                </span>
                                <p className='text-3xl font-bold text-white mb-1'>
                                    {item.author}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
