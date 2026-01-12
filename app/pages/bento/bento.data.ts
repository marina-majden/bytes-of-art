import type { BentoCard } from "./bento.types";
import boccioni from "../../assets/boccioni-removebg-preview.png";
import kehinde from "../../assets/kehinde.png";
import kehindeFull from "../../assets/kehinde-full.webp";

export const bentoCardData: BentoCard[] = [
    {
        color: "hsla(262, 78%, 23%, 0.5)",
        label: "Wall Art",
        description: "Talking without words",
        href: "/walls",
        ariaLabel: "Wall Art",
        className: "md:col-span-1 md:row-span-1",
        enableTilt: true,
    },
    {
        color: "hsla(275, 94%, 21%, 0.5)",
        label: "Symbols",
        description: "Talking without words",
        href: "/symbols",
        ariaLabel: "symbols",
        className: "md:col-span-1 md:row-span-1",
    },

    {
        color: "transparent",
        border: false,
        ariaLabel: "Boccioni Scuplture",
        href: "/symbols",
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
    {
        color: "transparent",
        label: "City of Light",
        href: "/city",
        ariaLabel: "city",
        backgroundImage:
            "https://www.meisterdrucke.us/kunstwerke/1260px/Ernst_Ludwig_Kirchner_-_Davos_mit_Kirche_Davos_im_Sommer_-_%28MeisterDrucke-688266%29.jpg",
        className: "md:col-span-2 md:row-span-2",
    },
    {
        color: "transparent",
        label: "Portraits",
        href: "/portraits",
        ariaLabel: "Portraits",
        image: kehinde,
        className: "md:col-span-2 md:row-span-2",
        breakout: true,
        enableTilt: false,
    },
];
