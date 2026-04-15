import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { inventoryApi } from '../services/inventoryApi';

const AdminInventoryEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    
    // Text Data State
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    
    // Photo State
    const [file, setFile] = useState(null);

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const res = await inventoryApi.getById(id);
                setName(res.data.inventory_name);
                setDescription(res.data.description);
            } catch (err) {
                console.error('Failed to load item');
            }
        };
        fetchItem();
    }, [id]);

    const handleTextUpdate = async (e) => {
        e.preventDefault();
        try {
            await inventoryApi.updateText(id, { inventory_name: name, description });
            alert('Text data updated successfully!');
        } catch (error) {
            alert('Failed to update text data.');
        }
    };

    const handlePhotoUpdate = async (e) => {
        e.preventDefault();
        if (!file) return alert('Select a new photo first.');
        
        const formData = new FormData();
        formData.append('photo', file);
        
        try {
            await inventoryApi.updatePhoto(id, formData);
            alert('Photo updated successfully!');
        } catch (error) {
            alert('Failed to update photo.');
        }
    };

    return (
        <div>
            <h2>Edit Inventory #{id}</h2>
            
            {/* Part 1: Text Update Form */}
            <form onSubmit={handleTextUpdate} style={{ marginBottom: '20px' }}>
                <h4>Update Text Data</h4>
                <input type="text" value={name} onChange={e => setName(e.target.value)} required />
                <textarea value={description} onChange={e => setDescription(e.target.value)} />
                <button type="submit">Update Text</button>
            </form>

            {/* Part 2: Photo Update Form */}
            <form onSubmit={handlePhotoUpdate}>
                <h4>Update Photo</h4>
                <input type="file" accept="image/*" onChange={e => setFile(e.target.files[0])} />
                <button type="submit">Upload New Photo</button>
            </form>
            
            <br />
            <button onClick={() => navigate('/')}>Back to List</button>
        </div>
    );
};

export default AdminInventoryEdit;
