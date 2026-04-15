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
        <div>
            <h2>User Gallery</h2>
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
