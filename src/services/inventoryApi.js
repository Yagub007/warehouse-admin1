import axios from 'axios';

// Base URL (Change to your actual backend URL)
const BASE_URL = 'http://localhost:3000/api'; 

export const inventoryApi = {
    getAll: () => axios.get(`${BASE_URL}/inventory`),
    getById: (id) => axios.get(`${BASE_URL}/inventory/${id}`),
    
    // Create uses POST /register with multipart/form-data
    create: (formData) => axios.post(`${BASE_URL}/register`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    }),
    
    // Update text data using JSON
    updateText: (id, data) => axios.put(`${BASE_URL}/inventory/${id}`, data, {
        headers: { 'Content-Type': 'application/json' }
    }),
    
    // Update photo independently using multipart/form-data
    updatePhoto: (id, formData) => axios.put(`${BASE_URL}/inventory/${id}/photo`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    }),
    
    delete: (id) => axios.delete(`${BASE_URL}/inventory/${id}`)
};
