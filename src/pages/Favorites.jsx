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
        <div>
            <h2>My Favorites ❤️</h2>
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
