import React, { useState } from "react";
const visualSubtextData = {
    title: "Ljubavnici (Les Amants)",
    artist: "René Magritte, 1928.",
    imageSrc: "/images/magritte_lovers.jpg", // Trebat će vam ova slika u public/images
    points: [
        {
            id: 1,
            label: "Platno",
            x: "50%",
            y: "30%",
            text: "Barijera. Iako su u intimnom činu poljupca, platno ih fizički razdvaja. To je vizualni ekvivalent Hemingwayevoj 'tišini' – oni su zajedno, ali se zapravo ne poznaju niti razumiju.",
        },
        {
            id: 2,
            label: "Pozadina",
            x: "80%",
            y: "20%",
            text: "Apstraktna i hladna. Nema konteksta, nema doma. Baš kao u 'Hills Like White Elephants', radnja se odvija 'nigdje' (na stanici), naglašavajući izoliranost para od svijeta.",
        },
        {
            id: 3,
            label: "Boje",
            x: "30%",
            y: "70%",
            text: "Prigušene i melankolične (crna, bijela, tamnocrvena). Nema strasti, samo tjeskoba gušenja. To je boja 'bijelog slona' – nečeg što je prisutno, veliko, ali se o tome ne govori.",
        },
    ],
};

// Podaci: Dijalog iz "Hills Like White Elephants"
const dialogueData = [
    {
        id: 1,
        speaker: "Jig (Djevojka)",
        text: "Izgledaju poput bijelih slonova.",
        surface: "Komentar o krajoliku. Brda u daljini su bijela i zaobljena.",
        subtext:
            "Bijeli slon (White Elephant) je idiom za nešto skupo, a beskorisno ili teret kojeg se želiš riješiti. Ona nesvjesno govori o nerođenom djetetu. Također, pokušava unijeti maštu u njihov suhoparan razgovor, ali on to odbija.",
        mood: "Maštanje / Melankolija",
    },
    {
        id: 2,
        speaker: "Amerikanac",
        text: "To je zapravo vrlo jednostavna operacija, Jig. Nije to uopće operacija.",
        surface:
            "Pokušava je umiriti vezano uz medicinski zahvat. Tvrdi da je rutinski.",
        subtext:
            "MANIPULACIJA. Minimizira njezinu traumu i rizik. Nikada ne izgovara riječ 'abortus'. Njegov jezik je hladan, tehnički i repetitivann ('jednostavno', 'samo', 'zrak'). Želi se riješiti 'problema' kako bi nastavili putovati.",
        mood: "Pritisak / Hladnoća",
    },
    {
        id: 3,
        speaker: "Jig (Djevojka)",
        text: "A što ćemo raditi poslije?",
        surface: "Pitanje o planovima za putovanje nakon zahvata.",
        subtext:
            "EGZISTENCIJALNI STRAH. Ona zna da, što god odlučili, njihov odnos više nikada neće biti isti. Nevinost je izgubljena. Pita se postoji li budućnost za 'nas' ili samo za 'njega' i 'nju'.",
        mood: "Strah / Nesigurnost",
    },
    {
        id: 4,
        speaker: "Jig (Djevojka)",
        text: "Molim te, molim te, molim te, molim te, molim te, molim te, prestani pričati.",
        surface: "Pristojno ga moli da zašuti jer je boli glava ili je umorna.",
        subtext:
            "KRIK (HISTERIJA). Ovo je trenutak pucanja. Riječ 'molim' ponovljena 7 puta nije molba, nego vrisak. Ona shvaća da je verbalna komunikacija besmislena jer se ne razumiju. Jedini način da zadrži privid kontrole je tišina.",
        mood: "Očaj",
    },
];

const IcebergTheory: React.FC = () => {
    const [selectedId, setSelectedId] = useState<number | null>(null);

    const selectedItem = dialogueData.find((d) => d.id === selectedId);

    return (
        <div className='w-full max-w-5xl mx-auto min-h-screen bg-sky-100 p-4 md:p-8 transition-colors duration-700'>
            {/* HEADER */}
            <div className='text-center mb-12'>
                <h1 className='text-4xl md:text-5xl font-bold text-slate-800 mb-3 font-display tracking-wider'>
                    TEORIJA SANTE LEDA
                </h1>
                <p className='text-lg text-slate-600 italic max-w-2xl mx-auto font-serif'>
                    "Dostojanstvo pokreta sante leda leži u tome što je samo
                    jedna osmina iznad vode." — Ernest Hemingway
                </p>
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 items-start'>
                {/* LIJEVI STUPAC: POVRŠINA (Tekst) */}
                <div className='bg-white p-6 rounded-xl shadow-lg border-t-4 border-sky-400'>
                    <h2 className='text-xl font-bold text-sky-900 mb-4 uppercase tracking-widest flex items-center gap-2'>
                        <span>🌊</span> Iznad Površine (Tekst)
                    </h2>
                    <p className='text-sm text-gray-500 mb-6'>
                        Kliknite na rečenicu iz priče{" "}
                        <em>"Hills Like White Elephants"</em> kako biste
                        zaronili ispod površine.
                    </p>

                    <div className='space-y-4'>
                        {dialogueData.map((item) => (
                            <div
                                key={item.id}
                                onClick={() => setSelectedId(item.id)}
                                className={`p-4 rounded-lg cursor-pointer transition-all duration-300 border-l-4 
                  ${
                      selectedId === item.id
                          ? "bg-sky-100 border-sky-600 shadow-inner scale-105"
                          : "bg-gray-50 border-gray-200 hover:bg-sky-50 hover:border-sky-300"
                  }`}>
                                <p className='font-serif text-lg text-gray-800 leading-relaxed'>
                                    "{item.text}"
                                </p>
                                <p className='text-xs text-gray-400 mt-2 font-bold uppercase'>
                                    {item.speaker}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* DESNI STUPAC: DUBINA (Podtekst) */}
                {/* Ovaj dio se vizualno mijenja u "podvodni" stil */}
                <div
                    className={`relative min-h-[500px] p-8 rounded-xl shadow-2xl transition-all duration-1000 overflow-hidden flex flex-col justify-center
          ${
              selectedId
                  ? "bg-gradient-to-b from-blue-900 to-black border-t-4 border-blue-500"
                  : "bg-slate-200 border-2 border-dashed border-slate-300"
          }`}>
                    {selectedId && selectedItem ? (
                        <div className='relative z-10 text-white animate-fade-in-scale'>
                            {/* Naslov */}
                            <div className='mb-8 text-center'>
                                <span className='inline-block px-3 py-1 bg-blue-500/30 text-blue-200 rounded-full text-xs font-bold tracking-widest mb-2'>
                                    ISPOD POVRŠINE
                                </span>
                                <h3 className='text-3xl font-bold text-white mb-1'>
                                    {selectedItem.mood}
                                </h3>
                            </div>

                            {/* Analiza */}
                            <div className='space-y-6'>
                                <div className='bg-white/10 p-4 rounded-lg backdrop-blur-sm border-l-2 border-white/30'>
                                    <p className='text-blue-200 text-xs uppercase font-bold mb-1'>
                                        Vidljivo (Površina):
                                    </p>
                                    <p className='text-gray-300 italic'>
                                        {selectedItem.surface}
                                    </p>
                                </div>

                                <div className='bg-blue-950/50 p-6 rounded-lg border border-blue-700/50 shadow-xl'>
                                    <p className='text-amber-400 text-xs uppercase font-bold mb-2'>
                                        Skriveno (Podtekst):
                                    </p>
                                    <p className='text-lg leading-relaxed text-white font-serif'>
                                        {selectedItem.subtext}
                                    </p>
                                </div>
                            </div>

                            {/* Dekorativni mjehurići (SVG) */}
                            <div className='absolute -bottom-10 right-0 opacity-20 pointer-events-none'>
                                <svg
                                    width='100'
                                    height='200'
                                    viewBox='0 0 100 200'>
                                    <circle
                                        cx='50'
                                        cy='180'
                                        r='4'
                                        fill='white'
                                        className='animate-float'
                                    />
                                    <circle
                                        cx='30'
                                        cy='150'
                                        r='6'
                                        fill='white'
                                        className='animate-float'
                                        style={{ animationDelay: "1s" }}
                                    />
                                    <circle
                                        cx='70'
                                        cy='120'
                                        r='3'
                                        fill='white'
                                        className='animate-float'
                                        style={{ animationDelay: "2s" }}
                                    />
                                </svg>
                            </div>
                        </div>
                    ) : (
                        <div className='text-center text-gray-400'>
                            <div className='text-6xl mb-4 opacity-30'>🧊</div>
                            <p className='text-xl font-medium'>
                                Odaberite rečenicu lijevo kako biste otkrili što
                                se krije ispod površine.
                            </p>
                        </div>
                    )}
                </div>
            </div>
            // ... unutar IcebergTheory komponente, ispod grid-a s tekstom ...
            {/* NOVA SEKCIJA: LIKOVNI PODTEKST */}
            <div className='mt-24 mb-12'>
                <h2 className='text-3xl font-bold text-sky-900 mb-8 text-center uppercase tracking-widest border-b-2 border-sky-200 pb-4 inline-block w-full'>
                    Vizualna Tišina
                </h2>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-12 items-center'>
                    {/* Opis koncepta */}
                    <div className='space-y-6 text-lg text-slate-700 font-serif leading-relaxed'>
                        <p>
                            Ernest Hemingway skriva pravo značenje ispod
                            površine dijaloga. Slikar{" "}
                            <strong>René Magritte</strong> radi isto, ali
                            vizualno.
                        </p>
                        <p>
                            U slici <em>"{visualSubtextData.title}"</em>, vidimo
                            poljubac – simbol bliskosti. Ali lica su skrivena.
                            Ono što bi trebalo biti otkriveno, ostaje tajna.
                        </p>
                        <div className='bg-white p-6 rounded-lg shadow-md border-l-4 border-amber-500 italic text-slate-600'>
                            "Vidljivo uvijek skriva neko drugo vidljivo. Uvijek
                            želimo vidjeti ono što je skriveno." — René Magritte
                        </div>
                        <p className='font-sans text-sm text-slate-500'>
                            ⬇ Prijeđite mišem preko točaka na slici da
                            otkrijete vizualni podtekst.
                        </p>
                    </div>

                    {/* Interaktivna Slika */}
                    <div className='relative rounded-xl overflow-hidden shadow-2xl group'>
                        <img
                            src={visualSubtextData.imageSrc}
                            alt={visualSubtextData.title}
                            className='w-full h-auto transition-transform duration-700 group-hover:scale-105'
                        />

                        {/* Overlay točke */}
                        {visualSubtextData.points.map((point) => (
                            <div
                                key={point.id}
                                className='absolute w-8 h-8 bg-amber-500/80 rounded-full cursor-help flex items-center justify-center text-white font-bold shadow-lg hover:bg-amber-600 transition-all hover:scale-125 z-20'
                                style={{ left: point.x, top: point.y }}>
                                ?{/* Tooltip */}
                                <div className='absolute bottom-full mb-2 w-64 p-4 bg-slate-900/95 text-white text-sm font-sans rounded-lg shadow-xl opacity-0 hover:opacity-100 pointer-events-none transition-opacity duration-300 z-30 -translate-x-1/2 left-1/2'>
                                    <strong className='block text-amber-400 mb-1 uppercase text-xs'>
                                        {point.label}
                                    </strong>
                                    {point.text}
                                </div>
                            </div>
                        ))}

                        <div className='absolute bottom-0 w-full bg-gradient-to-t from-black/80 to-transparent p-4 text-white text-center'>
                            <p className='font-bold'>
                                {visualSubtextData.title}
                            </p>
                            <p className='text-xs opacity-75'>
                                {visualSubtextData.artist}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            {/* Footer Task (Malo ažuriran da uključi i sliku) */}
            <div className='mt-16 text-center border-t-2 border-sky-200 pt-12'>
                <h3 className='text-2xl font-bold text-sky-900 mb-4 font-display'>
                    Zadatak za razmišljanje
                </h3>
                <p className='text-slate-700 text-lg max-w-3xl mx-auto font-serif'>
                    Usporedite Hemingwayev dijalog i Magritteovu sliku.
                    <br />
                    <span className='text-amber-600 font-bold'>
                        Što je strašnije:
                    </span>{" "}
                    ono što likovi u priči ne izgovaraju ili ono što ljubavnici
                    na slici ne vide?
                </p>
            </div>
            {/* --- ZAKLJUČAK & SINTEZA (Deep Dive) --- */}
            <div className='mt-32 mb-16 relative'>
                {/* Dekorativna linija koja spaja sekcije */}
                <div className='absolute left-1/2 -top-16 h-16 w-1 bg-gradient-to-b from-transparent to-sky-900 transform -translate-x-1/2'></div>

                <div className='w-full bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-700 relative'>
                    {/* Pozadinski efekt (Grain/Noise) - Opcionalno, za teksturu */}
                    <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>

                    <div className='relative z-10 p-8 md:p-12 text-center'>
                        <h2 className='text-3xl md:text-4xl font-display text-white mb-6 tracking-widest'>
                            SINTEZA: UMJETNOST IZOSTAVLJANJA
                        </h2>

                        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 text-left mb-12'>
                            {/* Sažetak Književnosti */}
                            <div className='bg-slate-800/50 p-6 rounded-xl border border-slate-600 hover:border-sky-500 transition-colors'>
                                <h3 className='text-sky-400 font-bold uppercase text-sm mb-3 tracking-wider'>
                                    Ernest Hemingway
                                </h3>
                                <p className='text-slate-300 font-serif text-lg'>
                                    Koristi <strong>dijalog</strong> kako bi
                                    sakrio emociju. <br />
                                    Bijeli slonovi su neizrečeni teret. <br />
                                    <em>
                                        "Znamo o čemu pričaju upravo zato što o
                                        tome ne pričaju."
                                    </em>
                                </p>
                            </div>

                            {/* Sažetak Slikarstva */}
                            <div className='bg-slate-800/50 p-6 rounded-xl border border-slate-600 hover:border-amber-500 transition-colors'>
                                <h3 className='text-amber-500 font-bold uppercase text-sm mb-3 tracking-wider'>
                                    René Magritte
                                </h3>
                                <p className='text-slate-300 font-serif text-lg'>
                                    Koristi <strong>platno</strong> kako bi
                                    sakrio identitet. <br />
                                    Poljubac je prisutan, ali kontakt je
                                    nemoguć. <br />
                                    <em>
                                        "Vidimo ljubavnike, ali ne vidimo
                                        njihovu ljubav."
                                    </em>
                                </p>
                            </div>
                        </div>

                        {/* FINALNA MISAO / ZADATAK */}
                        <div className='max-w-2xl mx-auto bg-gradient-to-b from-slate-800 to-slate-900 p-8 rounded-xl border-t-4 border-indigo-500 shadow-lg'>
                            <h3 className='text-2xl font-bold text-white mb-4'>
                                Vaša Izlazna Kartica 🎫
                            </h3>
                            <p className='text-slate-400 mb-6'>
                                Modernizam nas uči da je istina često skrivena.
                                U jednoj rečenici, odgovorite:
                                <br />
                                <span className='text-indigo-300 font-bold'>
                                    Zašto je tišina ponekad glasnija od krika?
                                </span>
                            </p>

                            <div className='relative'>
                                <input
                                    type='text'
                                    placeholder='Vaš odgovor ovdje...'
                                    className='w-full bg-slate-950 border border-slate-600 rounded-lg py-4 px-6 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all'
                                />
                                <button className='absolute right-2 top-2 bottom-2 px-6 bg-indigo-600 hover:bg-indigo-500 text-white rounded-md font-bold transition-colors'>
                                    Pošalji
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer poruka */}
                <p className='text-center text-slate-500 text-sm mt-8 font-mono'>
                    MODUL 3 ZAVRŠEN • DETEKTIVSKA AGENCIJA KRONOS
                </p>
            </div>
        </div>
    );
};

export default IcebergTheory;
