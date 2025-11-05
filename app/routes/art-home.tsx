export default function BytesOfArt() {
    return (
        <div className='max-w-screen min-h-screen bg-red-300 py-8'>
            <h2 className='font-cursive font-bold text-center text-teal-500 mb-4 p-4'>
                Bytes of Art
            </h2>
            {/* Card container with three cards that are actually navigation links that lead to three different routes */}
            <div className='card-container flex flex-row justify-center mb-8 gap-6 px-4'>
                <div className='card bg-white rounded-lg shadow-md p-6 w-64 text-center hover:shadow-xl hover-shadow-teal-500/10 transition-shadow'>
                    <h3 className='text-lg font-semibold mb-2'>
                        Portraits, Politics and Propaganda
                    </h3>
                    <p className='text-sm mb-4'>
                        Explore the evolution of leadership portraiture across
                        centuries.
                    </p>
                    <div className='icon mb-4'>🖼️</div>
                    <a
                        href='/portraits'
                        className='btn bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 transition-colors'>
                        Explore Portraits
                    </a>
                </div>
                <div className='card bg-white rounded-lg shadow-md p-6 w-64 text-center hover:shadow-xl hover-shadow-teal-500/10 transition-shadow'>
                    <h3 className='text-lg font-semibold mb-2'>
                        Symbols Around Us
                    </h3>
                    <p className='text-sm mb-4'>
                        Discover the meanings behind common symbols in art and
                        culture.
                    </p>
                    <div className='icon mb-4'>🔣</div>
                    <a
                        href='/symbolism'
                        className='btn bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 transition-colors'>
                        Explore Symbols
                    </a>
                </div>
                <div className='card bg-white rounded-lg shadow-md p-6 w-64 text-center hover:shadow-xl hover-shadow-teal-500/10 transition-shadow'>
                    <h3 className='text-lg font-semibold mb-2'>
                        Artistic Movements
                    </h3>
                    <p className='text-sm mb-4'>
                        Learn about key artistic movements and their cultural
                        impacts.
                    </p>
                    <div className='icon mb-4'>🎨</div>
                    <a
                        href='/treca'
                        className='btn bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 transition-colors'>
                        Explore Movements
                    </a>
                </div>
            </div>
        </div>
    );
}
