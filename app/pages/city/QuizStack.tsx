import {
    motion,
    useMotionValue,
    useTransform,
    AnimatePresence,
} from "motion/react";
import { useState, forwardRef, useImperativeHandle } from "react";

// Tipovi za smjer swipe-a
export type SwipeDirection = "left" | "right";

interface CardRotateProps {
    children: React.ReactNode;
    onSwipe: (direction: SwipeDirection) => void;
    sensitivity: number;
}

function CardRotate({ children, onSwipe, sensitivity }: CardRotateProps) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    // Rotacija prati kretanje miša za "prirodniji" osjećaj
    const rotateZ = useTransform(x, [-100, 100], [-20, 20]);

    function handleDragEnd(
        _: never,
        info: { offset: { x: number; y: number } }
    ) {
        // Ako je pomak veći od osjetljivosti u desno
        if (info.offset.x > sensitivity) {
            onSwipe("right");
        }
        // Ako je pomak veći od osjetljivosti u lijevo (negativni broj)
        else if (info.offset.x < -sensitivity) {
            onSwipe("left");
        }
        // Ako nije dovoljno povučeno, vrati karticu u centar
        else {
            x.set(0);
            y.set(0);
        }
    }

    return (
        <motion.div
            className='absolute cursor-grab w-full'
            style={{ x, y, rotateZ, zIndex: 10 }}
            drag
            dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
            dragElastic={0.6}
            whileTap={{ cursor: "grabbing" }}
            onDragEnd={handleDragEnd}
            // Animacija izlaska kartice sa ekrana kad se swipe-a
            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}>
            {children}
        </motion.div>
    );
}

interface QuizStackProps<T> {
    data: T[];
    renderCard: (item: T) => React.ReactNode;
    onVote: (item: T, direction: SwipeDirection) => Promise<boolean>;
    sensitivity?: number;
    cardWidth?: number;
}

export default function QuizStack<T extends { id: number | string }>({
    data,
    renderCard,
    onVote,
    sensitivity = 150,
    cardWidth = 500,
}: QuizStackProps<T>) {
    // Lokalno stanje za feedback (Checkmark ili X)
    const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(
        null
    );

    // Funkcija koja se poziva kad CardRotate detektira swipe
    const handleSwipe = async (item: T, direction: SwipeDirection) => {
        // Pozivamo logiku roditelja da provjerimo je li točno
        const isCorrect = await onVote(item, direction);

        // Prikazujemo feedback
        setFeedback(isCorrect ? "correct" : "incorrect");

        // Sakrivamo feedback nakon kratkog vremena
        setTimeout(() => setFeedback(null), 800);
    };

    // Ako nema više kartica
    if (data.length === 0) {
        return (
            <div className='text-center p-10 text-gray-500'>
                Sve slike su razvrstane!
            </div>
        );
    }

    // Uzimamo samo aktivnu karticu (zadnju u nizu/vrhu stacka) i one ispod nje za vizualni dojam
    const activeIndex = data.length - 1;

    return (
        <div className='relative flex flex-col items-center justify-center'>
            {/* Feedback Overlay (Zeleno/Crveno svjetlo) */}
            <AnimatePresence>
                {feedback && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1.2 }}
                        exit={{ opacity: 0 }}
                        className={`absolute z-50 pointer-events-none p-4 rounded-full border-4 font-bold text-2xl bg-gray-800 font-tags ${
                            feedback === "correct"
                                ? "border-teal-500 text-teal-500"
                                : "border-pink-700 text-pink-700"
                        }`}
                        style={{ top: "40%" }}>
                        {feedback === "correct" ? "TOČNO" : "NETOČNO"}
                    </motion.div>
                )}
            </AnimatePresence>

            <div
                className='relative'
                style={{ width: cardWidth, minHeight: 400, perspective: 1000 }}>
                <AnimatePresence>
                    {data.map((item, index) => {
                        // Prikazujemo samo zadnje 3 kartice radi performansi
                        if (index < data.length - 3) return null;

                        const isTopCard = index === activeIndex;

                        return (
                            <motion.div
                                key={item.id}
                                className='absolute top-0 left-0 w-full h-full font-sans'
                                initial={{ scale: 0.9, y: 20, opacity: 0 }}
                                animate={{
                                    scale: 1 - (activeIndex - index) * 0.05,
                                    y: (activeIndex - index) * 15,
                                    opacity: 1,
                                    zIndex: index,
                                }}
                                transition={{
                                    type: "spring",
                                    stiffness: 260,
                                    damping: 20,
                                }}>
                                {isTopCard ? (
                                    <CardRotate
                                        sensitivity={sensitivity}
                                        onSwipe={(dir) =>
                                            handleSwipe(item, dir)
                                        }>
                                        {renderCard(item)}
                                    </CardRotate>
                                ) : (
                                    // Kartice ispod se ne mogu drag-ati
                                    <div className='opacity-100 grayscale-30 scale-80 transform transition-all duration-300'>
                                        {renderCard(item)}
                                    </div>
                                )}
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>
        </div>
    );
}
