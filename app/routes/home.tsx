import React from "react";
import logo from "../assets/litart-logo.png";
import CardNav, { type CardNavItem } from "../components/CardNav";

import BentoGrid from "~/components/BentoGrid";

export default function HomePage() {
    const cardNavItems: CardNavItem[] = [
        {
            label: "Portraits",
            bgColor: "#424cbb", // Example: light gray
            textColor: "#f1f1f1", // Example: dark gray
            links: [
                {
                    label: "Learn More",
                    href: "/portraits",
                    ariaLabel: "Portraits",
                },
            ],
        },

        {
            label: "Symbols",
            bgColor: "#3f0c7d", // Example: light indigo
            textColor: "#f1f1f1", // Example: dark indigo
            links: [
                {
                    label: "Learn More",
                    href: "/symbols",
                    ariaLabel: "symbols",
                },
            ],
        },
        {
            label: "Contraposition",
            bgColor: "#028789", // Example: light indigo
            textColor: "#f1f1f1", // Example: dark indigo
            links: [
                {
                    label: "Learn More",
                    href: "/city",
                    ariaLabel: "city",
                },
            ],
        },
    ];

    return (
        <div className='max-w-screen max-h-screen p-0 mx-auto overflow-hidden'>
            <BentoGrid />
        </div>
    );
}
