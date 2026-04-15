import React, { useState, useEffect } from 'react';
import { inventoryApi } from '../services/inventoryApi';
import { useFavorites } from '../hooks/useFavorites';
import InventoryGallery from '../components/gallery/InventoryGallery';
import '../GalleryStyles.css';

const Favorites = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const { favorites, toggleFavorite } = useFavorites();

    useEffect(() => {
        inventoryApi.getAll()
            .then(res => {
                // Відфільтровуємо лише ті елементи, чиї ID є в localStorage
                const favItems = res.data.filter(item => favorites.includes(item.id));
                setItems(favItems);
            })
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, [favorites]); // Оновлюємо список, якщо favorites змінилися

    return (
        <div style={{ animation: 'fadeIn 0.5s ease' }}>
            <div style={{ marginBottom: '40px', textAlign: 'center' }}>
                <h2 style={{ fontSize: '2.5rem', fontWeight: 800, margin: 0, letterSpacing: '-0.04em' }}>Your Favorites ❤️</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginTop: '8px' }}>Keep track of the assets that matter most to you</p>
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

export default Favorites;
