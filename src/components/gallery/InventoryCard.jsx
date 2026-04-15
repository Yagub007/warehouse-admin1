import React from 'react';

const InventoryCard = ({ item, isFavorite, onToggleFavorite, onClickView }) => {
    const handleFavClick = (e) => {
        e.stopPropagation(); // Запобігаємо відкриттю модалки при кліку на серце
        onToggleFavorite(item.id);
    };

    return (
        <div className="inventory-card" onClick={() => onClickView(item)}>
            <button className="fav-btn" onClick={handleFavClick}>
                {isFavorite ? '❤️' : '🤍'}
            </button>
            <img src={item.photoUrl || '/placeholder.png'} alt={item.inventory_name} />
            <div className="card-info">
                <h3>{item.inventory_name}</h3>
            </div>
        </div>
    );
};

export default InventoryCard;
