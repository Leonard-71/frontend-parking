import { apiClient } from './api.config';
import { LoginCredentials, RegisterData } from '../../types/auth.types';

export const authApi = {
    login: async (credentials: LoginCredentials) => {
        try {
            const response = await apiClient.post('/auth/login', credentials);
            return response.data;
        } catch (error) {
            throw new Error('Eroare la autentificare');
        }
    },
    register: async (userData: RegisterData) => {
        try {
            const response = await apiClient.post('/auth/register', userData);
            return response.data;
        } catch (error) {
            throw new Error('Eroare la înregistrare');
        }
    }
}; 