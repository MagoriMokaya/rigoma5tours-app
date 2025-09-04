import { useEffect, useState } from 'react';
import { getAllTours } from '../lib/supabaseClient';
import TourCard from '../components/TourCard';

export default function Tours() {
    const [tours, setTours] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;
        async function fetchTours() {
            try {
                const data = await getAllTours();
                if (isMounted) {
                    setTours(data || []);
                }
            } catch (err) {
                if (isMounted) setError('Failed to load tours.');
            } finally {
                if (isMounted) setLoading(false);
            }
        }
        fetchTours();
        return () => { isMounted = false; };
    }, []);

    return (
        <div className="py-12 px-4 min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">All Safaris</h1>
                {loading && (
                    <div className="text-center text-gray-500">Loading tours...</div>
                )}
                {error && (
                    <div className="text-center text-red-500 mb-4">{error}</div>
                )}
                {!loading && !error && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {tours.length > 0 ? (
                            tours.map((tour) => (
                                <TourCard key={tour.id} tour={tour} />
                            ))
                        ) : (
                            <div className="col-span-full text-center text-gray-500">
                                No tours available.
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}