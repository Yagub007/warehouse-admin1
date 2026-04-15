import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { inventoryApi } from '../services/inventoryApi';
import { InventoryContext } from '../store/InventoryContext';

const AdminInventoryEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { fetchInventory } = useContext(InventoryContext);
    
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
            await fetchInventory(); // Оновлюємо глобальний стейт
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
            await fetchInventory(); // Оновлюємо глобальний стейт
            alert('Photo updated successfully!');
        } catch (error) {
            alert('Failed to update photo.');
        }
    };

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', animation: 'fadeIn 0.5s ease' }}>
            <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                    <h2 style={{ fontSize: '2rem', fontWeight: 800, margin: 0, letterSpacing: '-0.025em' }}>Edit Resource</h2>
                    <p style={{ color: 'var(--text-muted)', margin: '4px 0 0 0' }}>Refine details for item #{id}</p>
                </div>
                <button onClick={() => navigate('/')} style={{ background: '#f1f5f9', color: 'var(--text-main)', padding: '8px 16px', borderRadius: '10px', fontSize: '0.9rem' }}>← Back to List</button>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '24px' }}>
                {/* Part 1: Text Update Form */}
                <form onSubmit={handleTextUpdate} style={{ 
                    background: 'white', 
                    padding: '32px', 
                    borderRadius: '24px', 
                    boxShadow: 'var(--shadow-md)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px'
                }}>
                    <h4 style={{ margin: '0 0 8px 0', fontSize: '1.1rem', fontWeight: '700' }}>Update Specifications</h4>
                    <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Name</label>
                        <input type="text" value={name} onChange={e => setName(e.target.value)} required />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Description</label>
                        <textarea value={description} onChange={e => setDescription(e.target.value)} style={{ minHeight: '150px' }} />
                    </div>
                    <button type="submit" className="btn-primary" style={{ marginTop: '8px' }}>Update Text Data</button>
                </form>

                {/* Part 2: Photo Update Form */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    <form onSubmit={handlePhotoUpdate} style={{ 
                        background: 'white', 
                        padding: '32px', 
                        borderRadius: '24px', 
                        boxShadow: 'var(--shadow-md)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '20px'
                    }}>
                        <h4 style={{ margin: '0 0 8px 0', fontSize: '1.1rem', fontWeight: '700' }}>Update Visuals</h4>
                        <div style={{ 
                            border: '2px dashed #e2e8f0', 
                            borderRadius: '16px', 
                            padding: '24px', 
                            textAlign: 'center',
                            background: '#f8fafc',
                            cursor: 'pointer'
                        }} onClick={() => document.getElementById('photoInput').click()}>
                            {file ? (
                                <span style={{ color: 'var(--primary)', fontWeight: '600', fontSize: '0.9rem' }}>{file.name}</span>
                            ) : (
                                <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Click to select new image</span>
                            )}
                            <input id="photoInput" type="file" accept="image/*" onChange={e => setFile(e.target.files[0])} style={{ display: 'none' }} />
                        </div>
                        <button type="submit" className="btn-primary">Upload New Media</button>
                    </form>

                    <div style={{ 
                        background: 'white', 
                        padding: '24px', 
                        borderRadius: '24px', 
                        boxShadow: 'var(--shadow-md)',
                        textAlign: 'center'
                    }}>
                        <h4 style={{ margin: '0 0 16px 0', fontSize: '0.9rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Visual Preview</h4>
                        <div style={{ width: '100%', height: '180px', borderRadius: '12px', background: '#f1f5f9', overflow: 'hidden' }}>
                            <img src={file ? URL.createObjectURL(file) : '/placeholder.png'} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminInventoryEdit;
