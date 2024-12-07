import { useState, useEffect } from 'react';
import { apiClient } from '../api/apiClient';

interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    createdAt: string;
    updatedAt: string;
}

interface UseUserApiReturn {
    user: User | null;
    loading: boolean;
    error: string | null;
    fetchUser: () => Promise<void>;
    updateUser: (updatedUser: Partial<User>) => Promise<void>;
}

export const useUserApi = (): UseUserApiReturn => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const userId = localStorage.getItem('user_id');  

    const fetchUser = async () => {
        if (!userId) {
            setError('User ID not found');
            return;
        }

        try {
            setLoading(true); 
            const response = await apiClient.get(`/users/${userId}`);
            setUser(response.data);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to fetch user data');
        } finally {
            setLoading(false);
        }
    };

    const updateUser = async (updatedUser: Partial<User>) => {
        if (!userId) {
            setError('User ID not found');
            return;
        }

        try {
            setLoading(true);
            const response = await apiClient.patch(`/users/${userId}`, updatedUser);
            setUser(response.data); 
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to update user');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return { user, loading, error, fetchUser, updateUser };
};
