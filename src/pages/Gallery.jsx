import React, { useState, useEffect } from 'react';
import { inventoryApi } from '../services/inventoryApi';
import { useFavorites } from '../hooks/useFavorites';
import InventoryGallery from '../components/gallery/InventoryGallery';
import '../GalleryStyles.css';

const Gallery = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { favorites, toggleFavorite } = useFavorites();

    useEffect(() => {
        inventoryApi.getAll()
            .then(res => setItems(res.data))
            .catch(() => setError('Failed to load gallery data.'))
            .finally(() => setLoading(false));
    }, []);

    if (error) return <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>;

    return (
        <div style={{ animation: 'fadeIn 0.5s ease' }}>
            <div style={{ marginBottom: '40px', textAlign: 'center' }}>
                <h2 style={{ fontSize: '2.5rem', fontWeight: 800, margin: 0, letterSpacing: '-0.04em' }}>Explore Inventory</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginTop: '8px' }}>Browse and discover assets stored in our central warehouse</p>
            </div>
            <InventoryGallery 
                items={items} 
                loading={loading} 
                favorites={favorites} 
                toggleFavorite={toggleFavorite} 
            />
        </div>
    );
};

export default Gallery;
