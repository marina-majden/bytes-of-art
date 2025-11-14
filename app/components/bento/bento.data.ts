import type { BentoCard } from "./bento.types";
import boccioni from "../../assets/boccioni-removebg-preview.png"; // Putanja se možda treba ažurirati

export const bentoCardData: BentoCard[] = [
    {
        color: "hsla(262, 78%, 23%, 0.5)",
        label: "Portraits",
        href: "/portraits",
        ariaLabel: "Portraits",
        className: "md:col-span-1 md:row-span-1",
    },
    {
        color: "hsla(275, 94%, 21%, 0.5)",
        label: "Symbols",
        description: "Talking without words",
        href: "/symbols", // Ispravio sam /symbols
        ariaLabel: "symbols",
        className: "md:col-span-1 md:row-span-1",
    },
    {
        color: "transparent",
        ariaLabel: "Fouquet's Madonna",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Jean_Fouquet_005.jpg/960px-Jean_Fouquet_005.jpg",
        className: "md:col-span-2 md:row-span-2",
    },
    {
        color: "transparent",
        ariaLabel: "Kirchner's Davos Painting",
        image: "https://www.meisterdrucke.us/kunstwerke/1260px/Ernst_Ludwig_Kirchner_-_Davos_mit_Kirche_Davos_im_Sommer_-_%28MeisterDrucke-688266%29.jpg",
        className: "md:col-span-2 md:row-span-2",
    },
    {
        color: "transparent",
        border: false,
        ariaLabel: "Boccioni Scuplture",
        image: boccioni,
        className: "md:col-span-1 md:row-span-1",
        breakout: true,
    },
    {
        color: "hsl(227, 59%, 21%, 0.5)",
        label: "City of Light",
        description: "Or city of night?",
        href: "/city",
        ariaLabel: "city",
        className: "md:col-span-1 md:row-span-1",
    },
];
