// app/data/timelineData.ts

export interface TimelineEvent {
    year: string;
    title: string;
    description: string;
    type: "context" | "art";
    category?: "science" | "social" | "painting" | "literature";
    imageUrl?: string; // Novo polje za sliku
}

// Faze nam više ne trebaju za navigaciju, ali su dobre za grupiranje naslova
export interface TimelinePhase {
    id: number;
    title: string;
    subtitle: string;
    events: TimelineEvent[];
}

export const timelinePhases: TimelinePhase[] = [
    {
        id: 1,
        title: "I. Tehnološka i Znanstvena Revolucija",
        subtitle: "Kemija i optika mijenjaju alate umjetnika (1839. - 1850.)",
        events: [
            {
                year: "1839.",
                title: "Izum Dagerotipije",
                description:
                    "Louis Daguerre predstavlja prvi komercijalno uspješan fotografski proces. Slikarstvo je oslobođeno imperativa realističnog prikazivanja stvarnosti.",
                type: "context",
                category: "science",
                imageUrl: "/assets/intro/daguerreotype.jpg", // Placeholder putanja
            },
            {
                year: "1839.",
                title: "Zakon simultanog kontrasta",
                description:
                    "Chevreul dokazuje da boje izgledaju intenzivnije kada su pored svojih komplemenata. Ovo postaje znanstveni temelj impresionističke palete.",
                type: "context",
                category: "science",
                imageUrl: "/assets/intro/chevreul-wheel.jpg",
            },
            {
                year: "1841.",
                title: "Patentiranje tube za boje",
                description:
                    "John Goffe Rand patentira sklopivu limenu tubu. Boje se više ne suše u svinjskim mjehurima, što omogućuje slikanje u prirodi.",
                type: "context",
                category: "science",
                imageUrl: "/assets/intro/paint-tubes.jpg",
            },
            {
                year: "1848.",
                title: "Barbizonska škola",
                description:
                    "Slikari napuštaju ateljee i odlaze u šumu Fontainebleau. Postavljaju temelj za rad u prirodi (en plein air).",
                type: "art",
                category: "painting",
                imageUrl: "/assets/intro/barbizon.jpg",
            },
        ],
    },
    {
        id: 2,
        title: "II. Transformacija Grada i Društva",
        subtitle: "Pariz postaje moderna metropola (1853. - 1863.)",
        events: [
            {
                year: "1853.",
                title: "Haussmannova obnova Pariza",
                description:
                    "Široki bulevari zamjenjuju srednjovjekovne ulice. Grad postaje prozračan, pun svjetla i prometa.",
                type: "context",
                category: "social",
                imageUrl: "/assets/intro/haussmann-paris.jpg",
            },
            {
                year: "1863.",
                title: "Baudelaire: 'Slikar modernog života'",
                description:
                    "Poziv umjetnicima da slikaju sadašnji trenutak, modu i gradske ulice, a ne povijesne mitove.",
                type: "art",
                category: "literature",
                imageUrl: "/assets/intro/baudelaire.jpg",
            },
            {
                year: "1863.",
                title: "Salon des Refusés",
                description:
                    "Izložba odbijenih radova ruši monopol Akademije. Manetov 'Doručak na travi' izaziva skandal.",
                type: "art",
                category: "painting",
                imageUrl: "/assets/intro/manet-luncheon.jpg",
            },
        ],
    },
    {
        id: 3,
        title: "III. Rođenje Novog Pogleda",
        subtitle: "Od pobune do definicije pokreta (1870. - 1874.)",
        events: [
            {
                year: "1872.",
                title: "Monet: 'Impresija, izlazak sunca'",
                description:
                    "Slika koja daje ime cijelom pokretu. Fokus je na svjetlosti i atmosferi, ne na detaljima.",
                type: "art",
                category: "painting",
                imageUrl: "/assets/intro/impression-sunrise.jpg",
            },
            {
                year: "1874.",
                title: "Prva izložba impresionista",
                description:
                    "Grupa se organizira neovisno o državi. Službeno rođenje impresionizma kao pokreta.",
                type: "art",
                category: "painting",
                imageUrl: "/assets/intro/first-exhibition.jpg",
            },
        ],
    },
];
