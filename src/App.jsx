import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';

// Admin Pages (Lab 7)
import AdminInventory from './pages/AdminInventory';
import AdminInventoryCreate from './pages/AdminInventoryCreate';
import AdminInventoryEdit from './pages/AdminInventoryEdit';
import AdminInventoryDetails from './pages/AdminInventoryDetails';

// User Pages (Lab 8)
import Gallery from './pages/Gallery';
import Favorites from './pages/Favorites';

const App = () => {
    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-main)' }}>
            <nav style={{ 
                position: 'sticky',
                top: 0,
                zIndex: 100,
                background: 'rgba(255, 255, 255, 0.7)',
                backdropFilter: 'blur(12px)',
                borderBottom: '1px solid var(--glass-border)',
                padding: '0.75rem 0'
            }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '40px', height: '40px', background: 'var(--primary)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', fontSize: '1.2rem' }}>W</div>
                        <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.025em' }}>Warehouse</h1>
                    </div>
                    <div style={{ display: 'flex', gap: '32px' }}>
                        <Link to="/gallery" style={{ fontWeight: '600', textDecoration: 'none', color: 'var(--text-main)', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '6px' }}>🖼️ Gallery</Link>
                        <Link to="/favorites" style={{ fontWeight: '600', textDecoration: 'none', color: 'var(--text-main)', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '6px' }}>❤️ Favorites</Link>
                        <Link to="/" style={{ fontWeight: '600', textDecoration: 'none', color: 'var(--primary)', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '6px' }}>⚙️ Admin</Link>
                    </div>
                </div>
            </nav>

            <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px' }}>
                <Routes>
                    {/* User Routes */}
                    <Route path="/gallery" element={<Gallery />} />
                    <Route path="/favorites" element={<Favorites />} />

                    {/* Admin Routes */}
                    <Route path="/" element={<AdminInventory />} />
                    <Route path="/inventory/create" element={<AdminInventoryCreate />} />
                    <Route path="/inventory/edit/:id" element={<AdminInventoryEdit />} />
                    <Route path="/inventory/:id" element={<AdminInventoryDetails />} />
                </Routes>
            </main>
        </div>
    );
};

export default App;
