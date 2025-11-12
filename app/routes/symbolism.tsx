import { useState } from "react";
import { symbolsData } from "../data/symbolsData";

type SymbolKey = keyof typeof symbolsData;

export default function SymbolismExplorer() {
    const [selectedSymbol, setSelectedSymbol] = useState<SymbolKey | null>(
        null
    );

    const [activeTab, setActiveTab] = useState<"examples" | "meaning">(
        "examples"
    );

    const symbolsList = Object.keys(symbolsData) as SymbolKey[];

    const handleSymbolSelect = (symbol: SymbolKey) => {
        setSelectedSymbol(symbol);
        setActiveTab("examples");
    };

    return (
        <div className='w-full min-h-screen'>
            <div className='w-full max-w-6xl mx-auto px-4 py-8'>
                {/* Header */}
                <div className='text-center mb-12 px-4 pt-8'>
                    <h1 className='maintitle mb-4'>
                        Symbols across Time and Space
                    </h1>
                    <p className='subtitle font-headings mx-auto'>
                        Symbols have long served as powerful tools in both
                        visual art and literature to convey complex ideas,
                        emotions, and cultural values.
                    </p>
                </div>
                {/* Main Content Grid */}
                <div className='grid grid-cols-1 lg:grid-cols-4 gap-6'>
                    {/* Symbols Sidebar */}
                    <div className='lg:col-span-1 rounded-xl shadow-lg p-6 neumorphic'>
                        <h2 className='text-2xl font-bold text-neutral-200 mb-4'>
                            Symbols
                        </h2>
                        <div className='space-y-2'>
                            {symbolsList.map((symbol) => (
                                <button
                                    key={symbol}
                                    onClick={() => handleSymbolSelect(symbol)}
                                    className={`w-full text-left px-4 py-3 cursor-pointer neumorphic-tw hover:neumorphic-tw-h transition-all duration-300 ease-in-out ${
                                        selectedSymbol === symbol
                                            ? " text-neutral-100"
                                            : " text-neutral-300"
                                    }`}>
                                    <span className='font-semibold capitalize'>
                                        {symbol}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className='lg:col-span-3 rounded-xl shadow-lg p-6 text-neutral-100 neumorphic'>
                        {selectedSymbol ? (
                            // 1. BLOK ZA ODABRANI SIMBOL
                            <div>
                                {/* Symbol Header (ostaje simplificiran) */}
                                <div className='mb-6 border-b pb-4'>
                                    <h2 className='text-3xl font-bold capitalize mb-2'>
                                        {symbolsData[selectedSymbol].name}
                                    </h2>
                                    <p className='text-lg text-neutral-300'>
                                        {
                                            symbolsData[selectedSymbol]
                                                .description
                                        }
                                    </p>
                                </div>

                                {/* AŽURIRANI Navigation Tabs */}
                                <div className='flex border-b border-gray-200 mb-6'>
                                    {(["examples", "meaning"] as const) // Samo dva taba
                                        .map((tab) => (
                                            <button
                                                type='button'
                                                key={tab}
                                                onClick={() =>
                                                    setActiveTab(tab)
                                                }
                                                className={`px-4 py-2 font-medium capitalize ${
                                                    activeTab === tab
                                                        ? "text-teal-600 border-b-2 border-teal-600"
                                                        : "text-neutral-300 hover:text-neutral-400"
                                                }`}>
                                                {tab === "examples"
                                                    ? "Examples"
                                                    : "Meaning"}
                                            </button>
                                        ))}
                                </div>

                                {/* === TAB 1: EXAMPLES === */}
                                {activeTab === "examples" && (
                                    <div className='animate-fade-in-scale'>
                                        <h3 className='text-2xl font-bold text-neutral-200 mb-4'>
                                            Side-by-Side Comparison
                                        </h3>

                                        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                                            {/* Stupac Umjetnosti */}
                                            <div className='space-y-4'>
                                                <h4 className='font-bold text-lg text-blue-600'>
                                                    In Visual Art
                                                </h4>
                                                {symbolsData[
                                                    selectedSymbol
                                                ].artExamples.map(
                                                    (art, index) => (
                                                        <div
                                                            key={index}
                                                            className='p-3 neumorphic-gradient'>
                                                            <img
                                                                src={art.image}
                                                                alt={art.title}
                                                                className='w-full h-32 object-cover rounded-md mb-2'
                                                            />
                                                            <p className='font-semibold text-neutral-100'>
                                                                {art.title}
                                                            </p>
                                                            <p className='text-sm text-neutral-100'>
                                                                {art.artist} •{" "}
                                                                {art.period}
                                                            </p>
                                                            <p className='text-sm text-neutral-300 mt-2'>
                                                                {art.analysis}
                                                            </p>
                                                        </div>
                                                    )
                                                )}
                                            </div>

                                            {/* Stupac Književnosti */}
                                            <div className='space-y-4'>
                                                <h4 className='font-bold text-lg text-teal-600'>
                                                    In Literature
                                                </h4>
                                                {symbolsData[
                                                    selectedSymbol
                                                ].literatureExamples.map(
                                                    (lit, index) => (
                                                        <div
                                                            key={index}
                                                            className='p-3 neumorphic'>
                                                            <blockquote className='italic text-neutral-300'>
                                                                "{lit.text}"
                                                            </blockquote>
                                                            <p className='font-semibold text-neutral-200 text-sm mt-2'>
                                                                — {lit.author},{" "}
                                                                <em>
                                                                    {lit.work}
                                                                </em>
                                                            </p>
                                                            <p className='text-sm text-neutral-300 mt-2'>
                                                                {lit.analysis}
                                                            </p>
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* === TAB 2: MEANING === */}
                                {activeTab === "meaning" && (
                                    <div className='animate-fade-in-scale'>
                                        <h3 className='text-2xl font-bold text-neutral-200 mb-4'>
                                            Evolution of Meaning
                                        </h3>
                                        <div className='space-y-4'>
                                            {Object.entries(
                                                symbolsData[selectedSymbol]
                                                    .culturalContext || {}
                                            ).map(([period, description]) => (
                                                <div
                                                    key={period}
                                                    className='border-l-4 border-green-500 pl-4 py-2 neumorphic-tw rounded-r-md'>
                                                    <span className='font-semibold text-neutral-200 capitalize'>
                                                        {period}:
                                                    </span>
                                                    <span className='text-neutral-300 ml-2'>
                                                        {description}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className='text-center py-12 flex flex-col justify-center items-center h-full min-h-[50vh]'>
                                <div className='text-6xl mb-4 animate-bounce'>
                                    🔍
                                </div>
                                <h3 className='text-2xl font-bold text-neutral-200 mb-2'>
                                    Select a Symbol to Explore
                                </h3>
                                <p className='text-neutral-400 max-w-sm'>
                                    Choose from the sidebar to discover how
                                    symbols connect art and literature
                                    throughout history.
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                <div className='mt-8 rounded-xl shadow-lg p-6 bg-blue-600 bg-clip-padding backdrop-filter  backdrop-blur bg-opacity-40 backdrop-saturate-100 backdrop-contrast-125 animate-fade-in-scale'>
                    <h3 className='text-2xl font-bold text-neutral-400 mb-4'>
                        Invent your own symbol and give it a meaning
                    </h3>
                    <div className='grid md:grid-cols-2 gap-6'>
                        <div>
                            <h4 className='font-bold text-neutral-400 mb-2'>
                                Choose a symbol to represent your idea:
                            </h4>
                            <select
                                title='Select a symbol to represent your idea'
                                id='selection'
                                name='symbol'
                                className='w-full p-3 border border-gray-400 rounded-lg text-neutral-400'>
                                <option value='First option'></option>
                                <option value='Second option'></option>
                                <option value='Third option'></option>
                                <option value='Fourth option'></option>
                                <option value='Fifth option'></option>
                            </select>
                        </div>
                        <div>
                            <h4 className='font-bold text-neutral-300 mb-2'>
                                Give your simbol a meaning:
                            </h4>
                            <textarea
                                className='w-full h-32 p-3 border border-gray-300 rounded-lg text-neutral-200'
                                placeholder='For example, the symbol of infinity is a number 8 placed on its side, because it represents a never-ending loop.'
                            />
                        </div>
                    </div>
                    <button
                        type='submit'
                        className='mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors'>
                        Submit Your Symbol
                    </button>
                </div>
            </div>
        </div>
    );
}
