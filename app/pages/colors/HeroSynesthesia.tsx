import { useState } from 'react';
import { ArrowDown, Ear, Eye } from 'lucide-react';

export default function HeroSynesthesia({ onStart }: { onStart: () => void }) {
  const [bgColor, setBgColor] = useState('bg-neutral-900');
  const [activeSense, setActiveSense] = useState<string | null>(null);

  return (
    <section className={`relative h-screen w-full flex flex-col items-center justify-center transition-colors duration-1000 ${bgColor} overflow-hidden text-white`}>
      
      {/* Organic Background Shapes */}
      <div className="absolute inset-0 opacity-20">
         <div className="absolute top-10 left-10 w-64 h-64 bg-blue-500 rounded-full mix-blend-screen filter blur-3xl animate-pulse"></div>
         <div className="absolute bottom-10 right-10 w-96 h-96 bg-red-500 rounded-full mix-blend-screen filter blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl">
        <p className="text-gray-400 mb-6 font-mono text-sm uppercase tracking-[0.5em]">Laboratorij</p>
        
        <h1 className="text-5xl md:text-8xl font-black leading-tight mb-8 cursor-default selection:bg-transparent">
          KAD RIJEČI
          <br />
          POSTANU
          <span 
            onMouseEnter={() => { setBgColor('bg-yellow-600'); setActiveSense('zvuk trube (Kandinsky)'); }}
            onMouseLeave={() => { setBgColor('bg-neutral-900'); setActiveSense(null); }}
            className="text-yellow-400 hover:text-white transition-colors duration-300 inline-block mx-4 hover:scale-110 transform cursor-pointer underline decoration-4 underline-offset-8 decoration-yellow-400"
          >
            BOJE
          </span>
        </h1>

        <div className="h-12 flex items-center justify-center gap-2 text-xl font-serif italic text-white/80">
          {activeSense ? (
            <>
              <Ear className="animate-bounce" /> 
              <span>Čuješ li {activeSense}?</span>
            </>
          ) : (
            <span className="opacity-50">Prijeđi mišem preko istaknute riječi...</span>
          )}
        </div>

        <p className="mt-12 max-w-lg mx-auto text-gray-300 leading-relaxed">
          <strong>Sinestezija:</strong> Neurološki fenomen u kojem podražaj jednog osjetila (npr. zvuk riječi) automatski izaziva doživljaj u drugom osjetilu (npr. vizija boje). Danas ćemo istražiti kako pjesnici i slikari koriste ovaj fenomen.
        </p>
      </div>

      <div className="absolute bottom-10 z-20">
        <button onClick={onStart} className="flex flex-col items-center gap-2 text-white/50 hover:text-white transition-colors">
          <span className="text-xs uppercase tracking-widest">Uđi u laboratorij</span>
          <ArrowDown className="animate-bounce" />
        </button>
      </div>
    </section>
  );
}