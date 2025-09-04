import { useEffect, useState } from 'react';
import { getAllTours } from '../lib/supabaseClient';
import TourCard from '../components/TourCard';
import { Link } from 'react-router-dom';

export default function Home() {
    const [tours, setTours] = useState([]);

    useEffect(() => {
        async function fetchTours() {
            const data = await getAllTours();
            if (Array.isArray(data)) {
                setTours(data.slice(0, 3));
            }
        }
        fetchTours();
    }, []);

    return (
        <div className="py-12 px-4">
            <div className="max-w-7xl mx-auto text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
                    Welcome to <span className="text-indigo-600">Rigoma5Tours</span>
                </h1>
                <p className="mt-4 text-lg text-gray-600">
                    Experience the wild beauty of Africa with expert-guided safaris.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {tours.map((tour) => (
                    <TourCard key={tour.id} tour={tour} />
                ))}
            </div>

            <div className="text-center mt-12">
                <Link
                    to="/tours"
                    className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
                >
                    View All Tours
                </Link>
            </div>
        </div>
    );
}