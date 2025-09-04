import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer'; // Consider creating a Footer component for better structure
import Home from './pages/Home';
import Tours from './pages/Tours';
import TourDetail from './pages/TourDetail';
import Booking from './pages/Booking';
import NotFound from './pages/NotFound'; // Add a NotFound page for unmatched routes

const AppRoutes = () => (
    <div className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-6">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/tours" element={<Tours />} />
                <Route path="/tours/:id" element={<TourDetail />} />
                <Route path="/booking" element={<Booking />} />
                {/* Example: Add a redirect for legacy URLs */}
                <Route path="/home" element={<Navigate to="/" replace />} />
                {/* Catch-all route for 404 */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </main>
        {/* Use a Footer component for maintainability */}
        <Footer />
    </div>
);

export default AppRoutes;

// Example Footer component (src/components/Footer.jsx)
// import React from 'react';
// const Footer = () => (
//   <footer className="bg-gray-900 text-white text-center py-4 text-xs">
//     &copy; {new Date().getFullYear()} Rigoma5Tours. All rights reserved.
//   </footer>
// );
// export default Footer;

// Example NotFound page (src/pages/NotFound.jsx)
// import React from 'react';
// const NotFound = () => (
//   <div className="text-center py-20">
//     <h1 className="text-3xl font-bold mb-4">404 - Page Not Found</h1>
//     <p className="text-gray-600">Sorry, the page you are looking for does not exist.</p>
//   </div>
// );
// export default NotFound;