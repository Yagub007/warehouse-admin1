import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { inventoryApi } from '../services/inventoryApi';
import { InventoryContext } from '../store/InventoryContext';

const AdminInventoryCreate = () => {
    const navigate = useNavigate();
    const { fetchInventory } = useContext(InventoryContext);
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
            await fetchInventory(); // Оновлюємо глобальний стейт
            navigate('/'); // redirect to list
        } catch (error) {
            alert('Failed to create inventory item');
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', animation: 'fadeIn 0.5s ease' }}>
            <div style={{ marginBottom: '32px' }}>
                <h2 style={{ fontSize: '2rem', fontWeight: 800, margin: 0, letterSpacing: '-0.025em' }}>Create Asset</h2>
                <p style={{ color: 'var(--text-muted)', margin: '4px 0 0 0' }}>Add a new item to the warehouse inventory</p>
            </div>
            
            <form onSubmit={handleSubmit} style={{ 
                background: 'white', 
                padding: '32px', 
                borderRadius: '24px', 
                boxShadow: 'var(--shadow-md)',
                display: 'flex',
                flexDirection: 'column',
                gap: '24px'
            }}>
                <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '0.9rem' }}>Inventory Name <span style={{ color: 'var(--accent)' }}>*</span></label>
                    <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Ergonomic Chair" required />
                </div>
                
                <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '0.9rem' }}>Description</label>
                    <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Provide recursive details about the item..." style={{ minHeight: '120px' }} />
                </div>
                
                <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '0.9rem' }}>Upload Photo</label>
                    <div style={{ 
                        border: '2px dashed #e2e8f0', 
                        borderRadius: '16px', 
                        padding: '32px', 
                        textAlign: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        background: '#f8fafc'
                    }} onClick={() => document.getElementById('fileInput').click()}>
                        {file ? (
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                                <span style={{ color: 'var(--primary)', fontWeight: '600' }}>✓ {file.name}</span>
                            </div>
                        ) : (
                            <div>
                                <div style={{ fontSize: '2rem', marginBottom: '8px' }}>📁</div>
                                <div style={{ fontWeight: '600', color: 'var(--text-main)' }}>Click to upload</div>
                                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>PNG, JPG up to 10MB</div>
                            </div>
                        )}
                        <input id="fileInput" type="file" accept="image/*" onChange={e => setFile(e.target.files[0])} style={{ display: 'none' }} />
                    </div>
                </div>
                
                <div style={{ display: 'flex', gap: '16px', marginTop: '12px' }}>
                    <button type="submit" className="btn-primary" style={{ flex: 1 }}>Save Inventory</button>
                    <button type="button" onClick={() => navigate('/')} style={{ background: '#f1f5f9', color: 'var(--text-main)', flex: 1 }}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default AdminInventoryCreate;
