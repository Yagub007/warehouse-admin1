import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { inventoryApi } from '../services/inventoryApi';

const AdminInventoryCreate = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name) return alert('Inventory Name is required!');

        const formData = new FormData();
        formData.append('inventory_name', name);
        formData.append('description', description);
        if (file) formData.append('photo', file);

        try {
            await inventoryApi.create(formData);
            navigate('/'); // redirect to list
        } catch (error) {
            alert('Failed to create inventory item');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Create Inventory Item</h3>
            <div>
                <label>Name (*): </label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} required />
            </div>
            <div>
                <label>Description: </label>
                <textarea value={description} onChange={e => setDescription(e.target.value)} />
            </div>
            <div>
                <label>Photo: </label>
                <input type="file" accept="image/*" onChange={e => setFile(e.target.files[0])} />
            </div>
            <button type="submit">Save</button>
        </form>
    );
};

export default AdminInventoryCreate;
