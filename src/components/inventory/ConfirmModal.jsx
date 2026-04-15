import React from 'react';

const ConfirmModal = ({ isOpen, onClose, onConfirm, itemName }) => {
    if (!isOpen) return null;
    return (
        <div className="modal-overlay" style={{ border: '1px solid black', padding: '20px', position: 'absolute', background: 'white' }}>
            <h3>Confirm Deletion</h3>
            <p>Are you sure you want to delete <b>{itemName}</b>?</p>
            <button onClick={onConfirm}>Yes, Delete</button>
            <button onClick={onClose}>Cancel</button>
        </div>
    );
};

export default ConfirmModal;
