import { useParams, Link } from "react-router";
import { artTimelineData } from "../data/artTimelineData";

export default function ArtworkDetail() {
    const { id } = useParams();
    const artwork = artTimelineData.items.find((item) => item.id === id);

    if (!artwork) {
        return (
            <div className='min-h-screen bg-gray-100 flex items-center justify-center'>
                <div className='text-center'>
                    <h1 className='text-2xl font-bold text-gray-900'>
                        Artwork not found
                    </h1>
                    <Link
                        to='/'
                        className='text-blue-600 hover:text-blue-800 mt-4 inline-block'>
                        Return to timeline
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className='min-h-screen bg-gray-100 py-8'>
            <div className='max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden'>
                <img
                    src={artwork.imageUrl}
                    alt={artwork.title}
                    className='w-full h-96 object-cover'
                />
                <div className='p-8'>
                    <div className='flex justify-between items-start mb-4'>
                        <div>
                            <h1 className='subtitle'>
                                {artwork.title}
                            </h1>
                            <p className='text-xl text-blue-600 font-semibold mt-2 tags'>
                                {artwork.year}
                            </p>
                        </div>
                        <span className='bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm tags'>
                            {artwork.period}
                        </span>
                    </div>

                    <p className='paragraph mb-6'>
                        {artwork.description}
                    </p>

                    <div className='grid grid-cols-2 gap-4 text-sm text-gray-600 tags'>
                        <div>
                            <span className='font-semibold'>Medium:</span>{" "}
                            {artwork.medium}
                        </div>
                        <div>
                            <span className='font-semibold tags'>Location:</span>{" "}
                            {artwork.location}
                        </div>
                    </div>

                    <div className='mt-8'>
                        <Link
                            to='/'
                            className='inline-flex items-center text-blue-600 hover:text-blue-800'>
                            ← Back to timeline
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
