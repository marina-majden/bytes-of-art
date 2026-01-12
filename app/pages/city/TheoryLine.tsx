import React, { useState, useEffect, useRef } from "react";
import {
    Beaker,
    Construction,
    Camera,
    Brain,
    Factory,
    Bomb,
    Paintbrush,
    type LucideIcon,
} from "lucide-react";

// --- Types & Interfaces ---

type FilterType = "all" | "imp" | "exp";

interface TimelineContext {
    title: string;
    subtitle: string;
    desc: string;
}

interface TimelineArt {
    title: string;
    desc: string;
    imgAlt: string;
    colorClass: string;
    bgClass: string;
    textClass: string;
}

interface TimelineEvent {
    id: number;
    year: number;
    category: "imp" | "exp";
    icon: LucideIcon;
    context: TimelineContext;
    art: TimelineArt;
    type?: never;
}

interface TimelineSeparator {
    id: string;
    type: "separator";
    text: string;
    year?: never;
}

type TimelineItem = TimelineEvent | TimelineSeparator;

interface FilterButtonProps {
    active: boolean;
    onClick: () => void;
    label: string;
    color?: "stone" | "sky" | "rose";
}

// --- Component ---

const TheoryLine: React.FC = () => {
    const [filter, setFilter] = useState<FilterType>("all");
    const [visibleItems, setVisibleItems] = useState<Set<string>>(new Set());
    const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

    // Data Definition
    const timelineData: TimelineItem[] = [
        {
            id: 1,
            year: 1841,
            category: "imp",
            icon: Beaker,
            context: {
                title: "Izum tube za boju",
                subtitle: "John Goffe Rand",
                desc: "Tuba je omogućila transport boja i stabilnost novih kemijskih pigmenata, oslobodivši slikare iz ateljea.",
            },
            art: {
                title: "En Plein Air",
                desc: "Slikari izlaze u prirodu. Hvataju prolaznost svjetlosti jer sada mogu slikati na licu mjesta.",
                imgAlt: "Monet u čamcu-ateljeu",
                colorClass: "border-sky-400",
                bgClass: "bg-sky-50",
                textClass: "text-sky-700",
            },
        },
        {
            id: 2,
            year: 1853,
            category: "imp",
            icon: Construction,
            context: {
                title: "Haussmannova obnova",
                subtitle: "Pariz, 1853.-1870.",
                desc: "Srednjovjekovne ulice su srušene. Nastaju široki bulevari i parkovi. Grad postaje pozornica za promatranje.",
            },
            art: {
                title: "Urbani Pejzaž",
                desc: "Umjetnici slikaju novu geometriju grada, vrevu ulice i perspektivu širokih avenija.",
                imgAlt: "Pissarro, Bulevar Montmartre",
                colorClass: "border-sky-400",
                bgClass: "bg-sky-50",
                textClass: "text-sky-700",
            },
        },
        {
            id: 3,
            year: 1874,
            category: "imp",
            icon: Camera,
            context: {
                title: "Fotografija & Optika",
                subtitle: "Nadarov studio",
                desc: "Kamera bilježi detalje, oslobađajući slikarstvo realizma. Otkriće simultanog kontrasta boja.",
            },
            art: {
                title: "Prva izložba impresionista",
                desc: "Fokus na atmosferu i svjetlost, a ne na objekt. Kritičar Leroy ih posprdno naziva 'Impresionistima'.",
                imgAlt: "Monet, Impresija",
                colorClass: "border-sky-400",
                bgClass: "bg-sky-50",
                textClass: "text-sky-700",
            },
        },
        {
            id: "separator",
            type: "separator",
            text: "Prijelaz Stoljeća",
        },
        {
            id: 4,
            year: 1900,
            category: "exp",
            icon: Brain,
            context: {
                title: "Psihoanaliza",
                subtitle: "Sigmund Freud",
                desc: "Otkriće podsvijesti mijenja fokus s vanjskog svijeta (impresija) na unutarnji svijet (ekspresija).",
            },
            art: {
                title: "Unutarnja Istina",
                desc: "Umjetnost prestaje oponašati prirodu. Boje postaju simboličke i agresivne kako bi prikazale anksioznost.",
                imgAlt: "Munch, Krik",
                colorClass: "border-rose-500",
                bgClass: "bg-rose-50",
                textClass: "text-rose-700",
            },
        },
        {
            id: 5,
            year: 1905,
            category: "exp",
            icon: Factory,
            context: {
                title: "Dehumanizacija Grada",
                subtitle: "Berlin, Dresden",
                desc: "Gradovi postaju klaustrofobični industrijski centri. Pojedinac se osjeća izgubljeno i otuđeno u masi.",
            },
            art: {
                title: "Die Brücke (Most)",
                desc: "Njemački ekspresionisti koriste oštre, lomljene linije i kisele boje za prikaz moralnog raspada.",
                imgAlt: "Kirchner, Ulica",
                colorClass: "border-rose-500",
                bgClass: "bg-rose-50",
                textClass: "text-rose-700",
            },
        },
        {
            id: 6,
            year: 1914,
            category: "exp",
            icon: Bomb,
            context: {
                title: "Prvi svjetski rat",
                subtitle: "1914. - 1918.",
                desc: "Tehnologija postaje stroj za uništenje. Optimistični svijet 'Belle Époque' je uništen.",
            },
            art: {
                title: "Nova Stvarnost",
                desc: "Reakcija na rat je brutalni realizam. Otto Dix slika invalide rata i kaos bez uljepšavanja.",
                imgAlt: "Otto Dix, Triptih",
                colorClass: "border-stone-800",
                bgClass: "bg-stone-200",
                textClass: "text-stone-900",
            },
        },
    ];

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const target = entry.target as HTMLElement;
                        if (target.dataset.id) {
                            setVisibleItems((prev) =>
                                new Set(prev).add(target.dataset.id!)
                            );
                        }
                    }
                });
            },
            { threshold: 0.1 }
        );

        itemsRef.current.forEach((el) => {
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, [filter]);

    const filteredData = timelineData.filter((item) => {
        if (filter === "all") return true;
        if (item.type === "separator") return true;
        if ("category" in item) {
            return item.category === filter;
        }
        return false;
    });

    return (
        <div className='min-h-screen bg-stone-50 text-stone-900 font-sans selection:bg-stone-200 overflow-x-hidden'>
            {/* Header */}
            <header className='pt-20 pb-12 text-center px-4 max-w-4xl mx-auto'>
                <p className='text-stone-500 uppercase tracking-widest text-xs font-bold mb-4'>
                    Interaktivna Povijest Umjetnosti
                </p>
                <h1 className='text-5xl md:text-6xl text-stone-900 mb-6 font-serif italic'>
                    Kontekst & Stvaranje
                </h1>
                <p className='text-xl text-stone-600 leading-relaxed font-light'>
                    Analiza kauzalnih veza između tehnoloških revolucija i
                    umjetničkih pokreta.
                </p>
            </header>

            {/* Controls */}
            <div className='sticky top-0 z-40 bg-stone-50/90 backdrop-blur-md border-b border-stone-200 py-4 mb-8 shadow-sm'>
                <div className='flex justify-center gap-3'>
                    <FilterButton
                        active={filter === "all"}
                        onClick={() => setFilter("all")}
                        label='Prikaži Sve'
                    />
                    <FilterButton
                        active={filter === "imp"}
                        onClick={() => setFilter("imp")}
                        label='Impresionizam'
                        color='sky'
                    />
                    <FilterButton
                        active={filter === "exp"}
                        onClick={() => setFilter("exp")}
                        label='Ekspresionizam'
                        color='rose'
                    />
                </div>
            </div>

            {/* Main Timeline Wrapper */}
            <main className='w-full relative px-4 md:px-0 md:h-[calc(100vh-300px)] md:min-h-[600px] md:flex md:items-center'>
                {/* Mobile Vertical Line */}
                <div className='md:hidden absolute left-8 top-0 bottom-0 w-0.5 bg-stone-200 z-0'></div>

                {/* Desktop: Scrollable Container with Custom Ball Scrollbar */}
                <div className='w-full md:overflow-x-scroll md:h-full md:flex md:items-center custom-scrollbar pb-12 md:pb-0'>
                    <div className='w-full md:w-auto md:flex md:flex-row md:items-center md:px-12 md:gap-0 relative'>
                        {/* Desktop: Horizontal Line */}
                        <div className='hidden md:block absolute left-0 right-0 top-1/2 h-0.5 bg-stone-200 z-0 min-w-full'></div>

                        {filteredData.map((item, index) => {
                            if (item.type === "separator") {
                                return (
                                    <div
                                        key='separator'
                                        className='flex justify-center md:flex-col md:justify-center relative z-10 py-8 md:py-0 md:px-12 md:h-full shrink-0'>
                                        <span className='bg-stone-200 text-stone-600 px-6 py-2 rounded-full text-xs font-bold tracking-widest uppercase shadow-sm whitespace-nowrap'>
                                            {item.text}
                                        </span>
                                        <div className='hidden md:block w-0.5 h-full bg-stone-200 border-l border-dashed border-stone-300 absolute left-1/2 top-0 -z-10'></div>
                                    </div>
                                );
                            }

                            const isVisible = visibleItems.has(
                                item.id.toString()
                            );
                            const Icon = item.icon;

                            return (
                                <div
                                    key={item.id}
                                    ref={(el) => {
                                        itemsRef.current[index] = el;
                                    }}
                                    data-id={item.id}
                                    className={`
                     flex flex-col md:flex-col items-start md:items-center justify-between group relative
                     mb-12 md:mb-0 md:w-[400px] md:shrink-0 md:px-4 md:h-[500px]
                     transition-all duration-1000 ease-out
                     ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}
                   `}>
                                    {/* Context */}
                                    <div className='w-full pl-16 md:pl-0 md:h-1/2 md:flex md:flex-col md:justify-end md:pb-12 relative order-2 md:order-1'>
                                        <div className='bg-white p-6 rounded-lg border border-stone-200 shadow-sm hover:shadow-md hover:border-stone-300 transition-all duration-300 relative group-hover:bg-stone-50 md:text-center'>
                                            <div className='absolute top-4 right-4 md:right-auto md:left-1/2 md:-translate-x-1/2 md:-top-5 text-stone-300 bg-white p-1 rounded-full md:border md:border-stone-100'>
                                                <Icon size={24} />
                                            </div>
                                            <h3 className='text-lg font-bold text-stone-800 font-serif md:mt-2'>
                                                {item.context.title}
                                            </h3>
                                            <p className='text-xs text-stone-400 font-mono mb-3'>
                                                {item.context.subtitle}
                                            </p>
                                            <p className='text-stone-600 text-sm leading-relaxed'>
                                                {item.context.desc}
                                            </p>
                                            <div className='hidden md:block absolute left-1/2 -bottom-12 w-px h-12 bg-stone-200 -translate-x-1/2'></div>
                                            <div className='md:hidden absolute top-1/2 -left-8 w-8 h-px bg-stone-200'></div>
                                        </div>
                                    </div>

                                    {/* Year Bubble */}
                                    <div className='absolute left-8 md:static md:order-2 z-20 flex flex-col items-center justify-center md:w-full md:h-0'>
                                        <div
                                            className={`
                        w-12 h-12 rounded-full bg-white border-4 flex items-center justify-center font-bold text-xs shadow-md z-20 relative
                        ${item.category === "imp" ? "border-sky-200 text-sky-700" : "border-rose-200 text-rose-700"}
                      `}>
                                            {item.year}
                                        </div>
                                    </div>

                                    {/* Art */}
                                    <div className='w-full pl-16 md:pl-0 md:h-1/2 md:flex md:flex-col md:justify-start md:pt-12 relative order-3'>
                                        <div
                                            className={`
                       rounded-lg overflow-hidden border-l-4 md:border-l-0 md:border-t-4 shadow-sm hover:shadow-lg transition-all duration-300 bg-white md:text-center
                       ${item.art.colorClass}
                     `}>
                                            <div className='hidden md:block absolute left-1/2 -top-12 w-px h-12 bg-stone-200 -translate-x-1/2'></div>
                                            <div className='md:hidden absolute top-1/2 -left-8 w-8 h-px bg-stone-200'></div>

                                            <div className='p-5'>
                                                <h3
                                                    className={`text-lg font-bold font-serif mb-1 ${item.art.textClass}`}>
                                                    {item.art.title}
                                                </h3>
                                                <p className='text-stone-600 text-sm'>
                                                    {item.art.desc}
                                                </p>
                                            </div>

                                            <div className='h-24 bg-stone-100 w-full relative overflow-hidden group/img mt-2'>
                                                <div className='absolute inset-0 flex items-center justify-center text-stone-400 bg-stone-100'>
                                                    <div className='text-center px-4'>
                                                        <Paintbrush
                                                            size={16}
                                                            className='mx-auto mb-1 opacity-50'
                                                        />
                                                        <span className='text-[10px] italic opacity-70 block'>
                                                            {item.art.imgAlt}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className='bg-stone-900 text-stone-400 py-12 text-center border-t border-stone-800 relative z-20'>
                <div className='max-w-2xl mx-auto px-4'>
                    <h3 className='text-stone-100 font-serif text-xl mb-4'>
                        Sažetak
                    </h3>
                    <p className='text-sm leading-relaxed mb-8 font-light'>
                        Od impresionističkog optimizma do ekspresionističkog
                        krika.
                    </p>
                    <div className='flex justify-center gap-4 text-xs text-stone-600'>
                        <span>&copy; 2024 Povijest Umjetnosti</span>
                        <span>React • Tailwind • Motion</span>
                    </div>
                </div>
            </footer>

            {/* Custom Scrollbar Styles (3D Ball Effect) 
        - ::-webkit-scrollbar: Set height for horizontal bars
        - ::-webkit-scrollbar-track: Styled as a groove
        - ::-webkit-scrollbar-thumb: Styled with radial-gradient for 3D ball look
      */}
            <style>{`
        .custom-scrollbar {
            overflow-x: scroll; /* Force visibility */
        }
        
        .custom-scrollbar::-webkit-scrollbar {
          height: 20px; /* Taller height to allow the ball to be rounder */
          background: transparent;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: #e7e5e4; /* stone-200 */
          border-radius: 100vh;
          margin: 0 20px; /* Spacing from edges */
          border: 7px solid #fafaf9; /* Creates a thin inner line effect by using page bg color as border */
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: radial-gradient(circle at 35% 35%, #78716c, #1c1917); /* 3D Stone Gradient */
          border-radius: 100vh;
          border: 4px solid #fafaf9; /* Separate from track */
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
          min-width: 40px; /* Ensure it's never too small to be a ball/capsule */
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: radial-gradient(circle at 35% 35%, #a8a29e, #44403c);
        }
      `}</style>
        </div>
    );
};

const FilterButton: React.FC<FilterButtonProps> = ({
    active,
    onClick,
    label,
    color = "stone",
}) => {
    const baseClasses =
        "px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 transform hover:scale-105";

    const activeClasses = {
        stone: "bg-stone-800 text-white shadow-lg",
        sky: "bg-sky-500 text-white shadow-lg shadow-sky-200",
        rose: "bg-rose-500 text-white shadow-lg shadow-rose-200",
    };

    const inactiveClasses =
        "bg-white text-stone-500 hover:bg-stone-100 border border-stone-200";

    return (
        <button
            onClick={onClick}
            className={`${baseClasses} ${active ? activeClasses[color] : inactiveClasses}`}>
            {label}
        </button>
    );
};

export default TheoryLine;
