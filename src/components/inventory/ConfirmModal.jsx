import React from 'react';

const ConfirmModal = ({ isOpen, onClose, onConfirm, itemName }) => {
    if (!isOpen) return null;
    return (
        <div className="modal-overlay" style={{ background: 'rgba(15, 23, 42, 0.4)' }}>
            <div className="modal-content" style={{ maxWidth: '450px', transform: 'scale(1)', textAlign: 'center' }}>
                <div style={{ width: '64px', height: '64px', background: 'rgba(244, 63, 94, 0.1)', color: 'var(--accent)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px auto', fontSize: '1.5rem' }}>⚠️</div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, margin: '0 0 12px 0', letterSpacing: '-0.025em' }}>Confirm Deletion</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: '1.5', margin: '0 0 32px 0' }}>
                    Are you sure you want to permanently delete <strong style={{ color: 'var(--text-main)' }}>{itemName}</strong>? This action cannot be undone.
                </p>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <button onClick={onConfirm} className="btn-primary" style={{ flex: 1, background: 'var(--accent)', boxShadow: '0 4px 14px 0 rgba(244, 63, 94, 0.39)' }}>Yes, Delete</button>
                    <button onClick={onClose} style={{ flex: 1, background: '#f1f5f9', color: 'var(--text-main)' }}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;
