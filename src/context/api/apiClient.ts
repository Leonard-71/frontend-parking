import axios from 'axios'; 
import { isTokenExpired } from '../../utils/tokenUtils';

export const API_BASE_URL = 'http://localhost:3000';

export const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});
 
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token');
        
        if (token) {
            if (isTokenExpired(token)) { 
                localStorage.removeItem('access_token');
                window.location.href = '/login';
                return Promise.reject(new Error('Token expired'));
            }

            config.headers['Authorization'] = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
 
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {  
            localStorage.removeItem('access_token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);
