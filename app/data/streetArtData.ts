const artPieces = [
    {
        id: 1,
        artist: "Tagovi & Grafiti",
        type: "Subkultura",
        image: "https://images.unsplash.com/photo-1520423465871-0866049020b7?q=80&w=2574&auto=format&fit=crop", // Placeholder za zid s tagovima
        points: [
            {
                id: 1,
                x: 20,
                y: 40,
                title: "Tag",
                desc: "Osnovni potpis. Brz, jednobojan, označava prisutnost: 'Bio sam ovdje'.",
            },
            {
                id: 2,
                x: 60,
                y: 60,
                title: "Wildstyle",
                desc: "Složena, isprepletena slova koja su teška za pročitati onima izvan supkulture.",
            },
        ],
    },
    {
        id: 2,
        artist: "Lonac",
        type: "Muralizam",
        image: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?q=80&w=2671&auto=format&fit=crop", // Placeholder za mural (treba zamijeniti pravim ako je moguće ili koristiti generički fotorealizam)
        points: [
            {
                id: 1,
                x: 50,
                y: 30,
                title: "Fotorealizam",
                desc: "Za razliku od brzih grafita, ovo zahtijeva dane rada, skelu i vještinu klasičnog slikarstva.",
            },
            {
                id: 2,
                x: 50,
                y: 70,
                title: "Kontekst",
                desc: "Slika komunicira s arhitekturom zgrade (cijevi, prozori) i postaje dio identiteta kvarta.",
            },
        ],
    },
    {
        id: 3,
        artist: "Banksy (Stil)",
        type: "Šablona (Stencil)",
        image: "https://images.unsplash.com/photo-1551895548-225d4725d6a5?q=80&w=2672&auto=format&fit=crop", // Placeholder
        points: [
            {
                id: 1,
                x: 40,
                y: 50,
                title: "Brzina i Poruka",
                desc: "Šablona se pripremi unaprijed. Na zidu je gotova za sekundu. Ovdje je poruka (satira) važnija od likovne vještine.",
            },
        ],
    },
];

export default artPieces;
