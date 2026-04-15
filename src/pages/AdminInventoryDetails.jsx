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
        <div style={{ maxWidth: '900px', margin: '0 auto', animation: 'fadeIn 0.5s ease' }}>
            <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h2 style={{ fontSize: '2rem', fontWeight: 800, margin: 0, letterSpacing: '-0.025em' }}>Inventory Details</h2>
                    <p style={{ color: 'var(--text-muted)', margin: '4px 0 0 0' }}>Comprehensive overview of Asset #{id}</p>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <button onClick={() => navigate(`/inventory/edit/${id}`)} className="btn-primary">Edit Asset</button>
                    <button onClick={() => navigate('/')} style={{ background: '#f1f5f9', color: 'var(--text-main)' }}>Back to List</button>
                </div>
            </div>

            <div style={{ 
                background: 'white', 
                borderRadius: '32px', 
                overflow: 'hidden', 
                boxShadow: 'var(--shadow-lg)',
                display: 'grid',
                gridTemplateColumns: '1.2fr 1fr',
                gap: '0'
            }}>
                <div style={{ height: '500px', overflow: 'hidden' }}>
                    <img 
                        src={item.photoUrl || '/placeholder.png'} 
                        alt={item.inventory_name} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    />
                </div>
                <div style={{ padding: '48px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <div style={{ marginBottom: '24px' }}>
                        <span style={{ background: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary)', padding: '6px 12px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '700' }}>WAREHOUSE ASSET</span>
                        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, margin: '12px 0', letterSpacing: '-0.04em' }}>{item.inventory_name}</h1>
                    </div>
                    
                    <div style={{ marginBottom: '32px' }}>
                        <h4 style={{ textTransform: 'uppercase', fontSize: '0.75rem', color: 'var(--text-muted)', letterSpacing: '0.1em', marginBottom: '12px' }}>Description</h4>
                        <p style={{ fontSize: '1.1rem', color: 'var(--text-main)', lineHeight: '1.7', margin: 0 }}>
                            {item.description || "Detailed specifications for this inventory asset have not been provided yet. Please contact the administrator for more information."}
                        </p>
                    </div>

                    <div style={{ marginTop: 'auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                        <div style={{ border: '1px solid #f1f5f9', borderRadius: '16px', padding: '16px' }}>
                            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Database ID</div>
                            <div style={{ fontWeight: '700', fontSize: '1.1rem' }}>{item.id}</div>
                        </div>
                        <div style={{ border: '1px solid #f1f5f9', borderRadius: '16px', padding: '16px' }}>
                            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Status</div>
                            <div style={{ fontWeight: '700', fontSize: '1.1rem', color: '#10b981' }}>Active</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminInventoryDetails;
