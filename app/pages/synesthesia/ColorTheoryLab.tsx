import { useState } from "react";
import { synesthesiaColors } from "~/data/synesthesiaData";
import { Palette, ShoppingBag, Music, Shapes } from "lucide-react";

export default function ColorTheoryLab() {
    const [selected, setSelected] = useState(synesthesiaColors[0]);

    return (
        <section className='py-20 bg-white text-black min-h-screen flex flex-col items-center'>
            <div className='container mx-auto px-4'>
                <h2 className='text-4xl font-bold mb-4 text-center font-display'>
                    MODUL A: TEORIJA OBLIKA I BOJA
                </h2>
                <p className='text-center text-gray-500 mb-12 max-w-2xl mx-auto'>
                    Vasilij Kandinski (slikar) i moderni marketing imaju
                    različite poglede na boju.
                    <br />
                    Klikni na boju i istraži razliku između{" "}
                    <strong>Duhovnog</strong> i <strong>Komercijalnog</strong>.
                </p>

                <div className='flex flex-col lg:flex-row gap-12 items-start justify-center'>
                    {/* Palette Selection */}
                    <div className='flex flex-row lg:flex-col gap-4 justify-center w-full lg:w-auto p-4 bg-gray-50 rounded-2xl'>
                        {synesthesiaColors.map((color) => (
                            <button
                                key={color.id}
                                onClick={() => setSelected(color)}
                                className={`w-12 h-12 lg:w-16 lg:h-16 rounded-full border-4 transition-all duration-300 shadow-lg hover:scale-110 relative group ${selected.id === color.id ? "border-black scale-110 ring-2 ring-offset-2 ring-black" : "border-white"}`}
                                style={{ backgroundColor: color.hex }}
                                title={color.name}>
                                <span className='absolute left-full ml-4 bg-black text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10 hidden lg:block'>
                                    {color.name}
                                </span>
                            </button>
                        ))}
                    </div>

                    {/* Comparison Cards */}
                    <div className='flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl'>
                        {/* KANDINSKY CARD */}
                        <div className='bg-[#f8f9fa] border-2 border-black/5 p-8 rounded-3xl relative overflow-hidden hover:shadow-xl transition-shadow'>
                            <div className='absolute top-0 right-0 p-6 opacity-5'>
                                <Shapes size={180} />
                            </div>

                            <div className='relative z-10'>
                                <div className='flex items-center gap-3 mb-6 pb-4 border-b border-gray-200'>
                                    <div className='p-2 bg-blue-100 rounded-lg text-blue-700'>
                                        <Palette size={24} />
                                    </div>
                                    <div>
                                        <h3 className='font-bold text-xl'>
                                            DUHOVNOST
                                        </h3>
                                        <p className='text-xs text-gray-500 uppercase tracking-wider'>
                                            Teorija Vasilija Kandinskog
                                        </p>
                                    </div>
                                </div>

                                <div className='space-y-6'>
                                    <div>
                                        <h4 className='text-xs font-bold uppercase text-gray-400 mb-2'>
                                            Unutarnji Zvuk
                                        </h4>
                                        <div className='flex items-center gap-3 text-lg font-serif italic text-gray-800 bg-white p-4 rounded-xl shadow-sm border border-gray-100'>
                                            <Music
                                                size={20}
                                                className='text-blue-500'
                                            />
                                            "{selected.kandinsky.sound}"
                                        </div>
                                    </div>

                                    <div className='grid grid-cols-2 gap-4'>
                                        <div className='bg-white p-4 rounded-xl shadow-sm border border-gray-100'>
                                            <h4 className='text-xs font-bold uppercase text-gray-400 mb-1'>
                                                Forma
                                            </h4>
                                            <p className='text-lg font-bold capitalize text-gray-900'>
                                                {selected.kandinsky.shape}
                                            </p>
                                        </div>
                                        <div className='bg-white p-4 rounded-xl shadow-sm border border-gray-100'>
                                            <h4 className='text-xs font-bold uppercase text-gray-400 mb-1'>
                                                Kretanje
                                            </h4>
                                            <p className='text-sm font-medium text-gray-600'>
                                                {selected.kandinsky.movement}
                                            </p>
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className='text-xs font-bold uppercase text-gray-400 mb-2'>
                                            Značenje
                                        </h4>
                                        <p className='text-gray-700 leading-relaxed'>
                                            {selected.kandinsky.meaning}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* MARKETING CARD */}
                        <div className='bg-neutral-900 text-gray-300 p-8 rounded-3xl relative overflow-hidden hover:shadow-2xl transition-shadow'>
                            <div className='absolute top-0 right-0 p-6 opacity-10'>
                                <ShoppingBag size={180} />
                            </div>

                            <div className='relative z-10'>
                                <div className='flex items-center gap-3 mb-6 pb-4 border-b border-gray-700'>
                                    <div className='p-2 bg-yellow-500/20 rounded-lg text-yellow-400'>
                                        <ShoppingBag size={24} />
                                    </div>
                                    <div>
                                        <h3 className='font-bold text-xl text-white'>
                                            TRŽIŠTE
                                        </h3>
                                        <p className='text-xs text-gray-500 uppercase tracking-wider'>
                                            Psihologija Marketinga
                                        </p>
                                    </div>
                                </div>

                                <div className='space-y-8'>
                                    <div>
                                        <h4 className='text-xs font-bold uppercase text-gray-600 mb-2'>
                                            Poruka kupcu
                                        </h4>
                                        <p className='text-xl font-bold text-white leading-tight'>
                                            {selected.psychology.marketing}
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className='text-xs font-bold uppercase text-gray-600 mb-2'>
                                            Fiziološki efekt
                                        </h4>
                                        <p className='text-sm border-l-2 border-yellow-500 pl-4 py-1'>
                                            {selected.psychology.effect}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
