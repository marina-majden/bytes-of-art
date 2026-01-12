import { useState } from 'react';
import { synesthesiaColors } from '~/data/synesthesiaData';
import { RefreshCw, Play, Wand2 } from 'lucide-react';
import type { VisualElement } from '~/types/synesthesia';

const SAMPLE_POEM = "Olovne i teške snove snivaju\nOblaci nad tamnim gorskim stranama\nMonotone sjene rijekom plivaju\nŽutom rijekom među golim granama";

export default function KandinskyTranslator() {
  const [text, setText] = useState(SAMPLE_POEM);
  const [selectedText, setSelectedText] = useState('');
  const [visuals, setVisuals] = useState<VisualElement[]>([]);

  const handleTextSelect = () => {
    const selection = window.getSelection();
    if (selection && selection.toString().trim().length > 0) {
      setSelectedText(selection.toString().trim());
    }
  };

  const applyColor = (colorId: string) => {
    if (!selectedText) return;

    const colorData = synesthesiaColors.find(c => c.id === colorId);
    if (!colorData) return;

    const newElement: VisualElement = {
      id: Date.now(),
      colorId: colorData.id,
      shape: colorData.kandinsky.shape,
      // allow much larger shapes so they can extend beyond the canvas and be clipped
      size: Math.random() * 220 + 40, // 40-260px
      x: Math.random() * 80 + 10,    // 10-90% canvas
      y: Math.random() * 80 + 10,
      word: selectedText
    };

    setVisuals([...visuals, newElement]);
    setSelectedText('');
    if (window.getSelection) window.getSelection()?.removeAllRanges();
  };

  const renderShape = (el: VisualElement) => {
    const color = synesthesiaColors.find(c => c.id === el.colorId)?.hex || '#000';
    
    // Stilovi za animaciju i poziciju
    const commonClasses = "absolute mix-blend-multiply cursor-help transition-all duration-700 animate-in zoom-in hover:scale-110 hover:z-50 hover:mix-blend-normal opacity-80";
    const style = { left: `${el.x}%`, top: `${el.y}%`, width: `${el.size}px`, height: `${el.size}px` };

    if (el.shape === 'krug') {
      return (
        <div 
          key={el.id} title={`Riječ: "${el.word}"`} 
          className={`${commonClasses} rounded-full shadow-sm`}
          style={{ ...style, backgroundColor: color }} 
        />
      );
    } 
    
    if (el.shape === 'kvadrat') {
      return (
        <div 
          key={el.id} title={`Riječ: "${el.word}"`} 
          className={`${commonClasses} rounded-sm shadow-sm`}
          style={{ ...style, backgroundColor: color }} 
        />
      );
    }
    
    if (el.shape === 'trokut') {
      return (
        <div 
          key={el.id} title={`Riječ: "${el.word}"`} 
          className={`${commonClasses}`}
          style={{ 
            left: `${el.x}%`, top: `${el.y}%`,
            width: 0, height: 0,
            borderLeft: `${el.size / 2}px solid transparent`,
            borderRight: `${el.size / 2}px solid transparent`,
            borderBottom: `${el.size}px solid ${color}`,
            filter: 'drop-shadow(0 4px 3px rgb(0 0 0 / 0.07))'
          }} 
        />
      );
    }
  };

  return (
    <section className="py-20 bg-neutral-100 min-h-screen">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-4 text-center font-display">MODUL B: KROMATSKI PREVODITELJ</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Kandinski je tvrdio: <strong className="text-yellow-600">Žuta je trokut</strong>. <strong className="text-red-600">Crvena je kvadrat</strong>. <strong className="text-blue-600">Plava je krug</strong>.<br/>
          Označi riječ u tekstu i "prevedi" je u oblik. Stvori vizualnu kompoziciju pjesme.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-auto lg:h-[650px]">
          
          {/* EDITOR (Lijevo) */}
          <div className="lg:col-span-4 bg-white p-6 rounded-2xl shadow-lg flex flex-col border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-sm uppercase tracking-wider text-gray-500">Tekstni Laboratorij</h3>
              <button onClick={() => setVisuals([])} className="text-xs flex items-center gap-1 text-red-500 hover:bg-red-50 px-2 py-1 rounded">
                <RefreshCw size={12}/> Reset
              </button>
            </div>
            
            <textarea
              className="w-full flex-1 p-4 bg-gray-50 rounded-xl border-2 border-transparent focus:border-blue-500 focus:bg-white transition-colors font-serif text-lg leading-relaxed resize-none outline-none mb-6"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onSelect={handleTextSelect}
              placeholder="Upiši ili zalijepi pjesmu ovdje..."
            />

            <div className={`transition-all duration-300 ${selectedText ? 'opacity-100 translate-y-0' : 'opacity-50 translate-y-4 pointer-events-none'}`}>
              <p className="text-xs font-bold uppercase text-gray-400 mb-3 flex items-center gap-2">
                <Wand2 size={14} />
                Odaberi oblik/emociju za: <span className="text-black bg-yellow-200 px-1">"{selectedText.substring(0, 15)}{selectedText.length > 15 ? '...' : ''}"</span>
              </p>
              
              <div className="grid grid-cols-2 gap-2">
                {synesthesiaColors.map(color => (
                  <button
                    key={color.id}
                    onClick={() => applyColor(color.id)}
                    className="flex items-center gap-3 p-2 rounded-lg border hover:bg-gray-50 hover:border-gray-300 transition-all group text-left"
                  >
                    <div 
                      className="w-6 h-6 shrink-0 shadow-sm" 
                      style={{ 
                        backgroundColor: color.hex,
                        borderRadius: color.kandinsky.shape === 'krug' ? '50%' : '2px',
                        clipPath: color.kandinsky.shape === 'trokut' ? 'polygon(50% 0%, 0% 100%, 100% 100%)' : 'none'
                      }} 
                    />
                    <div>
                      <span className="block text-xs font-bold">{color.name}</span>
                      <span className="block text-[10px] text-gray-400 capitalize">{color.kandinsky.shape}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* CANVAS (Desno) */}
          <div className="lg:col-span-8 bg-white rounded-2xl shadow-2xl overflow-hidden border-[10px] border-neutral-800 relative">
             <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur px-4 py-2 rounded-full text-xs font-bold shadow-sm border border-gray-100">
                Vizualna Kompozicija
             </div>
             
             <div className="w-full h-full relative bg-[#fdfbf7] overflow-hidden">
                {/* Grid pattern for precision feel */}
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

                {visuals.map(renderShape)}
                
                {visuals.length === 0 && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-300 pointer-events-none">
                    <Play size={64} className="mb-4 opacity-20" />
                    <p className="text-lg font-medium">Platno je prazno.</p>
                    <p className="text-sm">Označi tekst lijevo da započneš kompoziciju.</p>
                  </div>
                )}
             </div>
          </div>

        </div>
      </div>
    </section>
  );
}