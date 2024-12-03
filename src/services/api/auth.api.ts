import { apiClient } from './api.config';
import { LoginCredentials } from '../../types/auth.types';

export const authApi = {
    login: async (credentials: LoginCredentials) => {
        try {
            const response = await apiClient.post('/login', credentials);
            return response.data;
        } catch (error) {
            throw new Error('Eroare la autentificare');
        }
    },
    register: async (userData: any) => {
        try {
            const response = await apiClient.post('/register', userData);
            return response.data;
        } catch (error) {
            throw new Error('Eroare la înregistrare');
        }
    }
}; 