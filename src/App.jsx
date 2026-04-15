import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminInventory from './pages/AdminInventory';
import AdminInventoryCreate from './pages/AdminInventoryCreate';
import AdminInventoryEdit from './pages/AdminInventoryEdit';
import AdminInventoryDetails from './pages/AdminInventoryDetails'; 

const App = () => {
    return (
        <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
            <h1>Admin Panel</h1>
            <Routes>
                <Route path="/" element={<AdminInventory />} />
                <Route path="/inventory/create" element={<AdminInventoryCreate />} />
                <Route path="/inventory/:id" element={<AdminInventoryDetails />} />
                <Route path="/inventory/edit/:id" element={<AdminInventoryEdit />} />
            </Routes>
        </div>
    );
};

export default App;
