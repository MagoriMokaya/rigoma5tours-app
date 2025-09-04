import axios from 'axios';

const API_BASE = '/api';

// Create a reusable axios instance for better control (e.g., interceptors, baseURL)
const apiClient = axios.create({
    baseURL: API_BASE,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000, // 10 seconds timeout
});

// Generic error handler
const handleApiError = (error) => {
    if (error.response) {
        // Server responded with a status other than 2xx
        throw new Error(error.response.data?.message || 'API Error');
    } else if (error.request) {
        // Request was made but no response received
        throw new Error('No response from server');
    } else {
        // Something else happened
        throw new Error(error.message);
    }
};

export const createCheckoutSession = async (data) => {
    try {
        const res = await apiClient.post('/checkout', data);
        return res.data;
    } catch (error) {
        handleApiError(error);
    }
};