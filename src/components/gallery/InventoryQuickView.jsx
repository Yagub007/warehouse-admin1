const InventoryQuickView = ({ item, onClose }) => {
    if (!item) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '800px', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '32px', alignItems: 'start' }}>
                <div style={{ position: 'relative' }}>
                    <img src={item.photoUrl || '/placeholder.png'} alt={item.inventory_name} style={{ margin: 0, borderRadius: '16px' }} />
                    <div style={{ position: 'absolute', top: '16px', left: '16px', background: 'rgba(255,255,255,0.9)', padding: '4px 12px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: '700', color: 'var(--primary)' }}>ASSET #{item.id}</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '20px', letterSpacing: '-0.03em' }}>{item.inventory_name}</h2>
                    <div style={{ flexGrow: 1 }}>
                        <h4 style={{ textTransform: 'uppercase', fontSize: '0.8rem', color: 'var(--text-muted)', letterSpacing: '0.1em', marginBottom: '8px' }}>Description</h4>
                        <p style={{ margin: 0 }}>{item.description || "No description provided for this inventory asset."}</p>
                    </div>
                    <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid #f1f5f9', display: 'flex', gap: '12px' }}>
                        <button className="btn-primary" style={{ flex: 1 }} onClick={onClose}>Close Preview</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InventoryQuickView;
