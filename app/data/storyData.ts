// Dodatak u src/data/locationsData.ts
// app/data/storyData.ts
import type { StoryData } from "../types/story";

export const storyData: StoryData = {
    archetypes: [
        { id: "prodigal_son", label: "Razmetni sin (tek stigao u grad)" },
        { id: "naive_lover", label: "Zaljubljeni naivac" },
        { id: "arrogant_noble", label: "Oholi skorojević" },
    ],
    setups: [
        { id: "ambush", label: "Zasjeda (One su ga pratile)" },
        { id: "challenge", label: "Izazov (On je prišao njima)" },
        { id: "boredom", label: "Dosada (Ubijanje vremena)" },
    ],
    baits: [
        { id: "wealth", label: "Bit ćeš bogat i slavan" },
        { id: "love", label: "Ona te voli" },
        { id: "flattery", label: "Laskanje o njegovoj ljepoti" },
    ],
};

// Helper funkcija
export const getLabel = (category: keyof StoryData, id: string | null) => {
    if (!id) return null;
    const item = (storyData[category] as any[]).find((i: any) => i.id === id);
    return item ? item.label : "";
};
export const mData = {
    gatara: {
        id: "gatara",
        name: "Ulična Prevara",
        impressionism: {
            // Ovdje bismo mogli staviti neku romantičnu sliku gatare iz 19. st. za kontrast,
            // ali fokusirajmo se na Baroknu lekciju koju ste tražili.
            // Za potrebe naše aplikacije, možemo iskoristiti "Impresionizam" slot
            // kao "Naivna perspektiva mladića" (kako on vidi situaciju).
            themeName: "Perspektiva Mladića: Zabavna igra",
            themeColor: "bg-amber-100",
            text: "Smiješna starica. Misli da vjerujem u njezine priče, ali ja sam gospodar situacije. Imam novca, imam vremena. Neka mi kaže nešto lijepo o mojoj budućnosti. Kako me samo gleda s poštovanjem!",
            textAuthor: "Unutarnji monolog (Naivnost)",
            imageSrc: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Georges_de_La_Tour_016.jpg/960px-Georges_de_La_Tour_016.jpg",
            imageArtist: "Georges de La Tour: Gatara (detalj mladića)",
            analysisPoints: [
                {
                    x: "left-[70%]",
                    y: "top-[30%]",
                    description:
                        "Stav: Uspravan, ruka na boku. Govori o samopouzdanju i oholosti.",
                },
                {
                    x: "left-[80%]",
                    y: "top-[40%]",
                    description:
                        "Pogled: Usmjeren u stranu, s visoka. Ne primjećuje što se događa ni lijevo ni desno.",
                },
            ],
        },
        expressionism: {
            // Ovo koristimo kao "Realnu perspektivu" (Barokni realizam/Caravaggisti)
            themeName: "Realnost: Orkestrirana Krađa",
            themeColor: "bg-gray-900 text-gray-200",
            text: "Dok ga starica hipnotizira pričom i novčićem, zamka je postavljena. Jedna ruka reže lanac, druga prazni džep. Njegova arogancija je njegovo sljepilo. Ovo nije igra, ovo je preživljavanje.",
            textAuthor: "Objektivni promatrač (Istina)",
            imageSrc: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Georges_de_La_Tour_016.jpg/960px-Georges_de_La_Tour_016.jpg",
            imageArtist: "Georges de La Tour: Gatara (oko 1630.)",
            analysisPoints: [
                {
                    x: "left-[50%]",
                    y: "top-[50%]",
                    description:
                        "Škare: Djevojka u sredini oprezno reže zlatni lanac dok ga starica zabavlja.",
                },
                {
                    x: "left-[20%]",
                    y: "top-[60%]",
                    description:
                        "Džep: Djevojka s lijeve strane već je izvukla novčarku. Krađa je potpuna.",
                },
                {
                    x: "left-[90%]",
                    y: "top-[45%]",
                    description:
                        "Distrakcija: Novčić u ruci starice služi samo da fiksira njegov pogled.",
                },
            ],
        },
    },
};
