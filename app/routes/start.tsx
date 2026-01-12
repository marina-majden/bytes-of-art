import React, { useState, useEffect } from "react";
import { ArrowRight, Eye, Search, MoveUpRight, Loader2 } from "lucide-react";
import boccioni from "../assets/boccioni-removebg-preview.png";
import kehinde from "../assets/kehinde.png";
import kehindeFull from "../assets/kehinde-full.webp";

const LitArtGrid: React.FC = () => {
    const [loading, setLoading] = useState(true);

    // Simulacija učitavanja resursa
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2500); // 2.5 sekunde loadera
        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return (
            <div className='flex h-screen w-screen items-center justify-center bg-[#0a192f] text-gray-200'>
                <div className='flex flex-col items-center gap-4'>
                    <Loader2 className='h-12 w-12 animate-spin text-indigo-500' />
                    <span className='animate-pulse text-xl font-light tracking-widest'>
                        Učitavanje...
                    </span>
                </div>
            </div>
        );
    }

    return (
        <div className='relative h-screen w-screen overflow-hidden bg-[#0a192f] font-sans text-gray-200 animate-in fade-in duration-1000'>
            {/* Grid Container */}
            <div className='grid h-full w-full grid-cols-4 grid-rows-3 gap-4 p-8'>
                {/* --- PRVI RED --- */}

                {/* 1.1 - 1.3: Naslov "Lit Art" */}
                <div className='col-span-3 row-start-1 flex flex-col justify-end p-4'>
                    <h1 className='font-display text-[150px] font-bold tracking-wide text-white text-center opacity-90 drop-shadow-lg'>
                        Lit Art
                    </h1>
                    <p className='max-w-md mx-auto text-md text-center font-light font-sans text-gray-400'>
                        Istraživanje raskrižja između klasične literature,
                        vizualne umjetnosti i digitalnog prostora.
                    </p>
                </div>

                {/* 1.4: Prazno polje (možemo dodati suptilni dekorativni element ili ostaviti prazno kako je traženo) */}
                <div className='col-start-4 row-start-1 hidden lg:block'></div>

                {/* --- DRUGI RED --- */}

                {/* 2.1: Symbol - Prelazi okvir */}
                <div className='group relative col-start-1 row-start-2 flex items-end justify-center overflow-visible'>
                    <div className='relative z-20 transition-all duration-700 ease-out group-hover:-translate-y-16 group-hover:scale-110'>
                        <img
                            src={boccioni}
                            alt='symbol'
                            className='h-40 w-40 object-cover'
                        />
                        <div className='h-40 w-40 overflow-hidden rounded-full border-4 border-[#0a192f] shadow-2xl'></div>
                    </div>

                    {/* Skriveni tekst koji se "izvlači" */}
                    <div className='absolute bottom-10 z-10 flex flex-col items-center opacity-0 transition-all duration-700 delay-100 group-hover:translate-y-0 group-hover:opacity-100'>
                        <span className='text-xs uppercase tracking-[0.2em] text-indigo-400'>
                            Arhetip
                        </span>
                        <span className='text-lg font-bold text-white'>
                            Skriveno značenje
                        </span>
                        <Eye className='mt-2 h-4 w-4 text-gray-400' />
                    </div>
                </div>

                {/* 2.2: Flip Box Link - Moderni grad */}
                <div className='group col-start-2 row-start-2 perspective-1000 cursor-pointer'>
                    <div className='relative h-full w-full transition-transform duration-700 transform-style-3d group-hover:rotate-y-180'>
                        {/* Front Side (Image) */}
                        <div className='absolute inset-0 backface-hidden rounded-xl overflow-hidden border border-white/10'>
                            <img
                                src='https://images.unsplash.com/photo-1480796927426-f609979314bd?q=80&w=1000&auto=format&fit=crop'
                                alt='City'
                                className='h-full w-full object-cover opacity-80 transition-opacity group-hover:opacity-100'
                            />
                            <div className='absolute bottom-4 left-4 bg-black/50 px-2 py-1 text-xs backdrop-blur-md'>
                                Arhitektura
                            </div>
                        </div>

                        {/* Back Side (Solid Color + Text) */}
                        <div className='absolute inset-0 flex flex-col items-center justify-center bg-indigo-800 p-6 text-center rotate-y-180 backface-hidden rounded-xl border border-indigo-600 shadow-[0_0_30px_rgba(79,70,229,0.3)]'>
                            <h3 className='mb-2 text-xl font-bold text-white'>
                                Moderni i avangardni grad
                            </h3>
                            <p className='text-xs text-gray-300'>
                                Urbani pejzaži kroz prizmu futurizma.
                            </p>
                            <div className='mt-4 rounded-full bg-white/10 p-2'>
                                <ArrowRight className='h-5 w-5 text-white' />
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2.3 - 3.4 (Merged): Image Kehinde - Velika slika desno */}
                <a
                    href='#project-kehinde'
                    className='group relative col-span-2 col-start-3 row-span-2 row-start-2 overflow-visible '>
                    {/* Pozadinska slika (Uzorak) - mijenja filter na hover */}
                    <div className='absolute inset-0 transition-all duration-700 ease-in-out hue-rotate-50 group-hover:hue-rotate-0 contrast-98 group-hover:contrast-100'>
                        <img
                            src={kehindeFull}
                            alt='Background Pattern'
                            className='h-full w-full object-cover object-center rounded-4xl overflow-hidden group-hover:overflow-visible transition-discrete transition-all duration-500 ease-in-out'
                        />
                    </div>
                    {/* Overlay Tekst */}
                    <div className='absolute bottom-0 left-0 w-full  p-6 pt-20'>
                        <div className='flex items-center justify-between'>
                            <div className='z-50'>
                                <h2 className='font-serif text-3xl italic text-white'>
                                    Portreti
                                </h2>
                                <p className='text-sm text-gray-300'>
                                    Rekontekstualizacija povijesti umjetnosti
                                </p>
                            </div>
                            <MoveUpRight className='h-8 w-8 text-white opacity-0 transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100' />
                        </div>
                    </div>

                    {/* PNG Žena (Cutout) - pomiče se naprijed na hover */}
                    <div className='absolute inset-0 flex items-end justify-center transition-transform duration-700 ease-out group-hover:scale-105 group-hover:-translate-y-2'>
                        <div className='h-[110%] w-auto object-cover drop-shadow-2xl filter brightness-90 contrast-110 group-hover:brightness-100 '></div>
                        <img
                            src={kehinde}
                            alt='Kehinde Portrait'
                            className='h-[174%] w-auto object-cover translate-y-44 drop-shadow-2xl filter brightness-90 contrast-110 opacity-0 group-hover:brightness-100 group-hover:opacity-100 transition-all duration-500 ease-in-out'
                        />
                    </div>
                </a>

                {/* --- TREĆI RED --- */}

                {/* 3.1: Flip Box Link - Boja */}
                <div className='group col-start-1 row-start-3 perspective-1000 cursor-pointer'>
                    <div className='relative h-full w-full transition-transform duration-700 transform-style-3d group-hover:rotate-y-180'>
                        {/* Front Side */}
                        <div className='absolute inset-0 backface-hidden rounded-xl overflow-hidden border border-white/10'>
                            <img
                                src='https://images.unsplash.com/photo-1502691876148-a84978e59af8?q=80&w=1000&auto=format&fit=crop'
                                alt='Colors'
                                className='h-full w-full object-cover opacity-80'
                            />
                            <div className='absolute bottom-4 left-4 bg-black/50 px-2 py-1 text-xs backdrop-blur-md'>
                                Teorija Boja
                            </div>
                        </div>

                        {/* Back Side */}
                        <div className='absolute inset-0 flex flex-col items-center justify-center bg-cyan-800 p-6 text-center rotate-y-180 backface-hidden rounded-xl border border-cyan-600 shadow-[0_0_30px_rgba(8,145,178,0.3)]'>
                            <h3 className='mb-2 text-xl font-bold text-white'>
                                Uloga boje
                            </h3>
                            <p className='text-xs text-gray-300'>
                                Značenje u slikama i pjesmama.
                            </p>
                            <div className='mt-4 rounded-full bg-white/10 p-2'>
                                <Search className='h-5 w-5 text-white' />
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3.2: Prazno polje */}
                <div className='col-start-2 row-start-3 hidden lg:block'></div>

                {/* 3.3 i 3.4 su već pokriveni 'row-span-2' elementom iznad */}
            </div>

            {/* CSS Utility klase za 3D transformacije (ako nisu u base tailwindu) */}
            <style>{`
        .perspective-1000 { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>
        </div>
    );
};

export default LitArtGrid;
