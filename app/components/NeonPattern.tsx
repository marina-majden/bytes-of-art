import React from "react";

interface EncryptedNeonPatternProps {
    /** Sadržaj koji će se prikazati preko pozadine */
    children?: React.ReactNode;
    /** Dodatne klase za vanjski kontejner */
    className?: string;
    /** Visina kontejnera (default: 100% roditelja) */
    style?: React.CSSProperties;
}

const NeonPattern: React.FC<EncryptedNeonPatternProps> = ({
    children,
    className = "",
    style,
}) => {
    return (
        <div
            className={`relative w-full h-full overflow-hidden ${className}`}
            style={style}>
            {/* Definiramo Keyframes animaciju */}
            <style>{`
        @keyframes pulse-stream {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.9; }
        }
      `}</style>

            {/* Glavni sloj pozadine s filterom.
        Primjenjujemo filter na ovaj div kako bi tekstura zahvatila gradijent.
      */}
            <div
                className='absolute inset-0 w-full h-full'
                style={{
                    background:
                        "linear-gradient(135deg, #0d0d1a, #1a1a2f 50%, #2a1a4f)",
                    filter: "url(#neon-texture)",
                }}>
                {/* Overlay sloj s animiranim radijalnim gradijentima */}
                <span
                    className='absolute inset-0 w-full h-full block'
                    style={{
                        background: `
              radial-gradient(circle at 30% 40%, rgba(0, 240, 255, 0.2) 0%, transparent 20%),
              radial-gradient(circle at 70% 60%, rgba(100, 50, 255, 0.15) 0%, transparent 15%)
            `,
                        animation: "pulse-stream 3s ease-in-out infinite",
                    }}
                />

                {/* SVG definicija filtera.
          Postavljena na width/height 0 kako ne bi zauzimala prostor, ali filter ostaje dostupan po ID-u.
        */}
                <svg className='absolute w-0 h-0' aria-hidden='true'>
                    <filter id='neon-texture'>
                        <feTurbulence
                            result='noise'
                            numOctaves='2'
                            baseFrequency='0.6'
                            type='fractalNoise'
                        />
                        <feSpecularLighting
                            result='specular'
                            lightingColor='#00f0ff'
                            specularExponent='25'
                            specularConstant='0.9'
                            surfaceScale='2'
                            in='noise'>
                            <fePointLight z='90' y='100' x='100' />
                        </feSpecularLighting>
                        <feComposite
                            result='litNoise'
                            operator='over'
                            in2='SourceGraphic'
                            in='specular'
                        />
                        <feBlend
                            mode='screen'
                            in2='litNoise'
                            in='SourceGraphic'
                        />
                    </filter>
                </svg>
            </div>

            {/* Sadržaj (children) se prikazuje iznad pozadine */}
            <div className='relative z-10 w-full h-full'>{children}</div>
        </div>
    );
};

export default NeonPattern;
