import React, { useState } from "react";

interface GalleryItem {
    id: string | number;
    title: string;
    imageUrl: string;
}

interface ExpandingGalleryProps {
    items?: GalleryItem[];
    className?: string;
}

const DESKTOP_HEIGHT = 500; // Visina galerije na desktopu u px

const ExpandingGallery: React.FC<ExpandingGalleryProps> = ({
    items = [
        {
            id: 1,
            title: "Planine",
            imageUrl:
                "https://images.unsplash.com/photo-1519681393798-3828fb4090bb?q=80&w=1470&auto=format&fit=crop",
        },
        {
            id: 2,
            title: "Ocean",
            imageUrl:
                "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1473&auto=format&fit=crop",
        },
        {
            id: 3,
            title: "Šuma",
            imageUrl:
                "https://images.unsplash.com/photo-1448375240586-dfd8d395ea6c?q=80&w=1470&auto=format&fit=crop",
        },
        {
            id: 4,
            title: "Pustinja",
            imageUrl:
                "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=1374&auto=format&fit=crop",
        },
        {
            id: 5,
            title: "Grad",
            imageUrl:
                "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=1544&auto=format&fit=crop",
        },
    ],
    className = "",
}) => {
    // Pratimo koja je slika hoverana
    const [hoveredId, setHoveredId] = useState<string | number | null>(null);

    // Spremamo omjere slika (width / height) kako bismo znali koliko široka mora biti
    const [aspectRatios, setAspectRatios] = useState<
        Record<string | number, number>
    >({});

    const handleImageLoad = (
        id: string | number,
        event: React.SyntheticEvent<HTMLImageElement>
    ) => {
        const { naturalWidth, naturalHeight } = event.currentTarget;
        setAspectRatios((prev) => ({
            ...prev,
            [id]: naturalWidth / naturalHeight,
        }));
    };

    return (
        <div
            className={`
        flex flex-col md:flex-row gap-2 p-2
        w-full h-[600px] md:h-[500px]
        mx-auto 
        bg-neutral-900 rounded-xl shadow-2xl
        ${className}
      `}>
            {items.map((item) => {
                // Izračun flex vrijednosti za desktop
                // Ako je hoveran ovaj item: flex-grow: 0, flex-shrink: 0, flex-basis: visina * omjer
                // Ako je hoveran neki drugi: flex-grow: 1, flex-shrink: 1 (smanji se)
                // Ako nitko nije hoveran: flex-grow: 1 (svi jednaki)

                let desktopFlexValue = "1 1 0%"; // Default: svi jednaki

                if (hoveredId === item.id && aspectRatios[item.id]) {
                    // Računamo točnu širinu na temelju visine od 500px i omjera slike
                    const targetWidth = DESKTOP_HEIGHT * aspectRatios[item.id];
                    desktopFlexValue = `0 0 ${targetWidth}px`;
                } else if (hoveredId !== null) {
                    // Ostali se smanjuju
                    desktopFlexValue = "1 1 0%";
                }

                return (
                    <div
                        key={item.id}
                        onMouseEnter={() => setHoveredId(item.id)}
                        onMouseLeave={() => setHoveredId(null)}
                        // CSS Varijabla prenosi izračunatu vrijednost u Tailwind klasu
                        style={
                            {
                                "--desktop-flex": desktopFlexValue,
                            } as React.CSSProperties
                        }
                        className={`
              group relative
              flex-1 /* Mobile default */
              md:flex-[var(--desktop-flex)] /* Desktop magic: primjenjuje izračunatu širinu */
              
              flex items-end justify-start
              rounded-lg overflow-hidden cursor-pointer
              transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] /* Custom easing za glatkoću */
              min-h-[60px]
            `}>
                        <img
                            src={item.imageUrl}
                            alt={item.title}
                            onLoad={(e) => handleImageLoad(item.id, e)}
                            className='absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500'
                        />

                        {/* Tamni gradijent */}
                        <div className='absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300'></div>

                        {/* Tekst kontejner */}
                        <div className='relative z-10 p-4 md:p-6 w-full transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500'>
                            <h3
                                className={`
                text-white font-bold text-lg md:text-2xl uppercase tracking-widest
                whitespace-nowrap overflow-hidden text-ellipsis
                drop-shadow-lg
              `}>
                                {item.title}
                            </h3>

                            <p className='text-gray-300 text-xs md:text-sm mt-1 md:mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75 max-w-full truncate'>
                                {aspectRatios[item.id]
                                    ? "Full size view"
                                    : "Loading..."}
                            </p>
                        </div>

                        {/* Shimmer */}
                        <div className='absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none'></div>
                    </div>
                );
            })}
        </div>
    );
};

export default ExpandingGallery;
