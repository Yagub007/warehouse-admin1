import React, { useState } from 'react';
import InventoryCard from './InventoryCard';
import InventoryQuickView from './InventoryQuickView';

const InventoryGallery = ({ items, loading, favorites, toggleFavorite }) => {
    const [selectedItem, setSelectedItem] = useState(null);

    if (loading) {
        return (
            <div className="gallery-grid">
                {[1, 2, 3, 4, 5, 6].map(n => <div key={n} className="skeleton"></div>)}
            </div>
        );
    }

    if (!items || items.length === 0) {
        return <div style={{ textAlign: 'center', padding: '50px' }}><h3>No items found in the gallery.</h3></div>;
    }

    return (
        <>
            <div className="gallery-grid">
                {items.map(item => (
                    <InventoryCard 
                        key={item.id} 
                        item={item} 
                        isFavorite={favorites.includes(item.id)}
                        onToggleFavorite={toggleFavorite}
                        onClickView={setSelectedItem}
                    />
                ))}
            </div>
            {selectedItem && (
                <InventoryQuickView item={selectedItem} onClose={() => setSelectedItem(null)} />
            )}
        </>
    );
};

export default InventoryGallery;
