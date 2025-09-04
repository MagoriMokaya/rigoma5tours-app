import { Link } from 'react-router-dom';

export default function TourCard({ tour }) {
    if (!tour) return null;

    const {
        id,
        image_url,
        title,
        duration_days,
        region,
        attractions = [],
        description,
        price_economy,
        price_luxury,
        price_executive,
    } = tour;

    return (
        <div className="bg-white rounded-xl shadow hover:shadow-lg transition-all overflow-hidden flex flex-col">
            <Link to={`/tours/${id}`} className="block h-56 relative">
                <img
                    src={image_url || '/images/placeholder.jpg'}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-200 hover:scale-105"
                    loading="lazy"
                />
            </Link>
            <div className="p-5 flex flex-col flex-1">
                <h3 className="text-lg font-bold text-gray-900 truncate">{title}</h3>
                <p className="text-gray-500 mt-1 text-sm">
                    {duration_days} days in {region}
                </p>
                {attractions.length > 0 && (
                    <div className="mt-2">
                        <span className="text-xs font-semibold text-gray-700">Attractions:</span>
                        <ul className="list-disc list-inside text-xs text-gray-600">
                            {attractions.map((site, idx) => (
                                <li key={idx}>{site}</li>
                            ))}
                        </ul>
                    </div>
                )}
                <p className="text-gray-600 mt-2 text-sm line-clamp-2">{description}</p>
                <div className="mt-3">
                    <span className="text-indigo-600 font-semibold text-base block">
                        Economy: ${price_economy}
                    </span>
                    <span className="text-yellow-600 font-semibold text-base block">
                        Luxury: ${price_luxury}
                    </span>
                    <span className="text-green-600 font-semibold text-base block">
                        Executive: ${price_executive}
                    </span>
                </div>
                <Link
                    to={`/tours/${id}`}
                    className="mt-4 bg-indigo-600 text-white py-2 rounded text-center font-medium hover:bg-indigo-700 transition-colors"
                >
                    View Details
                </Link>
            </div>
        </div>
    );
}