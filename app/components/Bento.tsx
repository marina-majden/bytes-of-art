"use client";


import { Heart, SlidersHorizontal, Star } from "lucide-react";
import { useState } from "react";

const regions = [
    { id: "top-rated", label: "Top Rated" },
    { id: "italy", label: "Italy" },
    { id: "dubai", label: "Dubai" },
    { id: "london", label: "London" },
] as const;

const destinations = [
    {
        id: 1,
        title: "Italy",
        location: "Italy",
        image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=50&w=500&auto=format&fit=crop",
        price: 504,
        rating: 5,
    },
    {
        id: 2,
        title: "Dubai",
        location: "Dubai",
        image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=50&w=500&auto=format&fit=crop",
        price: 421,
        rating: 5,
    },
    {
        id: 3,
        title: "Maldives",
        location: "Maldives",
        image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=50&w=500&auto=format&fit=crop",
        price: 254,
        rating: 5,
    },
    {
        id: 4,
        title: "Sezaland",
        location: "Sezaland",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=50&w=500&auto=format&fit=crop",
        price: 504,
        rating: 5,
    },
    {
        id: 5,
        title: "London",
        location: "London",
        image: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?q=50&w=500&auto=format&fit=crop",
        price: 214,
        rating: 5,
    },
    {
        id: 6,
        title: "America",
        location: "America",
        image: "https://images.unsplash.com/photo-1501466044931-62695aada8e9?q=50&w=500&auto=format&fit=crop",
        price: 898,
        rating: 5,
    },
];


export default function Bento() {
    

    return (<>
        <style>
            {`.parent {
display: grid;
grid-template-columns: 2fr repeat(4, 1fr);
grid-template-rows: repeat(3, 1fr) 2fr;
grid-column-gap: 0px;
grid-row-gap: 0px;
}

.div1 { grid-area: 1 / 5 / 4 / 6; }
.div2 { grid-area: 3 / 1 / 5 / 2; }
.div3 { grid-area: 4 / 5 / 5 / 6; }
.div4 { grid-area: 3 / 2 / 5 / 5; }
.div5 { grid-area: 2 / 1 / 3 / 2; }
.div6 { grid-area: 1 / 1 / 2 / 4; }
.div7 { grid-area: 2 / 2 / 3 / 3; }
.div8 { grid-area: 2 / 3 / 3 / 4; }
.div9 { grid-area: 2 / 4 / 3 / 5; }
.div10 { grid-area: 1 / 4 / 2 / 5; }`}</style>
        <div className="grid">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div></>
    );
}

// Extracted card badges component for cleaner code
function CardBadges({
    destination,
    onFavorite,
    isFavorite,
}: {
    destination: (typeof destinations)[0];
    onFavorite: () => void;
    isFavorite: boolean;
}) {
    return (
        <>
            {/* Rating Badge */}
            <div
                className='absolute start-4 top-4 flex items-center gap-1 px-3 py-1.5 backdrop-blur-xs'
                >
                <Star className='fill-foreground text-foreground size-3.5' />
                <span className='text-foreground'>{destination.rating}.0</span>
            </div>

            {/* Favorite Button */}
            <button
                type='button'   
                size='icon'
                onClick={(e) => {
                    e.stopPropagation();
                    onFavorite();
                }}
                className='absolute end-4 top-4 size-8 cursor-pointer rounded-full p-0 backdrop-blur-xs'>
                <Heart
                    className={`size-4 ${isFavorite ? "fill-destructive text-destructive" : "text-muted-foreground"}`}
                />
            </button>

            {/* Location Badge */}
            <div className='absolute start-4 bottom-4'>
                <div
                    className='px-3 py-1.5 text-sm font-medium backdrop-blur-xs'
                    variant='secondary'>
                    {destination.location}
                </div>
            </div>

            {/* Price Badge */}
            <div className='absolute end-4 bottom-4'>
                <div className='bg-primary/90 text-primary-foreground px-4 py-1.5 text-sm font-semibold backdrop-blur-xs'>
                    ${destination.price}
                </div>
            </div>
        </>
    );
}
function Card = ({ destination }: { destination: (typeof destinations)[0] }) => {
    const isFavorite = favorites.includes(destination.id);
    const onFavorite = () => toggleFavorite(destination.id);

    return (
        <div className='group relative h-[250px] w-[250px] overflow-hidden rounded-lg bg-neutral-200'>
            <div
                style={{
                    backgroundImage: `url(${destination.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
                className='absolute inset-0 z-0 transition-transform duration-300 group-hover:scale-110'></div>
            <div className='absolute inset-0 z-10 grid place-content-center'>
                <p className='bg-gradient-to-br from-white/20 to-white/0 p-8 text-2xl font-black uppercase text-white backdrop-blur-lg'>
                    {destination.title}
                </p>
            </div>
            <div className='absolute bottom-0 z-20 flex w-full items-center justify-between px-4 py-2'>
                <p className='text-sm font-semibold text-white'>
                    {destination.location}
                </p>
                <div className='flex items-center gap-2'>
                    <Star className='fill-foreground text-foreground' />
                    <p className='text-sm font-semibold text-white'>
                        {destination.rating}
                    </p>
                </div>
            </div>
            <div className='absolute top-0 right-0 z-20 flex items-center gap-2 p-4'>
                <button onClick={onFavorite}>
                    {isFavorite ? (
                        <Heart className='fill-foreground text-foreground' />
                    ) : (
                        <Heart className='fill-muted-foreground text-muted-foreground' />
                    )}
                </button>
            </div>
        </div>
    );    
};

function CardContent = () => {
    return (
        <div className='card-container flex flex-row justify-center mb-8 gap-6 px-4'>
            {destinations.map((destination) => (
                <Card key={destination.id} destination={destination} />
            ))}
        </div>
    );
};
