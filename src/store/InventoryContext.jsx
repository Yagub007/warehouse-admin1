import React, { createContext, useState, useEffect } from 'react';
import { inventoryApi } from '../services/inventoryApi';

export const InventoryContext = createContext();

export const InventoryProvider = ({ children }) => {
    const [inventory, setInventory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchInventory = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await inventoryApi.getAll();
            setInventory(response.data);
        } catch (err) {
            setError('Failed to fetch inventory.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInventory();
    }, []);

    return (
        <InventoryContext.Provider value={{ inventory, loading, error, fetchInventory }}>
            {children}
        </InventoryContext.Provider>
    );
};
