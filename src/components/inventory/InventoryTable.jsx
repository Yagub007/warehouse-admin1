import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ConfirmModal from './ConfirmModal';
import { inventoryApi } from '../../services/inventoryApi';

const InventoryTable = ({ items, refreshList }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const handleDeleteClick = (item) => {
        setSelectedItem(item);
        setModalOpen(true);
    };

    const confirmDelete = async () => {
        try {
            await inventoryApi.delete(selectedItem.id);
            refreshList(); // Update list after deletion
        } catch (error) {
            alert('Error deleting item');
        } finally {
            setModalOpen(false);
        }
    };

    if (items.length === 0) return <div>No inventory items found. (Empty State)</div>;

    return (
        <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', border: 'none' }}>
                <thead>
                    <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                        <th style={{ padding: '16px 24px', textAlign: 'left', fontWeight: '600', color: 'var(--text-muted)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Previw</th>
                        <th style={{ padding: '16px 24px', textAlign: 'left', fontWeight: '600', color: 'var(--text-muted)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Inventory Name</th>
                        <th style={{ padding: '16px 24px', textAlign: 'left', fontWeight: '600', color: 'var(--text-muted)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Description</th>
                        <th style={{ padding: '16px 24px', textAlign: 'right', fontWeight: '600', color: 'var(--text-muted)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(item => (
                        <tr key={item.id} style={{ borderBottom: '1px solid #f1f5f9', transition: 'background 0.2s' }} onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                            <td style={{ padding: '16px 24px' }}>
                                <img src={item.photoUrl} alt="preview" style={{ width: '48px', height: '48px', borderRadius: '12px', objectFit: 'cover', border: '1px solid #e2e8f0' }} />
                            </td>
                            <td style={{ padding: '16px 24px' }}>
                                <div style={{ fontWeight: '600', color: 'var(--text-main)', fontSize: '1rem' }}>{item.inventory_name}</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>ID: {item.id}</div>
                            </td>
                            <td style={{ padding: '16px 24px', color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '300px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {item.description}
                            </td>
                            <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                                <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                                    <Link to={`/inventory/${item.id}`} style={{ textDecoration: 'none', color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: '500' }}>View</Link>
                                    <Link to={`/inventory/edit/${item.id}`} style={{ textDecoration: 'none', color: 'var(--primary)', fontSize: '0.9rem', fontWeight: '500' }}>Edit</Link>
                                    <button 
                                        onClick={() => handleDeleteClick(item)} 
                                        style={{ background: 'none', padding: 0, color: '#ef4444', fontSize: '0.9rem', fontWeight: '500' }}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <ConfirmModal 
                isOpen={modalOpen} 
                onClose={() => setModalOpen(false)} 
                onConfirm={confirmDelete} 
                itemName={selectedItem?.inventory_name} 
            />
        </div>
    );
};

export default InventoryTable;
