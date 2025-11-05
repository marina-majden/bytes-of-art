import { useState } from "react";
import { useParams, Link } from "react-router";
import { symbolsData } from "../data/symbolsData";

type SymbolKey = keyof typeof symbolsData; 

export default function SymbolismExplorer() {
  const [selectedSymbol, setSelectedSymbol] = useState<SymbolKey | null>(null);
  const [activeTab, setActiveTab] = useState<"art" | "literature" | "comparison">("art");

  const symbolsList = Object.keys(symbolsData) as SymbolKey[];

    return (
        <div className='w-screen h-screen bg-gradient-to-br from-blue-900 to-violet-950'>
            <div className='max-w-6xl mx-auto px-4'>
            {/* Header */}
            <div className='text-center mb-12 px-4 pt-8'>
                <h1 className='maintitle mb-4'>Symbols across Time and Space</h1>
                <p className='subtitle font-headings mx-auto'>
                    Symbols have long served as powerful tools in both visual
                    art and literature to convey complex ideas, emotions, and
                    cultural values.
                </p>
            </div>
                {/* Main Content Grid */}
                <div className='grid grid-cols-1 lg:grid-cols-4 gap-6'>
                    {/* Symbols Sidebar */}
                    <div className='lg:col-span-1 bg-white rounded-xl shadow-lg p-6'>
                        <h2 className='text-2xl font-bold text-gray-800 mb-4'>
                            Symbols
                        </h2>
                        <div className='space-y-2'>
                            {symbolsList.map((symbol) => (
                                <button
                                    key={symbol}
                                    onClick={() => setSelectedSymbol(symbol)}
                                    className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                                        selectedSymbol === symbol
                                            ? "bg-blue-500 text-white shadow-md"
                                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                    }`}>
                                    <span className='font-semibold capitalize'>
                                        {symbol}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className='lg:col-span-3 bg-white rounded-xl shadow-lg p-6'>
                        {selectedSymbol ? (
                            <div>
                                {/* Symbol Header */}
                                <div className='mb-6'>
                                    <h2 className='text-3xl font-bold text-gray-800 capitalize mb-2'>
                                        {symbolsData[selectedSymbol].name}
                                    </h2>
                                    <p className='text-lg text-gray-600'>
                                        {
                                            symbolsData[selectedSymbol]
                                                .description
                                        }
                                    </p>
                                        <div className='space-y-4'>
                                                {Object.entries(
                                                    symbolsData[selectedSymbol]
                                                        .culturalContext || {}
                                                ).map(
                                                    ([period, description]) => (
                                                        <div
                                                            key={period}
                                                            className='border-l-4 border-green-500 pl-4'>
                                                            <span className='font-semibold text-gray-800 capitalize'>
                                                                {period}:
                                                            </span>
                                                            <span className='text-gray-700 ml-2'>
                                                                {description}
                                                            </span>
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                </div>

                                {/* Navigation Tabs */}
                                <div className='flex border-b border-gray-200 mb-6'>
                                    {(
                                        [
                                            "art",
                                            "literature",
                                            "comparison",
                                        ] as const
                                    ).map((tab) => (
                                        <button
                                            key={tab}
                                            onClick={() => setActiveTab(tab)}
                                            className={`px-4 py-2 font-medium capitalize ${
                                                activeTab === tab
                                                    ? "text-blue-600 border-b-2 border-blue-600"
                                                    : "text-gray-500 hover:text-gray-700"
                                            }`}>
                                            {tab}
                                        </button>
                                    ))}
                                </div>

                                {/* Tab Content */}
                                {activeTab === "art" && (
                                    <div>
                                        <h3 className='text-2xl font-bold text-gray-800 mb-4'>
                                            In Visual Art
                                        </h3>
                                        <div className='grid gap-6'>
                                            {symbolsData[
                                                selectedSymbol
                                            ].artExamples.map((art, index) => (
                                                <div
                                                    key={index}
                                                    className='flex gap-4 p-4 bg-gray-50 rounded-lg'>
                                                    <div className='w-32 h-32 bg-gray-200 rounded-lg flex items-center justify-center'>
                                                        <span className='text-gray-500'>
                                                            Artwork Image
                                                        </span>
                                                        <img src={art.image} alt={art.title} className="w-full h-full object-cover rounded-lg" /> 
                                                    </div>
                                                    <div>
                                                        <h4 className='font-bold text-lg'>
                                                            {art.title}
                                                        </h4>
                                                        <p className='text-gray-600'>
                                                            {art.artist} •{" "}
                                                            {art.period}
                                                        </p>
                                                        <p className='text-gray-700 mt-2'>
                                                            {art.analysis}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {activeTab === "literature" && (
                                    <div>
                                        <h3 className='text-2xl font-bold text-gray-800 mb-4'>
                                            In Literature
                                        </h3>
                                        <div className='space-y-6'>
                                            {symbolsData[
                                                selectedSymbol
                                            ].literatureExamples.map(
                                                (lit, index) => (
                                                    <div
                                                        key={index}
                                                        className='p-4 bg-gray-50 rounded-lg'>
                                                        <blockquote className='text-lg italic text-gray-700 border-l-4 border-blue-500 pl-4 mb-3'>
                                                            "{lit.text}"
                                                        </blockquote>
                                                        <p className='font-semibold text-gray-800'>
                                                            — {lit.author},{" "}
                                                            <em>{lit.work}</em>
                                                        </p>
                                                        <p className='text-gray-700 mt-2'>
                                                            {lit.analysis}
                                                        </p>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </div>
                                )}

                                {activeTab === "comparison" && (
                                    <div>
                                        <div className='mt-8'>
                                            <h4 className='font-bold text-lg mb-4'>
                                                Evolution of Meaning
                                            </h4>
                                            <div className='space-y-4'>
                                                {Object.entries(
                                                    symbolsData[selectedSymbol]
                                                        .culturalContext || {}
                                                ).map(
                                                    ([period, description]) => (
                                                        <div
                                                            key={period}
                                                            className='border-l-4 border-green-500 pl-4'>
                                                            <span className='font-semibold text-gray-800 capitalize'>
                                                                {period}:
                                                            </span>
                                                            <span className='text-gray-700 ml-2'>
                                                                {description}
                                                            </span>
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            // Welcome State
                            <div className='text-center py-12'>
                                <div className='text-6xl mb-4'>🔍</div>
                                <h3 className='text-2xl font-bold text-gray-800 mb-2'>
                                    Select a Symbol to Explore
                                </h3>
                                <p className='text-gray-600'>
                                    Choose from the sidebar to discover how
                                    symbols connect art and literature
                                    throughout history
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Interactive Exercise */}
                {selectedSymbol && (
                    <div className='mt-8 bg-white rounded-xl shadow-lg p-6'>
                        <h3 className='text-2xl font-bold text-gray-800 mb-4'>
                            Your Turn: Symbol Analysis
                        </h3>
                        <div className='grid md:grid-cols-2 gap-6'>
                            <div>
                                <h4 className='font-bold mb-2'>
                                    Find this symbol in a new artwork:
                                </h4>
                                <textarea
                                    className='w-full h-32 p-3 border border-gray-300 rounded-lg'
                                    placeholder='Describe an artwork you know that uses this symbol...'
                                />
                            </div>
                            <div>
                                <h4 className='font-bold mb-2'>
                                    Find this symbol in a new literary work:
                                </h4>
                                <textarea
                                    className='w-full h-32 p-3 border border-gray-300 rounded-lg'
                                    placeholder='Quote a literary passage that uses this symbol...'
                                />
                            </div>
                        </div>
                        <button className='mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors'>
                            Submit Analysis
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
