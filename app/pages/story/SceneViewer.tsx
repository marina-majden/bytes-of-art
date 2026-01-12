// app/components/baroque/SceneViewer.tsx
import { useState } from "react";

interface Props {
    isVisible: boolean;
}

export default function SceneViewer({ isVisible }: Props) {
    const [showHint, setShowHint] = useState(false);

    if (!isVisible) return null;

    return (
        <div className='absolute inset-0 flex items-center justify-center bg-black animate-fade-in'>
            {/* Slika s lazy loadingom za performanse */}
            <img
                src='https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Georges_de_La_Tour_016.jpg/960px-Georges_de_La_Tour_016.jpg'
                alt='The Fortune Teller'
                className='max-w-full max-h-full object-contain'
                loading='lazy'
                onClick={() => setShowHint(!showHint)}
            />

            {/* Overlay koji se može sakriti klikom na sliku */}
            <div
                className={`absolute bottom-4 left-4 bg-black/80 p-4 rounded border border-stone-600 max-w-md backdrop-blur-sm transition-opacity duration-500 ${showHint ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
                <p className='text-amber-100 text-sm'>
                    <span className='font-bold text-amber-500 block mb-1'>
                        ANALIZA TRENUTKA:
                    </span>
                    Pogledajte ruke. Dok mu starica odvlači pažnju novčićem
                    (desno), djevojke s lijeve strane režu lanac i prazne džep.
                    Tko zapravo "gleda", a tko je "slijep"?
                </p>
            </div>
        </div>
    );
}
