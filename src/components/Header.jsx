import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <header className="bg-indigo-900 text-white shadow-md">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link to="/" className="text-xl font-bold flex items-center gap-2">
                    🐘 Rigoma5Tours
                </Link>
                <nav>
                    <ul className="flex space-x-6">
                        <li>
                            <Link to="/" className="hover:underline">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/tours" className="hover:underline">
                                Tours
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}