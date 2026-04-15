import React from 'react';

const InventoryCard = ({ item, isFavorite, onToggleFavorite, onClickView }) => {
    const handleFavClick = (e) => {
        e.stopPropagation();
        onToggleFavorite(item.id);
    };

    return (
        <div className="inventory-card" onClick={() => onClickView(item)}>
            <div style={{ position: 'relative', overflow: 'hidden', height: '220px' }}>
                <img src={item.photoUrl || '/placeholder.png'} alt={item.inventory_name} />
                <button className="fav-btn" onClick={handleFavClick}>
                    {isFavorite ? '❤️' : '🤍'}
                </button>
                <div style={{ 
                    position: 'absolute', 
                    bottom: 0, 
                    left: 0, 
                    right: 0, 
                    height: '60%', 
                    background: 'linear-gradient(to top, rgba(0,0,0,0.4), transparent)',
                    opacity: 0,
                    transition: 'opacity 0.3s'
                }} className="card-overlay" />
            </div>
            <div className="card-info">
                <h3>{item.inventory_name}</h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '500' }}>#{item.id}</span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: '600' }}>Quick View →</span>
                </div>
            </div>
        </div>
    );
};

export default InventoryCard;
