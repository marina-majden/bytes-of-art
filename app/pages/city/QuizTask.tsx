import { useState } from "react";
import { motion } from "motion/react";
import QuizStack, { type SwipeDirection } from "./QuizStack";
import { CityStyles } from "./CityStyles";

// 1. Definiramo tip podataka
type ArtMovement = "impressionism" | "expressionism";

interface ArtCard {
    id: number | string;
    img: string;
    category: ArtMovement;
    author: string;
    title?: string;
}

// 2. Mock podaci (u stvarnosti bi ovo dolazilo s API-ja ili propsa)

// 2. Prošireni podaci s traženim autorima
const INITIAL_DATA: ArtCard[] = [
    // --- EKSPRESIONIZAM (Desno) ---
    {
        id: 1,
        img: "https://artlogic-res.cloudinary.com/w_1200,c_limit,f_auto,fl_lossy,q_auto/ws-artlogicwebsite2330/usr/images/feature_panels/image/items/7d/7dd3e1ab8ec6437eae5cea3b6bb0ce67/grosz-tempo-of-the-street-oil-on-board-63.8-x-78.2-cm-1918-lp.jpg",
        category: "expressionism",
        author: "George Grosz",
        title: "Ritam ulice",
    },
    {
        id: 2,
        img: "https://www.moma.org/media/W1siZiIsIjQyODY0NSJdLFsicCIsImNvbnZlcnQiLCItcXVhbGl0eSA5MCAtcmVzaXplIDIwMDB4MjAwMFx1MDAzZSJdXQ.jpg?sha=86361fae3acf4726",
        category: "expressionism",
        author: "Ernst Ludwig Kirchner",
        title: "Ulica u Dresdenu",
    },
    {
        id: 3,
        img: "https://www.artchive.com/wp-content/uploads/2024/08/the-wolves-balkan-war-franz-marc-1913.jpg",
        category: "expressionism",
        author: "Franz Marc",
        title: "Vukovi (Balkanski rat)",
    },
    {
        id: 4,
        img: "https://www.sartle.com/media/artwork/the-last-supper-emil-nolde.jpg?style=colorbox_zoom&itok=l5fEmWSE",
        category: "expressionism",
        author: "Emil Nolde",
        title: "Posljednja večera",
    },

    // --- IMPRESIONIZAM (Lijevo) ---
    {
        id: 5,
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Claude_Monet%2C_Impression%2C_soleil_levant.jpg/800px-Claude_Monet%2C_Impression%2C_soleil_levant.jpg",
        category: "impressionism",
        author: "Claude Monet",
        title: "Impresija, izlazak sunca",
    },
    {
        id: 6,
        img: "https://sothebys-com.brightspotcdn.com/dims4/default/d3b64a2/2147483647/strip/true/crop/2000x1608+0+0/resize/1154x928!/format/webp/quality/90/?url=http%3A%2F%2Fsothebys-brightspot.s3.amazonaws.com%2Fdotcom%2Fb8%2F2b%2Fb90262914f3caa07bfcd1f0a565b%2F532n10067-9yz6m.jpg",
        category: "impressionism",
        author: "Pierre-Auguste Renoir",
        title: "La Promenade de le Bor",
    },
    {
        id: 7,
        img: "https://api.nga.gov/iiif/bf6c7c73-82e8-4ef7-8ac8-71920c8eb2b9/full/!800,800/0/default.jpg",
        category: "impressionism",
        author: "Berthe Morisot",
        title: "Luka u Lorientu",
    },
    {
        id: 8,
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/A_Sunday_on_La_Grande_Jatte%2C_Georges_Seurat%2C_1884.jpg/800px-A_Sunday_on_La_Grande_Jatte%2C_Georges_Seurat%2C_1884.jpg",
        category: "impressionism",
        author: "Georges Seurat",
        title: "Nedjeljno poslijepodne", // (Poentilizam, ali spada pod širi kišobran/razdoblje za potrebe kviza)
    },
];

// 3. Pomoćna funkcija za miješanje niza (Fisher-Yates algoritam)
function shuffleArray<T>(array: T[]): T[] {
    const newArray = [...array]; // Kopiramo niz da ne mutiramo original
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

export default function ArtQuiz() {
    // Inicijaliziramo state s izmiješanim nizom
    // Koristimo funkciju u useState-u (() => ...) da se izvrši samo pri prvom renderu
    const [cards, setCards] = useState<ArtCard[]>(() =>
        shuffleArray(INITIAL_DATA)
    );
    const [score, setScore] = useState({ correct: 0, incorrect: 0 });

    const handleVote = async (
        item: ArtCard,
        direction: SwipeDirection
    ): Promise<boolean> => {
        let isCorrect = false;

        if (direction === "left" && item.category === "impressionism") {
            isCorrect = true;
        } else if (direction === "right" && item.category === "expressionism") {
            isCorrect = true;
        }

        setScore((prev) => ({
            correct: isCorrect ? prev.correct + 1 : prev.correct,
            incorrect: !isCorrect ? prev.incorrect + 1 : prev.incorrect,
        }));

        setCards((prev) => {
            const remaining = prev.filter((c) => c.id !== item.id);
            if (isCorrect) {
                return remaining;
            } else {
                const recycledCard = {
                    ...item,
                    id: `${item.id}-${Date.now()}`,
                };
                // Ovdje NE miješamo ponovno, samo vraćamo karticu na dno
                return [recycledCard, ...remaining];
            }
        });

        return isCorrect;
    };

    // Funkcija za restart igre - sada i ponovno miješa karte!
    const restartGame = () => {
        setCards(shuffleArray(INITIAL_DATA));
        setScore({ correct: 0, incorrect: 0 });
    };

    return (
        <div className='flex flex-col justify-between items-center min-h-screen p-8 font-serif container'>
            <CityStyles />
            <h1 className='text-2xl font-serif mb-2 text-gray-400'>
                Odvuci sliku u odgovarajuće razdoblje!
            </h1>
            <p className='mb-8 text-gray-400 font-tags'>
                <span className='font-bold font-serif text-blue-600'>
                    ← Lijevo:
                </span>{" "}
                Impresionizam |
                <span className='font-bold font-serif text-purple-600'>
                    {" "}
                    Desno:
                </span>{" "}
                Ekspresionizam →
            </p>

            {/* KONTEJNER IGRE: Prikazuje ili Karte ili Ekran za pobjedu */}
            <div className='relative w-full min-w-[510px] flex items-center justify-center '>
                {cards.length > 0 ? (
                    <QuizStack
                        data={cards}
                        cardWidth={500}
                        onVote={handleVote}
                        renderCard={(card) => (
                            <div className='glass-card select-none flex flex-col items-center p-3'>
                                <div className='w-full relative'>
                                    <img
                                        src={card.img}
                                        alt={card.title}
                                        className='w-full h-auto rounded-lg pointer-events-none object-contain'
                                    />
                                </div>
                                <div className='mt-3 text-center'>
                                    <p className='font-bold text-gray-500 text-lg'>
                                        {card.author}
                                    </p>
                                    <p className='text-sm text-gray-500 italic'>
                                        "{card.title}"
                                    </p>
                                </div>
                            </div>
                        )}
                    />
                ) : (
                    // EKRAN ZA POBJEDU / RESTART
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className='flex flex-col items-center justify-center text-center p-8 rounded-2xl shadow-lg border-2 border-teal-300 glass-card'>
                        <div className='text-6xl mb-4'>🎨</div>
                        <h2 className='text-2xl font-bold text-gray-500 mb-2'>
                            Odličan posao!
                        </h2>
                        <p className='text-gray-600 mb-6'>
                            Uspješno ste razvrstali sve slike!
                        </p>

                        <button
                            onClick={restartGame}
                            className='group relative px-6 py-3 font-bold text-white rounded-full shadow-lg overflow-hidden neumorph card-up transition-transform active:scale-95 hover:scale-105 hover:card-down'>
                            <span className='absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 group-hover:from-blue-600 group-hover:to-purple-700 transition-colors'></span>
                            <span className='relative flex items-center gap-2'>
                                <span>Igraj ponovno</span>
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    width='20'
                                    height='20'
                                    viewBox='0 0 24 24'
                                    fill='none'
                                    stroke='currentColor'
                                    strokeWidth='2'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'>
                                    <path d='M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 12' />
                                    <path d='M3 5v7h7' />
                                </svg>
                            </span>
                        </button>
                    </motion.div>
                )}
            </div>

            {/* Scoreboard */}
            <div className='mt-12 grid grid-cols-3 gap-8 text-center glass-card p-6 rounded-2xl shadow-sm w-full max-w-md'>
                <div>
                    <div className='text-3xl font-bold text-teal-500'>
                        {score.correct}
                    </div>
                    <div className='text-xs text-gray-300 uppercase tracking-wide'>
                        Točno
                    </div>
                </div>
                <div>
                    <div className='text-3xl font-bold text-pink-700'>
                        {score.incorrect}
                    </div>
                    <div className='text-xs text-gray-300 uppercase tracking-wide'>
                        Netočno
                    </div>
                </div>
                <div>
                    <div className='text-3xl font-bold text-gray-300'>
                        {cards.length}
                    </div>
                    <div className='text-xs text-gray-300 uppercase tracking-wide'>
                        Preostalo
                    </div>
                </div>
            </div>
        </div>
    );
}
