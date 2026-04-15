import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';

// Admin Pages (Lab 7)
import AdminInventory from './pages/AdminInventory';
import AdminInventoryCreate from './pages/AdminInventoryCreate';
import AdminInventoryEdit from './pages/AdminInventoryEdit';

// User Pages (Lab 8)
import Gallery from './pages/Gallery';
import Favorites from './pages/Favorites';

const App = () => {
    return (
        <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '1200px', margin: '0 auto' }}>
            <nav style={{ marginBottom: '20px', paddingBottom: '10px', borderBottom: '2px solid #eee', display: 'flex', gap: '15px' }}>
                <Link to="/gallery" style={{ fontWeight: 'bold', textDecoration: 'none', color: '#333' }}>🖼️ Gallery</Link>
                <Link to="/favorites" style={{ fontWeight: 'bold', textDecoration: 'none', color: '#333' }}>❤️ Favorites</Link>
                <span style={{ borderLeft: '2px solid #ccc', margin: '0 10px' }}></span>
                <Link to="/" style={{ textDecoration: 'none', color: '#0066cc' }}>⚙️ Admin Panel</Link>
            </nav>

            <Routes>
                {/* User Routes */}
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/favorites" element={<Favorites />} />

                {/* Admin Routes */}
                <Route path="/" element={<AdminInventory />} />
                <Route path="/inventory/create" element={<AdminInventoryCreate />} />
                <Route path="/inventory/edit/:id" element={<AdminInventoryEdit />} />
            </Routes>
        </div>
    );
};

export default App;
