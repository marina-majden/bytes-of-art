// MagicBento.tsx
import React from "react";
import { bentoCardData } from "./bento.data";
import { BentoCard } from "./BentoCard";
import "./bento.css";

export const MagicBento: React.FC = () => {
    return (
        <section className='w-full max-w-7xl mx-auto p-4'>
            <div className='bento-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[200px] lg:auto-rows-[240px]'>
                {bentoCardData.map((card, idx) => (
                    <BentoCard key={idx} card={card} />
                ))}
            </div>
        </section>
    );
};

export default MagicBento;
