import { apiClient } from './api.config';
import { LoginCredentials, LoginResponse } from '../../types/auth.types';

export const authApi = {
    login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
        const { data } = await apiClient.post<LoginResponse>('/auth/login', credentials);
        return data;
    },
    register: async (userData: { firstName: string; lastName: string; email: string; password: string; phone: string; }): Promise<void> => {
        await apiClient.post('/auth/register', userData);
    }
}; 