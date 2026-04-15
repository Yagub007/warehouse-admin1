import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { inventoryApi } from '../services/inventoryApi';

const AdminInventoryDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [item, setItem] = useState(null);

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const res = await inventoryApi.getById(id);
                setItem(res.data);
            } catch (err) {
                console.error('Failed to load item details');
            }
        };
        fetchItem();
    }, [id]);

    if (!item) return <div>Loading item details...</div>;

    return (
        <div>
            <h2>Inventory Details</h2>
            <p><strong>Name:</strong> {item.inventory_name}</p>
            <p><strong>Description:</strong> {item.description}</p>
            <div>
                <strong>Photo:</strong><br />
                <img src={item.photoUrl} alt={item.inventory_name} style={{ maxWidth: '300px' }} />
            </div>
            <br />
            <button onClick={() => navigate('/')}>Back to List</button>
        </div>
    );
};

export default AdminInventoryDetails;
