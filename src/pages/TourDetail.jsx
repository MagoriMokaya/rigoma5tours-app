import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getTourById } from '../lib/supabaseClient';

export default function TourDetail() {
    const { id } = useParams();
    const [tour, setTour] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        let isMounted = true;
        setLoading(true);
        setError('');
        async function fetchTour() {
            try {
                const data = await getTourById(id);
                if (isMounted) setTour(data);
            } catch (err) {
                if (isMounted) setError('Failed to load tour details.');
            } finally {
                if (isMounted) setLoading(false);
            }
        }
        fetchTour();
        return () => { isMounted = false; };
    }, [id]);

    if (loading) {
        return <div className="p-8 text-center">Loading tour...</div>;
    }

    if (error) {
        return <div className="p-8 text-center text-red-600">{error}</div>;
    }

    if (!tour) {
        return <div className="p-8 text-center">Tour not found.</div>;
    }

    return (
        <div className="py-12 px-4">
            <div className="max-w-4xl mx-auto">
                <Link to="/tours" className="text-indigo-600 hover:underline mb-4 inline-block">
                    ← Back to Tours
                </Link>
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="h-80 relative">
                        <img
                            src={tour.image_url || '/images/placeholder.jpg'}
                            alt={tour.title || 'Tour'}
                            className="w-full h-full object-cover"
                            loading="lazy"
                        />
                    </div>
                    <div className="p-8">
                        <h1 className="text-3xl font-bold text-gray-800">{tour.title}</h1>
                        <p className="text-gray-600 mt-2">
                            {tour.duration_days ? `${tour.duration_days} days` : ''} 
                            {tour.duration_days && tour.region ? ' • ' : ''}
                            {tour.region}
                        </p>
                        {tour.description && (
                            <div className="mt-6">
                                <h2 className="text-xl font-semibold">Description</h2>
                                <p className="mt-2 text-gray-700">{tour.description}</p>
                            </div>
                        )}
                        {tour.itinerary && (
                            <div className="mt-6">
                                <h2 className="text-xl font-semibold">Itinerary</h2>
                                <pre className="mt-2 text-gray-700 whitespace-pre-line bg-gray-50 p-4 rounded">
                                    {tour.itinerary}
                                </pre>
                            </div>
                        )}
                        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                            <PriceCard label="Economy" price={tour.price_economy} />
                            <PriceCard label="Luxury" price={tour.price_luxury} />
                            <PriceCard label="Executive" price={tour.price_executive} />
                        </div>
                        <div className="mt-8 text-center">
                            <Link
                                to={`/booking?tourId=${tour.id}`}
                                className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700"
                            >
                                Book This Tour
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function PriceCard({ label, price }) {
    return (
        <div className="p-4 border rounded text-center">
            <h3 className="font-semibold">{label}</h3>
            <p className="text-2xl font-bold">
                {price !== undefined && price !== null ? `$${price}` : 'N/A'}
            </p>
        </div>
    );
}