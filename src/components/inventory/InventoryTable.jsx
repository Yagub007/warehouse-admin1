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
        <>
            <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ccc' }}>
                <thead>
                    <tr>
                        <th>Photo</th><th>Name</th><th>Description</th><th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(item => (
                        <tr key={item.id} style={{ borderBottom: '1px solid #eee' }}>
                            <td><img src={item.photoUrl} alt="preview" width="50" /></td>
                            <td>{item.inventory_name}</td>
                            <td>{item.description}</td>
                            <td>
                                <Link to={`/inventory/${item.id}`}>View</Link> | 
                                <Link to={`/inventory/edit/${item.id}`}>Edit</Link> | 
                                <button onClick={() => handleDeleteClick(item)}>Delete</button>
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
        </>
    );
};

export default InventoryTable;
