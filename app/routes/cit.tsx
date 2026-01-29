// app/pages/city/ImpressionismIntro.tsx
import React from "react";
import { motion } from "framer-motion";
import { timelinePhases } from "../pages/city/timelineData";
import { ArrowDown, Check, FlaskConical, Microscope, Palette, BookOpen } from "lucide-react";

interface IntroProps {
  onComplete: () => void;
}

const ImpressionismIntro: React.FC<IntroProps> = ({ onComplete }) => {
  
  // Helper za ikone (isti kao prije)
  const getIcon = (category?: string) => {
    switch (category) {
      case "science": return <Microscope className="w-5 h-5 text-cyan-400" />;
      case "social": return <FlaskConical className="w-5 h-5 text-purple-400" />;
      case "literature": return <BookOpen className="w-5 h-5 text-yellow-400" />;
      case "painting": return <Palette className="w-5 h-5 text-pink-400" />;
      default: return <div className="w-4 h-4 bg-gray-400 rounded-full" />;
    }
  };

  return (
    // Uklonjen h-screen i overflow-hidden kako bi stranica mogla rasti
    <div className="min-h-screen bg-slate-950 text-slate-100 relative pb-20">
      
      {/* Pozadinska mrežica */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-0"></div>

      {/* Hero Header na vrhu */}
      <div className="relative z-10 py-20 text-center px-4">
        <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-display font-bold text-teal-400 mb-6 drop-shadow-lg"
        >
          Put do Impresije
        </motion.h1>
        <p className="max-w-2xl mx-auto text-xl text-slate-300 italic">
          Prije nego što zakoračite u naš Grad, otkrijte kako su znanost, tehnologija i društvene promjene zauvijek promijenile način na koji gledamo svijet.
        </p>
        <div className="flex justify-center mt-12">
            <ArrowDown className="w-8 h-8 text-teal-500 animate-bounce" />
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 relative z-10">
        
        {/* Centralna linija koja ide kroz SVE faze */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-teal-900 via-slate-700 to-teal-900 transform md:-translate-x-1/2 -z-10"></div>

        {timelinePhases.map((phase, phaseIdx) => (
          <div key={phase.id} className="mb-32">
            
            {/* Naslov Faze - Ljepljiv ili istaknut */}
            <div className="flex justify-center mb-16 sticky top-4 z-20">
                <div className="bg-slate-900/90 backdrop-blur border border-teal-500/30 px-6 py-3 rounded-full shadow-xl text-center">
                    <span className="block text-xs uppercase tracking-widest text-teal-400 font-bold mb-1">Razdoblje {phase.id}</span>
                    <h2 className="text-xl md:text-2xl font-bold text-white">{phase.title}</h2>
                </div>
            </div>

            {/* Događaji u fazi */}
            <div className="space-y-24">
              {phase.events.map((event, index) => (
                <motion.div
                  key={`${phase.id}-${index}`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                  className={`flex flex-col md:flex-row items-center w-full group ${
                    event.type === "context" ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Prazna strana za balans */}
                  <div className="hidden md:block w-1/2"></div>

                  {/* Točka na liniji */}
                  <div className="absolute left-4 md:left-1/2 w-10 h-10 rounded-full bg-slate-900 border-4 border-slate-600 group-hover:border-teal-400 transition-colors flex items-center justify-center transform -translate-x-1/2 z-10 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                    {getIcon(event.category)}
                  </div>

                  {/* Sadržaj Kartice */}
                  <div className={`w-full md:w-1/2 pl-16 md:pl-0 ${
                    event.type === "context" ? "md:pr-16" : "md:pl-16"
                  }`}>
                    <div className="bg-slate-800/60 backdrop-blur-md rounded-2xl border border-slate-700 overflow-hidden hover:shadow-2xl hover:shadow-teal-900/20 hover:border-teal-500/30 transition-all duration-300">
                      
                      {/* Image Placeholder Area */}
                      <div className="h-48 bg-slate-700 w-full relative overflow-hidden group-inner">
                         {/* Ovdje bi išla prava slika: <img src={event.imageUrl} ... /> */}
                         {/* Koristim div s gradientom kao placeholder */}
                         <div className={`w-full h-full bg-gradient-to-br ${
                             event.type === 'context' ? 'from-purple-900/40 to-slate-800' : 'from-pink-900/40 to-slate-800'
                         } flex items-center justify-center text-slate-500`}>
                            {/* Ako želiš pravi placeholder dok nemaš slike: */}
                            <span className="text-sm uppercase tracking-widest font-semibold opacity-50">
                                Slika: {event.title}
                            </span>
                         </div>
                         
                         {/* Godina kao 'badge' preko slike */}
                         <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur px-3 py-1 rounded-lg border border-slate-600">
                             <span className="text-xl font-display font-bold text-white">{event.year}</span>
                         </div>
                      </div>

                      <div className="p-6">
                        <div className={`text-xs font-bold uppercase tracking-wider mb-2 ${
                            event.type === "context" ? "text-purple-400" : "text-pink-400"
                        }`}>
                           {event.type === "context" ? "Kontekst & Znanost" : "Umjetnost & Kultura"}
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-3">
                          {event.title}
                        </h3>
                        <p className="text-slate-300 leading-relaxed text-sm md:text-base">
                          {event.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}

        {/* Završni CTA (Call to Action) */}
        <div className="mt-32 mb-20 text-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="inline-block p-1 rounded-2xl bg-gradient-to-r from-teal-500 via-purple-500 to-pink-500"
            >
                <button 
                    onClick={onComplete}
                    className="bg-slate-900 text-white text-xl md:text-2xl font-bold px-12 py-6 rounded-xl hover:bg-slate-800 transition-all flex items-center gap-4"
                >
                    <span>Spreman sam za Grad</span>
                    <Check className="w-8 h-8 text-green-400" />
                </button>
            </motion.div>
            <p className="mt-4 text-slate-400 text-sm">Kliknite za ulazak u interaktivnu mapu</p>
        </div>

      </div>
    </div>
  );
};

export default ImpressionismIntro;