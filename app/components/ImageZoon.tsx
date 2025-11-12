// src/components/InteractiveImage.tsx

import React, { useRef } from "react";

// Definiramo 'props' koje komponenta prima
interface Props {
    src: string;
    alt: string;
    className?: string; // Da možemo proslijediti Tailwind klase
}

/**
 * Komponenta koja reagira na pokret miša i postavlja
 * CSS varijable --x i --y (kao postotak 0-100) na samu sliku.
 */
const InteractiveImage: React.FC<Props> = ({ src, alt, className }) => {
    // 1. Trebamo 'ref' da bismo mogli izravno pristupiti DOM elementu slike
    const imgRef = useRef<HTMLImageElement>(null);

    // 2. Ovo je React-ov 'onMouseMove' event handler
    const handleMouseMove = (e: React.MouseEvent<HTMLImageElement>) => {
        // Provjeravamo imamo li ref na element (TypeScript sigurnost)
        if (!imgRef.current) return;

        // 3. Nalazimo X i Y poziciju miša UNUTAR elementa
        // Ovo je robusniji način od e.nativeEvent.offsetX
        const rect = imgRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // 4. Izračun postotka (0-100)
        const xPercent = (x / imgRef.current.offsetWidth) * 100;
        const yPercent = (y / imgRef.current.offsetHeight) * 100;

        // 5. Postavljanje CSS varijabli KAO BROJEVA (bez '%')
        // Koristimo toFixed(2) za čišće brojeve
        imgRef.current.style.setProperty("--x", xPercent.toFixed(2));
        imgRef.current.style.setProperty("--y", yPercent.toFixed(2));
    };

    // 6. Treba nam i 'onMouseLeave' da resetiramo efekt
    const handleMouseLeave = () => {
        if (!imgRef.current) return;

        // Vraćamo u centar (50%) kad miš ode
        imgRef.current.style.setProperty("--x", "50");
        imgRef.current.style.setProperty("--y", "50");
    };

    return (
        <img
            ref={imgRef} // Povezujemo ref s elementom
            src={src}
            alt={alt}
            className={className} // Prenosimo klase
            onMouseMove={handleMouseMove} // Vežemo React event
            onMouseLeave={handleMouseLeave} // Vežemo React event
        />
    );
};

export default InteractiveImage;
