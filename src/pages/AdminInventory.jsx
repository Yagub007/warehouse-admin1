import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { InventoryContext } from '../store/InventoryContext';
import InventoryTable from '../components/inventory/InventoryTable';

const AdminInventory = () => {
    const { inventory, loading, error, fetchInventory } = useContext(InventoryContext);

    if (loading) return <div>Loading inventory...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div style={{ animation: 'fadeIn 0.5s ease' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <div>
                    <h2 style={{ fontSize: '2rem', fontWeight: 800, margin: 0, letterSpacing: '-0.025em' }}>Inventory Dashboard</h2>
                    <p style={{ color: 'var(--text-muted)', margin: '4px 0 0 0' }}>Manage and monitor your warehouse assets</p>
                </div>
                <Link to="/inventory/create">
                    <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span>+</span> Add New Item
                    </button>
                </Link>
            </div>
            <div style={{ 
                background: 'white', 
                borderRadius: '24px', 
                padding: '8px', 
                boxShadow: 'var(--shadow-md)',
                overflow: 'hidden'
            }}>
                <InventoryTable items={inventory} refreshList={fetchInventory} />
            </div>
        </div>
    );
};

export default AdminInventory;
