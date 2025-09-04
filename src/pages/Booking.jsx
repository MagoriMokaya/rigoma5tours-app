import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BookingForm from '../components/BookingForm';
import { supabase } from '../lib/supabaseClient'; // Ensure you have this import

export default function Booking() {
    const location = useLocation();
    const navigate = useNavigate();
    const [tour, setTour] = useState(null);
    const [loading, setLoading] = useState(true);

    const tourId = new URLSearchParams(location.search).get('tourId');

    useEffect(() => {
        if (!tourId) {
            navigate('/');
            return;
        }

        async function fetchTour() {
            setLoading(true);
            const data = await getTourById(tourId);
            if (!data) {
                navigate('/tours');
            } else {
                setTour(data);
            }
            setLoading(false);
        }

        fetchTour();
    }, [tourId, navigate]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <span className="text-lg">Loading tour details...</span>
            </div>
        );
    }

    if (!tour) return null;

    return (
        <div className="py-12 px-4 min-h-screen bg-gray-50">
            <div className="max-w-3xl mx-auto bg-white shadow rounded-lg p-8">
                <h1 className="text-2xl font-bold mb-6 text-gray-800">Complete Your Booking</h1>
                <BookingForm tour={tour} />
            </div>
        </div>
    );
}

// Extracted to a utility function for reusability
async function getTourById(id) {
    const { data, error } = await supabase
        .from('tours')
        .select('*')
        .eq('id', id)
        .single();
    return error ? null : data;
}