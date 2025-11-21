import { ArrowDown } from "lucide-react";

export default function HeroSection({ onStart }: { onStart: () => void }) {
    return (
        <section className='relative h-screen w-full flex flex-col md:flex-row overflow-hidden font-sans'>
            {/* Lijeva strana - ZID (Ulica) */}
            <div className="relative w-full md:w-1/2 h-1/2 md:h-full bg-neutral-900 flex items-center justify-center group cursor-[url('/assets/paint-spray.png'),_auto]">
                {/* Background texture simulation */}
                <div className="absolute inset-0 opacity-20 bg-[url('https://thumbs.dreamstime.com/b/graffiti-brick-wall-horizontal-image-graffiti-brick-wall-122633345.jpg')]"></div>
                <div className='relative z-10 text-center p-8'>
                    <h1 className='text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-red-500 via-orange-500 to-yellow-500 transform -rotate-3 tracking-tighter drop-shadow-lg font-display'>
                        ZIDOVI
                    </h1>
                    <p className='text-gray-400 mt-4 text-xl font-mono select-none lowercase'>
                        Glas ulice. Buka. Identitet.
                    </p>
                </div>
                {/* Graffiti overlay effect on hover could go here */}
                
            </div>

            {/* Desna strana - MREŽA (Ekran) */}
            <div className='relative w-full md:w-1/2 h-1/2 md:h-full bg-white flex items-center justify-center border-l-4 border-black'>
                <div className='text-center p-8'>
                    <h1 className='text-6xl md:text-8xl font-thin text-black tracking-widest font-serif italic'>
                        mreže
                    </h1>
                    <p className='text-gray-500 mt-4 text-sm font-mono lowercase typing-effect'>
                        tišina ekrana. intimnost. like.
                    </p>
                </div>
            </div>

            {/* Start Button */}
            <div className='absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20'>
                <button
                    type="button"
                    onClick={onStart}
                    className='flex flex-col items-center gap-2 text-white mix-blend-difference hover:scale-110 transition-transform duration-300 cursor-pointer'>
                    <span className='text-lg font-bold uppercase tracking-widest'>
                        Uđi u prostor
                    </span>
                    <ArrowDown className='w-8 h-8 animate-bounce' />
                </button>
            </div>
        </section>
    );
}
