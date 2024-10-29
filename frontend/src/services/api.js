// frontend/src/services/api.js
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000',
    withCredentials: true,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    timeout: 10000
});

// Request interceptor with detailed logging
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        // Detailed request logging
        console.log('=== API Request Details ===');
        console.log('URL:', config.url);
        console.log('Method:', config.method);
        console.log('Headers:', JSON.stringify(config.headers, null, 2));
        console.log('Data:', JSON.stringify(config.data, null, 2));
        console.log('Token present:', !!token);

        return config;
    },
    (error) => {
        console.error('Request Error:', error);
        return Promise.reject(error);
    }
);

// Response interceptor with enhanced error handling
api.interceptors.response.use(
    (response) => {
        console.log('=== API Response Details ===');
        console.log('Status:', response.status);
        console.log('Data:', response.data);
        return response;
    },
    (error) => {
        console.error('=== API Error Details ===');
        console.error('Error:', error.message);
        console.error('Status:', error.response?.status);
        console.error('Data:', error.response?.data);
        console.error('Config:', error.config);

        switch (error.response?.status) {
            case 401:
                console.error('Authentication error - clearing token');
                localStorage.removeItem('token');
                break;
            case 422:
                console.error('Validation error:', error.response.data);
                break;
            case 403:
                console.error('Authorization error');
                return Promise.resolve({ data: { data: [] } });
            case 500:
                console.error('Server error:', error.response?.data);
                break;
            default:
                console.error('Unhandled error type:', error.response?.status);
        }

        return Promise.reject({
            ...error,
            friendlyMessage: getFriendlyErrorMessage(error)
        });
    }
);

// Helper function for user-friendly error messages
function getFriendlyErrorMessage(error) {
    if (!error.response) {
        return 'Unable to connect to the server. Please check your internet connection.';
    }

    switch (error.response.status) {
        case 401:
            return 'Please log in to continue.';
        case 422:
            return error.response.data.error || 'Please check your input and try again.';
        case 403:
            return 'You don\'t have permission to perform this action.';
        case 500:
            return 'Something went wrong on our end. Please try again later.';
        default:
            return 'An unexpected error occurred. Please try again.';
    }
}

// Utility methods
api.isAuthError = (error) => error.response?.status === 401;
api.isForbiddenError = (error) => error.response?.status === 403;
api.isNetworkError = (error) => !error.response;

export default api;
