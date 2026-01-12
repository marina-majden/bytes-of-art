import React, { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router";
import sprayPaint from "../../assets/paint-spray.png";
import keyboard from "../../assets/keyboard.png";
import Typewriter from "~/components/Typewriter";

export default function HeroSection({ onStart }: { onStart: () => void }) {
    const [expanded, setExpanded] = useState<"none" | "left" | "right">("none");

    const expandLeft = () =>
        setExpanded((s) => (s === "left" ? "none" : "left"));
    const expandRight = () =>
        setExpanded((s) => (s === "right" ? "none" : "right"));

    return (
        <section className='relative h-screen w-full flex flex-col md:flex-row overflow-hidden font-sans'>
            {/* Lijeva strana - ZID (Ulica) */}
            <div
                className={
                    `relative w-full md:w-1/2 h-1/2 md:h-full bg-neutral-900 flex items-center justify-center group transform transition-transform duration-500 ease-in-out` +
                    (expanded === "left"
                        ? " absolute inset-0 z-40 w-screen md:w-screen"
                        : expanded === "right"
                          ? " -translate-x-full opacity-0 pointer-events-none md:opacity-0"
                          : "")
                }
                style={{ cursor: `url(${sprayPaint}) 12 12, auto` }}>
                {/* Background texture simulation */}
                <div className="absolute inset-0 opacity-20 bg-[url('https://thumbs.dreamstime.com/b/graffiti-brick-wall-horizontal-image-graffiti-brick-wall-122633345.jpg')]"></div>
                <div className='relative z-10 text-center p-8'>
                    <h1 className='text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-red-500 via-orange-500 to-yellow-500 transform -rotate-3 drop-shadow-lg font-display'>
                        ZIDOVI
                    </h1>
                    <p className='text-gray-400 mt-4 text-xl font-mono select-none lowercase'>
                        Glas ulice. Buka. Identitet.
                    </p>
                </div>
                {/* Graffiti overlay effect on hover could go here */}
                {/* Left: go to StreetArtGallery */}
                {expanded !== "left" && (
                    <Link
                        to='/walls/street'
                        className='absolute bottom-8 left-6 z-30 inline-flex items-center gap-3 px-4 py-2 rounded-md bg-black/60 text-white hover:scale-105 transition-transform'>
                        <ArrowLeft className='w-5 h-5' />
                        <span className='text-sm font-semibold'>Street</span>
                    </Link>
                )}

                {/* Expand left button */}
                <button
                    type='button'
                    aria-expanded={expanded === "left"}
                    onClick={expandLeft}
                    className='absolute top-6 left-6 z-30 inline-flex items-center gap-2 px-3 py-2 rounded-md bg-white/10 text-white hover:bg-white/20 transition'>
                    {expanded === "left" ? "Close" : "Read"}
                </button>

                {expanded === "left" ? (
                    <div className='max-w-full mx-auto p-6 text-left'>
                        <h2 className='text-3xl font-bold mb-4'>
                            Street Art — Glas Ulice
                        </h2>
                        <p className='mb-4'>
                            Street art is a public visual practice that emerged
                            from graffiti culture and expanded into diverse
                            forms of expression. It includes murals, stencils,
                            posters, and installations that communicate social,
                            political, and aesthetic messages directly in public
                            space.
                        </p>
                        <p className='mb-4'>
                            Works are often site-specific, responding to the
                            urban environment and its history. Street artists
                            use the city's surfaces as a canvas, engaging with
                            passersby and creating dialogues about ownership,
                            visibility, and voice.
                        </p>
                        <p className='mb-4'>
                            This module explores techniques, cultural context,
                            and the role of street art in shaping urban
                            identity. Scroll to read examples and see how
                            artists negotiate publicness and authorship.
                        </p>
                        <div className='mt-8 flex gap-4'>
                            <Link
                                to='/walls/street'
                                className='px-4 py-2 bg-white text-black rounded-md'>
                                Go to gallery
                            </Link>
                            <button
                                onClick={() => setExpanded("none")}
                                className='px-4 py-2 border border-white rounded-md'>
                                Close
                            </button>
                        </div>
                    </div>
                ) : null}
            </div>

            {/* Desna strana - MREŽA (Ekran) */}
            <div
                className={
                    `relative w-full md:w-1/2 h-1/2 md:h-full bg-white flex items-center justify-center border-l-4 border-black transform transition-transform duration-500 ease-in-out` +
                    (expanded === "right"
                        ? " absolute inset-0 z-40 w-screen md:w-screen"
                        : expanded === "left"
                          ? " translate-x-full opacity-0 pointer-events-none md:opacity-0"
                          : "")
                }
                style={{ cursor: `url(${keyboard}) 12 12, auto` }}>
                <div className='text-center p-8'>
                    <h1 className='text-6xl md:text-8xl font-thin text-black tracking-widest font-serif italic'>
                        mreže
                    </h1>
                    <p className='text-gray-500 mt-4 text-sm font-mono lowercase'>
                        <Typewriter
                            texts={["tišina ekrana.", "intimnost.", "like."]}
                            period={1800}
                            className='inline-block text-gray-500'
                        />
                    </p>
                </div>
                {/* Right: go to InstaPoetry */}
                {expanded !== "right" && (
                    <Link
                        to='/walls/social'
                        className='absolute bottom-8 right-6 z-30 inline-flex items-center gap-3 px-4 py-2 rounded-md bg-black/10 text-black hover:scale-105 transition-transform'>
                        <span className='text-sm font-semibold'>Social</span>
                        <ArrowRight className='w-5 h-5' />
                    </Link>
                )}

                {/* Expand right button */}
                <button
                    type='button'
                    aria-expanded={expanded === "right"}
                    onClick={expandRight}
                    className='absolute top-6 right-6 z-30 inline-flex items-center gap-2 px-3 py-2 rounded-md bg-black/5 text-black hover:bg-black/10 transition'>
                    {expanded === "right" ? "Close" : "Read"}
                </button>

                {expanded === "right" ? (
                    <div className='max-w-3xl mx-auto p-6 text-left'>
                        <h2 className='text-3xl font-bold mb-4'>
                            Social Media — Tišina Ekrana
                        </h2>
                        <p className='mb-4'>
                            The social media landscape reshapes intimacy,
                            attention, and visual culture. This section examines
                            how small images, captions, and interactions form
                            networks of meaning and circulation in urban life.
                        </p>
                        <p className='mb-4'>
                            We look at how micro-poetry and image assemblage
                            create new publics and how artists leverage platform
                            affordances to distribute work and provoke
                            responses.
                        </p>
                        <div className='mt-8 flex gap-4'>
                            <Link
                                to='/walls/social'
                                className='px-4 py-2 bg-black text-white rounded-md'>
                                Explore posts
                            </Link>
                            <button
                                onClick={() => setExpanded("none")}
                                className='px-4 py-2 border border-black rounded-md'>
                                Close
                            </button>
                        </div>
                    </div>
                ) : null}
            </div>
        </section>
    );
}
