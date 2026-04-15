import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { InventoryContext } from '../store/InventoryContext';
import InventoryTable from '../components/inventory/InventoryTable';

const AdminInventory = () => {
    const { inventory, loading, error, fetchInventory } = useContext(InventoryContext);

    if (loading) return <div>Loading inventory...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h2>Warehouse Inventory</h2>
            <Link to="/inventory/create"><button>Add New Item</button></Link>
            <hr />
            <InventoryTable items={inventory} refreshList={fetchInventory} />
        </div>
    );
};

export default AdminInventory;
