import { useState } from "react";
import { Link } from "react-router";
import { Info, ArrowRight } from "lucide-react";
import type { StreetArtPiece } from "~/types/walls";

const artPieces: StreetArtPiece[] = [
    {
        id: 1,
        artist: "Anoniman",
        type: "Potpisivanje sprejem",
        image: "https://image.dnevnik.hr/media/images/1920x1080/Sep2024/62905723-problem-grafita-u-zagrebu.jpg",
        points: [
            {
                id: 1,
                x: 20,
                y: 40,
                title: "Tag",
                desc: "Osnovni potpis. Brz, jednobojan, označava prisutnost: 'Bio sam ovdje'. Pripada internoj komunikaciji supkulture.",
            },
            {
                id: 2,
                x: 60,
                y: 60,
                title: "Stilizacija",
                desc: "Složena slova koja su često teška za pročitati (Wildstyle). Ovdje je forma važnija od čitljivosti za širu publiku.",
            },
        ],
    },
    {
        id: 2,
        artist: "Anoniman",
        type: "Subkultura",
        image: "https://rangandatta.wordpress.com/wp-content/uploads/2015/06/zagreb-graffti-1.jpg",
        points: [
            {
                id: 1,
                x: 20,
                y: 40,
                title: "Tag",
                desc: "Osnovni potpis. Brz, jednobojan, označava prisutnost: 'Bio sam ovdje'. Pripada internoj komunikaciji supkulture.",
            },
            {
                id: 2,
                x: 60,
                y: 60,
                title: "Stilizacija",
                desc: "Složena slova koja su često teška za pročitati (Wildstyle). Ovdje je forma važnija od čitljivosti za širu publiku.",
            },
        ],
    },
    {
        id: 3,
        artist: "Lonac (He Art)",
        type: "Mural",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Mural_by_Lonac.jpg/1280px-Mural_by_Lonac.jpg",
        points: [
            {
                id: 1,
                x: 50,
                y: 30,
                title: "Fotorealizam",
                desc: "Za razliku od brzih grafita, ovo zahtijeva dane rada, skelu i vještinu klasičnog slikarstva. To je 'visoka' ulična umjetnost.",
            },
            {
                id: 2,
                x: 50,
                y: 70,
                title: "Kontekst",
                desc: "Slika komunicira s arhitekturom zgrade (cijevi postaju krvne žile) i postaje dio identiteta kvarta.",
            },
        ],
    },
    {
        id: 4,
        artist: "Banksy (Stil)",
        type: "Šablona (Stencil)",
        image: "https://images.unsplash.com/photo-1551895548-225d4725d6a5?q=80&w=2672&auto=format&fit=crop",
        points: [
            {
                id: 1,
                x: 40,
                y: 50,
                title: "Brzina i Poruka",
                desc: "Šablona se pripremi unaprijed. Na zidu je gotova za sekundu. Ovdje je satirična poruka važnija od likovne vještine.",
            },
        ],
    },
];

export default function StreetArtGallery({ onNext }: { onNext: () => void }) {
    const [activePoint, setActivePoint] = useState<{
        title: string;
        desc: string;
    } | null>(null);

    return (
        <section className='w-full py-16 bg-black text-white overflow-hidden border-t border-gray-800'>
            <div className='container mx-auto px-4 mb-8'>
                <h2 className='text-4xl font-bold mb-2 text-yellow-400'>
                    Ulična umjetnost
                </h2>
                <p className='text-gray-400'>
                    Šetnja kroz evoluciju urbanog izraza. Klikni na crvene točke
                    za analizu.
                </p>
            </div>

            {/* Horizontal Scroll Container */}
            <div className='flex overflow-x-auto snap-x snap-mandatory gap-8 pb-12 px-4 md:px-12 no-scrollbar'>
                {artPieces.map((art) => (
                    <div
                        key={art.id}
                        className='snap-center shrink-0 w-[85vw] md:w-[60vw] relative group rounded-xl overflow-hidden border border-gray-800'>
                        <img
                            src={art.image}
                            alt={art.artist}
                            className='w-full h-[60vh] object-cover brightness-50 group-hover:brightness-100 transition-all duration-500'
                        />

                        <div className='absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-black/70 to-transparent p-6 pointer-events-none'>
                            <h3 className='text-3xl font-bold'>{art.artist}</h3>
                            <p className='text-sm uppercase tracking-wider text-yellow-400'>
                                {art.type}
                            </p>
                        </div>

                        {art.points.map((point) => (
                            <button
                                type='button'
                                key={point.id}
                                className='absolute w-8 h-8 bg-red-600 rounded-full border-2 border-white flex items-center justify-center hover:scale-125 transition-transform animate-pulse hover:animate-none z-10 cursor-pointer'
                                style={{
                                    top: `${point.y}%`,
                                    left: `${point.x}%`,
                                }}
                                onClick={() => setActivePoint(point)}>
                                <Info size={16} />
                            </button>
                        ))}
                    </div>
                ))}

                {/* Next Module Button */}
                <div className='snap-center shrink-0 w-[85vw] md:w-[30vw] flex items-center justify-center bg-white text-black rounded-xl cursor-pointer hover:bg-gray-200 transition-colors group'>
                    <div className='text-center p-8'>
                        <Link to='/social'>
                            <h3 className='text-2xl font-bold mb-4'>
                                S ULIČNIH ZIDOVA
                                <br />
                                NA ZIDOVE MREŽA
                            </h3>
                        </Link>
                        <div className='w-16 h-16 bg-black text-white rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform'>
                            <ArrowRight size={32} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Analysis Modal */}
            {activePoint && (
                <div className='fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-white text-black p-6 rounded-lg shadow-2xl z-50 max-w-md w-[90%] border-l-8 border-red-600 animate-in fade-in slide-in-from-bottom-4'>
                    <h4 className='font-bold text-lg mb-1'>
                        {activePoint.title}
                    </h4>
                    <p className='text-sm text-gray-700'>{activePoint.desc}</p>
                    <button
                        onClick={() => setActivePoint(null)}
                        className='absolute top-2 right-2 text-gray-400 hover:text-black font-bold p-2'>
                        ✕
                    </button>
                </div>
            )}
        </section>
    );
}
