import React from 'react';

const InventoryQuickView = ({ item, onClose }) => {
    if (!item) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <h2>{item.inventory_name}</h2>
                <img src={item.photoUrl || '/placeholder.png'} alt={item.inventory_name} />
                <p style={{ marginTop: '15px', color: '#555' }}>
                    {item.description || "No description provided."}
                </p>
                <button onClick={onClose} style={{ marginTop: '20px', padding: '8px 16px' }}>
                    Close
                </button>
            </div>
        </div>
    );
};

export default InventoryQuickView;
