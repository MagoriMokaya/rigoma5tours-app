import React from 'react';

const Addon = ({ addon, onSelect, selected }) => {
    return (
        <div
            className={`addon-card${selected ? ' selected' : ''}`}
            onClick={() => onSelect(addon)}
            style={{
                border: selected ? '2px solid #007bff' : '1px solid #ccc',
                borderRadius: '8px',
                padding: '16px',
                margin: '8px 0',
                cursor: 'pointer',
                background: selected ? '#f0f8ff' : '#fff',
                transition: 'border 0.2s, background 0.2s'
            }}
        >
            <h3 style={{ margin: '0 0 8px 0' }}>{addon.name}</h3>
            <p style={{ margin: '0 0 8px 0', color: '#555' }}>{addon.description}</p>
            <div style={{ fontWeight: 'bold', color: '#007bff' }}>
                {addon.price ? `KES ${addon.price}` : 'Free'}
            </div>
        </div>
    );
};

export default Addon;